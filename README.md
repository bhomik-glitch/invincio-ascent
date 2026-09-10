# Invincio Ascent

Marketing site for Invincio (SSB / defence mentorship). Vite + React + TypeScript + Tailwind, deployed on Vercel.

```sh
npm install
npm run dev      # http://localhost:8080
npm run build
npm test
```

## Layout

- `src/pages/` — one file per route (see `src/App.tsx`)
- `src/components/` — page sections and modals; `ui/` holds the few shadcn primitives still in use
- `src/data/candidate-selections.json` — recommended candidates shown in the hero carousel (home) and on the Results page. Appended to by the WhatsApp automation, see `AUTOMATION.md`
- `src/data/army-feed.json` — Army notifications, written by `scripts/track-army.mjs` via GitHub Actions
- `public/assets/` — images and testimonial videos referenced by absolute `/assets/...` paths

## Student login & OIR tests

- `/login` → `/tests` → `/tests/:id`. Pages under `RequireAuth` redirect to `/login` when the session cookie is missing.
- Backend is `api/*.ts` (Vercel serverless functions). `npm run dev` serves them too, via the `devApi` plugin in `vite.config.ts`.
- **Adding a student**: edit the `AUTH_USERS` env var (`phone:password,phone:password`) in Vercel → Settings → Environment Variables, then redeploy. Locally, put it in `.env.local` (see `.env.example`). `AUTH_SECRET` must also be set in Vercel.
- **Adding a test**: create `api/_tests/oir-N.ts` (copy `oir-1.ts`), then add it to the array in `api/_tests/index.ts`. Figures go in `public/assets/oir/` and are referenced via the `image` field. Answers never reach the browser until the test is submitted.
