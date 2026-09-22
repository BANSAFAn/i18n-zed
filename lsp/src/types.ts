export interface ModuleLocale {
  loc: string;
  locFile: string;
  flag: string;
  name: string;
  translated: number;
  missing: string[];
  pct: string;
}

export interface I18nModule {
  dir: string;
  relDir: string;
  preferredExt: string;
  baseLocale: string;
  baseFlat: Record<string, string>;
  baseKeys: string[];
  total: number;
  locales: ModuleLocale[];
}

export interface LangModuleDetail {
  dir: string;
  relDir: string;
  preferredExt: string;
  baseLocale: string;
  baseFlat: Record<string, string>;
  missing: string[];
  translated: number;
  total: number;
  pct: string;
}

export interface LangSummary {
  loc: string;
  flag: string;
  name: string;
  totalMissing: number;
  totalTranslated: number;
  totalKeys: number;
  pct: string;
  modules: LangModuleDetail[];
}

export interface FileSnapshot {
  isBase?: boolean;
  locale: string;
  keys: Set<string>;
  total: number;
  translated?: number;
  pct?: string;
  preferredExt?: string;
  dir: string;
  baseKeys?: string[];
}

export interface MenuOption<T = unknown> {
  label: string;
  value: T;
}

export interface CliOptions {
  isWatch: boolean;
  isInteractive: boolean;
  showMissing: boolean;
  showAll: boolean;
  asJsonTemplate: boolean;
  autoTranslate: boolean;
  saveToFile: boolean;
  limit: number;
  targetLocale: string;
  requestedDir: string | null;
  requestedBase: string | null;
  showHelp: boolean;
}

export interface ServerConfig {
  localesPath: string;
  baseLocale: string;
  translationFunctions: string[];
  missingKeySeverity: "error" | "warning";
  coverageDiagnosticSeverity: "warning" | "information";
}
