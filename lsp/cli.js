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

const args = process.argv.slice(2);
let isWatch = false;
let isInteractive = false;
let showMissing = false;
let showAll = false;
let asJsonTemplate = false;
let autoTranslate = false;
let saveToFile = false;
let limit = 30;
let targetLocale = "all";
let requestedDir = null;
let requestedBase = null;
let showHelp = false;

for (let i = 0; i < args.length; i++) {
  const arg = args[i];
  if (arg === "--watch" || arg === "-w") {
    isWatch = true;
  } else if (arg === "--interactive" || arg === "-i") {
    isInteractive = true;
  } else if (arg === "--translate" || arg === "-t") {
    autoTranslate = true;
    showMissing = true;
  } else if (arg === "--save" || arg === "-s") {
    saveToFile = true;
  } else if (arg === "--missing" || arg === "-m") {
    showMissing = true;
  } else if (arg === "--all" || arg === "-a" || arg === "--all-keys") {
    showAll = true;
  } else if (arg === "--json" || arg === "--template") {
    asJsonTemplate = true;
    showMissing = true;
  } else if (arg === "--help" || arg === "-h") {
    showHelp = true;
  } else if (arg === "--limit" || arg === "-l") {
    if (args[i + 1] && !args[i + 1].startsWith("-")) {
      limit = parseInt(args[++i], 10) || 30;
    }
  } else if (arg.startsWith("--limit=")) {
    limit = parseInt(arg.split("=")[1], 10) || 30;
  } else if (arg === "--base" || arg === "-b") {
    if (args[i + 1] && !args[i + 1].startsWith("-")) {
      requestedBase = args[++i];
    }
  } else if (arg.startsWith("--base=")) {
    requestedBase = arg.split("=")[1];
  } else if (arg === "--dir" || arg === "-d") {
    if (args[i + 1] && !args[i + 1].startsWith("-")) {
      requestedDir = args[++i];
    }
  } else if (arg.startsWith("--dir=")) {
    requestedDir = arg.split("=")[1];
  } else if (!requestedDir && (arg.includes("/") || arg.includes("\\") || fs.existsSync(path.resolve(process.cwd(), arg)))) {
    requestedDir = arg;
  } else if (!arg.startsWith("-")) {
    if (targetLocale === "all") {
      targetLocale = arg;
      showMissing = true;
    } else if (!requestedBase) {
      requestedBase = arg;
    }
  }
}

if (showHelp) {
  console.log(`
\x1b[1m\x1b[36m==============================================================\x1b[0m
  🌐 \x1b[1mi18n-zed CLI — Universal Translation Manager for Zed\x1b[0m
\x1b[1m\x1b[36m==============================================================\x1b[0m

\x1b[1mUSAGE:\x1b[0m
  node cli.js [locale] [options]

\x1b[1mOPTIONS:\x1b[0m
  \x1b[33m--interactive, -i\x1b[0m    Interactive menu with arrow keys (↑/↓ + Enter, no typing!)
  \x1b[33m--translate, -t\x1b[0m      Auto-translate missing keys with Google Translate (free)
  \x1b[33m--save, -s\x1b[0m           Save auto-translated keys directly into locale file(s)
  \x1b[33m--missing, -m\x1b[0m        Show untranslated keys for all (or specified) languages
  \x1b[33m--all, -a\x1b[0m            Display all missing keys without truncation limit
  \x1b[33m--limit <n>, -l <n>\x1b[0m  Max missing keys to display per language (default: 30)
  \x1b[33m--template, --json\x1b[0m   Export missing keys as a JSON template ready for translation
  \x1b[33m--watch, -w\x1b[0m          Live watch mode (recalculates coverage on save)
  \x1b[33m--dir <path>, -d\x1b[0m     Scan specific locales directory instead of auto-detecting
  \x1b[33m--base <lang>, -b\x1b[0m    Specify base reference language (default: auto-detected / en)
  \x1b[33m--help, -h\x1b[0m           Show this help message

\x1b[1mEXAMPLES:\x1b[0m
  node cli.js                  \x1b[90m# Show translation status for all languages\x1b[0m
  node cli.js -i               \x1b[90m# Interactive menu: navigate with arrow keys ↑/↓\x1b[0m
  node cli.js uk               \x1b[90m# Show missing keys for Ukrainian\x1b[0m
  node cli.js uk --translate   \x1b[90m# Auto-translate missing keys for uk (free preview)\x1b[0m
  node cli.js uk -t -s         \x1b[90m# Auto-translate and save directly into uk locale file\x1b[0m
  node cli.js --watch          \x1b[90m# Auto-update status when translation files are saved\x1b[0m
`);
  process.exit(0);
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

const LANGUAGE_NAMES = {
  uk: "Ukrainian", en: "English", pl: "Polish", de: "German", fr: "French",
  es: "Spanish", it: "Italian", pt: "Portuguese", nl: "Dutch", sv: "Swedish",
  da: "Danish", fi: "Finnish", nb: "Norwegian", no: "Norwegian", nn: "Norwegian",
  cs: "Czech", sk: "Slovak", ro: "Romanian", hu: "Hungarian", bg: "Bulgarian",
  el: "Greek", hr: "Croatian", sr: "Serbian", sl: "Slovenian", zh: "Chinese",
  ja: "Japanese", ko: "Korean", ar: "Arabic", he: "Hebrew", hi: "Hindi",
  bn: "Bengali", th: "Thai", vi: "Vietnamese", id: "Indonesian", ms: "Malay",
  tr: "Turkish", ru: "Russian", be: "Belarusian", lolcat: "LOLCAT",
  "zh-cn": "Chinese (Simplified)", "zh-tw": "Chinese (Traditional)", "zh-hk": "Chinese (Hong Kong)",
  "zh-hans": "Chinese (Simplified)", "zh-hant": "Chinese (Traditional)",
  "pt-br": "Portuguese (Brazil)", "pt-pt": "Portuguese (Portugal)",
  "es-es": "Spanish (Spain)", "es-419": "Spanish (Latin America)",
  "en-us": "English (US)", "en-gb": "English (UK)", "en-in": "English (India)",
  "ar-eg": "Arabic (Egypt)", "ar-sa": "Arabic (Saudi Arabia)",
  "ja-jp": "Japanese", "ko-kr": "Korean", "it-it": "Italian"
};

function getLangName(code) {
  const norm = code.toLowerCase().replace("_", "-");
  if (LANGUAGE_NAMES[norm]) return LANGUAGE_NAMES[norm];
  const primary = norm.split("-")[0];
  if (LANGUAGE_NAMES[primary]) return LANGUAGE_NAMES[primary];
  return code;
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

function collectModulesData(localesDirs) {
  const modules = [];

  for (const dir of localesDirs) {
    const relDir = path.relative(cwd, dir) || dir;
    let allFiles = [];
    try {
      allFiles = fs.readdirSync(dir).filter(f => LOCALE_REGEX.test(f) && !IGNORED_FILES.has(f));
    } catch (e) {
      continue;
    }
    if (allFiles.length === 0) continue;

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
    if (!fs.existsSync(baseFile)) continue;

    let baseContent;
    try {
      baseContent = parseFile(baseFile);
    } catch (e) {
      console.log(`\x1b[31mFailed to parse base locale ${baseFile}: ${e.message}\x1b[0m`);
      continue;
    }

    const baseFlat = flattenKeys(baseContent);
    const baseKeys = Object.keys(baseFlat);
    const total = baseKeys.length;

    fileSnapshots.set(baseFile, {
      isBase: true,
      locale: baseLocale,
      keys: new Set(baseKeys),
      total,
      dir
    });

    const otherLocales = files
      .map(f => path.basename(f, preferredExt))
      .filter(l => l !== baseLocale);

    const locales = [];

    for (const loc of otherLocales) {
      const locFile = path.join(dir, `${loc}${preferredExt}`);
      let locContent;
      try {
        locContent = parseFile(locFile);
      } catch (e) {
        continue;
      }

      const locFlat = flattenKeys(locContent);
      const locKeys = new Set(Object.keys(locFlat));
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

function getLanguagesWithMissing(modules, includeAll = false) {
  const map = new Map();
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
            modules: []
          });
        }
        const entry = map.get(item.loc);
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

function displayMissingForLang(langEntry, showAllKeys = false, jsonExport = false) {
  console.log(`\n\x1b[1m\x1b[36m==============================================================\x1b[0m`);
  console.log(`  ${langEntry.flag} \x1b[1mTranslation Status: [${langEntry.loc}] (${langEntry.name}) — Total Missing: ${langEntry.totalMissing}\x1b[0m`);
  console.log(`\x1b[1m\x1b[36m==============================================================\x1b[0m`);

  if (langEntry.totalMissing === 0) {
    console.log(`\n\x1b[32m🎉 Congratulations! [${langEntry.loc}] is 100% translated across all checked folders.\x1b[0m\n`);
    return;
  }

  for (const mod of langEntry.modules) {
    console.log(`\n📁 \x1b[1m\x1b[33m${mod.relDir}/\x1b[0m (${mod.missing.length} missing, ${mod.translated}/${mod.total} translated - ${mod.pct}%):`);

    if (jsonExport) {
      const template = {};
      const keysToExport = showAllKeys ? mod.missing : mod.missing.slice(0, limit);
      for (const k of keysToExport) {
        template[k] = mod.baseFlat[k] || "";
      }
      console.log(JSON.stringify(template, null, 2));
      if (!showAllKeys && mod.missing.length > limit) {
        console.log(`  \x1b[90m// ... and ${mod.missing.length - limit} more keys. Use 'a' to show all.\x1b[0m`);
      }
    } else {
      const displayed = showAllKeys ? mod.missing : mod.missing.slice(0, limit);
      for (const k of displayed) {
        const rawVal = mod.baseFlat[k];
        let valPreview = "";
        if (rawVal !== undefined && rawVal !== null) {
          const cleanVal = String(rawVal).replace(/\r?\n/g, " ").trim();
          valPreview = cleanVal.length > 50
            ? ` \x1b[90m(${mod.baseLocale}: "${cleanVal.slice(0, 47)}...")\x1b[0m`
            : ` \x1b[90m(${mod.baseLocale}: "${cleanVal}")\x1b[0m`;
        }
        console.log(`    \x1b[31m✗\x1b[0m ${k}${valPreview}`);
      }
      if (!showAllKeys && mod.missing.length > limit) {
        console.log(`    \x1b[90m... and ${mod.missing.length - limit} more keys (enter 'a' to show all)\x1b[0m`);
      }
    }
  }
  console.log("");
}

function toGoogleLangCode(code) {
  const norm = code.toLowerCase().replace("_", "-");
  if (norm === "zh-cn" || norm === "zh-hans") return "zh-CN";
  if (norm === "zh-tw" || norm === "zh-hant" || norm === "zh-hk") return "zh-TW";
  if (norm.startsWith("pt-br")) return "pt";
  if (norm.startsWith("es-")) return "es";
  if (norm.startsWith("en-")) return "en";
  if (norm.startsWith("de-")) return "de";
  if (norm.startsWith("fr-")) return "fr";
  if (norm.startsWith("it-")) return "it";
  if (norm.startsWith("ja-")) return "ja";
  if (norm.startsWith("ko-")) return "ko";
  if (norm === "lolcat") return null;
  return norm.split("-")[0];
}

async function translateBatch(texts, targetLang, sourceLang = "en") {
  if (texts.length === 0) return [];
  const gLang = toGoogleLangCode(targetLang);
  if (!gLang) return texts;

  const results = [];
  const CHUNK_SIZE = 25;

  for (let i = 0; i < texts.length; i += CHUNK_SIZE) {
    const chunk = texts.slice(i, i + CHUNK_SIZE);
    const joined = chunk.join("\n");
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${gLang}&dt=t&q=${encodeURIComponent(joined)}`;

    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = await resp.json();
      const translatedFull = data[0].map(x => x[0]).join("");
      const splitLines = translatedFull.split("\n");

      for (let j = 0; j < chunk.length; j++) {
        results.push(splitLines[j] !== undefined && splitLines[j].trim() !== "" ? splitLines[j].trim() : chunk[j]);
      }
    } catch (e) {
      for (const text of chunk) {
        results.push(text);
      }
    }

    if (i + CHUNK_SIZE < texts.length) {
      await new Promise(r => setTimeout(r, 200));
    }
  }

  return results;
}

function setDeep(obj, pathStr, value) {
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

function writeTranslationsToFile(locFile, translatedMap) {
  const ext = path.extname(locFile);
  let parsed = {};
  if (fs.existsSync(locFile)) {
    try {
      parsed = parseFile(locFile);
    } catch (e) {
      parsed = {};
    }
  }

  const hasDotKeys = Object.keys(parsed).some(k => k.includes("."));

  for (const [keyPath, value] of Object.entries(translatedMap)) {
    if (hasDotKeys || !keyPath.includes(".")) {
      parsed[keyPath] = value;
    } else {
      setDeep(parsed, keyPath, value);
    }
  }

  if (ext === ".json") {
    fs.writeFileSync(locFile, JSON.stringify(parsed, null, 2) + "\n", "utf-8");
  } else if (ext === ".yaml" || ext === ".yml") {
    if (!yaml) yaml = require("js-yaml");
    fs.writeFileSync(locFile, yaml.dump(parsed, { indent: 2, lineWidth: -1 }), "utf-8");
  }
}

async function autoTranslateLanguage(langEntry, saveToFiles = false) {
  console.log(`\n\x1b[1m\x1b[36m==============================================================\x1b[0m`);
  console.log(`  🤖 \x1b[1mAuto-Translating missing keys for ${langEntry.flag} [${langEntry.loc}] (${langEntry.name})\x1b[0m`);
  console.log(`\x1b[1m\x1b[36m==============================================================\x1b[0m\n`);

  let totalTranslatedCount = 0;

  for (const mod of langEntry.modules) {
    if (mod.missing.length === 0) continue;

    console.log(`📁 Module: \x1b[33m${mod.relDir}/\x1b[0m — Translating ${mod.missing.length} keys from '${mod.baseLocale}' to '${langEntry.loc}'...`);
    const sourceTexts = mod.missing.map(k => mod.baseFlat[k] || k);
    const translatedTexts = await translateBatch(sourceTexts, langEntry.loc, mod.baseLocale);

    const translatedMap = {};
    for (let i = 0; i < mod.missing.length; i++) {
      const key = mod.missing[i];
      const translated = translatedTexts[i];
      translatedMap[key] = translated;
      const preview = String(translated).replace(/\r?\n/g, " ");
      console.log(`  \x1b[32m✅\x1b[0m \x1b[1m${key}\x1b[0m → \x1b[36m"${preview}"\x1b[0m`);
    }

    if (saveToFiles) {
      const targetDir = mod.dir || path.join(cwd, mod.relDir);
      const targetFilePath = path.join(targetDir, `${langEntry.loc}${mod.preferredExt}`);
      writeTranslationsToFile(targetFilePath, translatedMap);
      console.log(`  \x1b[1m\x1b[32m💾 Saved ${mod.missing.length} translated keys to ${targetFilePath}\x1b[0m\n`);
    }

    totalTranslatedCount += mod.missing.length;
  }

  if (saveToFiles) {
    console.log(`\x1b[1m\x1b[32m🎉 Successfully auto-translated and saved ${totalTranslatedCount} keys for [${langEntry.loc}]!\x1b[0m\n`);
  } else {
    console.log(`\x1b[1m\x1b[33mℹ️  Preview complete (${totalTranslatedCount} keys). Select 'Save to file' in the menu to persist.\x1b[0m\n`);
  }
}

function selectMenu(title, options, initialIndex = 0, clearOnSelect = true) {
  return new Promise((resolve) => {
    if (!process.stdin.isTTY) {
      resolve(options[0] ? options[0].value : null);
      return;
    }

    let selectedIndex = initialIndex;
    const readline = require("readline");
    readline.emitKeypressEvents(process.stdin);
    try {
      process.stdin.setRawMode(true);
    } catch (e) {}
    process.stdout.write("\x1b[?25l"); // Hide cursor

    const PAGE_SIZE = 12;
    let printedLinesCount = 0;

    function render(firstTime = false) {
      if (!firstTime && printedLinesCount > 0) {
        process.stdout.write(`\x1b[${printedLinesCount}A\r\x1b[0J`);
      }

      let output = "";
      output += `\x1b[1m\x1b[36m${title}\x1b[0m\n`;
      output += `\x1b[90m(Use ↑ / ↓ arrow keys to move, Enter to select, 'q' / Esc to exit)\x1b[0m\n\n`;

      let startIdx = Math.max(0, selectedIndex - Math.floor(PAGE_SIZE / 2));
      let endIdx = Math.min(options.length, startIdx + PAGE_SIZE);
      if (endIdx - startIdx < PAGE_SIZE) {
        startIdx = Math.max(0, endIdx - PAGE_SIZE);
      }

      if (startIdx > 0) {
        output += `  \x1b[90m▲ ... and ${startIdx} more above\x1b[0m\n`;
      }

      for (let i = startIdx; i < endIdx; i++) {
        const opt = options[i];
        if (i === selectedIndex) {
          output += `  \x1b[36m❯ \x1b[1m${opt.label}\x1b[0m\n`;
        } else {
          output += `    ${opt.label}\x1b[0m\n`;
        }
      }

      if (endIdx < options.length) {
        output += `  \x1b[90m▼ ... and ${options.length - endIdx} more below\x1b[0m\n`;
      }

      process.stdout.write(output);
      printedLinesCount = output.split("\n").length - 1;
    }

    render(true);

    function onKeypress(str, key) {
      if (!key) return;

      if (key.ctrl && key.name === "c") {
        cleanup();
        process.exit(0);
      }

      if (key.name === "q" || key.name === "escape") {
        cleanup();
        resolve(null);
        return;
      }

      if (key.name === "up") {
        selectedIndex = (selectedIndex - 1 + options.length) % options.length;
        render(false);
      } else if (key.name === "down") {
        selectedIndex = (selectedIndex + 1) % options.length;
        render(false);
      } else if (key.name === "return" || key.name === "enter" || key.name === "space") {
        cleanup();
        resolve(options[selectedIndex] ? options[selectedIndex].value : null);
      }
    }

    function cleanup() {
      process.stdin.removeListener("keypress", onKeypress);
      try {
        process.stdin.setRawMode(false);
      } catch (e) {}
      if (clearOnSelect && printedLinesCount > 0) {
        process.stdout.write(`\x1b[${printedLinesCount}A\r\x1b[0J`);
      }
      process.stdout.write("\x1b[?25h"); // Show cursor
    }

    process.stdin.on("keypress", onKeypress);
  });
}

function exportMissingKeysToFile(langEntry) {
  console.log(`\n\x1b[1m\x1b[36m==============================================================\x1b[0m`);
  console.log(`  💾 Exporting JSON Template: ${langEntry.flag} [${langEntry.loc}] (${langEntry.name})`);
  console.log(`\x1b[1m\x1b[36m==============================================================\x1b[0m`);

  for (const mod of langEntry.modules) {
    const template = {};
    for (const k of mod.missing) {
      template[k] = mod.baseFlat[k] || "";
    }

    const fileName = `missing-${langEntry.loc}.json`;
    const targetPath = path.join(mod.dir, fileName);
    const relPath = path.relative(cwd, targetPath) || fileName;

    try {
      fs.writeFileSync(targetPath, JSON.stringify(template, null, 2) + "\n", "utf8");
      console.log(`\n\x1b[32m✅ Successfully exported ${mod.missing.length} missing key(s)!\x1b[0m`);
      console.log(`   📄 File path: \x1b[1m\x1b[33m${targetPath}\x1b[0m`);
      console.log(`   📁 Relative:  \x1b[1m\x1b[36m${relPath}\x1b[0m\n`);
    } catch (err) {
      console.error(`\x1b[31m❌ Failed to export to ${targetPath}: ${err.message}\x1b[0m\n`);
    }
  }
}

async function promptFolderSelection(allModules, selectedModule) {
  const options = [
    {
      label: `📂 [All Folders] — Combined view of all ${allModules.length} locales folders`,
      value: null
    },
    ...allModules.map(m => ({
      label: `📁 ${m.relDir}/ (${m.locales.length} languages, format: ${m.preferredExt}, base: ${m.baseLocale})`,
      value: m
    })),
    {
      label: `🔙 Cancel`,
      value: "CANCEL"
    }
  ];

  const chosen = await selectMenu("📂 Select Locales Folder to Inspect:", options);
  if (chosen === "CANCEL") return selectedModule;
  return chosen;
}

async function runInteractivePicker(allModules, initialLangList, preselected = null) {
  let selectedModule = null; // null = All Folders
  let currentLang = preselected;
  let showCompleted = false;

  while (true) {
    if (process.stdout.isTTY) {
      process.stdout.write("\x1b[2J\x1b[0;0H");
    }
    const activeModules = selectedModule ? [selectedModule] : allModules;
    const currentLangList = getLanguagesWithMissing(activeModules, showCompleted);

    if (!currentLang) {
      if (currentLangList.length === 0) {
        const folderName = selectedModule ? `folder '${selectedModule.relDir}/'` : "this project";
        console.log(`\n\x1b[1m\x1b[32m🎉 All languages in ${folderName} are 100% translated! No missing keys found.\x1b[0m\n`);
        const options = [];
        if (!showCompleted) {
          options.push({ label: `👁️  Show all languages (including 100% translated)`, value: "toggle_completed" });
        }
        if (allModules.length > 1) {
          options.push({ label: `📂 Switch to another folder / All folders`, value: "switch_folder" });
        }
        options.push({ label: `❌ Exit`, value: "exit" });

        const switchOption = await selectMenu("Options:", options);
        if (switchOption === "toggle_completed") {
          showCompleted = true;
          continue;
        }
        if (switchOption === "switch_folder") {
          selectedModule = await promptFolderSelection(allModules, selectedModule);
          continue;
        }
        break;
      }

      const langOptions = [];

      // If multiple folders exist, show folder switcher at the top
      if (allModules.length > 1) {
        const folderLabel = selectedModule
          ? `📁 ${selectedModule.relDir}/`
          : `📂 All Folders (${allModules.length})`;
        langOptions.push({
          label: `🔄 Switch Locales Folder [Active: ${folderLabel}]`,
          value: "switch_folder"
        });
      }

      langOptions.push({
        label: `👁️  Filter: [${showCompleted ? "Showing ALL Languages" : "Showing Missing Only"}] (press Enter to toggle)`,
        value: "toggle_completed"
      });

      langOptions.push(
        ...currentLangList.map((item) => {
          const bar = makeProgressBar(item.pct);
          const count = item.totalMissing > 0
            ? `\x1b[31m${item.totalMissing} missing\x1b[0m`
            : `\x1b[32m100% complete\x1b[0m`;
          const locStr = `${item.flag} [${item.loc.padEnd(6)}]`;
          return {
            label: `${locStr}  ${bar} ${item.pct.padStart(5)}%  (${item.totalTranslated}/${item.totalKeys})  ${count}`,
            value: item
          };
        })
      );

      langOptions.push({
        label: `🌐 [All Languages] — View untranslated keys report for all languages`,
        value: "all"
      });
      langOptions.push({
        label: `❌ [Exit]`,
        value: "exit"
      });

      const menuTitle = selectedModule
        ? `🌐 Translation Dashboard [Folder: ${selectedModule.relDir}/]:`
        : `🌐 Translation Dashboard [All Folders (${allModules.length})]:`;

      const selected = await selectMenu(menuTitle, langOptions);
      if (!selected || selected === "exit") {
        console.log("👋 Done.");
        break;
      }

      if (selected === "switch_folder") {
        selectedModule = await promptFolderSelection(allModules, selectedModule);
        continue;
      }

      if (selected === "toggle_completed") {
        showCompleted = !showCompleted;
        continue;
      }

      if (selected === "all") {
        for (const item of currentLangList) {
          displayMissingForLang(item, showAll, asJsonTemplate);
        }
        continue;
      }

      currentLang = selected;
    }

    displayMissingForLang(currentLang, false, false);

    let actionOptions;
    if (currentLang.totalMissing === 0) {
      actionOptions = [
        {
          label: `🎉 Language is 100% translated (${currentLang.totalKeys}/${currentLang.totalKeys} keys)`,
          value: "none"
        }
      ];
    } else {
      actionOptions = [
        {
          label: `🤖 Auto-translate missing keys with Google Translate (preview)`,
          value: "translate_preview"
        },
        {
          label: `✍️  Auto-translate and save directly into locale file(s)`,
          value: "translate_save"
        },
        {
          label: `💾 Export missing keys to file (missing-${currentLang.loc}.json)`,
          value: "export_json"
        },
        {
          label: `📋 Show all ${currentLang.totalMissing} missing keys without limit`,
          value: "show_all"
        }
      ];
    }

    if (allModules.length > 1) {
      const folderShort = selectedModule ? `${selectedModule.relDir}/` : "All Folders";
      actionOptions.push({
        label: `🔄 Switch Locales Folder (currently: ${folderShort})`,
        value: "switch_folder_in_lang"
      });
    }

    actionOptions.push(
      {
        label: `🔙 Back to language list`,
        value: "back"
      },
      {
        label: `❌ Exit`,
        value: "exit"
      }
    );

    const action = await selectMenu(`Actions for ${currentLang.flag} [${currentLang.loc}] (${currentLang.name}):`, actionOptions);

    if (!action || action === "exit") {
      console.log("👋 Done.");
      break;
    }

    if (action === "switch_folder_in_lang") {
      selectedModule = await promptFolderSelection(allModules, selectedModule);
      const newActiveMods = selectedModule ? [selectedModule] : allModules;
      const newLangList = getLanguagesWithMissing(newActiveMods);
      const matched = newLangList.find(l => l.loc.toLowerCase() === currentLang.loc.toLowerCase());
      if (matched) {
        currentLang = matched;
      } else {
        console.log(`\n\x1b[32m✨ [${currentLang.loc}] is 100% translated in the selected folder!\x1b[0m\n`);
        currentLang = null;
      }
      continue;
    }

    if (action === "back") {
      currentLang = null;
      continue;
    }

    if (action === "show_all") {
      displayMissingForLang(currentLang, true, false);
      continue;
    }

    if (action === "export_json") {
      exportMissingKeysToFile(currentLang);
      continue;
    }

    if (action === "translate_preview") {
      await autoTranslateLanguage(currentLang, false);

      const confirmSave = await selectMenu("Would you like to save these translations?", [
        { label: `✍️  Yes, save to locale file(s)`, value: "yes" },
        { label: `🔙 Return to menu`, value: "no" }
      ]);
      if (confirmSave === "yes") {
        await autoTranslateLanguage(currentLang, true);
      }
      continue;
    }

    if (action === "translate_save") {
      await autoTranslateLanguage(currentLang, true);
      continue;
    }
  }
}

function renderOverview(modules) {
  for (const mod of modules) {
    console.log(`📁 Module / Directory: \x1b[1m\x1b[33m${mod.relDir}/\x1b[0m  (format: ${mod.preferredExt})`);
    console.log(`🏠 Base language:     \x1b[32m${mod.baseLocale}\x1b[0m (${mod.total} keys)`);
    console.log(`--------------------------------------------------------------`);

    for (const item of mod.locales) {
      const bar = makeProgressBar(item.pct);
      console.log(`  ${item.flag} [${item.loc.padEnd(6)}]  ${bar} ${item.pct.padStart(5)}%  (${item.translated}/${mod.total} translated, \x1b[31m${item.missing.length} missing\x1b[0m)`);
    }
    console.log("");
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Entry Point
// ─────────────────────────────────────────────────────────────────────────────

async function main() {
  const localesDirs = findAllLocalesDirs(cwd);

  if (localesDirs.length === 0) {
    console.error(`\x1b[31m❌ Error: No translation directory found in '${cwd}'\x1b[0m`);
    console.log(`Looked for files like: en.json, en.yaml, uk.json, uk.yaml, lolcat.yaml, etc.`);
    process.exit(1);
  }

  const modules = collectModulesData(localesDirs);
  const langList = getLanguagesWithMissing(modules);

  if (!isNaN(parseInt(targetLocale, 10)) && langList.length > 0) {
    const num = parseInt(targetLocale, 10);
    if (num >= 1 && num <= langList.length) {
      targetLocale = langList[num - 1].loc;
    }
  }

  // Live watch mode: start cleanly without cluttering the screen
  if (isWatch) {
    startWatchMode(localesDirs, modules);
    return;
  }

  // Interactive dashboard mode: if requested or launched in an interactive terminal without batch flags
  if (isInteractive || (process.stdin.isTTY && targetLocale === "all" && !showMissing && !asJsonTemplate)) {
    await runInteractivePicker(modules, langList);
    return;
  }

  // If a specific language is targeted
  if (targetLocale !== "all") {
    const targetEntry = langList.find(l => l.loc.toLowerCase() === targetLocale.toLowerCase());
    if (targetEntry) {
      if (autoTranslate) {
        await autoTranslateLanguage(targetEntry, saveToFile);
      } else if (asJsonTemplate && saveToFile) {
        exportMissingKeysToFile(targetEntry);
      } else {
        displayMissingForLang(targetEntry, showAll, asJsonTemplate);
      }
      return;
    }

    let foundInModules = false;
    for (const mod of modules) {
      const locItem = mod.locales.find(l => l.loc.toLowerCase() === targetLocale.toLowerCase());
      if (locItem) {
        foundInModules = true;
        console.log(`📁 Module: \x1b[1m${mod.relDir}/\x1b[0m`);
        console.log(`  ${locItem.flag} [${locItem.loc}] (${locItem.name}): \x1b[32m100% translated (${locItem.translated}/${mod.total})\x1b[0m. No missing keys!\n`);
      }
    }

    if (!foundInModules) {
      console.log(`\x1b[33m⚠️  Locale '${targetLocale}' not found in this project.\x1b[0m`);
      const allLocs = new Set();
      modules.forEach(m => m.locales.forEach(l => allLocs.add(l.loc)));
      console.log(`Available locales: ${Array.from(allLocs).join(", ") || "none"}\n`);
    }
    return;
  }

  // If --missing was passed without a target locale
  if (showMissing) {
    if (langList.length === 0) {
      console.log(`\n\x1b[1m\x1b[32m🎉 All languages in this project are 100% translated! No missing keys found.\x1b[0m\n`);
      return;
    }
    for (const item of langList) {
      displayMissingForLang(item, showAll, asJsonTemplate);
    }
    return;
  }

  // Standard static overview report (for non-interactive piping / CI)
  console.log("\n\x1b[1m\x1b[36m==============================================================\x1b[0m");
  console.log("  🌐 i18n Translation Status Report                           ");
  console.log("\x1b[1m\x1b[36m==============================================================\x1b[0m");
  console.log(`Locales directories found: \x1b[32m${modules.length}\x1b[0m\n`);

  renderOverview(modules);

  if (langList.length > 0) {
    console.log(`\x1b[90m──────────────────────────────────────────────────────────────\x1b[0m`);
    console.log(`🔍 \x1b[1mLanguages with untranslated keys in this workspace:\x1b[0m\n`);

    langList.forEach((item, idx) => {
      const num = `[${idx + 1}]`.padStart(4);
      const locStr = `${item.flag} ${item.loc.padEnd(7)} (${item.name})`;
      const countStr = `\x1b[31m${item.totalMissing} missing\x1b[0m`;
      console.log(`  \x1b[33m${num}\x1b[0m  ${locStr.padEnd(38)} ${countStr}`);
    });

    console.log(`\n💡 \x1b[1mHow to inspect untranslated keys:\x1b[0m`);
    console.log(`   • In Zed: Open Command Palette (Ctrl+Shift+P) → task: spawn → i18n: Inspect Missing Keys 🔍`);
    console.log(`   • Arrow Menu: node E:/github/zed-i18n/lsp/cli.js -i (navigate with ↑/↓ + Enter)`);
    console.log(`   • Auto-Translate: node E:/github/zed-i18n/lsp/cli.js uk -t (free Google Translate)`);
    console.log(`\x1b[90m──────────────────────────────────────────────────────────────\x1b[0m\n`);
  }
}

main().catch(err => {
  console.error(`\x1b[31mError: ${err.message}\x1b[0m`);
  process.exit(1);
});

// ─────────────────────────────────────────────────────────────────────────────
// Live Watch Mode
// ─────────────────────────────────────────────────────────────────────────────

async function promptWatchFolderSelection(modules, currentSelected) {
  const options = [
    {
      label: `📂 [All Folders] — Watch all ${modules.length} locales folders simultaneously`,
      value: null
    },
    ...modules.map(m => ({
      label: `📁 ${m.relDir}/ (${m.locales.length} languages, format: ${m.preferredExt}, base: ${m.baseLocale})`,
      value: m
    }))
  ];

  const initialIndex = currentSelected ? modules.indexOf(currentSelected) + 1 : 0;
  const chosen = await selectMenu("📂 Select Locales Folder to Watch:", options, Math.max(0, initialIndex));
  return chosen;
}

let activeWatchers = [];
let watchDebounceTimers = new Map();
let currentWatchKeyHandler = null;

async function startWatchMode(localesDirs, modules) {
  let selectedModule = null; // null = all

  if (modules.length > 1 && process.stdin.isTTY && !requestedDir) {
    const chosen = await promptWatchFolderSelection(modules, selectedModule);
    selectedModule = chosen;
  }

  setupWatchLoop(modules, selectedModule);
}

function setupWatchLoop(modules, selectedModule) {
  for (const w of activeWatchers) {
    try { w.close(); } catch (e) {}
  }
  activeWatchers = [];
  watchDebounceTimers.clear();

  if (currentWatchKeyHandler) {
    process.stdin.removeListener("keypress", currentWatchKeyHandler);
    currentWatchKeyHandler = null;
  }

  const targetDirs = selectedModule ? [selectedModule.dir] : modules.map(m => m.dir);

  if (process.stdout.isTTY) {
    process.stdout.write("\x1b[2J\x1b[0;0H");
  }

  console.log("\x1b[1m\x1b[35m==============================================================\x1b[0m");
  console.log("  👀 \x1b[1mi18n Live Watch Mode — Active\x1b[0m");
  console.log("\x1b[1m\x1b[35m==============================================================\x1b[0m");

  const targetModules = selectedModule ? [selectedModule] : modules;

  console.log(`\n\x1b[1m\x1b[36m📊 Current Translation Status — \x1b[33m${selectedModule ? selectedModule.relDir + '/' : 'All Folders (' + modules.length + ')'}\x1b[0m\n`);
  renderOverview(targetModules);

  console.log(`\x1b[90m──────────────────────────────────────────────────────────────\x1b[0m`);
  console.log(`\x1b[90m💡 Live Watch Mode active! Edit and save any locale file to see live diffs.\x1b[0m`);
  if (modules.length > 1 && process.stdin.isTTY) {
    console.log(`\x1b[36m👉 Press [s] or [Enter] to switch watched folder | [q] or Ctrl+C to exit\x1b[0m\n`);
  } else {
    console.log(`\x1b[90m(Press Ctrl+C to stop watching)\x1b[0m\n`);
  }

  for (const dir of targetDirs) {
    try {
      const watcher = fs.watch(dir, { persistent: true }, (eventType, filename) => {
        if (!filename || !LOCALE_REGEX.test(filename) || IGNORED_FILES.has(filename)) return;

        const filePath = path.join(dir, filename);

        if (watchDebounceTimers.has(filePath)) {
          clearTimeout(watchDebounceTimers.get(filePath));
        }

        watchDebounceTimers.set(filePath, setTimeout(() => {
          watchDebounceTimers.delete(filePath);
          handleFileChange(filePath, dir, filename);
        }, 250));
      });
      activeWatchers.push(watcher);
    } catch (e) {
      console.log(`\x1b[31mFailed to watch ${dir}: ${e.message}\x1b[0m`);
    }
  }

  if (modules.length > 1 && process.stdin.isTTY) {
    const readline = require("readline");
    readline.emitKeypressEvents(process.stdin);
    try { process.stdin.setRawMode(true); } catch (e) {}

    currentWatchKeyHandler = function (str, key) {
      if (!key) return;
      if ((key.ctrl && key.name === "c") || key.name === "q" || key.name === "escape") {
        for (const w of activeWatchers) {
          try { w.close(); } catch (e) {}
        }
        process.stdin.removeListener("keypress", currentWatchKeyHandler);
        try { process.stdin.setRawMode(false); } catch (e) {}
        console.log("\n👋 Watch Mode stopped.");
        process.exit(0);
      }

      if (key.name === "s" || key.name === "m" || key.name === "return" || key.name === "enter") {
        process.stdin.removeListener("keypress", currentWatchKeyHandler);
        currentWatchKeyHandler = null;
        try { process.stdin.setRawMode(false); } catch (e) {}

        if (process.stdout.isTTY) {
          process.stdout.write("\x1b[2J\x1b[0;0H");
        }

        promptWatchFolderSelection(modules, selectedModule).then(newChosen => {
          setupWatchLoop(modules, newChosen);
        });
      }
    };

    process.stdin.on("keypress", currentWatchKeyHandler);
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

  const newFlat = flattenKeys(newContent);
  const newKeys = new Set(Object.keys(newFlat));
  const now = new Date().toLocaleTimeString();
  const relPath = path.relative(cwd, filePath);

  if (!oldSnap) {
    console.log(`\n\x1b[1m\x1b[32m[${now}] ✨ New file detected or reloaded: ${relPath}\x1b[0m`);
    const updated = collectModulesData([dir]);
    renderOverview(updated);
    return;
  }

  if (oldSnap.isBase) {
    console.log(`\n\x1b[1m\x1b[36m🏠 [${now}] Base locale updated: ${relPath}\x1b[0m (Total keys: ${newKeys.size})`);
    const updated = collectModulesData([dir]);
    renderOverview(updated);
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
