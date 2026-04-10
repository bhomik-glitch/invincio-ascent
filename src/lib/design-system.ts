/**
 * INVINCIO Design System — Light Theme
 *
 * Palette (60-30-10 rule):
 *   60% backgrounds  → #F1FFFF base, #eaf6f8 alt, #ffffff cards
 *   30% primary      → #00568C deep blue (headings, icons, navbar)
 *   10% accent       → #F6B828 golden CTA, #2FB4E7 sky links, #E66133 alerts
 *
 * Emil Kowalski principles:
 *   - Custom cubic-bezier easing (never default)
 *   - scale: 0.98 in initial — nothing appears from nothing
 *   - whileTap: scale(0.97) on all pressable elements
 *   - Stagger: 50ms between items
 *   - Duration: 300-400ms for reveals, 120ms for press feedback
 *   - Specific transition properties — never animate 'all'
 *
 * Section sequence:
 *   1. Hero          → bg image + subtle dark overlay (special case)
 *   2. CoreOffering  → bg-[#F1FFFF]  base
 *   3. ProcessSection → bg-[#eaf6f8]  alt-light
 *   4. ResultsSection → bg-white      card surface
 *   5. Collabs       → bg-[#F1FFFF]  base
 *   6. CTA           → bg-[#00568C]  deep blue (brand anchor)
 */

// ── Backgrounds ──────────────────────────────────────────────────────────────
export const BG_BASE    = "bg-[#F1FFFF]";
export const BG_ALT     = "bg-[#eaf6f8]";
export const BG_CARD    = "bg-white";
export const BG_PRIMARY = "bg-[#00568C]";   // used for CTA / brand anchors

// ── Text ─────────────────────────────────────────────────────────────────────
export const TEXT_HEADING      = "text-[#00568C]";
export const TEXT_BODY         = "text-[#374151]";
export const TEXT_MUTED        = "text-[#6B7280]";
export const TEXT_ON_PRIMARY   = "text-white";           // on deep-blue bg
export const TEXT_ACCENT_SKY   = "text-[#2FB4E7]";
export const TEXT_ACCENT_GOLD  = "text-[#F6B828]";

// ── Eyebrow labels ────────────────────────────────────────────────────────────
export const EYEBROW =
  "font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#2FB4E7]";

// ── Headings ─────────────────────────────────────────────────────────────────
export const H2_LIGHT = "font-serif text-3xl md:text-4xl font-bold text-[#00568C]";
export const H2_DARK  = "font-serif text-3xl md:text-4xl font-bold text-white";
export const H3_LIGHT = "font-serif text-lg font-bold text-[#00568C]";
export const H3_DARK  = "font-serif text-lg font-bold text-white";

// ── Body ─────────────────────────────────────────────────────────────────────
export const BODY_LIGHT = "font-sans text-sm leading-relaxed text-[#374151]";
export const BODY_DARK  = "font-sans text-sm leading-relaxed text-white/70";

// ── Cards ─────────────────────────────────────────────────────────────────────
export const CARD_LIGHT =
  "bg-white border border-[#e5e7eb] rounded-xl p-8 transition-[transform,box-shadow] duration-[280ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,86,140,0.10)]";

// ── Layout ───────────────────────────────────────────────────────────────────
export const CONTAINER       = "max-w-[1200px] mx-auto px-6 md:px-12";
export const SECTION_PAD     = "py-24";
export const SECTION_HEADER_MB = "mb-14";
export const GRID_GAP        = "gap-8";

// ── Easing curves ────────────────────────────────────────────────────────────
// Strong ease-out: starts fast, decelerates — entering elements & hovers
export const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
// Strong ease-in-out: natural arc — on-screen movement/morphing
export const EASE_IN_OUT: [number, number, number, number] = [0.77, 0, 0.175, 1];

// ── Framer Motion: whileTap for all pressable elements ───────────────────────
export const TAP_SCALE      = { scale: 0.97 } as const;
export const TAP_TRANSITION = { duration: 0.12, ease: EASE_OUT } as const;

// ── Buttons ──────────────────────────────────────────────────────────────────
// Primary CTA — golden yellow, dark text for max contrast
export const BTN_PRIMARY =
  "inline-flex items-center gap-2 bg-[#F6B828] text-[#00568C] px-8 py-3.5 rounded-lg font-sans font-semibold text-sm tracking-wide hover:bg-[#e0a720] transition-[background-color,transform] duration-[200ms] ease-out active:scale-[0.97]";

// Secondary — outlined deep blue
export const BTN_SECONDARY =
  "inline-flex items-center gap-2 border border-[#00568C] text-[#00568C] px-8 py-3.5 rounded-lg font-sans font-semibold text-sm tracking-wide hover:bg-[#00568C]/5 transition-[background-color,border-color] duration-[200ms] ease-out active:scale-[0.97]";

// Ghost on dark bg (for hero section)
export const BTN_GHOST_DARK =
  "inline-flex items-center gap-2 border border-white/25 text-white px-8 py-3.5 rounded-lg font-sans font-semibold text-sm tracking-wide hover:border-white/45 hover:bg-white/10 transition-[background-color,border-color] duration-[200ms] ease-out";
