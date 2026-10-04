import { describe, expect, it } from "vitest";
import { pluralizeSk } from "../src/pluralize-sk.js";

const forms = ["faktúra", "faktúry", "faktúr"] as const;

describe("pluralizeSk", () => {
  it.each([
    [0, "faktúr"],
    [1, "faktúra"],
    [2, "faktúry"],
    [3, "faktúry"],
    [4, "faktúry"],
    [5, "faktúr"],
    [11, "faktúr"],
    [12, "faktúr"],
    [13, "faktúr"],
    [14, "faktúr"],
    [21, "faktúr"],
    [22, "faktúr"],
    [100, "faktúr"],
    [102, "faktúr"],
    [-1, "faktúra"],
    [-3, "faktúry"],
    [-5, "faktúr"],
    [-0, "faktúr"],
    [1.5, "faktúry"],
    [0.5, "faktúry"],
    [5.5, "faktúry"],
    [-1.5, "faktúry"],
  ])("pluralizeSk(%s) = %s", (count, expected) => {
    expect(pluralizeSk(count, forms)).toBe(expected);
  });

  it.each([NaN, Infinity, -Infinity])("%s vyhodí RangeError", (count) => {
    expect(() => pluralizeSk(count, forms)).toThrow(RangeError);
  });

  it("nečíselný počet vyhodí TypeError", () => {
    expect(() => pluralizeSk("1" as unknown as number, forms)).toThrow(TypeError);
  });

  it.each([[[]], [["a", "b"]], [["a", "b", "c", "d"]], [["a", "", "c"]], [["a", 1, "c"]]])(
    "neplatné tvary %j vyhodia TypeError",
    (bad) => {
      expect(() =>
        pluralizeSk(1, bad as unknown as readonly [string, string, string]),
      ).toThrow(TypeError);
    },
  );
});
