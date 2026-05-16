import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck } from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import NotificationsModal from "./NotificationsModal";
import ResultsModal from "./ResultsModal";
import NewCoursesModal from "./NewCoursesModal";
import { candidateStories } from "@/data/candidate-selections";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.55, ease: EASE_OUT, delay },
});

const duplicatedStories = [...candidateStories, ...candidateStories];

const SSB_ENTRIES = [
  "NDA", "CDS – IMA", "CDS – OTA", "AFCAT – Flying",
  "SSC Tech", "TGC", "TES Entry", "NCC Entry", "Navy B.Tech", "Coast Guard",
];

const TickerText = ({ paused }: { paused: boolean }) => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIdx(i => (i + 1) % SSB_ENTRIES.length), 2000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.span
        key={idx}
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 0.28, ease: EASE_OUT }}
        style={{ display: "inline-block", whiteSpace: "nowrap", verticalAlign: "middle" }}
      >
        {SSB_ENTRIES[idx]}
      </motion.span>
    </AnimatePresence>
  );
};

interface HeroSectionProps {
  title?: string;
  description?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  backgroundSize?: string;
  showStats?: boolean;
  showCarousel?: boolean;
}

const HeroSection = ({
  title = "Transforming Defence Aspirants Into Officers",
  description = "Mentored by Ex-SSB Assessors, we deliver authentic personality development and proven success across all branches of the armed forces.",
  subtitle = "Defence Leadership Institute",
  backgroundImage = "/assets/hero-bg.png",
  backgroundPosition = "top",
  backgroundSize = "cover",
  showStats = true,
  showCarousel = false,
}: HeroSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [resultsOpen, setResultsOpen] = useState(false);
  const [newCoursesOpen, setNewCoursesOpen] = useState(false);
  const [waHovered, setWaHovered] = useState(false);

  const stats = [
    { value: "New Courses", action: () => setNewCoursesOpen(true) },
    { value: "Notifications", action: () => setNotifOpen(true) },
    { value: "Result Out !", action: () => setResultsOpen(true) },
  ];

  return (
    <>
    <section
      className="relative w-full min-h-[85vh] flex items-center bg-[#04060D] bg-no-repeat"
      style={{
        backgroundImage: `url('${backgroundImage}')`,
        backgroundSize,
        backgroundPosition,
      }}
    >
      {/* Dark overlay for image readability — hero special case */}
      <div className="absolute inset-0 bg-[#021526]/62" />


      {/* Strategic partner logo — top right */}
      <div className="absolute right-4 md:right-6 z-20" style={{ top: "4px" }}>
        <img
          src="/assets/Monks_and_Worriers_-_1-removebg-preview.png"
          alt="Monks and Warriors — Strategic Partners"
          className="w-14 sm:w-18 md:w-24 object-contain drop-shadow-lg"
        />
      </div>


<div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 pt-16 pb-10 md:pt-24 md:pb-16 flex items-center justify-center md:justify-end">

        {/* Glass content card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.05 }}
          className="w-full max-w-[580px] rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md p-6 sm:p-8 md:p-10"
          style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.40), inset 0 1px 0 rgba(255,255,255,0.06)" }}
        >

          {/* Eyebrow pill — sky blue accent */}
          <motion.div {...fadeUp(0.14)} className="mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/15 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white" style={{ backdropFilter: "blur(8px)" }}>
              {subtitle}
            </span>
          </motion.div>

          {/* H1 */}
          <motion.h1
            {...fadeUp(0.22)}
            className="mb-5 font-serif text-[1.8rem] sm:text-[2.2rem] font-bold text-white md:text-[3.1rem]"
            style={{ lineHeight: 1.06, letterSpacing: "-0.025em" }}
          >
            {title}
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            {...fadeUp(0.3)}
            className="mb-8 max-w-[400px] text-[15px] leading-relaxed text-white/75"
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.38)}
            className="mb-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            {/* Primary — golden yellow, deep blue text */}
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F6B828] px-6 py-3.5 text-sm font-semibold tracking-wide text-[#00568C]"
              style={{
                boxShadow: "0 4px 16px rgba(246,184,40,0.35)",
                transition: "background-color 200ms ease, box-shadow 200ms ease, transform 120ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e0a720";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(246,184,40,0.50)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F6B828";
                e.currentTarget.style.boxShadow = "0 4px 16px rgba(246,184,40,0.35)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <CalendarCheck className="h-4 w-4 shrink-0" />
              Book Free Consultation
            </button>

            {/* Secondary — glass outline with ticker */}
            <a
              href="https://wa.me/918601407444"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold tracking-wide text-white"
              style={{ transition: "background-color 200ms ease, border-color 200ms ease, transform 120ms ease" }}
              onMouseEnter={(e) => {
                setWaHovered(true);
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                setWaHovered(false);
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <TickerText paused={waHovered} />
            </a>
          </motion.div>

          {/* Bento grid — stats + GTO CTA */}
          {showStats && (
            <motion.div
              {...fadeUp(0.46)}
              className="border-t border-white/[0.07] pt-6"
            >
              {/* Bento wrapper */}
              <div
                className="grid w-full gap-2 grid-cols-1 sm:grid-cols-3"
              >
                {/* Top row — 3 cells, stacked on mobile */}
                {stats.map((stat, i) => (
                  <motion.button
                    key={stat.value}
                    onClick={stat.action}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.5 + i * 0.06 }}
                    className="flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.06] px-3 py-3 outline-none"
                    style={{ transition: "background-color 180ms ease, border-color 180ms ease" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(246,184,40,0.10)";
                      e.currentTarget.style.borderColor = "rgba(246,184,40,0.35)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.10)";
                    }}
                  >
                    <span className="text-[13px] font-semibold text-[#F6B828] whitespace-nowrap">{stat.value}</span>
                  </motion.button>
                ))}

                {/* Bottom row — spans all columns */}
                <motion.button
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.68 }}
                  className="col-span-1 sm:col-span-3 flex items-center justify-center gap-2 rounded-xl border border-[#F6B828]/35 bg-[#F6B828]/[0.08] py-3.5 text-[15px] font-semibold text-[#F6B828] tracking-wide outline-none"
                  style={{ transition: "background-color 180ms ease, border-color 180ms ease, transform 120ms ease" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(246,184,40,0.16)";
                    e.currentTarget.style.borderColor = "rgba(246,184,40,0.60)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(246,184,40,0.08)";
                    e.currentTarget.style.borderColor = "rgba(246,184,40,0.35)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                  </svg>
                  <span className="text-[14px] sm:text-[15px]">Train in the Biggest GTO Ground in Delhi</span>
                </motion.button>
              </div>
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>

    {/* Moving Image Section — Selections Carousel */}
    {showCarousel && (
      <div className="w-full bg-white py-12 border-b border-[#e5e7eb]">
      <div className="relative overflow-hidden w-full max-w-full">
        {/* Side Gradient Fades */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

        <motion.div
          className="flex gap-5 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 35, ease: "linear", repeat: Infinity }}
        >
          {duplicatedStories.map((story, index) => (
            <div
              key={index}
              className="group/card flex items-center bg-white rounded-xl border border-[#e5e7eb]"
              style={{
                minWidth: "min(420px, 80vw)",
                gap: "1.5rem",
                padding: "1.5rem 1.875rem",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "transform 250ms cubic-bezier(0.23,1,0.32,1), box-shadow 250ms ease, border-color 250ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.02)";
                e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,86,140,0.10)";
                e.currentTarget.style.borderColor = "rgba(47,180,231,0.30)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <div className="rounded-md overflow-hidden shrink-0" style={{ width: "96px", height: "96px" }}>
                <img
                  src={story.image}
                  alt={story.name}
                  className="block w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div className="flex flex-col text-left leading-tight" style={{ maxWidth: "240px" }}>
                <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#F6B828]">Invincible</span>
                <span className="font-serif font-semibold text-[#00568C]" style={{ fontSize: "1rem" }}>
                  {story.name}
                </span>
                <span className="font-sans text-[#6B7280]" style={{ fontSize: "0.8125rem", marginTop: "0.4rem", whiteSpace: "pre-line" }}>
                  {story.info}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
    )}

    <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    <NotificationsModal isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
    <ResultsModal isOpen={resultsOpen} onClose={() => setResultsOpen(false)} />
    <NewCoursesModal isOpen={newCoursesOpen} onClose={() => setNewCoursesOpen(false)} />
    </>
  );
};

export default HeroSection;
