# vilio-pilot

Pilotný projekt pre dev tím AI agentov (Tech lead, Coder, Reviewer) riadený cez Paperclip.
Cieľ fázy 2: 10 zmergovaných PR bez vážnej chyby po merge.

## Príkazy

- `npm ci` – inštalácia závislostí
- `npm run check` – lint + typecheck + testy (spusti pred každým PR)
- `npm test` – testy (vitest)
- `npm run build` – build do `dist/`

## Postup práce (povinný)

1. Každá úloha má tiket v Paperclip s akceptačnými kritériami. Bez tiketu nepracuj.
2. Pracuj vo vetve, ktorú vytvorí Paperclip (`VIL-<číslo>-<popis>`, vlastný git worktree), nikdy priamo v `main`.
3. Ku každej zmene správania napíš alebo uprav test.
4. Pred PR musí `npm run check` prejsť lokálne.
5. Otvor pull request do `main`: v popise odkaz na tiket, čo sa zmenilo, ako to bolo overené.
6. Merge do `main` robí iba človek (board) po zelenom CI a review – vždy **squash merge**.
   Keď tiket odovzdávaš inému agentovi, zmeň assignee a pridaj komentár s `"resume": true`, inak sa nezobudí.
7. Po merge zapíš poučenia do tohto súboru – opäť cez PR.

## Konvencie

- TypeScript strict, ES moduly, importy s príponou `.js`.
- Malé, zamerané PR (ideálne < 300 riadkov zmien).
- Komentáre a texty pre používateľov po slovensky, identifikátory po anglicky.

## Čo agent nesmie

- Meniť `.github/workflows/`, `CLAUDE.md` sekciu „Postup práce“ ani nastavenia repa bez schváleného tiketu.
- Mergovať, force-pushovať, mazať vetvy iných agentov.
- Pridávať heslá, API kľúče, tokeny ani produkčné dáta – nikde, ani do testov.
- Pristupovať k produkčným systémom. Používaj len testovacie dáta.

## Poučenia

_(dopĺňajú agenti cez PR; najnovšie hore)_

- **2026-10-04 – pilot fázy 2 (PR #4–#13):**
  - Hraničné vstupy patria do akceptačných kritérií každého tiketu: `NaN`, `Infinity`, necelé čísla, prázdny reťazec,
    medzery na okrajoch. Review PR #4 našiel `truncate(text, NaN)` → opravené v #5.
  - Pri doménových pravidlách (sviatky, IČO, IBAN, formáty) najprv over zadanie voči aktuálnemu zdroju (zákon, norma)
    a odkaz daj do JSDoc. Zadanie VIL-14 malo zastaraný zoznam sviatkov (zákony 530/2023 a 261/2025 Z. z.).
  - Prvý commit s červeným testom nevadí, ak ho opraví ďalší commit – preto squash merge.
  - Pred merge musí byť vetva aktuálna voči `main` (strict status checks) – po merge iného PR treba „Update branch“.
  - Verdikt review píš na prvý riadok: `SCHVÁLENÉ na merge` / `VRÁTENÉ (request changes)` + zoznam blokujúcich bodov.
