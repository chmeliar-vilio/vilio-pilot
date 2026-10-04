import { describe, expect, it } from "vitest";
import { truncate } from "../src/truncate.js";

describe("truncate", () => {
  it("kratší text vráti nezmenený", () => {
    expect(truncate("ahoj", 10)).toBe("ahoj");
  });

  it("text presne dlhý ako max vráti nezmenený", () => {
    expect(truncate("ahoj svet", 9)).toBe("ahoj svet");
  });

  it("dlhý text skráti na hranici slova a pridá …", () => {
    const result = truncate("ahoj krásny svet", 12);
    expect(result).toBe("ahoj krásny…");
    expect(result.length).toBeLessThanOrEqual(12);
  });

  it("odstráni koncové medzery pred …", () => {
    const result = truncate("ahoj   svet a viac", 8);
    expect(result).toBe("ahoj…");
  });

  it("dlhé slovo bez medzery skráti natvrdo", () => {
    const result = truncate("nadzvukovýlietadlo", 8);
    expect(result).toBe("nadzvuk…");
    expect(result.length).toBe(8);
  });

  it("medzera iba na pozícii 0 sa ignoruje a skráti natvrdo", () => {
    const result = truncate(" abcdefghij", 5);
    expect(result).toBe(" abc…");
    expect(result.length).toBe(5);
  });

  it("max = 1 vráti …", () => {
    expect(truncate("ahoj", 1)).toBe("…");
  });

  it("max = 0 vyhodí RangeError", () => {
    expect(() => truncate("ahoj", 0)).toThrow(RangeError);
  });

  it("záporné max vyhodí RangeError", () => {
    expect(() => truncate("ahoj", -3)).toThrow(RangeError);
  });
});
