export function toGoogleLangCode(code: string): string | null {
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

export async function translateBatch(
  texts: string[],
  targetLang: string,
  sourceLang = "en"
): Promise<string[]> {
  if (texts.length === 0) return [];
  const gLang = toGoogleLangCode(targetLang);
  if (!gLang) return texts;

  const results: string[] = [];
  const CHUNK_SIZE = 25;

  for (let i = 0; i < texts.length; i += CHUNK_SIZE) {
    const chunk = texts.slice(i, i + CHUNK_SIZE);
    const joined = chunk.join("\n");
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${gLang}&dt=t&q=${encodeURIComponent(joined)}`;

    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
      const data = (await resp.json()) as any;
      const translatedFull: string = data[0].map((x: any) => x[0]).join("");
      const splitLines = translatedFull.split("\n");

      for (let j = 0; j < chunk.length; j++) {
        results.push(
          splitLines[j] !== undefined && splitLines[j].trim() !== ""
            ? splitLines[j].trim()
            : chunk[j]
        );
      }
    } catch {
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
