/**
 * Vyberie správny slovenský tvar slova podľa počtu.
 *
 * `forms` = `[tvar pre 1, tvar pre 2–4 a necelé čísla, tvar pre 0 a 5+]`,
 * napr. `["faktúra", "faktúry", "faktúr"]`. Záporné počty sa berú podľa
 * absolútnej hodnoty. Slovenčina nepoužíva pravidlo poslednej cifry (21 faktúr).
 */
export function pluralizeSk(count: number, forms: readonly [string, string, string]): string {
  if (typeof count !== "number") {
    throw new TypeError("Počet musí byť číslo.");
  }
  if (!Number.isFinite(count)) {
    throw new RangeError("Počet musí byť konečné číslo.");
  }
  if (
    !Array.isArray(forms) ||
    forms.length !== 3 ||
    forms.some((form) => typeof form !== "string" || form === "")
  ) {
    throw new TypeError("Očakávajú sa tri neprázdne tvary slova.");
  }

  const n = Math.abs(count);
  if (!Number.isInteger(n)) return forms[1];
  if (n === 1) return forms[0];
  if (n >= 2 && n <= 4) return forms[1];
  return forms[2];
}
