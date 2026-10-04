import { describe, expect, it } from "vitest";
import { formatDateSk } from "../src/date-sk.js";

describe("formatDateSk", () => {
  it("formátuje bez paddingu", () => {
    expect(formatDateSk(new Date(2026, 0, 5))).toBe("5. 1. 2026");
  });

  it("formátuje s paddingom", () => {
    expect(formatDateSk(new Date(2026, 0, 5), { pad: true })).toBe("05. 01. 2026");
  });

  it("dvojciferné hodnoty s aj bez pad", () => {
    expect(formatDateSk(new Date(2026, 11, 31))).toBe("31. 12. 2026");
    expect(formatDateSk(new Date(2026, 11, 31), { pad: true })).toBe("31. 12. 2026");
  });

  it("používa lokálne zložky (nezávislé od časovej zóny)", () => {
    expect(formatDateSk(new Date(2026, 11, 31, 23, 59))).toBe("31. 12. 2026");
    expect(formatDateSk(new Date(2026, 0, 1, 0, 0))).toBe("1. 1. 2026");
  });

  it("{}, undefined a pad: false sa správajú rovnako", () => {
    const d = new Date(2026, 2, 3);
    expect(formatDateSk(d, {})).toBe("3. 3. 2026");
    expect(formatDateSk(d, undefined)).toBe("3. 3. 2026");
    expect(formatDateSk(d, { pad: false })).toBe("3. 3. 2026");
  });

  it("neplatný dátum vyhodí RangeError", () => {
    expect(() => formatDateSk(new Date(NaN))).toThrow(RangeError);
    expect(() => formatDateSk(new Date(""))).toThrow(RangeError);
    expect(() => formatDateSk(new Date("abc"))).toThrow(RangeError);
  });

  it("iný typ než Date vyhodí TypeError", () => {
    for (const v of [null, undefined, "2026-01-05", 0, {}]) {
      expect(() => formatDateSk(v as unknown as Date)).toThrow(TypeError);
    }
  });
});
