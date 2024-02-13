// Test for the crop function based on the slice.test.ts
import { assertEquals } from "@std/assert";
import { errorMessage } from "./shared.ts";

import { cropEnd } from "../src/crop_end.ts";
import { DEFAULT_ELLIPSIS } from "../src/shared.ts";

Deno.test("cropEnd()", () => {
  const EXPECTED_RESULTS = [
    ["Hello, World!", 5, undefined, undefined, "Hello"],
    ["🐶 woof woof", 7, undefined, undefined, "🐶 woof"],

    ["🐶", 2, undefined, undefined, "🐶"],
    ["🐶", 1, " ", undefined, " "],
    ["🐶", 1, "🐱", undefined, ""],

    ["meow 🐱", 2, undefined, undefined, "me"],
    ["meow 🐱", 1, undefined, undefined, "m"],
    ["meow 🐱", 0, undefined, undefined, ""],

    ["こんにちは、世界", 4, undefined, undefined, "こん"],
    ["こんにちは、世界", 5, undefined, undefined, "こん" + DEFAULT_ELLIPSIS],
    ["こんにちは、世界", 6, undefined, undefined, "こんに"],

    ["ｱｲｳｴｵ", 1, undefined, undefined, "ｱ"],
    ["ｱｲｳｴｵ", 2, undefined, undefined, "ｱｲ"],
    ["ｱｲｳｴｵ", 3, undefined, undefined, "ｱｲｳ"],

    ["\x1b[32mfoo\x1b[0m", 3, undefined, undefined, "\x1b[32mfoo\x1b[0m"],
    ["\x1b[32mfoo\x1b[0m", 3, undefined, true, "\x1b[32mfoo\x1b[0m"],
    ["\x1b[32mfoo\x1b[0m", 2, undefined, undefined, "\x1b[32mfo\x1b[0m"],
    ["\x1b[32mfoo\x1b[0m", 2, undefined, true, "\x1b[32mfo\x1b[0m"],

    ["\x1b[32mfoo\x1b[0m", 3, undefined, false, "\x1b[32mfoo\x1b[0m"],
    ["\x1b[32mfoo\x1b[0m", 2, undefined, false, "\x1b[32mfo"],
  ] as const;

  for (
    const [input, width, ellipsis, preserveAllAnsi, expected]
      of EXPECTED_RESULTS
  ) {
    assertEquals(
      cropEnd(input, width, ellipsis, preserveAllAnsi),
      expected,
      errorMessage(input),
    );
  }
});
