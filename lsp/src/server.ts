import {
  createConnection,
  TextDocuments,
  Diagnostic,
  DiagnosticSeverity,
  TextDocumentSyncKind,
  Hover,
  InitializeParams,
  InitializeResult,
} from "vscode-languageserver/node";
import { TextDocument } from "vscode-languageserver-textdocument";
import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import {
  parseFile,
  flattenKeys,
  parseLocaleFilename,
  findAllLocalesDirs,
} from "./utils/locales";
import {
  stripJsonComments,
  parseProperties,
  parsePo,
  parseToml,
} from "./utils/formatters";
import { ServerConfig } from "./types";

const connection = createConnection(process.stdin, process.stdout);
const documents = new TextDocuments(TextDocument);

let config: ServerConfig = {
  localesPath: "locales",
  baseLocale: "en",
  translationFunctions: ["t", "$t", "__", "trans"],
  missingKeySeverity: "warning",
  coverageDiagnosticSeverity: "information",
};

let workspaceRoot = "";

const localeKeys = new Map<string, Set<string>>();
const localeValues = new Map<string, Record<string, string>>();
let baseKeys = new Set<string>();

connection.onInitialize((params: InitializeParams): InitializeResult => {
  workspaceRoot = params.rootPath || params.rootUri || "";
  if (workspaceRoot.startsWith("file://")) {
    workspaceRoot = decodeURIComponent(new URL(workspaceRoot).pathname);
    // Fix Windows paths: /C:/foo → C:/foo
    if (process.platform === "win32" && workspaceRoot.startsWith("/")) {
      workspaceRoot = workspaceRoot.slice(1);
    }
  }

  if (params.initializationOptions) {
    Object.assign(config, params.initializationOptions);
  }

  loadLocales();

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Full,
      hoverProvider: true,
    },
  };
});

connection.onInitialized(() => {
  documents.all().forEach(validateDocument);
});

function loadLocales(): void {
  localeKeys.clear();
  localeValues.clear();
  baseKeys.clear();

  const localesDirs = findAllLocalesDirs(workspaceRoot);

  if (localesDirs.length === 0) {
    connection.console.warn(`No locales directory found in workspace: ${workspaceRoot}`);
    return;
  }

  connection.console.log(`Found ${localesDirs.length} locales directories: ${localesDirs.join(", ")}`);

  for (const localesDir of localesDirs) {
    let files: string[] = [];
    try {
      files = fs.readdirSync(localesDir).filter((f) => parseLocaleFilename(f) !== null);
    } catch {
      continue;
    }

    for (const file of files) {
      const info = parseLocaleFilename(file);
      if (!info) continue;
      const locale = info.locale;
      const filePath = path.join(localesDir, file);

      try {
        const content = parseFile(filePath);
        const flatKeys = flattenKeys(content);

        if (!localeKeys.has(locale)) {
          localeKeys.set(locale, new Set());
          localeValues.set(locale, {});
        }

        const existingSet = localeKeys.get(locale)!;
        const existingObj = localeValues.get(locale)!;

        for (const k of Object.keys(flatKeys)) {
          existingSet.add(k);
          existingObj[k] = flatKeys[k];
        }

        if (locale === config.baseLocale) {
          for (const k of Object.keys(flatKeys)) {
            baseKeys.add(k);
          }
        }
      } catch (err: any) {
        connection.console.error(`Failed to parse ${filePath}: ${err.message}`);
      }
    }
  }

  if (baseKeys.size === 0 && localeKeys.size > 0) {
    for (const cand of ["en", "en-US", "en_US", "uk", "uk-UA", "de", "fr"]) {
      if (localeKeys.has(cand)) {
        config.baseLocale = cand;
        baseKeys = localeKeys.get(cand)!;
        connection.console.log(`Auto-detected base locale: '${cand}'`);
        break;
      }
    }
    if (baseKeys.size === 0) {
      const first = localeKeys.keys().next().value;
      if (first) {
        config.baseLocale = first;
        baseKeys = localeKeys.get(first)!;
        connection.console.log(`Defaulting to first locale: '${first}'`);
      }
    }
  }
}

documents.onDidChangeContent((change) => {
  validateDocument(change.document);
});

documents.onDidOpen((event) => {
  validateDocument(event.document);
});

function validateDocument(document: TextDocument): void {
  const uri = document.uri;
  let filePath = uri;
  try {
    if (uri.startsWith("file://")) {
      filePath = decodeURIComponent(new URL(uri).pathname);
      if (process.platform === "win32" && filePath.startsWith("/")) {
        filePath = filePath.slice(1);
      }
    }
  } catch {}

  const fileName = path.basename(filePath);
  const info = parseLocaleFilename(fileName);

  if (info) {
    validateLocaleFile(document, filePath, info.locale);
    return;
  }

  validateSourceFile(document);
}

function validateSourceFile(document: TextDocument): void {
  if (baseKeys.size === 0) {
    connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
    return;
  }

  const text = document.getText();
  const diagnostics: Diagnostic[] = [];

  const funcNames = config.translationFunctions
    .map((f) => f.replace("$", "\\$"))
    .join("|");

  const regex = new RegExp(
    `(?:${funcNames})\\(\\s*['"\`]([^'"\`]+?)['"\`]`,
    "g"
  );

  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const key = match[1];
    const startOffset = match.index + match[0].indexOf(key);

    if (!baseKeys.has(key)) {
      const startPos = document.positionAt(startOffset);
      const endPos = document.positionAt(startOffset + key.length);

      diagnostics.push({
        severity: DiagnosticSeverity.Error,
        range: { start: startPos, end: endPos },
        message: `i18n key '${key}' does not exist in base locale '${config.baseLocale}'`,
        source: "i18n-lsp",
        code: "missing-base-key",
      });
    } else {
      const missingLocales: string[] = [];
      for (const [locale, keys] of localeKeys) {
        if (locale !== config.baseLocale && !keys.has(key)) {
          missingLocales.push(locale);
        }
      }

      if (missingLocales.length > 0) {
        const startPos = document.positionAt(startOffset);
        const endPos = document.positionAt(startOffset + key.length);

        const severity =
          config.missingKeySeverity === "error"
            ? DiagnosticSeverity.Error
            : DiagnosticSeverity.Warning;

        diagnostics.push({
          severity,
          range: { start: startPos, end: endPos },
          message: `i18n key '${key}' is missing in: ${missingLocales.join(", ")}`,
          source: "i18n-lsp",
          code: "missing-translation",
        });
      }
    }
  }

  connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

function validateLocaleFile(document: TextDocument, filePath: string, locale: string): void {
  if (baseKeys.size === 0) {
    connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
    return;
  }

  if (locale === config.baseLocale) {
    connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
    return;
  }

  const diagnostics: Diagnostic[] = [];
  const ext = path.extname(filePath).toLowerCase();

  let flatKeys: Record<string, string>;
  try {
    const raw = document.getText();
    let parsed: any;
    if (ext === ".json" || ext === ".arb") {
      parsed = JSON.parse(raw);
    } else if (ext === ".jsonc" || ext === ".json5") {
      parsed = JSON.parse(stripJsonComments(raw));
    } else if (ext === ".yaml" || ext === ".yml") {
      parsed = yaml.load(raw);
    } else if (ext === ".toml") {
      parsed = parseToml(raw);
    } else if (ext === ".properties") {
      parsed = parseProperties(raw);
    } else if (ext === ".po") {
      parsed = parsePo(raw);
    } else {
      parsed = JSON.parse(raw);
    }
    flatKeys = flattenKeys(parsed);
  } catch (err: any) {
    diagnostics.push({
      severity: DiagnosticSeverity.Error,
      range: { start: { line: 0, character: 0 }, end: { line: 0, character: 1 } },
      message: `Failed to parse locale file: ${err.message}`,
      source: "i18n-lsp",
      code: "parse-error",
    });
    connection.sendDiagnostics({ uri: document.uri, diagnostics });
    return;
  }

  localeKeys.set(locale, new Set(Object.keys(flatKeys)));
  localeValues.set(locale, flatKeys);

  const missing: string[] = [];
  for (const key of baseKeys) {
    if (!(key in flatKeys)) {
      missing.push(key);
    }
  }

  const translated = baseKeys.size - missing.length;
  const pct = baseKeys.size > 0 ? ((translated / baseKeys.size) * 100).toFixed(1) : "100.0";

  const coverageSeverity =
    config.coverageDiagnosticSeverity === "warning"
      ? DiagnosticSeverity.Warning
      : DiagnosticSeverity.Information;

  diagnostics.push({
    severity: coverageSeverity,
    range: { start: { line: 0, character: 0 }, end: { line: 0, character: 1 } },
    message: `[${locale}] Translation coverage: ${pct}% (${translated}/${baseKeys.size} keys). Missing: ${missing.length} keys.`,
    source: "i18n-lsp",
    code: "coverage-info",
  });

  for (const key of missing) {
    diagnostics.push({
      severity: DiagnosticSeverity.Warning,
      range: { start: { line: 0, character: 0 }, end: { line: 0, character: 1 } },
      message: `Missing translation key: '${key}'`,
      source: "i18n-lsp",
      code: "missing-key",
    });
  }

  connection.sendDiagnostics({ uri: document.uri, diagnostics });
}

connection.onHover((params): Hover | null => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return null;

  const text = document.getText();
  const offset = document.offsetAt(params.position);

  const funcNames = config.translationFunctions
    .map((f) => f.replace("$", "\\$"))
    .join("|");

  const regex = new RegExp(
    `(?:${funcNames})\\(\\s*['"\`]([^'"\`]+?)['"\`]`,
    "g"
  );

  let match: RegExpExecArray | null;
  while ((match = regex.exec(text)) !== null) {
    const keyStart = match.index + match[0].indexOf(match[1]);
    const keyEnd = keyStart + match[1].length;

    if (offset >= keyStart && offset <= keyEnd) {
      const key = match[1];
      return buildHover(key);
    }
  }

  return null;
});

function buildHover(key: string): Hover {
  const lines = [`**🌐 Translations for** \`${key}\`\n`];
  lines.push("| Locale | Translation |");
  lines.push("|--------|-------------|");

  for (const [locale, values] of localeValues) {
    const value = values[key];
    if (value !== undefined) {
      lines.push(`| ${locale} | ${value} |`);
    } else {
      lines.push(`| ${locale} | ⚠️ **MISSING** |`);
    }
  }

  return {
    contents: {
      kind: "markdown",
      value: lines.join("\n"),
    },
  };
}

connection.onDidChangeWatchedFiles((_change) => {
  connection.console.log("Locale files changed, reloading...");
  loadLocales();
  documents.all().forEach(validateDocument);
});

documents.listen(connection);
connection.listen();
