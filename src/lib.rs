// zed-i18n: Universal i18n management extension for Zed Editor
//
// Provides:
// 1. Slash command `/i18n-status` — Markdown dashboard with translation coverage
// 2. LSP server bootstrap — diagnostics for missing translation keys
//
// Architecture:
// - Slash command reads locale files via worktree.read_text_file() and generates report
// - Node.js LSP server provides real-time diagnostics in source files

use zed_extension_api::{self as zed, serde_json};

/// Bundled LSP server script so the extension works in ANY project
const SERVER_SCRIPT: &str = include_str!("../lsp/dist/server.js");

/// Main extension struct
struct I18nExtension;

// ─────────────────────────────────────────────────────────────────────────────
// Extension trait implementation
// ─────────────────────────────────────────────────────────────────────────────

impl zed::Extension for I18nExtension {
    fn new() -> Self {
        I18nExtension
    }

    /// Bootstrap the Node.js LSP server for i18n diagnostics.
    ///
    /// Installs npm dependencies and returns the command to run the LSP.
    fn language_server_command(
        &mut self,
        language_server_id: &zed::LanguageServerId,
        worktree: &zed::Worktree,
    ) -> zed::Result<zed::Command> {
        // Find node binary on the system
        let node_path = worktree
            .which("node")
            .ok_or_else(|| "Node.js is required for i18n-lsp. Install Node.js and try again.".to_string())?;

        // Install LSP dependencies if not already present
        let server_pkg = "vscode-languageserver";
        let doc_pkg = "vscode-languageserver-textdocument";

        install_npm_if_needed(language_server_id, server_pkg, "9.0.1")?;
        install_npm_if_needed(language_server_id, doc_pkg, "1.0.12")?;

        // Write bundled server.js into extension directory so Node can find it in any project
        let _ = std::fs::write("server.js", SERVER_SCRIPT);

        let server_path = std::env::current_dir()
            .map(|p| p.join("server.js").to_string_lossy().to_string())
            .unwrap_or_else(|_| "server.js".to_string());

        Ok(zed::Command {
            command: node_path,
            args: vec![server_path, "--stdio".to_string()],
            env: Default::default(),
        })
    }

    /// Pass i18n settings to the LSP server as initialization options.
    fn language_server_initialization_options(
        &mut self,
        _language_server_id: &zed::LanguageServerId,
        worktree: &zed::Worktree,
    ) -> zed::Result<Option<serde_json::Value>> {
        // Try to read settings from Zed's LSP configuration
        let settings = zed::settings::LspSettings::for_worktree("i18n-lsp", worktree)
            .ok()
            .and_then(|s| s.settings);

        Ok(settings)
    }

    /// Provide argument completions for `/i18n-status` slash command.
    ///
    /// Lists available locale files (minus the base locale) for quick selection.
    fn complete_slash_command_argument(
        &self,
        command: zed::SlashCommand,
        _args: Vec<String>,
    ) -> zed::Result<Vec<zed::SlashCommandArgumentCompletion>> {
        if command.name != "i18n-status" {
            return Ok(Vec::new());
        }

        // Suggest common locale codes
        let locales = vec![
            ("uk", "Ukrainian"),
            ("de", "German"),
            ("fr", "French"),
            ("es", "Spanish"),
            ("ja", "Japanese"),
            ("zh", "Chinese"),
            ("ko", "Korean"),
            ("pt", "Portuguese"),
            ("it", "Italian"),
            ("pl", "Polish"),
            ("all", "All languages"),
        ];

        Ok(locales
            .into_iter()
            .map(|(code, name)| zed::SlashCommandArgumentCompletion {
                label: format!("{code} — {name}"),
                new_text: code.to_string(),
                run_command: true,
            })
            .collect())
    }

    /// Execute the `/i18n-status` slash command.
    ///
    /// Reads locale JSON files from the worktree, calculates translation coverage,
    /// and returns a formatted Markdown report.
    fn run_slash_command(
        &self,
        command: zed::SlashCommand,
        args: Vec<String>,
        worktree: Option<&zed::Worktree>,
    ) -> zed::Result<zed::SlashCommandOutput> {
        if command.name != "i18n-status" {
            return Err(format!("Unknown slash command: {}", command.name));
        }

        let worktree = worktree.ok_or_else(|| {
            "No project is open. Open a project with locale files to use /i18n-status".to_string()
        })?;

        let candidate_dirs = [
            "locales",
            "src/locales",
            "public/locales",
            "resources/lang",
            "lang",
            "locale",
            "src/i18n",
            "i18n",
            "src/assets/locales",
            "src/assets/i18n",
            "assets/locales",
            "test-project/locales",
        ];

        let candidate_base_locales = [
            "en", "en-US", "en_US", "uk", "uk-UA", "de", "fr", "es",
        ];

        let configured_path = get_setting_str(worktree, "locales_path")
            .or_else(|| get_setting_str(worktree, "localesPath"));
        let configured_base = get_setting_str(worktree, "base_locale")
            .or_else(|| get_setting_str(worktree, "baseLocale"));
        let target_locale = args.first().map(|s| s.as_str());

        // Find existing locales path and base file
        let mut resolved_path = String::new();
        let mut resolved_base = String::new();
        let mut base_content = String::new();

        // 1. Try configured path and base
        if let (Some(path), Some(base)) = (&configured_path, &configured_base) {
            let file = format!("{path}/{base}.json");
            if let Ok(c) = worktree.read_text_file(&file) {
                resolved_path = path.clone();
                resolved_base = base.clone();
                base_content = c;
            }
        }

        // 2. Auto-detect if not found
        if base_content.is_empty() {
            'outer: for dir in &candidate_dirs {
                if let Some(user_dir) = &configured_path {
                    if dir != user_dir {
                        continue;
                    }
                }
                for base in &candidate_base_locales {
                    if let Some(user_base) = &configured_base {
                        if base != user_base {
                            continue;
                        }
                    }
                    let file = format!("{dir}/{base}.json");
                    if let Ok(c) = worktree.read_text_file(&file) {
                        resolved_path = dir.to_string();
                        resolved_base = base.to_string();
                        base_content = c;
                        break 'outer;
                    }
                }
            }
        }

        if base_content.is_empty() {
            let error_msg = format!(
                "# ⚠️ i18n Translation Status — No locales found\n\n\
                Could not find any translation files in this project.\n\n\
                **Scanned directories:**\n\
                - `locales/`\n\
                - `src/locales/`\n\
                - `public/locales/`\n\
                - `resources/lang/`\n\
                - `src/i18n/`\n\n\
                **How to configure:**\n\
                Add your custom locales path to `.zed/settings.json`:\n\
                ```json\n\
                {{\n  \
                  \"lsp\": {{\n    \
                    \"i18n-lsp\": {{\n      \
                      \"settings\": {{\n        \
                        \"localesPath\": \"your/path/to/locales\",\n        \
                        \"baseLocale\": \"en\"\n      \
                      }}\n    \
                    }}\n  \
                  }}\n\
                }}\n\
                ```"
            );
            return Ok(zed::SlashCommandOutput {
                text: error_msg.clone(),
                sections: vec![zed::SlashCommandOutputSection {
                    range: zed::Range {
                        start: 0,
                        end: error_msg.len() as u32,
                    },
                    label: "i18n Status: No locales found".to_string(),
                }],
            });
        }

        let locales_path = resolved_path;
        let base_locale = resolved_base;

        let base_json: serde_json::Value = serde_json::from_str(&base_content).map_err(|e| {
            format!("Failed to parse base locale file as JSON: {e}")
        })?;

        let base_keys = flatten_keys(&base_json, "");
        let total_keys = base_keys.len();

        // Discover available locales by trying common language codes
        let known_locales = [
            "uk", "de", "fr", "es", "pt", "it", "ja", "zh", "ko", "pl",
            "nl", "sv", "da", "fi", "nb", "cs", "sk", "ro", "hu", "bg",
            "hr", "sr", "sl", "et", "lv", "lt", "ar", "he", "hi", "th",
            "vi", "id", "ms", "tr", "el", "ru", "ca", "eu", "gl",
        ];

        let mut locale_stats: Vec<LocaleStats> = Vec::new();

        for locale in &known_locales {
            if *locale == base_locale {
                continue;
            }

            // If user specified a target, only process that one (unless "all")
            if let Some(target) = target_locale {
                if target != "all" && target != *locale {
                    continue;
                }
            }

            let file_path = format!("{locales_path}/{locale}.json");
            if let Ok(content) = worktree.read_text_file(&file_path) {
                if let Ok(json) = serde_json::from_str::<serde_json::Value>(&content) {
                    let locale_keys = flatten_keys(&json, "");
                    let translated = base_keys
                        .iter()
                        .filter(|k| locale_keys.contains(k))
                        .count();
                    let missing: Vec<String> = base_keys
                        .iter()
                        .filter(|k| !locale_keys.contains(k))
                        .cloned()
                        .collect();

                    locale_stats.push(LocaleStats {
                        code: locale.to_string(),
                        translated,
                        missing_count: total_keys - translated,
                        missing_keys: missing,
                        total: total_keys,
                    });
                }
            }
        }

        // Generate Markdown report
        let report = generate_report(&locales_path, &base_locale, total_keys, &locale_stats);

        Ok(zed::SlashCommandOutput {
            text: report.clone(),
            sections: vec![zed::SlashCommandOutputSection {
                range: zed::Range {
                    start: 0,
                    end: report.len() as u32,
                },
                label: "i18n Translation Status".to_string(),
            }],
        })
    }
}

zed::register_extension!(I18nExtension);

// ─────────────────────────────────────────────────────────────────────────────
// Helper types and functions
// ─────────────────────────────────────────────────────────────────────────────

/// Statistics for a single locale
struct LocaleStats {
    code: String,
    translated: usize,
    missing_count: usize,
    missing_keys: Vec<String>,
    total: usize,
}

impl LocaleStats {
    fn percentage(&self) -> f64 {
        if self.total == 0 {
            return 100.0;
        }
        (self.translated as f64 / self.total as f64) * 100.0
    }
}

/// Install an npm package if it's not already at the expected version.
fn install_npm_if_needed(
    language_server_id: &zed::LanguageServerId,
    package: &str,
    version: &str,
) -> zed::Result<()> {
    let installed = zed::npm_package_installed_version(package)?;
    if installed.as_deref() != Some(version) {
        zed::set_language_server_installation_status(
            language_server_id,
            &zed::LanguageServerInstallationStatus::Downloading,
        );
        zed::npm_install_package(package, version)?;
    }
    Ok(())
}

/// Recursively flatten nested JSON keys into dot-notation strings.
///
/// Example: `{"a": {"b": "val"}}` → `["a.b"]`
/// Flat keys: `{"a.b": "val"}` → `["a.b"]`
fn flatten_keys(value: &serde_json::Value, prefix: &str) -> Vec<String> {
    let mut keys = Vec::new();

    match value {
        serde_json::Value::Object(map) => {
            for (key, val) in map {
                let full_key = if prefix.is_empty() {
                    key.clone()
                } else {
                    format!("{prefix}.{key}")
                };

                if val.is_object() {
                    // Recurse into nested objects
                    keys.extend(flatten_keys(val, &full_key));
                } else {
                    // Leaf value — this is a translatable key
                    keys.push(full_key);
                }
            }
        }
        _ => {
            if !prefix.is_empty() {
                keys.push(prefix.to_string());
            }
        }
    }

    keys.sort();
    keys
}

/// Generate a formatted Markdown report of translation status.
fn generate_report(
    locales_path: &str,
    base_locale: &str,
    total_keys: usize,
    stats: &[LocaleStats],
) -> String {
    let mut report = String::new();

    // Header
    report.push_str("# 🌐 i18n Translation Status\n\n");
    report.push_str(&format!("📁 Locales directory: `{locales_path}/`\n"));
    report.push_str(&format!(
        "🏠 Base language: **{base_locale}** ({total_keys} keys)\n"
    ));
    report.push_str(&format!("📅 Generated at: {}\n\n", current_timestamp()));

    if stats.is_empty() {
        report.push_str(
            "> No translation files found. Make sure locale files exist in the `locales/` directory.\n\n",
        );
        report.push_str("**Expected format:** `locales/<lang>.json` (e.g., `locales/uk.json`)\n");
        return report;
    }

    // Coverage table
    report.push_str("## Translation Coverage\n\n");
    report.push_str("| Language | Translated | Missing | Coverage |\n");
    report.push_str("|----------|-----------|---------|----------|\n");

    for stat in stats {
        let pct = stat.percentage();
        let bar = progress_bar(pct);
        let flag = locale_flag(&stat.code);
        report.push_str(&format!(
            "| {flag} {code} | {translated} | {missing} | {bar} {pct:.1}% |\n",
            code = stat.code,
            translated = stat.translated,
            missing = stat.missing_count,
        ));
    }

    report.push('\n');

    // Missing keys details (for each locale with missing keys)
    for stat in stats {
        if stat.missing_keys.is_empty() {
            continue;
        }

        report.push_str(&format!(
            "## ❌ Missing Keys — {} ({} keys)\n\n",
            stat.code, stat.missing_count
        ));

        // Show first 30 missing keys, collapse rest
        let show_count = 30.min(stat.missing_keys.len());
        for key in &stat.missing_keys[..show_count] {
            report.push_str(&format!("- `{key}`\n"));
        }

        if stat.missing_keys.len() > show_count {
            report.push_str(&format!(
                "\n... and {} more missing keys\n",
                stat.missing_keys.len() - show_count
            ));
        }

        report.push('\n');
    }

    // Summary
    let fully_translated = stats.iter().filter(|s| s.missing_count == 0).count();
    let avg_coverage: f64 =
        stats.iter().map(|s| s.percentage()).sum::<f64>() / stats.len() as f64;

    report.push_str("---\n\n");
    report.push_str("## 📊 Summary\n\n");
    report.push_str(&format!(
        "- **Total languages:** {}\n",
        stats.len()
    ));
    report.push_str(&format!(
        "- **Fully translated:** {fully_translated}\n"
    ));
    report.push_str(&format!(
        "- **Average coverage:** {avg_coverage:.1}%\n"
    ));

    report
}

/// Generate an ASCII progress bar (10 chars wide).
fn progress_bar(percentage: f64) -> String {
    let filled = ((percentage / 10.0).round() as usize).min(10);
    let empty = 10 - filled;
    format!("{}{}", "█".repeat(filled), "░".repeat(empty))
}

/// Map locale code to an emoji flag.
fn locale_flag(code: &str) -> &'static str {
    match code {
        "uk" => "🇺🇦",
        "de" => "🇩🇪",
        "fr" => "🇫🇷",
        "es" => "🇪🇸",
        "pt" => "🇵🇹",
        "it" => "🇮🇹",
        "ja" => "🇯🇵",
        "zh" => "🇨🇳",
        "ko" => "🇰🇷",
        "pl" => "🇵🇱",
        "nl" => "🇳🇱",
        "sv" => "🇸🇪",
        "da" => "🇩🇰",
        "fi" => "🇫🇮",
        "nb" => "🇳🇴",
        "cs" => "🇨🇿",
        "sk" => "🇸🇰",
        "ro" => "🇷🇴",
        "hu" => "🇭🇺",
        "bg" => "🇧🇬",
        "ru" => "🇷🇺",
        "ar" => "🇸🇦",
        "he" => "🇮🇱",
        "hi" => "🇮🇳",
        "th" => "🇹🇭",
        "vi" => "🇻🇳",
        "id" => "🇮🇩",
        "tr" => "🇹🇷",
        "el" => "🇬🇷",
        _ => "🏳️",
    }
}

/// Get a simple timestamp (no std::time available in WASM, so static placeholder).
fn current_timestamp() -> String {
    "now".to_string()
}

/// Try to read a specific string setting from LSP configuration.
fn get_setting_str(worktree: &zed::Worktree, key: &str) -> Option<String> {
    let settings = zed::settings::LspSettings::for_worktree("i18n-lsp", worktree).ok()?;
    let settings_val = settings.settings?;
    settings_val.get(key)?.as_str().map(|s| s.to_string())
}
