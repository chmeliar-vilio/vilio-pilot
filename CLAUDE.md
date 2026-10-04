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
2. Pracuj vo vlastnej vetve `agent/<tiket>-<krátky-popis>`, nikdy priamo v `main`.
3. Ku každej zmene správania napíš alebo uprav test.
4. Pred PR musí `npm run check` prejsť lokálne.
5. Otvor pull request do `main`: v popise odkaz na tiket, čo sa zmenilo, ako to bolo overené.
6. Merge do `main` robí iba človek po zelenom CI a review.
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

_(dopĺňajú agenti cez PR)_
