import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTAINER, EASE_OUT } from "@/lib/design-system";

const videos = [
  { id: "pQdI_IZkLfU", title: "SSB Psychology Decoded" },
  { id: "BpD_cD_u4DU", title: "OLQ Development Masterclass" },
  { id: "YW84uCtwBs8", title: "GTO Tasks — Insider Strategy" },
  { id: "UR9nUcm29ro", title: "Personal Interview Deep Dive" },
  { id: "OFbgMnJhWvU", title: "Selection Secrets from the Board" },
];

// ── Card variants for parent→child propagation ──────────────────────────────
const cardVariants = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.03,
    transition: { type: "spring", stiffness: 320, damping: 24 },
  },
};

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.22, ease: "easeOut" } },
};

const playIconVariants = {
  rest: { scale: 0.88, opacity: 0 },
  hover: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 400, damping: 20, delay: 0.04 },
  },
};

// ── Video Card ───────────────────────────────────────────────────────────────
const VideoCard = ({ id, title, index }: { id: string; title: string; index: number }) => {
  const [playing, setPlaying] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.5, ease: EASE_OUT, delay: index * 0.09 }}
      // Snap on mobile
      className="snap-start flex-shrink-0 w-[85vw] sm:w-auto flex flex-col gap-3"
    >
      {/* Animated card wrapper — propagates "hover" variant to children */}
      <motion.div
        variants={cardVariants}
        initial="rest"
        whileHover="hover"
        className="flex flex-col gap-3 cursor-pointer"
        onClick={() => !playing && setPlaying(true)}
      >
        {/* ── Thumbnail / Iframe ────────────────────────────────────────── */}
        <div
          className="relative w-full overflow-hidden rounded-xl"
          style={{
            paddingBottom: "56.25%",
            background: "#dbe9f4",
          }}
        >
          {/* Glow border on hover — rendered as inset box-shadow via motion */}
          <motion.div
            className="absolute inset-0 rounded-xl pointer-events-none z-10"
            variants={{
              rest: { boxShadow: "0 0 0 1px rgba(0,86,140,0.10), 0 2px 12px rgba(0,0,0,0.06)" },
              hover: { boxShadow: "0 0 0 2px rgba(47,180,231,0.55), 0 12px 40px rgba(0,86,140,0.16)" },
            }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            style={{ borderRadius: "inherit" }}
          />

          <AnimatePresence initial={false}>
            {playing ? (
              /* ── Iframe (loads only after click) ── */
              <motion.iframe
                key="iframe"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                style={{ border: "none" }}
              />
            ) : (
              /* ── Thumbnail ── */
              <motion.div key="thumb" className="absolute inset-0">
                {/* Thumbnail image */}
                <img
                  src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                  alt={title}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />

                {/* Bottom gradient overlay for text readability */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(to top, rgba(0,28,52,0.55) 0%, transparent 55%)",
                  }}
                />

                {/* Hover tint overlay */}
                <motion.div
                  variants={overlayVariants}
                  className="absolute inset-0"
                  style={{ background: "rgba(0,86,140,0.18)" }}
                />

                {/* Custom play button */}
                <motion.div
                  variants={playIconVariants}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div
                    className="flex items-center justify-center rounded-full"
                    style={{
                      width: 52,
                      height: 52,
                      background: "rgba(255,255,255,0.96)",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.28)",
                    }}
                  >
                    {/* Triangle play icon */}
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      style={{ marginLeft: 3 }}
                    >
                      <path d="M4 2.5L14.5 9L4 15.5V2.5Z" fill="#00568C" />
                    </svg>
                  </div>
                </motion.div>

                {/* Duration badge placeholder — subtle bottom-right */}
                <div
                  className="absolute bottom-2.5 left-3 font-sans text-[10px] font-semibold text-white/80 tracking-wide"
                  style={{ textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}
                >
                  WATCH NOW
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Title ─────────────────────────────────────────────────────── */}
        <motion.p
          variants={{
            rest: { color: "#374151" },
            hover: { color: "#00568C" },
          }}
          transition={{ duration: 0.18 }}
          className="font-sans text-sm font-semibold leading-snug line-clamp-2 px-0.5"
        >
          {title}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

// ── Section ──────────────────────────────────────────────────────────────────
const PodcastSection = () => {
  return (
    <section className="py-24 bg-[#eaf6f8] border-t border-[#e5e7eb]">
      <div className={CONTAINER}>

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12"
        >
          <div>
            <p className="font-sans text-[11px] font-bold tracking-[0.3em] uppercase text-[#2FB4E7] mb-3">
              Insights &amp; Podcasts
            </p>
            <h2
              className="font-serif text-3xl md:text-4xl font-bold text-[#00568C]"
              style={{ letterSpacing: "-0.02em", lineHeight: 1.1 }}
            >
              Learn From the Experts
            </h2>
            <p className="mt-3 font-sans text-sm text-[#6B7280] max-w-sm leading-relaxed">
              Conversations with Ex-SSB Assessors, recommended officers, and defence mentors.
            </p>
          </div>

          {/* Subtle CTA link */}
          <a
            href="https://www.youtube.com/@learntolivetolearn"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-1.5 font-sans text-sm font-semibold text-[#00568C] hover:text-[#2FB4E7] transition-colors duration-150"
          >
            View all episodes
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>

        {/* ── Grid — desktop/tablet, horizontal scroll on mobile ── */}
        <div
          className="
            flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4
            sm:grid sm:grid-cols-2 sm:overflow-visible sm:snap-none sm:pb-0
            lg:grid-cols-3
          "
          style={{ scrollbarWidth: "none" }}
        >
          {videos.map(({ id, title }, i) => (
            <VideoCard key={id} id={id} title={title} index={i} />
          ))}
        </div>

        {/* Mobile scroll hint dots */}
        <div className="flex justify-center gap-1.5 mt-5 sm:hidden">
          {videos.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: i === 0 ? 18 : 6,
                height: 6,
                background: i === 0 ? "#00568C" : "rgba(0,86,140,0.20)",
                transition: "all 300ms ease",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PodcastSection;
