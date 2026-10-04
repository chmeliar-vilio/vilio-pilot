import { describe, expect, it } from "vitest";
import { removeDiacritics } from "../src/diacritics.js";

describe("removeDiacritics", () => {
  it("odstráni diakritiku zo slovenského textu", () => {
    expect(removeDiacritics("Žltý kôň úpel ďábelské ódy")).toBe("Zlty kon upel dabelske ody");
  });

  it("prázdny reťazec ostane prázdny", () => {
    expect(removeDiacritics("")).toBe("");
  });

  it("ASCII reťazec s číslicami a interpunkciou sa nezmení", () => {
    const text = "Hello, World! 123 (test) - ok.";
    expect(removeDiacritics(text)).toBe(text);
  });

  it("zachová veľkosť písmen a pokrýva ľ, ĺ, ô", () => {
    expect(removeDiacritics("ĽĹÔ ľĺô")).toBe("LLO llo");
  });

  it("samotný kombinujúci znak vráti prázdny reťazec", () => {
    expect(removeDiacritics("́")).toBe("");
  });

  it("už rozložený NFD vstup spracuje správne", () => {
    expect(removeDiacritics("ô")).toBe("o");
  });
});
