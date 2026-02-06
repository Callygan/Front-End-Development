# React Mobile Gallery (Tailwind)

Galerie foto mobilă cu grid pe 2 coloane, imagini locale și overlay cu titlu. Stilizare cu Tailwind.

## Cum rulezi
- `npm install`
- `npm start` (http://localhost:3000)
- Prod: `npm run build`

## Date și imagini
- Datele sunt în `src/data/photos.json`. Câmpuri folosite: `id`, `title`, `webformatURL` (cale către imagine), plus meta opțional.
- Imaginile trebuie puse în `public/images/` și referite ca `/images/nume-fisier.ext` în JSON (nu folosi `./public`).

## Structură relevantă
- `src/App.js` — citește JSON și randă grid 2xN fără spații.
- `src/components/PhotoCard.jsx` — componentă card; primește `image`, `title` ca props și afișează overlay.
- `src/index.css` — directive Tailwind + mici reset-uri.
- `tailwind.config.js`, `postcss.config.js` — config Tailwind/PostCSS.

## Notițe
- Layoutul este orientat mobil: 2 coloane, `gap-0`, overlay negru 50% cu titlul centrat.
- Fallback imagine: există placeholder dacă lipsesc fișierele locale.

## Cerințe acoperite
- Stilizare: Tailwind
- Componentă separată: `PhotoCard`
- Props și date locale: `photos.json` mapat în `App`
