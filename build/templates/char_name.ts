/**
 * @module
 * Based on Unicode $UNICODE_VERSION.
 * 
 * Get name of given character.\
 * @see {@linkcode charName} for more information.
 * 
 * @example
 * ```ts
 * console.log(charName("!")); // "EXCLAMATION MARK"
 * ```
 */


/** Object mapping codePoint to its character name */
export const charNameMap: Record<number, string> = {
  $CHAR_NAME_MAP
} as const;

/**
 * Returns the Unicode $UNICODE_VERSION final name of given character.
 * 
 * @example
 * ```ts
 * console.log(charName("!")); // "EXCLAMATION MARK"
 * console.log(charName("🐶")); // "DOG FACE"
 * console.log(charName("🐕")); // "DOG"
 * ```
 */
export function charName(char: string): string | undefined {
  return charNameMap[char.codePointAt(0)!];
}