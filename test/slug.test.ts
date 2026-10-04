import { describe, expect, it } from "vitest";
import { slugify } from "../src/slug.js";

describe("slugify", () => {
  it("odstráni diakritiku a medzery", () => {
    expect(slugify("Žltý kôň úpel ďábelské ódy")).toBe("zlty-kon-upel-dabelske-ody");
  });

  it("orezáva okrajové pomlčky", () => {
    expect(slugify("  --Ahoj, svet!--  ")).toBe("ahoj-svet");
  });
});
