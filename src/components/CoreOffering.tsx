import { motion } from "framer-motion";
import { BookOpen, Users, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import {
  CONTAINER,
  EYEBROW,
  H2_LIGHT,
  H3_LIGHT,
  BODY_LIGHT,
  SECTION_PAD,
  SECTION_HEADER_MB,
  GRID_GAP,
  EASE_OUT,
} from "@/lib/design-system";

const offerings = [
  {
    Icon: BookOpen,
    title: "Written Examination Training",
    summary: "Highly structured preparation for the NDA, CDS, and AFCAT written examinations.",
    bullets: [
      "Comprehensive modules for General Knowledge, Mathematics, and English",
      "Advanced test series with precise performance analytics",
      "In-depth analysis of past papers and strategic exam planning",
    ],
    href: "/programs/written-exam",
  },
  {
    Icon: Users,
    title: "SSB Interview Preparation",
    summary:
      "End-to-end mentorship conducted by Ex-SSB Assessors with profound internal board experience.",
    bullets: [
      "Psychological Battery: TAT, WAT, SRT, and SD evaluations",
      "GTO tasks, group discussions, and command task simulations",
      "Intensive personal interviews and comprehensive mock SSB Interview cycles",
    ],
    href: "/programs/ssb-interview",
  },
  {
    Icon: Shield,
    title: "Future Leader Bootcamp",
    summary:
      "A foundational program for students from Class 9 onwards, engineered to instill discipline, leadership, and Officer-Like Qualities (OLQs).",
    bullets: [
      "Advanced personality and confidence building",
      "Strategic communication and leadership training",
      "Professional discipline and routine structuring",
      "Early exposure to the SSB Interview mindset",
    ],
    subtitle: "Class 9 onwards",
    href: "/programs/future-leader",
  },
];

const CoreOffering = () => {
  return (
    <section id="programs" className={`bg-[#F1FFFF] ${SECTION_PAD}`}>
      <div className={CONTAINER}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className={SECTION_HEADER_MB}
        >
          <p className={`${EYEBROW} mb-4`}>Our Expertise</p>
          <h2 className={H2_LIGHT}>
            Three Distinct Tracks.
            <br />
            One Decisive Mission.
          </h2>
        </motion.div>

        {/* 3-column grid — stagger 50ms, scale 0.98 initial */}
        <div className={`grid md:grid-cols-3 ${GRID_GAP}`}>
          {offerings.map(({ Icon, title, summary, bullets, subtitle, href }, i) => (
            <Link key={title} to={href} className="h-full" style={{ textDecoration: "none" }}>
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.05 }}
              className="group relative overflow-hidden bg-white border border-[#e5e7eb] rounded-xl p-6 md:p-8 flex flex-col cursor-pointer h-full"
              style={{
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition:
                  "transform 280ms cubic-bezier(0.23,1,0.32,1), box-shadow 280ms cubic-bezier(0.23,1,0.32,1), border-color 280ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,86,140,0.10)";
                e.currentTarget.style.borderColor = "rgba(0,86,140,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              {/* Background image layer — fades in on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ backgroundImage: "url('/assets/bg-cards.jpeg')" }}
              />
              {/* Scrim for text readability */}
              <div className="absolute inset-0 bg-[#00568C]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

              {/* Card contents */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div
                  className="w-9 h-9 rounded-md flex items-center justify-center mb-6 shrink-0 bg-[#eaf6f8] group-hover:bg-white transition-colors duration-300"
                >
                  <Icon className="w-4 h-4 text-[#00568C]" />
                </div>

                <h3 className={`${H3_LIGHT} mb-1 leading-snug group-hover:text-white transition-colors duration-300`}>
                  {title}
                </h3>
                {subtitle && (
                  <span className="inline-block mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2FB4E7] group-hover:text-[#F6B828] transition-colors duration-300">
                    {subtitle}
                  </span>
                )}
                <p className={`${BODY_LIGHT} mb-6 group-hover:text-white/85 transition-colors duration-300`}>
                  {summary}
                </p>

                <div className="w-6 h-px bg-[#e5e7eb] group-hover:bg-white/30 mb-6 transition-colors duration-300" />

                <ul className="space-y-2.5 mt-auto">
                  {bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 font-sans text-sm text-[#6B7280] group-hover:text-white/80 transition-colors duration-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#2FB4E7] mt-[7px] shrink-0 group-hover:bg-[#F6B828] transition-colors duration-300" />
                      {bullet}
                    </li>
                  ))}
                </ul>

              </div>
            </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreOffering;
