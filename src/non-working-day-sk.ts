const FIRST_YEAR = 2025;
const LAST_YEAR = 2030;

/** Pevné dni pracovného pokoja v každom podporovanom roku (mesiac 1–12, deň). */
const FIXED_DAYS = new Set(["1-1", "1-6", "5-1", "7-5", "8-29", "11-1", "12-24", "12-25", "12-26"]);

/** Vráti Veľkonočnú nedeľu (anonymný gregoriánsky algoritmus) ako [mesiac 1–12, deň]. */
function easterSunday(year: number): [number, number] {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return [month, day];
}

/**
 * Zistí, či je daný deň dňom pracovného pokoja v Slovenskej republike (roky 2025 – 2030).
 *
 * Zdroj: zákon č. 241/1993 Z. z. o štátnych sviatkoch, dňoch pracovného pokoja
 * a pamätných dňoch v znení:
 * - zákona č. 530/2023 Z. z. – od roku 2024 už 1. septembra nie je deň pracovného pokoja,
 * - zákona č. 261/2025 Z. z. – od 1. 11. 2025 už 17. novembra nie je deň pracovného pokoja
 *   a 8. mája a 15. septembra nie sú dňami pracovného pokoja v roku 2026 (§ 4b).
 *
 * Dňom pracovného pokoja je: 1. 1., 6. 1., Veľký piatok, Veľkonočný pondelok, 1. 5., 5. 7.,
 * 29. 8., 1. 11., 24. 12., 25. 12., 26. 12. a ďalej 8. 5. a 15. 9. (okrem roku 2026).
 *
 * Víkendy sa neriešia: sobota alebo nedeľa vracia `true` iba vtedy, ak je zároveň
 * dňom pracovného pokoja podľa vyššie uvedených pravidiel.
 * Používajú sa lokálne zložky dátumu, čas dňa nehrá rolu.
 *
 * @throws {TypeError} ak vstup nie je objekt Date
 * @throws {RangeError} ak je dátum neplatný alebo rok mimo rozsahu 2025 – 2030
 */
export function isSlovakNonWorkingDay(date: Date): boolean {
  if (!(date instanceof Date)) {
    throw new TypeError("Očakávaný objekt Date.");
  }
  if (Number.isNaN(date.getTime())) {
    throw new RangeError("Neplatný dátum.");
  }
  const year = date.getFullYear();
  if (year < FIRST_YEAR || year > LAST_YEAR) {
    throw new RangeError(`Podporované sú roky ${FIRST_YEAR} – ${LAST_YEAR}.`);
  }
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const key = `${month}-${day}`;

  if (FIXED_DAYS.has(key)) return true;
  if ((key === "5-8" || key === "9-15") && year !== 2026) return true;

  const [easterMonth, easterDay] = easterSunday(year);
  const goodFriday = new Date(year, easterMonth - 1, easterDay - 2);
  const easterMonday = new Date(year, easterMonth - 1, easterDay + 1);
  return [goodFriday, easterMonday].some(
    (d) => d.getMonth() + 1 === month && d.getDate() === day,
  );
}
