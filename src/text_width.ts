import { loopAnsi } from "./ansi_looping.ts";
import { charWidth } from "./char_width.ts";

/**
 * Calculate width of given {input}.\
 * It counts the width of characters and ignores ANSI escape codes.\
 * It uses the same definition for character width as `charWidth`.
 *
 * @see {@link charWidth} – function used for character width calculation.
 *
 * @example
 * ```ts
 * console.log(textWidth("Hello world")); // 11
 * console.log(textWidth("\x1b[32mHello world\x1b[0m")); // 11
 * console.log(textWidth("🐶🐕")); // 4
 * ```
 */
export function textWidth(input: string): number {
  let width = 0;
  loopAnsi(input, (char, style) => {
    if (style) return;
    width += charWidth(char);
  });
  return width;
}
