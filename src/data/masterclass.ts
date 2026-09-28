import { waHref } from "@/lib/whatsapp";

// Free 4-day Current Affairs & GD Masterclass. Takes over the hero's second
// button and tops Notifications until the last session ends, then both vanish.
export const MASTERCLASS = {
  title: "FREE Current Affairs & GD Masterclass",
  dates: "28 Sep – 01 Oct",
  poster: "/assets/gd-masterclass-sep-2026.webp",
  registerHref: waHref("Hi, I want to register for the FREE 4-Day Current Affairs & GD Masterclass (28 Sep – 01 Oct)"),
  endsAt: "2026-10-01T21:15:00+05:30", // Day 4 ends 9:15 PM IST
};

// Evaluated per page load, same as batch expiry.
export const masterclassLive = Date.now() < Date.parse(MASTERCLASS.endsAt);
