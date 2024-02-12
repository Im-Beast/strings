import { assertEquals } from "jsr:@std/assert@0.215.0";
import { intoCodePoints } from "./shared.ts";

import { textWidth } from "../src/text_width.ts";
import { charWidth } from "../src/char_width.ts";

Deno.test("textWidth() and charWidth()", () => {
  // deno-fmt-ignore
  const HALF_WIDTH_CHARS = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z", "-", "_", "/", "\\",
    "|", "(", ")", "[", "]", "{", "}", "<", ">", "=",
    "*", "+", "%", "#", "@", "!", "?", ".", ",", ":",
    "$", ";", "\"", "'", "`", "&", "^", "~",
    // Half width katakana
    "ｱ", "ｲ", "ｳ", "ｴ", "ｵ", "ｶ", "ｷ", "ｸ", "ｹ", "ｺ",
    "ｻ", "ｼ", "ｽ", "ｾ", "ｿ", "ﾀ", "ﾁ", "ﾂ", "ﾃ", "ﾄ",
    "ﾅ", "ﾆ", "ﾇ", "ﾈ", "ﾉ", "ﾊ", "ﾋ", "ﾌ", "ﾍ", "ﾎ",
    "ﾏ", "ﾐ", "ﾑ", "ﾒ", "ﾓ", "ﾔ", "ﾕ", "ﾖ", "ﾗ", "ﾘ",
    "ﾙ", "ﾚ", "ﾛ", "ﾜ", "ｦ", "ﾝ", "ｷ", "ｸ", "ｳ", "ｧ",
    "ｨ", "ｩ", "ｪ", "ｫ", "ｯ", "ｬ", "ｭ", "ｮ", 
  ];

  // deno-fmt-ignore
  const FULL_WIDTH_CHARS = [
    "０", "１", "２", "３", "４", "５", "６", "７", "８", "９",
    "Ａ", "Ｂ", "Ｃ", "Ｄ", "Ｅ", "Ｆ", "Ｇ", "Ｈ", "Ｉ", "Ｊ",
    "Ｋ", "Ｌ", "Ｍ", "Ｎ", "Ｏ", "Ｐ", "Ｑ", "Ｒ", "Ｓ", "Ｔ",
    "Ｕ", "Ｖ", "Ｗ", "Ｘ", "Ｙ", "Ｚ", "ａ", "ｂ", "ｃ", "ｄ",
    "ｅ", "ｆ", "ｇ", "ｈ", "ｉ", "ｊ", "ｋ", "ｌ", "ｍ", "ｎ",
    "ｏ", "ｐ", "ｑ", "ｒ", "ｓ", "ｔ", "ｕ", "ｖ", "ｗ", "ｘ",
    "ｙ", "ｚ", "－", "＿", "／", "＼", "｜", "（", "）", "［",
    "］", "｛", "｝", "＜", "＞", "＝", "＊", "＋", "％", "＃",
    "＠", "！", "？", "．", "，", "：", "＄", "；", "＂", "＇",
    "｀", "＆", "＾", "～",
    // Hiragana
    "あ", "い", "う", "え", "お", "か", "き", "く", "け", "こ",
    "さ", "し", "す", "せ", "そ", "た", "ち", "つ", "て", "と",
    "な", "に", "ぬ", "ね", "の", "は", "ひ", "ふ", "へ", "ほ",
    "ま", "み", "む", "め", "も", "や", "ゆ", "よ", "ら", "り",
    "る", "れ", "ろ", "わ", "を", "ん",
    // Katakana
    "が", "ぎ", "ぐ", "げ", "ご", "ざ", "じ", "ず", "ぜ", "ぞ",
    "だ", "ぢ", "づ", "で", "ど", "ば", "び", "ぶ", "べ", "ぼ",
    "ぱ", "ぴ", "ぷ", "ぺ", "ぽ", "ぁ", "ぃ", "ぅ", "ぇ", "ぉ",
    "っ", "ゃ", "ゅ", "ょ", "ゎ", "ゐ", "ゑ", 
  ];

  // deno-fmt-ignore
  const EMOJIS = [
    "🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻",
    "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐽",
		"🐸", "🐒", "🐔", "🐧", "🐦", "🐤", "🐣",
    "🐥", "🦆", "🦅", "🦉", "🦇", "🐺", "🐗",
		"🐴", "🦄", "🐝", "🐛", "🦋", "🐌", "🐞",
    "🐜", "🦗", "🦂", "🦟", "🦠", "🐢", "🐍",
		"🦎", "🦖", "🦕", "🐙", "🦑", "🦐", "🦞",
    "🦀", "🐡", "🐠", "🐟", "🐬", "🐳", "🐋",
    "🦈", "🐊", "🐅", "🐆", "🦓", "🦍", "🦧",
    "🦣", "🐘", "🦛", "🦏", "🐪", "🐫", "🐕",
	];

  const EXPECTED_CHAR_RESULTS = [
    [HALF_WIDTH_CHARS, 1],
    [FULL_WIDTH_CHARS, 2],
    [EMOJIS, 2],
  ] as const;

  for (const [charset, expected] of EXPECTED_CHAR_RESULTS) {
    for (const char of charset) {
      const errorMessage = `
Failed on character: "${char}".
Codepoints: [${intoCodePoints(char)}]`;

      assertEquals(charWidth(char), expected, errorMessage + "C=E");
      assertEquals(textWidth(char), charWidth(char), errorMessage + "T=C");
    }
  }

  const EXPECTED_TEXT_RESULTS = [
    ["abc", 3],
    ["ａｂｃ", 6],
    ["🐶🐱🐭", 6],
    ["abc🐶🐱🐭", 9],
    ["ａｂｃ🐶🐱🐭", 12],
    ["🐶🐱🐭abc", 9],
    ["🐶🐱🐭ａｂｃ", 12],
    ["abc🐶🐱🐭ａｂｃ", 15],
    ["abc🐶🐱🐭ａｂｃ🐶🐱🐭", 21],
    ["a🐶", 3],
    ["🐶a", 3],
    ["a🐶a", 4],
    ["🐆 HｅlLO!! 🐺", 14],
    ["あいうえお", 10],
    ["かきくけこ", 10],
    ["さしすせそ", 10],
    ["たちつてと", 10],
    ["なにぬねの", 10],
    ["はひふへほ", 10],
    ["まみむめも", 10],
    ["やゆよ", 6],
    ["らりるれろ", 10],
    ["わをん", 6],
    ["你好", 4],
    ["再见", 4],
    ["你好，再见", 10],
    ["안녕하세요", 10],
    ["안녕히 가세요", 13],
    ["안녕하세요, 안녕히 가세요", 25],
  ] as const;

  const STYLES = [
    "\x1b[32m",
    "\x1b[36m",
    "\x1b[32m\x1b[1m",
  ];

  for (const [text, expected] of EXPECTED_TEXT_RESULTS) {
    const errorMessage = `
Failed on text: "${text}".
Codepoints: [${intoCodePoints(text)}]`;

    assertEquals(textWidth(text), expected, errorMessage);

    for (const style of STYLES) {
      assertEquals(
        textWidth(style + text),
        expected,
        errorMessage + "T+S=E+S",
      );
    }
  }
});