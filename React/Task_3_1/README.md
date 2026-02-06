# React Mobile Gallery (Tailwind)

A mobile photo gallery with a 2-column grid, local images, and an overlay with a title. Styled with Tailwind.

## How to run
- `npm install`
- `npm start` (http://localhost:3000)
- Production: `npm run build`

## Data and images
- Data is in `src/data/photos.json`. Used fields: `id`, `title`, `webformatURL` (path to image), plus optional metadata.
- Images must be placed in `public/images/` and referenced as `/images/file-name.ext` in JSON (do not use `./public`).

## Relevant structure
- `src/App.js` — reads JSON and renders a 2xN grid with no gaps.
- `src/components/PhotoCard.jsx` — card component; receives `image`, `title` as props and displays an overlay.
- `src/index.css` — Tailwind directives + minor resets.
- `tailwind.config.js`, `postcss.config.js` — Tailwind/PostCSS configuration.

## Notes
- Layout is mobile-oriented: 2 columns, `gap-0`, black overlay with 50% opacity and centered title.
- Image fallback: there's a placeholder if local files are missing.

## Requirements covered
- Styling: Tailwind
- Separate component: `PhotoCard`
- Props and local data: `photos.json` mapped in `App`
