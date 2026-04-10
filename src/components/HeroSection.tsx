import { useState } from "react";
import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle } from "lucide-react";
import ConsultationModal from "./ConsultationModal";
import { candidateStories } from "@/data/candidate-selections";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 18, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { duration: 0.55, ease: EASE_OUT, delay },
});

const stats = [
  { value: "New Courses", label: "" },
  { value: "Notifications", label: "" },
  { value: "Result Out !", label: "" },
];

const duplicatedStories = [...candidateStories, ...candidateStories];

interface HeroSectionProps {
  title?: string;
  description?: string;
  subtitle?: string;
  backgroundImage?: string;
  showStats?: boolean;
}

const HeroSection = ({
  title = "Transforming Defence Aspirants into Officers.",
  description = "Mentored by Former SSB Assessors. Real personality development. Proven selections across all defence branches.",
  subtitle = "Defence Leadership Institute",
  backgroundImage = "/assets/hero-bg.png",
  showStats = true,
}: HeroSectionProps) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
    <section
      className="relative w-full min-h-[90vh] flex items-center bg-[#04060D] bg-cover bg-center bg-no-repeat -mt-16"
      style={{ backgroundImage: `url('${backgroundImage}')` }}
    >
      {/* Dark overlay for image readability — hero special case */}
      <div className="absolute inset-0 bg-[#021526]/62" />

      {/* Floating top-right pill */}
      <div
        className="absolute top-6 right-6 z-20 px-4 py-2 rounded-full border border-white/30 text-[11px] font-medium uppercase tracking-[0.18em] text-white shadow-sm"
        style={{ background: "rgba(0,0,0,0.30)", backdropFilter: "blur(16px)" }}
      >
        Since 2012
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pt-28 pb-20 flex items-center">

        {/* Glass content card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.05 }}
          className="max-w-[580px] rounded-2xl border border-white/10 bg-black/35 backdrop-blur-md p-8 md:p-10"
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
            className="mb-5 font-serif text-[2.5rem] font-bold text-white md:text-[3.1rem]"
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
            className="mb-8 flex flex-col gap-3 sm:flex-row"
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

            {/* Secondary — glass outline */}
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 px-6 py-3.5 text-sm font-semibold tracking-wide text-white"
              style={{ transition: "background-color 200ms ease, border-color 200ms ease, transform 120ms ease" }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.25)";
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <MessageCircle className="h-4 w-4 shrink-0" />
              WhatsApp Us
            </a>
          </motion.div>

          {/* Stats row — sky blue values */}
          {showStats && (
            <motion.div
              {...fadeUp(0.46)}
              className="flex flex-wrap gap-2 border-t border-white/[0.07] pt-6"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.5 + i * 0.07 }}
                  className="flex items-baseline gap-1.5 rounded-lg border border-white/10 bg-white/[0.06] px-3.5 py-2"
                >
                  <span className="text-sm font-bold text-[#F6B828]">{stat.value}</span>
                  <span className="text-[11px] text-white/55">{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>

    {/* Moving Image Section — Selections Carousel */}
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
              className="group/card flex items-center gap-4 bg-white rounded-xl px-5 py-4 min-w-[280px] border border-[#e5e7eb]"
              style={{
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
              <div className="w-16 aspect-square rounded-md overflow-hidden shrink-0">
                <img
                  src={story.image}
                  alt={story.name}
                  className="block w-full h-full object-cover object-[center_20%]"
                />
              </div>
              <div className="flex flex-col text-left leading-tight max-w-[160px]">
                <span className="font-serif text-sm font-semibold text-[#00568C]">
                  {story.name}
                </span>
                <span className="font-sans text-xs text-[#6B7280] mt-0.5 line-clamp-2">
                  {story.info}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>

    <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default HeroSection;
