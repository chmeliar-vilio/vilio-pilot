/**
 * Overí IBAN: štruktúru a kontrolné číslice (mod 97, ISO 13616).
 *
 * Medzery (iba ASCII) sa ignorujú a malé písmená sa berú ako veľké.
 * Pre krajinu SK sa vyžaduje dĺžka presne 24 znakov. Pri ostatných krajinách
 * (vrátane neznámych) sa kontroluje iba štruktúra (15–34 znakov) a mod 97,
 * dĺžka podľa krajiny sa NEOVERUJE. Nikdy nehádže výnimku.
 */
export function isValidIban(iban: unknown): boolean {
  if (typeof iban !== "string") return false;
  const raw = iban.replace(/ /g, "");
  // Najprv ASCII kontrola – toUpperCase() by inak namapoval napr. "ſ" na "S".
  if (!/^[A-Za-z0-9]+$/.test(raw)) return false;
  const s = raw.toUpperCase();
  if (!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{11,30}$/.test(s)) return false;
  if (s.startsWith("SK") && s.length !== 24) return false;

  const rearranged = s.slice(4) + s.slice(0, 4);
  let r = 0;
  for (const ch of rearranged) {
    const code = ch.charCodeAt(0);
    if (code >= 48 && code <= 57) {
      r = (r * 10 + (code - 48)) % 97;
    } else {
      const n = code - 55; // A=10 … Z=35
      r = (r * 100 + n) % 97;
    }
  }
  return r === 1;
}
