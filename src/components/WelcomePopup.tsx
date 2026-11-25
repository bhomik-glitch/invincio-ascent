import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EASE_OUT } from "@/lib/design-system";
import { useModalLock } from "@/lib/modal-lock";

const SEEN_KEY = "invincio-wall-of-invincibles-seen-v2"; // bump to show everyone again
// The landscape artwork is an unreadable strip on a portrait phone, so phones get a 9:16 version.
const IMAGE =
  typeof window !== "undefined" && window.matchMedia?.("(max-width: 767px) and (orientation: portrait)").matches
    ? "/assets/wall-of-invincibles-mobile.webp"
    : "/assets/wall-of-invincibles.webp";

/** Wall of Invincibles image, shown once per browser on the first visit. */
const WelcomePopup = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Storage blocked: we couldn't remember the visit, so don't nag on every load.
    try {
      if (localStorage.getItem(SEEN_KEY)) return;
    } catch {
      return;
    }
    // Open only once the image is ready, so it never pops up empty.
    const img = new Image();
    img.onload = () => setOpen(true);
    img.src = IMAGE;
    return () => {
      img.onload = null;
    };
  }, []);

  // Counts as seen when closed, not when opened: a reload mid-popup must not use it up.
  const close = () => {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      // storage full or blocked: closing still has to work
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  useModalLock(open);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Wall of Invincibles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          className="fixed inset-0 z-[110] flex items-center justify-center bg-black/65 p-4 backdrop-blur-[3px]"
        >
          <motion.div
            initial={{ scale: 0.94, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 15 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            onClick={(e) => e.stopPropagation()}
            className="relative"
          >
            <img
              src={IMAGE}
              alt="Wall of Invincibles: Invincio candidates with their all-India ranks and entries"
              className="block max-h-[85vh] max-md:max-h-[82svh] w-auto max-w-full rounded-xl border-2 border-[#2FB4E7] shadow-[0_32px_80px_rgba(0,0,0,0.35)] lg:max-w-5xl"
            />
            <button
              autoFocus
              onClick={close}
              aria-label="Close"
              className="absolute -top-12 right-0 rounded-full bg-black/60 p-2.5 text-white hover:bg-black/80"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomePopup;
