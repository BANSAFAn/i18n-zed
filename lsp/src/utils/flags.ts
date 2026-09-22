export const FLAGS: Record<string, string> = {
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

export function getFlag(code: string): string {
  const norm = code.toLowerCase().replace("_", "-");
  if (FLAGS[norm]) return FLAGS[norm];
  const primary = norm.split("-")[0];
  if (FLAGS[primary]) return FLAGS[primary];
  return "🌐";
}

export const LANGUAGE_NAMES: Record<string, string> = {
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

export function getLangName(code: string): string {
  const norm = code.toLowerCase().replace("_", "-");
  if (LANGUAGE_NAMES[norm]) return LANGUAGE_NAMES[norm];
  const primary = norm.split("-")[0];
  if (LANGUAGE_NAMES[primary]) return LANGUAGE_NAMES[primary];
  return code;
}
