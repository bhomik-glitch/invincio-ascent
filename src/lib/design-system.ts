/**
 * INVINCIO Design System
 *
 * Emil Kowalski principles applied:
 *   - Custom cubic-bezier easing (never default)
 *   - scale: 0.98 in initial — nothing appears from nothing
 *   - whileTap: scale(0.97) on all pressable elements
 *   - Stagger: 50ms between items (not 100ms)
 *   - Duration: 300-400ms for reveals, 120ms for press feedback
 *   - Specific transition properties — never animate 'all'
 *
 * Section sequence (NEVER stack 3+ darks):
 *   1. Hero          → bg-[#0E1116]  dark
 *   2. TrustStrip    → bg-[#161A22]  dark-surface
 *   3. CoreOffering  → bg-[#F5F7FA]  soft
 *   4. Process       → bg-white      light
 *   5. Results       → bg-[#0E1116]  dark
 *   6. Collabs       → bg-[#F5F7FA]  soft
 *   7. CTA           → bg-[#0E1116]  dark
 */

// ── Backgrounds ──────────────────────────────────────────────────────────────
export const BG_DARK    = "bg-[#0E1116]";
export const BG_SURFACE = "bg-[#161A22]";
export const BG_SOFT    = "bg-[#F5F7FA]";
export const BG_LIGHT   = "bg-white";

// ── Text ─────────────────────────────────────────────────────────────────────
export const TEXT_PRIMARY_DARK  = "text-[#E5E7EB]";
export const TEXT_SECONDARY_DARK  = "text-white/45";
export const TEXT_PRIMARY_LIGHT = "text-[#111111]";
export const TEXT_SECONDARY_LIGHT = "text-[#6B7280]";
export const TEXT_ACCENT        = "text-[#C2A46D]";

// ── Eyebrow (same on both dark and light) ────────────────────────────────────
export const EYEBROW =
  "font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#C2A46D]";

// ── Headings ─────────────────────────────────────────────────────────────────
export const H2_DARK  = "font-serif text-3xl md:text-4xl font-bold text-[#E5E7EB]";
export const H2_LIGHT = "font-serif text-3xl md:text-4xl font-bold text-[#111111]";
export const H3_DARK  = "font-serif text-lg font-bold text-[#E5E7EB]";
export const H3_LIGHT = "font-serif text-lg font-bold text-[#111111]";

// ── Body ─────────────────────────────────────────────────────────────────────
export const BODY_DARK  = "font-sans text-sm leading-relaxed text-white/45";
export const BODY_LIGHT = "font-sans text-sm leading-relaxed text-[#6B7280]";

// ── Cards ─────────────────────────────────────────────────────────────────────
export const CARD_DARK  =
  "bg-[#161A22] border border-white/[0.08] rounded-xl p-8 hover:border-white/[0.14] transition-colors";
export const CARD_LIGHT =
  "bg-white border border-gray-200 rounded-xl p-8 hover:border-gray-300 transition-colors";

// ── Layout ───────────────────────────────────────────────────────────────────
export const CONTAINER = "max-w-[1200px] mx-auto px-6 md:px-12";
export const SECTION_PAD = "py-24";
export const SECTION_HEADER_MB = "mb-14";
export const GRID_GAP = "gap-8";

// ── Easing curves ────────────────────────────────────────────────────────────
// Strong ease-out: starts fast, decelerates — use for entering elements & hovers
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
// Strong ease-in-out: natural arc — use for on-screen movement/morphing
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

// ── Framer Motion: whileTap for all pressable elements ───────────────────────
// Press: 120ms — instant feedback. Release: spring handles naturally.
export const TAP_SCALE = { scale: 0.97 } as const;
export const TAP_TRANSITION = { duration: 0.12, ease: EASE_OUT } as const;

// ── Buttons ──────────────────────────────────────────────────────────────────
export const BTN_PRIMARY =
  "inline-flex items-center gap-2 bg-[#C2A46D] text-[#0E1116] px-8 py-3.5 rounded-lg font-sans font-semibold text-sm tracking-wide hover:opacity-90 transition-opacity";
export const BTN_SECONDARY =
  "inline-flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-lg font-sans font-semibold text-sm tracking-wide hover:border-white/40 transition-colors";
export const BTN_TERTIARY =
  "inline-flex items-center gap-2 text-white/45 px-3 py-3.5 rounded-md font-sans font-medium text-sm hover:text-white/75 transition-colors";
