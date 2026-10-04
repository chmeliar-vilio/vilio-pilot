import { describe, expect, it } from "vitest";
import { isValidIco } from "../src/ico.js";

describe("isValidIco", () => {
  it.each(["12345679", "10000020", "00000001"])("platné IČO %s", (v) => {
    expect(isValidIco(v)).toBe(true);
  });

  it("orezáva biele znaky", () => {
    expect(isValidIco("  12345679  ")).toBe(true);
    expect(isValidIco("\t12345679\n")).toBe(true);
  });

  it.each(["12345678", "10000021"])("zlá kontrolná číslica %s", (v) => {
    expect(isValidIco(v)).toBe(false);
  });

  it.each(["", "   ", "1234567", "123456790"])("zlá dĺžka %j", (v) => {
    expect(isValidIco(v)).toBe(false);
  });

  it.each([
    "1234567a",
    "1234 5679",
    "-1234567",
    "+1234567",
    "1234567.",
    "１２３４５６７９",
  ])("nečíselné znaky %s", (v) => {
    expect(isValidIco(v)).toBe(false);
  });

  it.each([12345679, NaN, null, undefined, {}, [], ["12345679"]])(
    "nie reťazec %j",
    (v) => {
      expect(isValidIco(v)).toBe(false);
    },
  );
});
