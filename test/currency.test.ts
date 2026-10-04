import { describe, expect, it } from "vitest";
import { formatEur } from "../src/currency.js";

const NBSP = " ";

describe("formatEur", () => {
  it("formátuje tisíce a desatinné miesta", () => {
    expect(formatEur(1234.5)).toBe(`1${NBSP}234,50${NBSP}€`);
  });

  it("formátuje nulu", () => {
    expect(formatEur(0)).toBe(`0,00${NBSP}€`);
  });

  it("formátuje zápornú sumu so spojovníkom-mínus", () => {
    expect(formatEur(-12)).toBe(`-12,00${NBSP}€`);
  });

  it("nezobrazuje znamienko pri zápornej nule", () => {
    expect(formatEur(-0)).toBe(`0,00${NBSP}€`);
    expect(formatEur(-0.001)).toBe(`0,00${NBSP}€`);
  });

  it("zaokrúhľuje na dve desatinné miesta", () => {
    expect(formatEur(0.125)).toBe(`0,13${NBSP}€`);
    expect(formatEur(2.675)).toBe(`2,68${NBSP}€`);
    expect(formatEur(1.004)).toBe(`1,00${NBSP}€`);
  });

  it("formátuje veľké čísla", () => {
    expect(formatEur(1234567.891)).toBe(`1${NBSP}234${NBSP}567,89${NBSP}€`);
  });

  it("vyhodí RangeError pre NaN a nekonečno", () => {
    expect(() => formatEur(NaN)).toThrow(RangeError);
    expect(() => formatEur(Infinity)).toThrow(RangeError);
    expect(() => formatEur(-Infinity)).toThrow(RangeError);
  });
});
