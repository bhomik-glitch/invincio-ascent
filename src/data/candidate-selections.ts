// Data lives in candidate-selections.json so the WhatsApp intake automation
// (Automation-studiocover/jobs/candidate-publish.js) can append to it directly.
import data from './candidate-selections.json';

// `addedAt` (ISO date, e.g. "2026-09-10") is optional. The weekly automation
// should stamp it on each new entry so /results can show "Recommended this week".
// Entries without it still render, just never in the "this week" group.
export const candidateStories = data as {
  name: string;
  info: string;
  image: string;
  addedAt?: string;
}[];

// Newest first, so the latest recommendations lead every surface that shows
// them (hero marquee, /results grid). Undated entries keep their JSON order.
export const sortedCandidateStories = [...candidateStories].sort((a, b) =>
  (b.addedAt ?? "").localeCompare(a.addedAt ?? "")
);
