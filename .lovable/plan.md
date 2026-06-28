## Direzione: Minimal Paper

Palette editoriale carta + verde profondo, tipografia serif/sans pairing, molto whitespace, ombre quasi assenti, bordi sottili, animazioni discrete.

**Design tokens (HSL, in `src/styles/base.css`)**
- `--background` carta calda `#f5f3ee`
- `--card` `#fbfaf6`
- `--foreground` inchiostro `#2d2d2d`
- `--muted` `#e8e4dd`
- `--border` `#d8d3c9`
- `--primary` verde editoriale `#0d7a5f` (sostituisce il verde brillante attuale)
- Dark mode: inchiostro `#1a1a1a` / carta scura `#22221f` / accent verde leggermente più chiaro

**Tipografia**
- Display: *Instrument Serif* (titoli pagine e numeri prezzo)
- Body / UI: *Work Sans* (testo, bottoni, etichette)
- Installati via `@fontsource`, registrati in `tailwind.config.ts`

**Linguaggio visivo**
- Card con bordo `1px solid border`, niente shadow pesanti (`shadow-sm` solo su hover)
- Radius coerente: `rounded-lg` (8px) per card, `rounded-md` (6px) per chip/button
- Spaziatura su scala 4: 4/8/12/16/24/32, padding container `px-5 py-6`
- Divider sottili invece di card separate dove possibile
- Icone Lucide a 18-20px, stroke 1.5

## Pagine da rivedere (in ordine)

1. **Globale** — token colore, font, `Button`/`Card`/`Input`/`Tabs`/`Checkbox` uniformati al nuovo stile. Footer minimal con label + icona piccola.
2. **/app (Lista spesa)** — header serif "La tua lista", search bar pulita full-width, `ProductCard` riprogettata: riga singola con immagine quadrata 56px, nome+supermercato, prezzo serif a destra, counter compatto. Sezione "Confronta prezzi" diventa accordion sotto la card. CTA "Trova supermercati" sticky in basso.
3. **/stores** — completare il redesign già iniziato: `StoreCard` con rank serif a sinistra, nome+indirizzo, prezzo serif grande, distanza/orario in riga, tag minimal ("Miglior prezzo", "Più vicino") come testo non come pill colorate. Empty/loading state coerente.
4. **/favorites** — rimuovere ridondanze, lista prodotti densa stile editoriale, swipe-to-delete o azione inline.
5. **/map** — header e search uniformati, list item store senza box colorati, focus su tipografia.
6. **/price-history** — chart con palette monocroma + accent, lista prodotti compatta.
7. **/account** — sezioni come articoli di rivista, tabs sostituiti da navigazione verticale leggera; tenere logica esistente di profilo/password già implementata.

## UX

- Riduzione click: "Trova supermercati" rimane raggiungibile sempre; rimozione di stati intermedi inutili.
- Stati vuoti con illustrazione testuale minimal + CTA singola.
- Toast meno frequenti (solo azioni distruttive o esiti server).
- Focus state visibili (accessibilità) con outline `primary/40`.
- Mobile-first verificato a 375/390/414.

## Pulizia codice

- Rimozione classi color hardcoded (`bg-white`, `text-gray-*`, `border-green-100` ecc.) sostituite con token semantici.
- Estrazione varianti `Card` (`paper`, `outline`) per evitare className lunghe.
- Cancellazione componenti non più usati dopo redesign (`RecommendedStore`, `SupermarketCard`, `ProductSummary`, `ProductPriceBreakdown`, `StoreServices`, `TravelTimeEstimate`, `NavigationButtons` se sostituiti).
- Eliminazione `console.log` di sviluppo nei componenti shopping.
- Rimozione blocco `app.css` ridondante con Tailwind, consolidamento `styles/*.css`.

## Dettagli tecnici

```text
src/
├─ styles/base.css          # nuovi token HSL light+dark, font-face
├─ tailwind.config.ts       # fontFamily.serif/sans, eventuali colori extra
├─ main.tsx                 # import @fontsource/instrument-serif, @fontsource/work-sans
├─ components/ui/*          # button, card, input, tabs, checkbox rifiniti
├─ pages/*                  # restyling pagina per pagina
└─ components/<feature>/*   # card/list aggiornate
```

Dipendenze nuove: `@fontsource/instrument-serif`, `@fontsource/work-sans`.

## Approccio iterativo

Per evitare di stravolgere tutto in un colpo solo:
- **Fase 1 (questa iterazione)**: token globali + font + componenti UI base + /app + /stores.
- **Fase 2**: /favorites + /map.
- **Fase 3**: /price-history + /account + cleanup file inutilizzati.

Ti chiedo conferma sulla Fase 1 prima di proseguire con le successive, così puoi vedere subito il nuovo stile e correggere la rotta.