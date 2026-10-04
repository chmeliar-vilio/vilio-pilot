import { describe, expect, it } from "vitest";
import { isSlovakNonWorkingDay } from "../src/non-working-day-sk.js";

const asDate = (v: unknown) => v as Date;

describe("isSlovakNonWorkingDay", () => {
  it.each([2025, 2030])("pevné dni pracovného pokoja v roku %i", (y) => {
    for (const [m, d] of [[1, 1], [1, 6], [5, 1], [7, 5], [8, 29], [11, 1], [12, 24], [12, 25], [12, 26]]) {
      expect(isSlovakNonWorkingDay(new Date(y, m - 1, d))).toBe(true);
    }
  });

  it.each([
    [2025, [4, 18], [4, 21]],
    [2026, [4, 3], [4, 6]],
    [2027, [3, 26], [3, 29]],
    [2028, [4, 14], [4, 17]],
    [2029, [3, 30], [4, 2]],
    [2030, [4, 19], [4, 22]],
  ] as const)("Veľký piatok a Veľkonočný pondelok v roku %i", (y, fri, mon) => {
    expect(isSlovakNonWorkingDay(new Date(y, fri[0] - 1, fri[1]))).toBe(true);
    expect(isSlovakNonWorkingDay(new Date(y, mon[0] - 1, mon[1]))).toBe(true);
  });

  it("Veľkonočná nedeľa a Zelený štvrtok nie sú dňom pracovného pokoja", () => {
    expect(isSlovakNonWorkingDay(new Date(2026, 3, 5))).toBe(false);
    expect(isSlovakNonWorkingDay(new Date(2026, 3, 2))).toBe(false);
  });

  it("8. 5. a 15. 9. platia okrem roku 2026", () => {
    for (const [m, d] of [[5, 8], [9, 15]]) {
      expect(isSlovakNonWorkingDay(new Date(2025, m - 1, d))).toBe(true);
      expect(isSlovakNonWorkingDay(new Date(2026, m - 1, d))).toBe(false);
      expect(isSlovakNonWorkingDay(new Date(2027, m - 1, d))).toBe(true);
    }
  });

  it("1. 9. a 17. 11. nie sú dňom pracovného pokoja", () => {
    for (const y of [2025, 2026]) {
      expect(isSlovakNonWorkingDay(new Date(y, 8, 1))).toBe(false);
      expect(isSlovakNonWorkingDay(new Date(y, 10, 17))).toBe(false);
    }
  });

  it("bežný pracovný deň a víkend bez sviatku", () => {
    expect(isSlovakNonWorkingDay(new Date(2026, 9, 14))).toBe(false);
    expect(isSlovakNonWorkingDay(new Date(2026, 9, 10))).toBe(false);
  });

  it("čas dňa nehrá rolu", () => {
    expect(isSlovakNonWorkingDay(new Date(2026, 11, 24, 23, 59))).toBe(true);
    expect(isSlovakNonWorkingDay(new Date(2026, 0, 1, 0, 0))).toBe(true);
  });

  it("hraničné roky", () => {
    expect(() => isSlovakNonWorkingDay(new Date(2024, 11, 31))).toThrow(RangeError);
    expect(() => isSlovakNonWorkingDay(new Date(2031, 0, 1))).toThrow(RangeError);
    expect(isSlovakNonWorkingDay(new Date(2025, 0, 1))).toBe(true);
    expect(isSlovakNonWorkingDay(new Date(2030, 11, 31))).toBe(false);
  });

  it("neplatný dátum hodí RangeError", () => {
    for (const d of [new Date(NaN), new Date(""), new Date("abc")]) {
      expect(() => isSlovakNonWorkingDay(d)).toThrow(RangeError);
    }
  });

  it("vstup, ktorý nie je Date, hodí TypeError", () => {
    for (const v of [null, undefined, "2026-01-01", 0, {}]) {
      expect(() => isSlovakNonWorkingDay(asDate(v))).toThrow(TypeError);
    }
  });
});
