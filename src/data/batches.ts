// Single source of truth for batch cards (UpcomingBatches + NewCoursesModal).
// Edit dates/fees here; both views pick them up.
import { plusDays, isCurrent, SSB_VISIBLE_DAYS, WRITTEN_EXAM_END } from "@/lib/batch-visibility";
import { CATALOGUE } from "./catalogue";

export interface Slot {
  start: string; // YYYY-MM-DD
  label: string; // "15 Sep 2026" — also goes into the WhatsApp message
  until: string; // last day the slot stays listed (YYYY-MM-DD)
}

export interface Batch {
  id: keyof typeof CATALOGUE; // key into the price catalogue
  title: string;
  highlight: string; // badge text
  tagline: string;
  description: string;
  points: string[];
  fee: string;
  note?: string;
  duration: string;
  slots: Slot[];
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const label = (iso: string) => {
  const [y, m, d] = iso.split("-");
  return `${d} ${MONTHS[+m - 1]} ${y}`;
};

// SSB slots drop off the day after they start.
const ssbSlot = (iso: string): Slot => ({ start: iso, label: label(iso), until: plusDays(iso, SSB_VISIBLE_DAYS) });
// Integrated (written + SSB) slots stay until the exam.
const writtenSlot = (iso: string, exam: keyof typeof WRITTEN_EXAM_END): Slot => ({
  start: iso,
  label: label(iso),
  until: WRITTEN_EXAM_END[exam],
});

const integrated = (exam: "NDA" | "CDS", id: string, focus: string): Batch => ({
  id,
  title: CATALOGUE[id].title,
  highlight: "Written + SSB",
  tagline: "The objective: your name in the final merit.",
  description: `Integrated written + SSB mentorship for ${exam} in small batches, Oct 2026 to Apr 2027. A progressive learn → practice → revise → test → analyse → correct model, with SSB orientation running alongside the written syllabus so no one is left behind.`,
  points: [
    "185 structured touchpoints: 131 training days, 17 mocks, 15 feedback sessions, 22 doubt-clearing sessions",
    focus,
    "In-house Shaastra study material, DPPs, map practice & weekly current affairs",
    "Individual feedback report after every mock & one-to-one mentoring (Vyaktigat Margdarshan)",
    "Psychology & performance support: time optimisation, stress management, answering techniques",
  ],
  fee: "₹60,000 + GST",
  duration: "Oct 2026 – Apr 2027",
  slots: [writtenSlot("2026-10-01", exam)],
});

const allBatches: Batch[] = [
  {
    id: "ssb-offline",
    title: CATALOGUE["ssb-offline"].title,
    highlight: "Offline Mode",
    tagline: "The Ultimate 21-Day Immersive SSB Simulation.",
    description:
      "A fully offline, intensive and holistic module conducted exactly on SSB lines. 21 days of extensive training, then online support as part of the Future Leaders' group till your SSB — even if it is six months away.",
    points: [
      "SSB-style personality assessment, psych tests, GTO tasks & interview readiness",
      "Live GTO practice on real GTO grounds",
      "Orientation by Interviewing Officers, Psychologists & GTOs",
      "Mock practices with detailed feedback, individual correction & hand-holding till SSB",
      "Personality development, communication skills & current affairs classes",
    ],
    fee: "₹23,600 (incl. GST)",
    note: "Excludes accommodation & food · Registration ₹3,600 (non-refundable) · 25 seats only",
    duration: "21 Days + Support till SSB",
    slots: ["2026-09-21", "2026-10-06", "2026-10-12", "2026-10-26", "2026-11-02"].map(ssbSlot),
  },
  {
    id: "officer-online",
    title: CATALOGUE["officer-online"].title,
    highlight: "Online Mode",
    tagline: "It is not coaching. It is officer-readiness mentoring.",
    description:
      "Structured guidance, clarity and personality orientation without full-time offline coaching. The initial 15 days assess your personality on SSB lines and identify strengths and weaknesses, followed by online hand-holding till your SSB.",
    points: [
      "Daily discipline, structured routine & officer-like decision-making",
      "Confidence, effective communication, interview presence & articulation",
      "Regular live interactive sessions with guided tasks & reflections",
      "Personal feedback, mentoring & exposure to SSB assessment logic",
      "Ideal if you are balancing college, a job or academics",
    ],
    fee: "₹17,700",
    duration: "15 Days + Online Support",
    slots: [], // 14 Sep 2026 batch has started; add the next launch date as ["2026-MM-DD"].map(ssbSlot)
  },
  integrated(
    "NDA",
    "nda-integrated",
    "Phase-wise syllabus: Foundation (Oct) → Academic Build-Up (Nov) → Complete Syllabus (Dec–Jan) → Consolidation (Feb) → NDA Exam Mode (Mar–Apr 2027)",
  ),
  integrated(
    "NDA",
    "nda-foundation",
    "Phase-wise syllabus: Foundation (Oct) → Academic Build-Up (Nov) → Integrated Build-Up across GS, Physics, Chemistry, Biology, English & Maths (Dec–Feb) → Consolidated revision (Mar–Apr 2027)",
  ),
  integrated(
    "CDS",
    "cds-integrated",
    "Phase-wise syllabus: Foundation (Oct) → Academic Build-Up (Nov) → Complete Syllabus (Dec–Jan) → Consolidation (Feb) → CDS Exam Mode (Mar–Apr 2027)",
  ),
];

// Expired slots disappear; a batch with no open slot disappears with them.
export const batches: Batch[] = allBatches
  .map((b) => ({ ...b, slots: b.slots.filter(isCurrent) }))
  .filter((b) => b.slots.length > 0);

// The batch starting soonest, for the hero "Join" button. Undefined when nothing is open.
export const nextBatch: { batch: Batch; slot: Slot } | undefined = batches
  .flatMap((batch) => batch.slots.map((slot) => ({ batch, slot })))
  .sort((a, b) => a.slot.start.localeCompare(b.slot.start))[0];
