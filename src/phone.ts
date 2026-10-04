/**
 * Naformátuje slovenské telefónne číslo do tvaru `+421 ...`.
 * Vráti `null`, ak vstup nie je reťazec, obsahuje nepovolené znaky,
 * nie je slovenské alebo nemá platnú dĺžku/predvoľbu.
 */
export function formatPhoneSk(input: unknown): string | null {
  if (typeof input !== "string") return null;
  const s = input.trim();
  if (!/^\+?[0-9 ()/-]+$/.test(s)) return null;

  const hasPlus = s.startsWith("+");
  const digits = s.replace(/[^0-9]/g, "");

  let n: string;
  if (hasPlus && digits.startsWith("421")) n = digits.slice(3);
  else if (!hasPlus && digits.startsWith("00421")) n = digits.slice(5);
  else if (!hasPlus && digits.startsWith("0") && !digits.startsWith("00")) n = digits.slice(1);
  else return null;

  if (!/^[1-9][0-9]{8}$/.test(n)) return null;

  switch (n[0]) {
    case "9":
      return `+421 ${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;
    case "2":
      return `+421 2 ${n.slice(1, 5)} ${n.slice(5)}`;
    case "3":
    case "4":
    case "5":
      return `+421 ${n.slice(0, 2)} ${n.slice(2, 5)} ${n.slice(5)}`;
    default:
      return null;
  }
}
