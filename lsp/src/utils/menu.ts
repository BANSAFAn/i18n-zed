import readline from "readline";
import { MenuOption } from "../types";

export function selectMenu<T = unknown>(
  title: string,
  options: MenuOption<T>[],
  initialIndex = 0,
  clearOnSelect = true
): Promise<T | null> {
  return new Promise((resolve) => {
    if (!process.stdin.isTTY) {
      resolve(options[0] ? options[0].value : null);
      return;
    }

    let selectedIndex = initialIndex;
    readline.emitKeypressEvents(process.stdin);
    try {
      process.stdin.setRawMode(true);
    } catch {}
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

    function onKeypress(_str: string, key: readline.Key) {
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
      } catch {}
      if (clearOnSelect && printedLinesCount > 0) {
        process.stdout.write(`\x1b[${printedLinesCount}A\r\x1b[0J`);
      }
      process.stdout.write("\x1b[?25h"); // Show cursor
    }

    process.stdin.on("keypress", onKeypress);
  });
}
