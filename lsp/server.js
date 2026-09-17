// i18n-lsp: Language Server for i18n key diagnostics
//
// Provides:
// 1. Diagnostics for missing translation keys in source files (t('key'), $t('key'), __('key'))
// 2. Coverage info diagnostics on locale JSON files
// 3. Hover information showing translations for a key across all locales
//
// Protocol: LSP over stdio (vscode-languageserver)

const {
  createConnection,
  TextDocuments,
  ProposedFeatures,
  DiagnosticSeverity,
  TextDocumentSyncKind,
} = require("vscode-languageserver/node");

const {
  TextDocument,
} = require("vscode-languageserver-textdocument");

const fs = require("fs");
const path = require("path");

let yaml;
try {
  yaml = require("js-yaml");
} catch (e) {
  try {
    yaml = require(path.join(__dirname, "node_modules", "js-yaml"));
  } catch (e2) {}
}

function parseFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  if (filePath.endsWith(".json")) {
    return JSON.parse(content);
  } else if (filePath.endsWith(".yaml") || filePath.endsWith(".yml")) {
    if (!yaml) yaml = require("js-yaml");
    return yaml.load(content) || {};
  }
  return {};
}

// ─────────────────────────────────────────────────────────────────────────────
// Server initialization
// ─────────────────────────────────────────────────────────────────────────────

const connection = createConnection(process.stdin, process.stdout);
const documents = new TextDocuments(TextDocument);

/** @type {{ localesPath: string, baseLocale: string, translationFunctions: string[], missingKeySeverity: string, coverageDiagnosticSeverity: string }} */
let config = {
  localesPath: "locales",
  baseLocale: "en",
  translationFunctions: ["t", "$t", "__", "trans"],
  missingKeySeverity: "warning",
  coverageDiagnosticSeverity: "information",
};

/** @type {string} Root path of the workspace */
let workspaceRoot = "";

/** @type {Map<string, Set<string>>} Locale code → set of translation keys */
const localeKeys = new Map();

/** @type {Map<string, Record<string, string>>} Locale code → key → value */
const localeValues = new Map();

/** @type {Set<string>} Base locale keys (reference) */
let baseKeys = new Set();

// ─────────────────────────────────────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────────────────────────────────────

connection.onInitialize((params) => {
  workspaceRoot = params.rootPath || params.rootUri || "";
  if (workspaceRoot.startsWith("file://")) {
    workspaceRoot = decodeURIComponent(new URL(workspaceRoot).pathname);
    // Fix Windows paths: /C:/foo → C:/foo
    if (process.platform === "win32" && workspaceRoot.startsWith("/")) {
      workspaceRoot = workspaceRoot.slice(1);
    }
  }

  // Merge initialization options into config
  if (params.initializationOptions) {
    Object.assign(config, params.initializationOptions);
  }

  // Load locale files
  loadLocales();

  return {
    capabilities: {
      textDocumentSync: TextDocumentSyncKind.Full,
      hoverProvider: true,
    },
  };
});

connection.onInitialized(() => {
  // Re-validate all open documents
  documents.all().forEach(validateDocument);
});

// ─────────────────────────────────────────────────────────────────────────────
// Locale loading
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Load all locale JSON files from the configured directory.
 */
const LOCALE_REGEX = /^[a-z]{2,3}([-_][a-zA-Z]{2,4})?\.(json|ya?ml)$/i;
const IGNORE_DIRS = new Set([
  "node_modules", ".git", "dist", "build", "target", ".cache",
  ".next", ".nuxt", ".output", "vendor", "out", ".turbo", ".vscode", ".idea"
]);

/**
 * Find all folders containing translation files (JSON or YAML)
 */
function findAllLocalesDirs(rootDir) {
  const results = [];

  function scan(dir, depth = 0) {
    if (depth > 5) return;
    let entries;
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch (e) {
      return;
    }

    const files = [];
    const subdirs = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.has(entry.name) && !entry.name.startsWith(".")) {
          subdirs.push(entry.name);
        }
      } else if (entry.isFile()) {
        if (LOCALE_REGEX.test(entry.name)) {
          files.push(entry.name);
        }
      }
    }

    const dirName = path.basename(dir).toLowerCase();
    const isLocaleNamed = ["locales", "i18n", "lang", "locale", "messages", "translations"].includes(dirName);

    if ((isLocaleNamed && files.length >= 1) || files.length >= 2) {
      results.push(dir);
      return;
    }

    for (const sub of subdirs) {
      scan(path.join(dir, sub), depth + 1);
    }
  }

  scan(rootDir);
  return results;
}

/**
 * Load all locale JSON and YAML files from all detected directories.
 */
function loadLocales() {
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
    const files = fs.readdirSync(localesDir).filter((f) => LOCALE_REGEX.test(f));

    for (const file of files) {
      const ext = path.extname(file);
      const locale = path.basename(file, ext);
      const filePath = path.join(localesDir, file);

      try {
        const content = parseFile(filePath);
        const flatKeys = flattenKeys(content);

        // Merge into existing keys (for monorepos with multiple modules)
        if (!localeKeys.has(locale)) {
          localeKeys.set(locale, new Set());
          localeValues.set(locale, {});
        }

        const existingSet = localeKeys.get(locale);
        const existingObj = localeValues.get(locale);

        for (const k of Object.keys(flatKeys)) {
          existingSet.add(k);
          existingObj[k] = flatKeys[k];
        }

        if (locale === config.baseLocale) {
          for (const k of Object.keys(flatKeys)) {
            baseKeys.add(k);
          }
        }
      } catch (err) {
        connection.console.error(`Failed to parse ${filePath}: ${err.message}`);
      }
    }
  }

  // Auto-detect base locale if configured one wasn't found
  if (baseKeys.size === 0 && localeKeys.size > 0) {
    for (const cand of ["en", "en-US", "en_US", "uk", "uk-UA", "de", "fr"]) {
      if (localeKeys.has(cand)) {
        config.baseLocale = cand;
        baseKeys = localeKeys.get(cand);
        connection.console.log(`Auto-detected base locale: '${cand}'`);
        break;
      }
    }
    if (baseKeys.size === 0) {
      const first = localeKeys.keys().next().value;
      if (first) {
        config.baseLocale = first;
        baseKeys = localeKeys.get(first);
        connection.console.log(`Defaulting to first locale: '${first}'`);
      }
    }
  }
}

/**
 * Flatten nested JSON object to dot-notation key-value pairs.
 *
 * @param {Record<string, any>} obj
 * @param {string} prefix
 * @returns {Record<string, string>}
 */
function flattenKeys(obj, prefix = "") {
  /** @type {Record<string, string>} */
  const result = {};

  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;

    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenKeys(value, fullKey));
    } else {
      result[fullKey] = String(value);
    }
  }

  return result;
}

// ─────────────────────────────────────────────────────────────────────────────
// Diagnostics
// ─────────────────────────────────────────────────────────────────────────────

documents.onDidChangeContent((change) => {
  validateDocument(change.document);
});

documents.onDidOpen((event) => {
  validateDocument(event.document);
});

/**
 * Validate a document and publish diagnostics.
 *
 * For source files: find translation function calls and check keys.
 * For locale JSON files: report missing keys and coverage.
 *
 * @param {TextDocument} document
 */
function validateDocument(document) {
  const uri = document.uri;
  const filePath = decodeURIComponent(new URL(uri).pathname);
  const fileName = path.basename(filePath);

  // Check if this is a locale file (.json or .yaml / .yml)
  if (LOCALE_REGEX.test(fileName)) {
    validateLocaleFile(document, filePath);
    return;
  }

  // Otherwise, check source files for translation function calls
  validateSourceFile(document);
}

/**
 * Validate a source file: find t('key') calls and check if keys exist.
 *
 * @param {TextDocument} document
 */
function validateSourceFile(document) {
  if (baseKeys.size === 0) {
    // No locale files loaded — skip
    connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
    return;
  }

  const text = document.getText();
  /** @type {import("vscode-languageserver").Diagnostic[]} */
  const diagnostics = [];

  // Build regex for all configured translation functions
  // Matches: t('key'), t("key"), $t('key'), __('key'), trans('key')
  const funcNames = config.translationFunctions
    .map((f) => f.replace("$", "\\$"))
    .join("|");

  const regex = new RegExp(
    `(?:${funcNames})\\(\\s*['"\`]([^'"\`]+?)['"\`]`,
    "g"
  );

  let match;
  while ((match = regex.exec(text)) !== null) {
    const key = match[1];
    const startOffset = match.index + match[0].indexOf(key);

    if (!baseKeys.has(key)) {
      // Key doesn't exist in base locale → ERROR
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
      // Check which locales are missing this key
      const missingLocales = [];
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

/**
 * Validate a locale JSON/YAML file: report coverage and missing keys.
 *
 * @param {TextDocument} document
 * @param {string} filePath
 */
function validateLocaleFile(document, filePath) {
  if (baseKeys.size === 0) {
    connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
    return;
  }

  const ext = path.extname(filePath);
  const locale = path.basename(filePath, ext);

  // Skip the base locale
  if (locale === config.baseLocale) {
    connection.sendDiagnostics({ uri: document.uri, diagnostics: [] });
    return;
  }

  /** @type {import("vscode-languageserver").Diagnostic[]} */
  const diagnostics = [];

  // Parse the file
  let flatKeys;
  try {
    const raw = document.getText();
    const parsed = (ext === ".json")
      ? JSON.parse(raw)
      : (yaml ? yaml.load(raw) : JSON.parse(raw));
    flatKeys = flattenKeys(parsed);
  } catch (err) {
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

  // Update the in-memory cache
  localeKeys.set(locale, new Set(Object.keys(flatKeys)));
  localeValues.set(locale, flatKeys);

  // Find missing keys
  const missing = [];
  for (const key of baseKeys) {
    if (!(key in flatKeys)) {
      missing.push(key);
    }
  }

  // Coverage info diagnostic at the top of the file
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

  // Individual missing key diagnostics
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

// ─────────────────────────────────────────────────────────────────────────────
// Hover: show translations for a key
// ─────────────────────────────────────────────────────────────────────────────

connection.onHover((params) => {
  const document = documents.get(params.textDocument.uri);
  if (!document) return null;

  const text = document.getText();
  const offset = document.offsetAt(params.position);

  // Find if the cursor is inside a translation function call
  const funcNames = config.translationFunctions
    .map((f) => f.replace("$", "\\$"))
    .join("|");

  const regex = new RegExp(
    `(?:${funcNames})\\(\\s*['"\`]([^'"\`]+?)['"\`]`,
    "g"
  );

  let match;
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

/**
 * Build hover content showing translations for a key.
 *
 * @param {string} key
 * @returns {import("vscode-languageserver").Hover}
 */
function buildHover(key) {
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

// ─────────────────────────────────────────────────────────────────────────────
// File watching — reload locales when JSON files change
// ─────────────────────────────────────────────────────────────────────────────

connection.onDidChangeWatchedFiles((_change) => {
  connection.console.log("Locale files changed, reloading...");
  loadLocales();
  // Re-validate all open documents
  documents.all().forEach(validateDocument);
});

// ─────────────────────────────────────────────────────────────────────────────
// Start the server
// ─────────────────────────────────────────────────────────────────────────────

documents.listen(connection);
connection.listen();
