/** Odstráni diakritiku z textu; veľkosť písmen a ostatné znaky ostanú zachované. */
export function removeDiacritics(text: string): string {
  return text.normalize("NFD").replace(/[̀-ͯ]/g, "").normalize("NFC");
}
