import { describe, expect, it } from "vitest";
import { formatPhoneSk } from "../src/phone.js";

describe("formatPhoneSk", () => {
  it.each([
    "0903 123 456",
    "+421903123456",
    "00421 903 123 456",
    "0903123456",
    "  0903-123-456  ",
    "+421 (903) 123 456",
  ])("mobil %j", (input) => {
    expect(formatPhoneSk(input)).toBe("+421 903 123 456");
  });

  it.each(["02/1234 5678", "+421 2 1234 5678", "0212345678"])("Bratislava %j", (input) => {
    expect(formatPhoneSk(input)).toBe("+421 2 1234 5678");
  });

  it("pevná linka mimo Bratislavy", () => {
    expect(formatPhoneSk("033/123 4567")).toBe("+421 33 123 4567");
  });

  it.each([
    "0903 123 45",
    "0903 123 4567",
    "+421",
    "0",
    "0903 abc 456",
    "0903.123.456",
    "0903 123 456 ext",
    "０９０３１２３４５６",
    "0903+123456",
    "++421903123456",
    "+420 603 123 456",
    "00420603123456",
    "+421 0903 123 456",
    "0003123456",
    "0803 123 456",
    "",
    "   ",
  ])("neplatný reťazec %j", (input) => {
    expect(formatPhoneSk(input)).toBeNull();
  });

  it.each([903123456, NaN, null, undefined, {}, []])("nie reťazec %j", (input) => {
    expect(formatPhoneSk(input)).toBeNull();
  });
});
