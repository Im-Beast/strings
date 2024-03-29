import { DEFAULT_ELLIPSIS } from "./shared.ts";
import { textWidth } from "./text_width.ts";
import { cropEnd } from "./crop_end.ts";
import { cropStart } from "./crop_start.ts";

/**
 * Inserts {fg} on top of the {bg} starting at {pos}.\
 * Position is measured in chararcter widths.\
 * When {explicitStyleReset} is set to true ANSI reset style code (`"\x1b[0m"`) is inserted around {fg}.\
 * {ellipsis} and {preserveAllAnsi} have the same behavior as in `cropStart` and `cropEnd`.
 *
 * @see {@link cropStart} – function used for cropping the start of a string.
 * @see {@link cropEnd} – function used for cropping the end of a string.
 * @see {@link DEFAULT_ELLIPSIS} – the default ellipsis character.
 *
 * @example
 * ```ts
 * console.log(insert("This is foreground", "Fore", 8)); // "This is foreground"
 * ```
 */
export function insert(
  bg: string,
  fg: string,
  pos: number,
  explicitStyleReset = false,
  ellipsis = DEFAULT_ELLIPSIS,
  preserveAllAnsi = true,
): string {
  const start = cropEnd(bg, pos, ellipsis, preserveAllAnsi);
  const end = cropStart(
    bg,
    textWidth(bg) - pos - textWidth(fg),
    ellipsis,
    preserveAllAnsi,
  );

  if (explicitStyleReset) {
    return start + "\x1b[0m" + fg + "\x1b[0m" + end;
  }

  return start + fg + end;
}
