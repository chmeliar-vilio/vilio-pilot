/**
 * Overí formát a kontrolnú číslicu slovenského IČO.
 * Vstup sa orezá o okolité biele znaky; musí ostať presne 8 ASCII číslic.
 * Nereťazcový vstup vracia `false`. Register sa neoveruje.
 */
export function isValidIco(ico: unknown): boolean {
  if (typeof ico !== "string") return false;
  const s = ico.trim();
  if (!/^[0-9]{8}$/.test(s)) return false;
  let sum = 0;
  for (let i = 0; i < 7; i++) sum += Number(s[i]) * (8 - i);
  return (11 - (sum % 11)) % 10 === Number(s[7]);
}
