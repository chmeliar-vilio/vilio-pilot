/**
 * Naformátuje dátum v slovenskom tvare `D. M. RRRR` (lokálne zložky dátumu).
 * S `pad: true` sa deň a mesiac doplnia nulou na 2 cifry; rok sa nemení.
 * @throws {TypeError} ak vstup nie je objekt Date
 * @throws {RangeError} ak je dátum neplatný
 */
export function formatDateSk(date: Date, options?: { pad?: boolean }): string {
  if (!(date instanceof Date)) {
    throw new TypeError("Očakávaný objekt Date.");
  }
  if (Number.isNaN(date.getTime())) {
    throw new RangeError("Neplatný dátum.");
  }
  const pad = options?.pad ?? false;
  const part = (n: number): string => (pad ? String(n).padStart(2, "0") : String(n));
  return `${part(date.getDate())}. ${part(date.getMonth() + 1)}. ${String(date.getFullYear())}`;
}
