/**
 * WhatsApp entry points and their Google Ads conversion tracking.
 *
 * Two labels, deliberately not one: "tapped WhatsApp while browsing" and
 * "abandoned the consultation form for WhatsApp" are different problems with
 * different fixes, and a single label would blur them together.
 */

const CONVERSION_ID = "AW-18079951507";

/** PLACEHOLDERS — paste the labels from the Google Ads conversion actions. */
export const WA_LABEL_SITE  = "PASTE_SITE_LABEL";   // FAB, CTA section, sidebar, batches modal
export const WA_LABEL_MODAL = "PASTE_MODAL_LABEL";  // links inside the consultation modal

export const WA_NUMBER = "918601407444";

/** Prefilled so Ankur can tell at a glance where a lead came from. */
export const WA_TEXT_SITE  = "Hi, I want to know about SSB coaching";
export const WA_TEXT_MODAL = "Hi, I was filling the consultation form";

export const waHref = (text: string) =>
  `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;

/**
 * Fire before navigating — on an <a> this runs in the click handler ahead of
 * the browser following the href, so the event is never lost to the page
 * going away.
 *
 * Placeholder labels resolve to a conversion action that does not exist yet;
 * Google Ads ignores those, so nothing breaks before they are pasted in.
 */
export function trackWhatsApp(label: string) {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: `${CONVERSION_ID}/${label}` });
  }
}
