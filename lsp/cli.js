#!/usr/bin/env node

// Universal i18n CLI: Clean English Dashboard for All Languages & Frameworks
// Supports: Monorepos, Multi-folder, JSON/YAML/YML, All World Locales, lolcat (🐱), Live Watch Mode

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

// ─────────────────────────────────────────────────────────────────────────────
// Command Line Arguments
// ─────────────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
let isWatch = false;
let targetLocale = "all";
let requestedDir = null;
let requestedBase = null;

for (const arg of args) {
  if (arg === "--watch" || arg === "-w") {
    isWatch = true;
  } else if (!requestedDir && (arg.includes("/") || arg.includes("\\") || fs.existsSync(path.resolve(process.cwd(), arg)))) {
    requestedDir = arg;
  } else if (targetLocale === "all" && !arg.startsWith("-")) {
    targetLocale = arg;
  } else if (!requestedBase && !arg.startsWith("-")) {
    requestedBase = arg;
  }
}

if (args[0] && !args[0].startsWith("-") && !args[0].includes("/") && !args[0].includes("\\")) {
  targetLocale = args[0];
}

const cwd = process.cwd();

// ─────────────────────────────────────────────────────────────────────────────
// Ignore list & Regex
// ─────────────────────────────────────────────────────────────────────────────

const IGNORE_DIRS = new Set([
  "node_modules", ".git", "dist", "build", "target", ".cache",
  ".next", ".nuxt", ".output", "vendor", "out", ".turbo", ".vscode", ".idea"
]);

const IGNORED_FILES = new Set([
  "package.json", "package-lock.json", "pnpm-lock.yaml", "pnpm-workspace.yaml",
  "docker-compose.yaml", "docker-compose.yml", "tsconfig.json", "jsconfig.json",
  "settings.json", "tasks.json", "keymap.json"
]);

const LOCALE_REGEX = /^([a-z]{2,3}([-_][a-zA-Z0-9]{2,4})?|lolcat)\.(json|ya?ml)$/i;

// ─────────────────────────────────────────────────────────────────────────────
// Flags Mapping (All world languages + lolcat)
// ─────────────────────────────────────────────────────────────────────────────

const FLAGS = {
  uk: "🇺🇦", en: "🇬🇧", "en-us": "🇺🇸", "en-gb": "🇬🇧", "en-in": "🇮🇳",
  pl: "🇵🇱", de: "🇩🇪", fr: "🇫🇷", es: "🇪🇸", "es-es": "🇪🇸", "es-419": "🌎",
  it: "🇮🇹", "it-it": "🇮🇹", pt: "🇵🇹", "pt-pt": "🇵🇹", "pt-br": "🇧🇷",
  nl: "🇳🇱", sv: "🇸🇪", da: "🇩🇰", fi: "🇫🇮", nb: "🇳🇴", no: "🇳🇴", nn: "🇳🇴",
  cs: "🇨🇿", sk: "🇸🇰", ro: "🇷🇴", hu: "🇭🇺", bg: "🇧🇬", el: "🇬🇷",
  hr: "🇭🇷", sr: "🇷🇸", sl: "🇸🇮", bs: "🇧🇦", mk: "🇲🇰", sq: "🇦🇱",
  et: "🇪🇪", lv: "🇱🇻", lt: "🇱🇹", ga: "🇮🇪", is: "🇮🇸", mt: "🇲🇹",
  ca: "🇪🇸", eu: "🇪🇸", gl: "🇪🇸", cy: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
  zh: "🇨🇳", "zh-cn": "🇨🇳", "zh-hans": "🇨🇳", "zh-tw": "🇹🇼", "zh-hant": "🇹🇼", "zh-hk": "🇭🇰",
  ja: "🇯🇵", "ja-jp": "🇯🇵", ko: "🇰🇷", "ko-kr": "🇰🇷",
  ar: "🇸🇦", "ar-sa": "🇸🇦", "ar-eg": "🇪🇬", he: "🇮🇱", fa: "🇮🇷", ur: "🇵🇰",
  hi: "🇮🇳", bn: "🇧🇩", ta: "🇮🇳", te: "🇮🇳", mr: "🇮🇳", gu: "🇮🇳", kn: "🇮🇳", ml: "🇮🇳", pa: "🇮🇳", sa: "🇮🇳",
  th: "🇹🇭", vi: "🇻🇳", id: "🇮🇩", ms: "🇲🇾", fil: "🇵🇭", tl: "🇵🇭", my: "🇲🇲", km: "🇰🇭", lo: "🇱🇦",
  tr: "🇹🇷", az: "🇦🇿", ka: "🇬🇪", hy: "🇦🇲", kk: "🇰🇿", kz: "🇰🇿", uz: "🇺🇿", ky: "🇰🇬", tg: "🇹🇯", mn: "🇲🇳",
  sw: "🇰🇪", am: "🇪🇹", yo: "🇳🇬", ig: "🇳🇬", ha: "🇳🇬", zu: "🇿🇦", af: "🇿🇦",
  ru: "🇷🇺", be: "🇧🇾",
  lolcat: "🐱",
};

function getFlag(code) {
  const norm = code.toLowerCase().replace("_", "-");
  if (FLAGS[norm]) return FLAGS[norm];
  const primary = norm.split("-")[0];
  if (FLAGS[primary]) return FLAGS[primary];
  return "🌐";
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

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

function flattenKeys(obj, prefix = "") {
  const result = {};
  if (!obj || typeof obj !== "object") return result;

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

function makeProgressBar(pct) {
  const num = Number(pct);
  const filled = Math.min(10, Math.max(0, Math.round(num / 10)));
  const empty = 10 - filled;
  const bar = "█".repeat(filled) + "░".repeat(empty);
  const color = num >= 95 ? "\x1b[32m" : num >= 70 ? "\x1b[33m" : "\x1b[31m";
  return `${color}${bar}\x1b[0m`;
}

function findAllLocalesDirs(rootDir) {
  if (requestedDir) {
    const direct = path.resolve(rootDir, requestedDir);
    if (fs.existsSync(direct)) return [direct];
  }

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
        if (!IGNORED_FILES.has(entry.name) && LOCALE_REGEX.test(entry.name)) {
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

// ─────────────────────────────────────────────────────────────────────────────
// State Store for Live Watch Mode
// ─────────────────────────────────────────────────────────────────────────────

const fileSnapshots = new Map();

function analyzeDirectory(dir) {
  const relDir = path.relative(cwd, dir) || dir;
  const allFiles = fs.readdirSync(dir).filter(f => LOCALE_REGEX.test(f) && !IGNORED_FILES.has(f));

  if (allFiles.length === 0) return null;

  const extCounts = {};
  for (const f of allFiles) {
    const ext = path.extname(f);
    extCounts[ext] = (extCounts[ext] || 0) + 1;
  }
  const preferredExt = Object.entries(extCounts).sort((a, b) => b[1] - a[1])[0][0];
  const files = allFiles.filter(f => f.endsWith(preferredExt));

  let baseLocale = requestedBase;
  if (!baseLocale) {
    for (const cand of ["en", "en-US", "en_US", "uk", "uk-UA", "de", "fr", "zh-CN"]) {
      if (files.some(f => path.basename(f, preferredExt) === cand)) {
        baseLocale = cand;
        break;
      }
    }
    if (!baseLocale) {
      baseLocale = path.basename(files[0], preferredExt);
    }
  }

  const baseFile = path.join(dir, `${baseLocale}${preferredExt}`);
  if (!fs.existsSync(baseFile)) {
    return null;
  }

  let baseContent;
  try {
    baseContent = parseFile(baseFile);
  } catch (e) {
    console.log(`\x1b[31mFailed to parse base locale ${baseFile}: ${e.message}\x1b[0m`);
    return null;
  }

  const baseKeys = Object.keys(flattenKeys(baseContent));
  const total = baseKeys.length;

  console.log(`📁 Module / Directory: \x1b[1m\x1b[33m${relDir}/\x1b[0m  (format: ${preferredExt})`);
  console.log(`🏠 Base language:     \x1b[32m${baseLocale}\x1b[0m (${total} keys)`);
  console.log(`--------------------------------------------------------------`);

  const otherLocales = files
    .map(f => path.basename(f, preferredExt))
    .filter(l => l !== baseLocale);

  for (const loc of otherLocales) {
    const locFile = path.join(dir, `${loc}${preferredExt}`);
    let locContent;
    try {
      locContent = parseFile(locFile);
    } catch (e) {
      console.log(`  [${loc}] Parse error: ${e.message}`);
      continue;
    }

    const locKeys = new Set(Object.keys(flattenKeys(locContent)));
    const translated = baseKeys.filter(k => locKeys.has(k)).length;
    const missing = baseKeys.filter(k => !locKeys.has(k));
    const pct = total > 0 ? ((translated / total) * 100).toFixed(1) : "100.0";

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

    if (targetLocale !== "all" && loc !== targetLocale) continue;

    const bar = makeProgressBar(pct);
    const flag = getFlag(loc);

    console.log(`  ${flag} [${loc.padEnd(6)}]  ${bar} ${pct.padStart(5)}%  (${translated}/${total} translated, \x1b[31m${missing.length} missing\x1b[0m)`);

    if (targetLocale !== "all" && missing.length > 0) {
      console.log(`\n  \x1b[1m\x1b[31mMissing keys in [${loc}] (${missing.length}):\x1b[0m`);
      missing.slice(0, 30).forEach(k => console.log(`    \x1b[31m✗\x1b[0m ${k}`));
      if (missing.length > 30) {
        console.log(`    ... and ${missing.length - 30} more keys`);
      }
      console.log("");
    }
  }

  console.log("");
  return { dir, total };
}

// ─────────────────────────────────────────────────────────────────────────────
// Initial Report
// ─────────────────────────────────────────────────────────────────────────────

const localesDirs = findAllLocalesDirs(cwd);

if (localesDirs.length === 0) {
  console.error(`\x1b[31m❌ Error: No translation directory found in '${cwd}'\x1b[0m`);
  console.log(`Looked for files like: en.json, en.yaml, uk.json, uk.yaml, lolcat.yaml, etc.`);
  process.exit(1);
}

console.log("\n\x1b[1m\x1b[36m==============================================================\x1b[0m");
console.log("  🌐 i18n Translation Status Report                           ");
console.log("\x1b[1m\x1b[36m==============================================================\x1b[0m");
console.log(`Locales directories found: \x1b[32m${localesDirs.length}\x1b[0m\n`);

for (const dir of localesDirs) {
  analyzeDirectory(dir);
}

// ─────────────────────────────────────────────────────────────────────────────
// Live Watch Mode
// ─────────────────────────────────────────────────────────────────────────────

if (isWatch) {
  console.log(`\x1b[1m\x1b[35m👀 Live Watch Mode active! Watching for translation changes... (Press Ctrl+C to stop)\x1b[0m\n`);

  const debounceTimers = new Map();

  for (const dir of localesDirs) {
    fs.watch(dir, { persistent: true }, (eventType, filename) => {
      if (!filename || !LOCALE_REGEX.test(filename) || IGNORED_FILES.has(filename)) return;

      const filePath = path.join(dir, filename);

      if (debounceTimers.has(filePath)) {
        clearTimeout(debounceTimers.get(filePath));
      }

      debounceTimers.set(filePath, setTimeout(() => {
        debounceTimers.delete(filePath);
        handleFileChange(filePath, dir, filename);
      }, 250));
    });
  }
}

function handleFileChange(filePath, dir, filename) {
  if (!fs.existsSync(filePath)) return;

  const oldSnap = fileSnapshots.get(filePath);
  let newContent;
  try {
    newContent = parseFile(filePath);
  } catch (e) {
    return;
  }

  const newKeys = new Set(Object.keys(flattenKeys(newContent)));
  const now = new Date().toLocaleTimeString();
  const relPath = path.relative(cwd, filePath);

  if (!oldSnap) {
    console.log(`\n\x1b[1m\x1b[32m[${now}] ✨ New file detected: ${relPath}\x1b[0m`);
    analyzeDirectory(dir);
    return;
  }

  const added = [];
  const removed = [];

  for (const k of newKeys) {
    if (!oldSnap.keys.has(k)) added.push(k);
  }
  for (const k of oldSnap.keys) {
    if (!newKeys.has(k)) removed.push(k);
  }

  if (added.length === 0 && removed.length === 0) {
    console.log(`\x1b[90m[${now}] 📝 ${relPath} saved (values updated, total keys unchanged: ${newKeys.size})\x1b[0m`);
    return;
  }

  const baseKeys = oldSnap.baseKeys;
  const total = oldSnap.total;
  const newTranslated = baseKeys.filter(k => newKeys.has(k)).length;
  const newPct = total > 0 ? ((newTranslated / total) * 100).toFixed(1) : "100.0";
  const bar = makeProgressBar(newPct);
  const flag = getFlag(oldSnap.locale);

  console.log(`\n\x1b[1m\x1b[36m🔄 [${now}] ${relPath} updated:\x1b[0m`);

  if (added.length > 0) {
    const preview = added.slice(0, 5).map(k => `'${k}'`).join(", ");
    const extra = added.length > 5 ? ` (+${added.length - 5} more)` : "";
    console.log(`\x1b[32m  ✅ +${added.length} key(s) translated: ${preview}${extra}\x1b[0m`);
  }

  if (removed.length > 0) {
    const preview = removed.slice(0, 5).map(k => `'${k}'`).join(", ");
    const extra = removed.length > 5 ? ` (+${removed.length - 5} more)` : "";
    console.log(`\x1b[31m  ⚠️  -${removed.length} key(s) removed: ${preview}${extra}\x1b[0m`);
  }

  const changeStr = newTranslated > oldSnap.translated
    ? `\x1b[32m(+${newTranslated - oldSnap.translated} key translated!)\x1b[0m`
    : newTranslated < oldSnap.translated
    ? `\x1b[31m(-${oldSnap.translated - newTranslated} key removed)\x1b[0m`
    : "";

  console.log(`  ${flag} [${oldSnap.locale}] ${bar} \x1b[1m${newPct}%\x1b[0m (${newTranslated}/${total} translated) ${changeStr}\n`);

  fileSnapshots.set(filePath, {
    ...oldSnap,
    keys: newKeys,
    translated: newTranslated,
    pct: newPct,
  });
}
