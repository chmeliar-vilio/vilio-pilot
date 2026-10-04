import { describe, expect, it } from "vitest";
import { isValidIban } from "../src/iban.js";

describe("isValidIban", () => {
  it("prijme platný SK IBAN", () => {
    expect(isValidIban("SK1799990000001234567890")).toBe(true);
  });

  it("ignoruje medzery a veľkosť písmen", () => {
    expect(isValidIban("sk17 9999 0000 0012 3456 7890")).toBe(true);
  });

  it("odmietne preklep v poslednej cifre", () => {
    expect(isValidIban("SK1799990000001234567891")).toBe(false);
  });

  it("odmietne SK so zlou dĺžkou", () => {
    expect(isValidIban("SK17999900000012345678")).toBe(false);
  });

  it("prijme platné IBAN iných krajín", () => {
    expect(isValidIban("GB82WEST12345698765432")).toBe(true);
    expect(isValidIban("DE89370400440532013000")).toBe(true);
  });

  it("neznáma krajina nehádže výnimku", () => {
    expect(typeof isValidIban("XX00" + "1".repeat(16))).toBe("boolean");
  });

  it("odmietne nevalidné vstupy", () => {
    for (const v of ["", "   ", null, undefined, NaN, 123, {}]) {
      expect(isValidIban(v)).toBe(false);
    }
  });

  it("odmietne pomlčky a znaky mimo ASCII", () => {
    expect(isValidIban("SK17-9999-0000-0012-3456-7890")).toBe(false);
    expect(isValidIban("SK1799990000001234567ß90")).toBe(false);
    expect(isValidIban("SK17９９９９0000001234567890")).toBe(false);
  });

  it("odmietne nesprávne kontrolné cifry 00/01/99", () => {
    for (const cd of ["00", "01", "99"]) {
      expect(isValidIban(`SK${cd}99990000001234567890`)).toBe(false);
    }
  });
});
