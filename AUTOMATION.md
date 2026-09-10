# Automation: WhatsApp → weekly summary + candidate photo intake

This site is fed by a separate automation living in the sibling repo
`Automation-studiocover` (`whatsapp/bot.js`). It does two things:

1. **Sunday digest to Ankur Sir GTO** — reads `src/data/army-feed.json` (already
   here, written every 6h by `scripts/track-army.mjs` + GitHub Actions) and
   WhatsApps him a summary of what got published in the past 7 days.
2. **Sunday nudge + photo intake with Devendra Sharma** — he's asked for new
   candidate photos every Sunday. When he sends one, it's staged, a
   confirmation goes out on the owner's own WhatsApp, and only a `yes <id>`
   reply commits + pushes the new candidate into this repo (which auto-deploys).

## What it touches here

- `src/data/candidate-selections.json` — read, appended to, and rewritten
  directly (`JSON.parse` → push an entry → `JSON.stringify` → write). Must
  stay a flat array.
- `public/assets/client_photo/` — new photos land here. Filename = slugified
  candidate name + original extension.
- `src/data/army-feed.json` — read-only. This automation never writes it.

## Data shape it writes

Every published candidate gets exactly:

```json
{ "name": "string", "info": "string, can be multi-line", "image": "/assets/client_photo/<file>" }
```

Nothing else. If the site expects more fields than that on new entries, this
automation isn't filling them in yet.

### Wanted: `addedAt` on new entries

The `/results` page has a "Recommended this week" group in "Individual Success
Stories". It keys off an
optional `addedAt` field (ISO date, e.g. `"2026-09-10"`) — entries with an
`addedAt` inside the last 7 days show there. **The publish script needs to add
this** when it appends an entry, otherwise nothing ever lands in that group:

```json
{ "name": "...", "info": "...", "image": "...", "addedAt": "2026-09-10" }
```

Entries without `addedAt` still render fine — they just only ever appear in the
full "All Invincibles" list, never in "this week". The existing hand-entered
rows have no `addedAt` and that's expected.

## Safe to change freely — won't break the automation

- How `candidateStories` is *rendered*: layout, styling, which components use
  it, splitting it into sections, "load more", etc. `HeroSection.tsx`,
  `TransformationSection.tsx` currently just import and map over the array —
  change that however you like.
- Hand-editing existing entries to add extra optional fields. The automation
  only ever appends `{name, info, image}` and never reads or validates
  anything else, so extra fields on existing rows are ignored, not broken.
- Anything about how `army-feed.json` / the notifications UI renders — this
  automation only reads that file for the weekly digest, never writes it.
- New pages, routing, styling, unrelated data files — none of it is coupled
  to this automation.

## Needs coordination first — tell me before or right after

- Renaming or moving `src/data/candidate-selections.json` or
  `public/assets/client_photo/` — both paths are hardcoded in the publish
  script.
- Changing `candidate-selections.json` from a flat array to anything else
  (nested object, per-category buckets, etc.) — the append logic assumes a
  flat array.
- Making any field other than `name`/`info`/`image` *required* for a
  candidate to render — new entries from the automation won't have it until
  I update the publish script to match.
- Changing `army-feed.json`'s field names (`title`, `link`, `date`,
  `category`, `status`) — the weekly summary job reads those exact keys.

## Known rough edge, not fixed

Photo filenames are just the slugified candidate name (`rahul-sharma.jpg`).
Two candidates with the same name overwrite each other's photo. Tell me if it
actually happens and filenames can be keyed by an id instead.
