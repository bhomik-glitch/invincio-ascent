import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE_OUT } from "@/lib/design-system";

/* Same ground imagery as the /difference section. Drop more files in to make it a slideshow. */
const GTO_IMAGES = ["/assets/GTO background.png"];

interface GtoGroundOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const GtoGroundOverlay = ({ isOpen, onClose }: GtoGroundOverlayProps) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || GTO_IMAGES.length < 2) return;
    setIdx(0);
    const id = setInterval(() => setIdx((i) => (i + 1) % GTO_IMAGES.length), 4000);
    return () => clearInterval(id);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          onClick={onClose}
          className="fixed inset-0 z-[120] overflow-hidden cursor-zoom-out"
        >
          {/* Ground imagery — slow Ken Burns push-in */}
          <AnimatePresence initial={false}>
            <motion.div
              key={idx}
              aria-hidden
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1.16 }}
              exit={{ opacity: 0 }}
              transition={{ opacity: { duration: 1 }, scale: { duration: 14, ease: "linear" } }}
              className="absolute inset-0"
              style={{
                backgroundImage: `url('${GTO_IMAGES[idx]}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </AnimatePresence>

          {/* Blue layer */}
          <div aria-hidden className="absolute inset-0" style={{ background: "rgba(0,42,86,0.72)" }} />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(0,6,20,0.55) 0%, rgba(0,86,140,0.30) 50%, rgba(0,6,20,0.60) 100%)",
            }}
          />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 z-10 p-2.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Caption */}
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 }}
              className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#2FB4E7] mb-4"
            >
              Our GTO Ground
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.32 }}
              className="font-serif text-3xl md:text-5xl font-bold text-white max-w-3xl"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
            >
              Train in the Biggest GTO Ground in Delhi
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.44 }}
              className="mt-4 inline-flex items-center gap-1.5 font-sans text-sm text-white/80"
            >
              <MapPin size={14} className="text-[#2FB4E7] shrink-0" />
              Full-scale obstacles, real group tasks — exactly as they run at the SSB centre
            </motion.p>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-10 font-sans text-[11px] uppercase tracking-[0.2em] text-white/45"
            >
              Tap anywhere to close
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GtoGroundOverlay;
