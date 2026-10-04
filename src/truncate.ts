/**
 * Skráti text na najviac `max` znakov (podľa `text.length`) a pridá `…`.
 * Ak sa dá, skracuje na hranici slova; dlhé slovo bez medzery skráti natvrdo.
 * Kratší alebo rovný text vráti nezmenený.
 * Pre `max < 1` alebo `NaN` vyhodí RangeError (validácia prebehne pred kontrolou dĺžky).
 * `Infinity` vráti text nezmenený. Necelé `max` sa správa ako `Math.floor(max)`.
 */
export function truncate(text: string, max: number): string {
  if (Number.isNaN(max) || max < 1) {
    throw new RangeError("max musí byť aspoň 1");
  }
  if (text.length <= max) {
    return text;
  }
  const candidate = text.slice(0, max - 1);
  const lastSpace = candidate.lastIndexOf(" ");
  const prefix = lastSpace > 0 ? candidate.slice(0, lastSpace).trimEnd() : candidate;
  return `${prefix}…`;
}
