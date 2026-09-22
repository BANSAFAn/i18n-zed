import fs from "fs";
import path from "path";
import yaml from "js-yaml";
import { getFlag, getLangName } from "./flags";
import {
  stripJsonComments,
  parseProperties,
  serializeProperties,
  parsePo,
  serializePo,
  parseToml,
  serializeToml,
} from "./formatters";
import {
  I18nModule,
  LangSummary,
  FileSnapshot,
  ModuleLocale,
} from "../types";

export const IGNORE_DIRS = new Set([
  "node_modules", ".git", "dist", "build", "target", ".cache",
  ".next", ".nuxt", ".output", "vendor", "out", ".turbo", ".vscode", ".idea"
]);

export const IGNORED_FILES = new Set([
  "package.json", "package-lock.json", "pnpm-lock.yaml", "pnpm-workspace.yaml",
  "docker-compose.yaml", "docker-compose.yml", "tsconfig.json", "jsconfig.json",
  "settings.json", "tasks.json", "keymap.json", "cargo.toml", "Cargo.toml",
  "extension.toml", "pyproject.toml"
]);

export const SUPPORTED_EXTS = new Set([
  "json", "jsonc", "json5", "yaml", "yml", "toml", "properties", "po", "arb"
]);

export const LOCALE_REGEX = /^([a-zA-Z0-9_-]+?[_.-])?([a-z]{2,3}(?:[-_][a-zA-Z0-9]{2,4})?|lolcat)\.(json|jsonc|json5|ya?ml|toml|properties|po|arb)$/i;

const KNOWN_LANGS = new Set([
  "uk", "en", "pl", "de", "fr", "es", "it", "pt", "nl", "sv", "da", "fi",
  "cs", "sk", "ro", "hu", "bg", "el", "hr", "sr", "sl", "zh", "ja", "ko",
  "ar", "he", "hi", "tr", "ru", "be", "lolcat"
]);

export function parseLocaleFilename(filename: string): { locale: string; ext: string; prefix?: string } | null {
  if (IGNORED_FILES.has(filename)) return null;

  const parts = filename.split(".");
  if (parts.length < 2) return null;
  const ext = parts.pop()!.toLowerCase();
  if (!SUPPORTED_EXTS.has(ext)) return null;
  const name = parts.join(".");

  const sepIdx = Math.max(name.lastIndexOf("_"), name.lastIndexOf("-"));
  if (sepIdx > 0) {
    const after = name.slice(sepIdx + 1);
    const before = name.slice(0, sepIdx);
    if (KNOWN_LANGS.has(after.toLowerCase()) || /^[a-z]{2,3}$/i.test(after)) {
      if (
        KNOWN_LANGS.has(name.toLowerCase()) ||
        KNOWN_LANGS.has(name.toLowerCase().replace("_", "-")) ||
        /^[a-z]{2,3}[-_][a-zA-Z0-9]{2,4}$/i.test(name)
      ) {
        if (!["messages", "app", "strings", "intl", "i18n", "lang", "locale"].includes(before.toLowerCase())) {
          return { locale: name, ext };
        }
      }
      return { prefix: before, locale: after, ext };
    }
  }

  if (/^([a-z]{2,3}([-_][a-zA-Z0-9]{2,4})?|lolcat)$/i.test(name)) {
    return { locale: name, ext };
  }

  const match = filename.match(LOCALE_REGEX);
  if (match) {
    return {
      prefix: match[1] ? match[1].replace(/[_.-]$/, "") : undefined,
      locale: match[2],
      ext: match[3].toLowerCase()
    };
  }

  return null;
}

export function parseFile(filePath: string): Record<string, any> {
  const content = fs.readFileSync(filePath, "utf-8");
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".json" || ext === ".arb") {
    return JSON.parse(content);
  } else if (ext === ".jsonc" || ext === ".json5") {
    return JSON.parse(stripJsonComments(content));
  } else if (ext === ".yaml" || ext === ".yml") {
    return (yaml.load(content) as Record<string, any>) || {};
  } else if (ext === ".toml") {
    return parseToml(content);
  } else if (ext === ".properties") {
    return parseProperties(content);
  } else if (ext === ".po") {
    return parsePo(content);
  }

  return {};
}

export function flattenKeys(obj: any, prefix = ""): Record<string, string> {
  const result: Record<string, string> = {};
  if (!obj || typeof obj !== "object") return result;

  for (const [key, value] of Object.entries(obj)) {
    // Ignore Flutter ARB metadata tags like @title or @@locale
    if (key.startsWith("@")) continue;

    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenKeys(value, fullKey));
    } else {
      result[fullKey] = String(value);
    }
  }
  return result;
}

export function setDeep(obj: Record<string, any>, pathStr: string, value: any): void {
  const parts = pathStr.split(".");
  let curr = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (!curr[part] || typeof curr[part] !== "object") {
      curr[part] = {};
    }
    curr = curr[part];
  }
  curr[parts[parts.length - 1]] = value;
}

export function writeTranslationsToFile(locFile: string, translatedMap: Record<string, string>): void {
  const ext = path.extname(locFile).toLowerCase();

  if (ext === ".po") {
    let existing = "";
    if (fs.existsSync(locFile)) {
      try {
        existing = fs.readFileSync(locFile, "utf-8");
      } catch {}
    }
    const updated = serializePo(existing, translatedMap);
    fs.writeFileSync(locFile, updated, "utf-8");
    return;
  }

  let parsed: Record<string, any> = {};
  if (fs.existsSync(locFile)) {
    try {
      parsed = parseFile(locFile);
    } catch {
      parsed = {};
    }
  }

  const hasDotKeys = Object.keys(parsed).some(k => k.includes("."));

  for (const [keyPath, value] of Object.entries(translatedMap)) {
    if (ext === ".properties") {
      parsed[keyPath] = value;
    } else if (hasDotKeys || !keyPath.includes(".")) {
      parsed[keyPath] = value;
    } else {
      setDeep(parsed, keyPath, value);
    }
  }

  if (ext === ".json" || ext === ".jsonc" || ext === ".json5" || ext === ".arb") {
    fs.writeFileSync(locFile, JSON.stringify(parsed, null, 2) + "\n", "utf-8");
  } else if (ext === ".yaml" || ext === ".yml") {
    fs.writeFileSync(locFile, yaml.dump(parsed, { indent: 2, lineWidth: -1 }), "utf-8");
  } else if (ext === ".toml") {
    fs.writeFileSync(locFile, serializeToml(parsed), "utf-8");
  } else if (ext === ".properties") {
    fs.writeFileSync(locFile, serializeProperties(parsed), "utf-8");
  }
}

export function makeProgressBar(pct: string | number): string {
  const num = Number(pct);
  const filled = Math.min(10, Math.max(0, Math.round(num / 10)));
  const empty = 10 - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);
  const color = num >= 95 ? "\x1b[32m" : num >= 70 ? "\x1b[33m" : "\x1b[31m";
  return `${color}${bar}\x1b[0m`;
}

export function findAllLocalesDirs(rootDir: string, requestedDir?: string | null): string[] {
  if (requestedDir) {
    const direct = path.resolve(rootDir, requestedDir);
    if (fs.existsSync(direct)) return [direct];
  }

  const results: string[] = [];

  function scan(dir: string, depth = 0) {
    if (depth > 5) return;
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }

    const files: string[] = [];
    const subdirs: string[] = [];

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (!IGNORE_DIRS.has(entry.name) && !entry.name.startsWith(".")) {
          subdirs.push(entry.name);
        }
      } else if (entry.isFile()) {
        if (!IGNORED_FILES.has(entry.name) && parseLocaleFilename(entry.name) !== null) {
          files.push(entry.name);
        }
      }
    }

    const dirName = path.basename(dir).toLowerCase();
    const isLocaleNamed = ["locales", "i18n", "lang", "locale", "messages", "translations"].includes(dirName);

    if ((isLocaleNamed && files.length >= 1) || (depth > 0 && files.length >= 2)) {
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

export function collectModulesData(
  localesDirs: string[],
  cwd: string,
  requestedBase?: string | null,
  fileSnapshots?: Map<string, FileSnapshot>
): I18nModule[] {
  const modules: I18nModule[] = [];

  for (const dir of localesDirs) {
    const relDir = path.relative(cwd, dir) || dir;
    let allFiles: string[] = [];
    try {
      allFiles = fs.readdirSync(dir).filter(f => parseLocaleFilename(f) !== null);
    } catch {
      continue;
    }
    if (allFiles.length === 0) continue;

    const extCounts: Record<string, number> = {};
    for (const f of allFiles) {
      const parsedInfo = parseLocaleFilename(f);
      if (parsedInfo) {
        const ext = `.${parsedInfo.ext}`;
        extCounts[ext] = (extCounts[ext] || 0) + 1;
      }
    }
    const preferredExt = Object.entries(extCounts).sort((a, b) => b[1] - a[1])[0][0];
    const files = allFiles.filter(f => f.toLowerCase().endsWith(preferredExt));

    let baseLocale = requestedBase;
    let baseFileName = "";

    if (!baseLocale) {
      for (const cand of ["en", "en-US", "en_US", "uk", "uk-UA", "de", "fr", "zh-CN"]) {
        const found = files.find(f => {
          const info = parseLocaleFilename(f);
          return info && info.locale.toLowerCase() === cand.toLowerCase();
        });
        if (found) {
          const info = parseLocaleFilename(found)!;
          baseLocale = info.locale;
          baseFileName = found;
          break;
        }
      }
      if (!baseLocale && files.length > 0) {
        const info = parseLocaleFilename(files[0])!;
        baseLocale = info.locale;
        baseFileName = files[0];
      }
    } else {
      const found = files.find(f => {
        const info = parseLocaleFilename(f);
        return info && info.locale.toLowerCase() === baseLocale!.toLowerCase();
      });
      if (found) {
        baseFileName = found;
      }
    }

    if (!baseLocale || !baseFileName) continue;
    const baseFile = path.join(dir, baseFileName);
    if (!fs.existsSync(baseFile)) continue;

    let baseContent: Record<string, any>;
    try {
      baseContent = parseFile(baseFile);
    } catch (e: any) {
      console.log(`\x1b[31mFailed to parse base locale ${baseFile}: ${e.message}\x1b[0m`);
      continue;
    }

    const baseFlat = flattenKeys(baseContent);
    const baseKeys = Object.keys(baseFlat);
    const total = baseKeys.length;

    if (fileSnapshots) {
      fileSnapshots.set(baseFile, {
        isBase: true,
        locale: baseLocale,
        keys: new Set(baseKeys),
        total,
        dir
      });
    }

    const otherFiles = files.filter(f => f !== baseFileName);
    const locales: ModuleLocale[] = [];

    for (const f of otherFiles) {
      const info = parseLocaleFilename(f);
      if (!info) continue;
      const loc = info.locale;
      const locFile = path.join(dir, f);

      let locContent: Record<string, any>;
      try {
        locContent = parseFile(locFile);
      } catch {
        continue;
      }

      const locFlat = flattenKeys(locContent);
      const locKeys = new Set(Object.keys(locFlat));
      const translated = baseKeys.filter(k => locKeys.has(k)).length;
      const missing = baseKeys.filter(k => !locKeys.has(k));
      const pct = total > 0 ? ((translated / total) * 100).toFixed(1) : "100.0";

      if (fileSnapshots) {
        fileSnapshots.set(locFile, {
          locale: loc,
          keys: locKeys,
          total,
          translated,
          pct,
          preferredExt,
          dir,
          baseKeys
        });
      }

      locales.push({
        loc,
        locFile,
        flag: getFlag(loc),
        name: getLangName(loc),
        translated,
        missing,
        pct
      });
    }

    modules.push({
      dir,
      relDir,
      preferredExt,
      baseLocale,
      baseFlat,
      baseKeys,
      total,
      locales
    });
  }

  return modules;
}

export function getLanguagesWithMissing(modules: I18nModule[], includeAll = false): LangSummary[] {
  const map = new Map<string, LangSummary>();
  for (const mod of modules) {
    for (const item of mod.locales) {
      if (includeAll || item.missing.length > 0) {
        if (!map.has(item.loc)) {
          map.set(item.loc, {
            loc: item.loc,
            flag: item.flag,
            name: item.name,
            totalMissing: 0,
            totalTranslated: 0,
            totalKeys: 0,
            pct: "0.0",
            modules: []
          });
        }
        const entry = map.get(item.loc)!;
        entry.totalMissing += item.missing.length;
        entry.totalTranslated += item.translated;
        entry.totalKeys += mod.total;
        entry.modules.push({
          dir: mod.dir,
          relDir: mod.relDir,
          preferredExt: mod.preferredExt,
          baseLocale: mod.baseLocale,
          baseFlat: mod.baseFlat,
          missing: item.missing,
          translated: item.translated,
          total: mod.total,
          pct: item.pct
        });
      }
    }
  }
  const result = Array.from(map.values());
  for (const entry of result) {
    entry.pct = entry.totalKeys > 0
      ? ((entry.totalTranslated / entry.totalKeys) * 100).toFixed(1)
      : "100.0";
  }
  return result.sort((a, b) => a.totalMissing - b.totalMissing);
}
