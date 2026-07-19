import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import {
  CONTAINER,
  EYEBROW,
  SECTION_PAD,
  SECTION_HEADER_MB,
  H2_LIGHT,
  BODY_LIGHT,
  EASE_OUT,
} from "@/lib/design-system";

const posters = Object.values(
  import.meta.glob("@/assets/selected/*.jpeg", { eager: true, import: "default" })
) as string[];

const SelectedStudentsSection = () => {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [active]);

  return (
    <section id="selected-students" className={`bg-[#F1FFFF] ${SECTION_PAD} overflow-hidden`}>
      <style>{`
        @keyframes invincio-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .invincio-marquee {
          animation: invincio-marquee 45s linear infinite;
          will-change: transform;
        }
        .invincio-marquee:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .invincio-marquee { animation: none; }
        }
      `}</style>

      <div className={CONTAINER}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className={`${SECTION_HEADER_MB} text-center`}
        >
          <p className={`${EYEBROW} mb-4`}>Wall of Honour</p>
          <h2 className={H2_LIGHT}>Our Latest Recommendations</h2>
          <p className={`${BODY_LIGHT} mt-4 max-w-xl mx-auto`}>
            Every recommendation is a story of dedication. Meet the Invincibles
            who cleared their SSB and are on their way to serve the nation.
          </p>
        </motion.div>
      </div>

      {/* Full-bleed marquee */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        className="relative"
      >
        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-32 z-10 bg-gradient-to-r from-[#F1FFFF] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-32 z-10 bg-gradient-to-l from-[#F1FFFF] to-transparent" />

        <div className="invincio-marquee flex w-max gap-6 md:gap-8 px-4">
          {[...posters, ...posters].map((src, i) => (
            <motion.button
              key={i}
              type="button"
              onClick={() => setActive(src)}
              whileHover={{ y: -6, rotate: i % 2 === 0 ? -1 : 1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.28, ease: EASE_OUT }}
              className="shrink-0 rounded-xl bg-white p-2 border border-[#e5e7eb] shadow-[0_1px_4px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_36px_rgba(0,86,140,0.14)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2FB4E7]"
              aria-label={`View recommended student poster ${(i % posters.length) + 1}`}
            >
              <img
                src={src}
                alt={`Invincio recommended student ${(i % posters.length) + 1}`}
                loading="lazy"
                draggable={false}
                className="h-64 md:h-80 w-auto rounded-lg object-cover select-none"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#00223a]/80 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out"
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/80 hover:text-white p-2"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              src={active}
              alt="Recommended student poster"
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full rounded-xl shadow-2xl cursor-default"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default SelectedStudentsSection;
