# 🌐 i18n-zed — Universal i18n Ally for Zed Editor

> **⚠️ Alpha Release (v0.1.0-alpha)**: This extension is currently in early alpha preview. Features and interfaces are actively evolving. Feedback, bug reports, and contributions are warmly welcomed!

A universal internationalization (i18n) management extension for [Zed Editor](https://zed.dev) — inspired by *i18n Ally* for VS Code.

Manage translations seamlessly across any framework (React, Vue, Svelte, Next.js, Nuxt, Laravel, Django, Electron, Tauri) and file formats (`.json`, `.yaml`, `.yml`) with instant coverage dashboards, multi-folder monorepo auto-detection, and real-time live watch mode.

---

## 🎬 Live Demo & How It Works

![Live Watch Mode in Action](public/3-preview.gif)

### How It Works:

#### 1. Launch from Zed Tasks
Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS), type `task: spawn`, and choose your i18n action:

![Zed Task Selector](public/2-preview.png)

- **`i18n: Translation Status (All Languages)`**: Instantly scans your project and prints a full translation coverage report.
- **`i18n: LIVE Watch Mode (Auto-update on save) 👀`**: Keeps a live watcher active in your terminal. As you add or edit translations, it dynamically shows what changed in real time!

#### 2. Instant Translation Status Report
The dashboard automatically discovers translation folders (monorepos supported!), parses all `.json` and `.yaml` files, calculates completion percentages, and displays ASCII progress bars:

![Translation Status Output](public/1-preview.png)

#### 3. Real-Time Feedback as You Code
Whenever you add or translate a key in any locale file, Live Watch Mode immediately detects the change and logs:
```text
🔄 [11:15:22] locales/uk.yaml updated:
  ✅ +1 key(s) translated: 'settings.notifications'
  📊 uk: ████████░░ 82.4% (1756/2133 translated) (+1 key translated!)
```

---

## ✨ Key Features

- 🌐 **Universal File Formats**: Full support for both **JSON** (`.json`) and **YAML** (`.yaml`, `.yml`).
- 📦 **Monorepo & Multi-Folder Detection**: Recursively discovers all locale folders across complex monorepos without manual path configuration (e.g. `src/locales`, `locales`, `public/locales`, `resources/lang`, `apps/*/locales`).
- 📊 **Visual Coverage Dashboard**: Clean, ASCII progress bars, translation completion percentages, and missing key counts for every module.
- 🌍 **All World Languages + Special Locales**: Built-in flag support for 60+ languages and regional dialects (`zh-CN`, `pt-BR`, `es-419`, `ar-EG`, `en-US`), as well as gaming locales like `lolcat` (`🐱`).
- ⚡ **Live Watch Mode**: Automatically recalculates coverage whenever you save a translation file, showing exact diffs (`+1 key translated`).
- 🔍 **LSP Diagnostics & Hover**: Highlights missing translation keys directly inside source code (`t()`, `$t()`, `__()`, `trans()`) and shows translations across all languages on hover.
- 🛠️ **Seamless Zed Tasks Integration**: Run dashboards directly from the Zed Command Palette (`Ctrl+Shift+P` → `task: spawn`).

---

## 🚀 Getting Started (Installation)

### Prerequisites
- [Zed Editor](https://zed.dev) (v0.170.0 or later recommended)
- [Node.js](https://nodejs.org) (v18+ recommended)
- [Rust](https://rustup.rs) with `wasm32-wasip2` target:
  ```bash
  rustup target add wasm32-wasip2
  ```

### 1. Clone the Repository
```bash
git clone https://github.com/BANSAFAn/i18n-zed.git
cd i18n-zed
```

### 2. Install Dependencies & Build Extension
```bash
# Install Node dependencies
cd lsp && npm install && cd ..

# Compile the WASM extension
cargo build --target wasm32-wasip2 --release
cp target/wasm32-wasip2/release/zed_i18n.wasm extension.wasm
```

### 3. Install as Dev Extension in Zed
1. Open Zed.
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS) to open the Command Palette.
3. Type and select: `zed: install dev extension`.
4. Select the cloned `i18n-zed` folder.
5. The extension is now active!

---

## ⚙️ Configuration

### Global Tasks (`tasks.json`)
To access i18n commands from any project via `task: spawn`, add the following to your Zed global tasks:

- **Windows**: `%APPDATA%\Zed\tasks.json`
- **macOS/Linux**: `~/.config/zed/tasks.json`

```json
[
  {
    "label": "i18n: Translation Status (All Languages)",
    "command": "node",
    "args": ["<PATH_TO_I18N_ZED>/lsp/cli.js"],
    "use_new_terminal": false,
    "allow_concurrent_runs": false
  },
  {
    "label": "i18n: LIVE Watch Mode (Auto-update on save) 👀",
    "command": "node",
    "args": ["<PATH_TO_I18N_ZED>/lsp/cli.js", "--watch"],
    "use_new_terminal": false,
    "allow_concurrent_runs": false
  }
]
```
*(Replace `<PATH_TO_I18N_ZED>` with your local repository path, e.g. `E:/github/i18n-zed`).*

### Language Server Settings (`settings.json`)
You can configure language server behaviors and custom translation function names in your Zed settings (`Ctrl+Shift+P` → `zed: open settings`):

```jsonc
{
  "languages": {
    "JavaScript": { "language_servers": ["i18n-lsp", "..."] },
    "TypeScript": { "language_servers": ["i18n-lsp", "..."] },
    "TSX": { "language_servers": ["i18n-lsp", "..."] },
    "Vue": { "language_servers": ["i18n-lsp", "..."] },
    "PHP": { "language_servers": ["i18n-lsp", "..."] }
  },
  "lsp": {
    "i18n-lsp": {
      "settings": {
        // Optional: override if your path is non-standard
        "localesPath": "src/locales",
        "baseLocale": "en",
        // Functions to scan for translation keys
        "translationFunctions": ["t", "$t", "__", "trans"],
        "missingKeySeverity": "warning"
      }
    }
  }
}
```

---

## 📖 Usage

### Option 1: Zed Tasks (Recommended)
1. Press `Ctrl+Shift+P` → `task: spawn`.
2. Select **`i18n: Translation Status (All Languages)`**.
3. View the report in the bottom terminal panel!

### Option 2: Live Watch Mode
Keep your translations up-to-date while you code:
1. Press `Ctrl+Shift+P` → `task: spawn`.
2. Select **`i18n: LIVE Watch Mode (Auto-update on save) 👀`**.
3. Whenever you add or edit a key in any translation file, you will immediately see live updates and progress bar recalculations.

### Option 3: Terminal CLI
You can also run the CLI tool directly from your project's terminal:
```bash
# Analyze all languages across all modules
node <PATH_TO_I18N_ZED>/lsp/cli.js

# Check a specific language with all missing keys listed
node <PATH_TO_I18N_ZED>/lsp/cli.js uk
node <PATH_TO_I18N_ZED>/lsp/cli.js lolcat

# Run in watch mode
node <PATH_TO_I18N_ZED>/lsp/cli.js --watch
```

---

## 🗺️ Roadmap

- [x] Multi-framework JSON support
- [x] Multi-module & monorepo automatic directory discovery
- [x] YAML (`.yaml`, `.yml`) parsing & coverage calculation
- [x] Full world languages & dialects support + `lolcat` (`🐱`)
- [x] Live Watch Mode with instant diff detection
- [x] Missing key diagnostics in source files via LSP
- [ ] Gettext PO (`.po`) file format support
- [ ] TOML (`.toml`) file format support
- [ ] In-editor inline ghost text showing translated preview next to keys
- [ ] Quick-fix Code Actions to add missing keys directly from editor
