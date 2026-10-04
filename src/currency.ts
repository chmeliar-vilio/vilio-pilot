// `signDisplay: "negative"` (skryje znamienko pri -0) ešte nie je v typoch TS lib.
const options = {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  signDisplay: "negative",
} as unknown as Intl.NumberFormatOptions;

const eurFormatter = new Intl.NumberFormat("sk-SK", options);

/**
 * Naformátuje sumu v eurách podľa slovenských pravidiel (sk-SK),
 * napr. `1234.5` → `"1 234,50 €"` (s nezlomiteľnými medzerami).
 * Záporná nula a hodnoty zaokrúhlené na nulu sa zobrazia bez znamienka.
 *
 * @param amount Suma v eurách.
 * @throws {RangeError} Ak suma nie je konečné číslo (NaN, ±Infinity).
 */
export function formatEur(amount: number): string {
  if (!Number.isFinite(amount)) {
    throw new RangeError("Suma musí byť konečné číslo.");
  }
  return eurFormatter.format(amount);
}
