import smolToml from "smol-toml";

export function stripJsonComments(jsonStr: string): string {
  return jsonStr.replace(/\\"|"(?:\\"|[^"])*"|(\/\/.*|\/\*[\s\S]*?\*\/)/g, (m, g) => (g ? "" : m));
}

export function parseProperties(content: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = content.split(/\r?\n/);
  for (let line of lines) {
    line = line.trim();
    if (!line || line.startsWith("#") || line.startsWith("!")) continue;
    const delimIdx = line.search(/[=:]/);
    if (delimIdx === -1) {
      result[line.trim()] = "";
    } else {
      const key = line.slice(0, delimIdx).trim();
      let val = line.slice(delimIdx + 1).trim();
      // Handle unicode escapes like \u0020
      val = val.replace(/\\u([0-9a-fA-F]{4})/g, (_, hex) =>
        String.fromCharCode(parseInt(hex, 16))
      );
      result[key] = val;
    }
  }
  return result;
}

export function serializeProperties(parsed: Record<string, any>): string {
  const lines: string[] = [];
  for (const [k, v] of Object.entries(parsed)) {
    lines.push(`${k}=${String(v).replace(/\r?\n/g, "\\n")}`);
  }
  return lines.join("\n") + "\n";
}

function extractPoString(raw: string): string {
  const trimmed = raw.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      return trimmed.slice(1, -1).replace(/\\"/g, '"').replace(/\\n/g, "\n");
    }
  }
  return trimmed;
}

export function parsePo(content: string): Record<string, string> {
  const result: Record<string, string> = {};
  const lines = content.split(/\r?\n/);
  let currentMsgId: string | null = null;
  let currentMsgStr: string | null = null;
  let state: "none" | "msgid" | "msgstr" = "none";

  function flush() {
    if (currentMsgId !== null && currentMsgStr !== null && currentMsgId !== "") {
      result[currentMsgId] = currentMsgStr;
    }
    currentMsgId = null;
    currentMsgStr = null;
    state = "none";
  }

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (line.startsWith("#")) continue;

    if (line.startsWith("msgid ")) {
      flush();
      currentMsgId = extractPoString(line.slice(6));
      state = "msgid";
    } else if (line.startsWith("msgstr ")) {
      currentMsgStr = extractPoString(line.slice(7));
      state = "msgstr";
    } else if (line.startsWith('"') && line.endsWith('"')) {
      const str = extractPoString(line);
      if (state === "msgid" && currentMsgId !== null) {
        currentMsgId += str;
      } else if (state === "msgstr" && currentMsgStr !== null) {
        currentMsgStr += str;
      }
    } else if (!line) {
      flush();
    }
  }
  flush();
  return result;
}

export function serializePo(existingContent: string, newTranslations: Record<string, string>): string {
  let content = existingContent;
  const remaining = { ...newTranslations };

  for (const [key, value] of Object.entries(newTranslations)) {
    const escapedKey = key.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const escapedVal = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
    const regex = new RegExp(`(msgid\\s+"${escapedKey.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")}"\\s*\\r?\\n\\s*msgstr\\s+)"(?:[^"\\\\]|\\\\.)*"`, "g");
    if (regex.test(content)) {
      content = content.replace(regex, `$1"${escapedVal}"`);
      delete remaining[key];
    }
  }

  const appended: string[] = [];
  for (const [k, v] of Object.entries(remaining)) {
    const escapedKey = k.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    const escapedVal = v.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
    appended.push(`\nmsgid "${escapedKey}"\nmsgstr "${escapedVal}"`);
  }

  return content.trimEnd() + (appended.length ? "\n" + appended.join("\n") : "") + "\n";
}

export function parseToml(content: string): Record<string, any> {
  return smolToml.parse(content) as Record<string, any>;
}

export function serializeToml(obj: Record<string, any>): string {
  return smolToml.stringify(obj);
}
