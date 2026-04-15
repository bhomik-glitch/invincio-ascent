import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, CalendarCheck, ChevronDown, X } from "lucide-react";
import ConsultationModal from "@/components/ConsultationModal";

const EASE_OUT: [number, number, number, number] = [0.23, 1, 0.32, 1];
const GRID_COLS = 2; // desktop columns

const programs = [
  {
    id: "nda-cds-online",
    title: "NDA/CDS Online",
    tagline: "Officer prep, anywhere, anytime.",
    description:
      "Comprehensive digital mentorship ensuring geographic distance is never a barrier to your officer dreams.",
    points: [
      "Live interactive strategy sessions",
      "Comprehensive digital study material",
      "Regular online mock assessments",
      "Direct doubt clearing with mentors",
      "Personalized performance tracking",
    ],
    duration: "4–6 Months",
    audience: ["College Students", "Job Holders", "Distance Learners"],
  },
  {
    id: "nda-cds-offline",
    title: "NDA/CDS Offline",
    tagline: "Precision training in person.",
    description:
      "Immersive classroom experience with rigorous discipline and a peer-to-peer learning environment.",
    points: [
      "Direct face-to-face mentorship",
      "Structured classroom environment",
      "Daily physical conditioning drills",
      "In-house library & resources",
      "Regular group discussion practice",
    ],
    duration: "6 Months",
    audience: ["Full-time Aspirants", "Local Students"],
  },
  {
    id: "ssb-interview",
    title: "SSB Interview Track",
    tagline: "Master the psychology of selection.",
    description:
      "Specialized personality development program tailored for all selection boards of the Indian Armed Forces.",
    points: [
      "Real-world GTO Task simulations",
      "Psychological battery modules",
      "Mock Interviews with Ex-SSB Assessors",
      "Strategic feedback sessions",
      "Selection-focused character evolution",
    ],
    duration: "2–4 Weeks",
    audience: ["Written Qualified Candidates", "Direct Entry Aspirants"],
  },
  {
    id: "future-leaders",
    title: "Future Leaders",
    tagline: "Drafting the future of leadership.",
    description:
      "Foundational character-building program designed to instill Officer-Like Qualities (OLQs) from an early age.",
    points: [
      "Leadership and Initiative workshops",
      "Effective communication training",
      "Critical thinking and logic puzzles",
      "Ethical decision-making drills",
      "Public speaking and articulation",
    ],
    duration: "1 Year",
    audience: ["Class 9 onwards", "Early Dreamers"],
  },
  {
    id: "civil-services",
    title: "Civil Services Personality Test",
    tagline: "The final step to prestige.",
    description:
      "Refined guidance for the Civil Services personality test with a focus on administrative leadership and poise.",
    points: [
      "In-depth DAF analysis & briefing",
      "Mock panels with retired officers",
      "Current affairs & policy discussions",
      "Body language & voice modulation",
      "Stress management techniques",
    ],
    duration: "2 Months",
    audience: ["UPSC Mains Qualified"],
  },
];

// Group programs into rows of GRID_COLS each
const rows = Array.from(
  { length: Math.ceil(programs.length / GRID_COLS) },
  (_, i) => programs.slice(i * GRID_COLS, (i + 1) * GRID_COLS)
);

const Programs = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>();

  const expansionRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const openModal = (title: string) => {
    setSelectedProgram(title);
    setModalOpen(true);
  };

  const handleToggle = (id: string, rowIdx: number) => {
    const next = activeId === id ? null : id;
    setActiveId(next);
    if (next) {
      // Scroll to expansion panel after animation starts
      setTimeout(() => {
        expansionRefs.current[rowIdx]?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        });
      }, 80);
    }
  };

  const activeProgram = programs.find((p) => p.id === activeId) ?? null;

  return (
    <div className="bg-[#F1FFFF] min-h-screen">

      {/* ── Page Header (replaces HeroSection banner) ── */}
      <div className="bg-white border-b border-[#e5e7eb] px-4 sm:px-6 md:px-12 pt-10 pb-8 md:pt-12 md:pb-10">
        <div className="max-w-7xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="font-sans text-[11px] font-bold tracking-[0.3em] uppercase text-[#2FB4E7] mb-3"
          >
            Training Programs
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.06 }}
            className="font-serif text-3xl md:text-4xl font-bold text-[#00568C] mb-3"
          >
            Choose Your Path to Selection
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.12 }}
            className="font-sans text-sm text-[#6B7280] max-w-lg leading-relaxed"
          >
            Click any program card to see what's inside — curriculum, features, and how to enroll.
          </motion.p>
        </div>
      </div>

      {/* ── Programs Grid + Accordion ── */}
      <section className="py-10 md:py-14 px-4 sm:px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          {rows.map((row, rowIdx) => {
            const rowActiveProgram = row.find((p) => p.id === activeId);
            const isRowExpanded = !!rowActiveProgram;

            return (
              <div key={rowIdx}>
                {/* Card row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-3">
                  {row.map((program, colIdx) => {
                    const isActive = program.id === activeId;
                    const globalIdx = rowIdx * GRID_COLS + colIdx;

                    return (
                      <motion.div
                        key={program.id}
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{
                          duration: 0.4,
                          ease: EASE_OUT,
                          delay: globalIdx * 0.05,
                        }}
                      >
                        <button
                          onClick={() => handleToggle(program.id, rowIdx)}
                          className="w-full text-left rounded-2xl p-7 flex flex-col"
                          style={{
                            background: "white",
                            border: `1.5px solid ${isActive ? "#00568C" : "#e5e7eb"}`,
                            boxShadow: isActive
                              ? "0 8px 32px rgba(0,86,140,0.12)"
                              : "0 1px 4px rgba(0,0,0,0.04)",
                            transform: isActive ? "scale(1.015)" : "scale(1)",
                            transition:
                              "border-color 250ms ease-out, box-shadow 250ms ease-out, transform 250ms ease-out",
                          }}
                        >
                          {/* Top: audience tags + duration + toggle icon */}
                          <div className="flex justify-between items-start mb-5">
                            <div className="flex flex-wrap gap-1.5">
                              {program.audience.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full font-sans font-semibold"
                                  style={{
                                    background: "rgba(47,180,231,0.08)",
                                    color: "#00568C",
                                    border: "1px solid rgba(47,180,231,0.2)",
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-2 shrink-0 ml-2">
                              <span
                                className="text-[10px] px-2.5 py-0.5 rounded-full font-sans font-medium"
                                style={{ background: "#eaf6f8", color: "#00568C" }}
                              >
                                {program.duration}
                              </span>
                              <div
                                className="w-6 h-6 rounded-full flex items-center justify-center shrink-0"
                                style={{
                                  background: isActive ? "#00568C" : "#f3f4f6",
                                  transition: "background 250ms ease-out",
                                }}
                              >
                                {isActive ? (
                                  <X className="w-3 h-3 text-white" />
                                ) : (
                                  <ChevronDown
                                    className="w-3 h-3"
                                    style={{ color: "#9CA3AF" }}
                                  />
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Title */}
                          <h3
                            className="font-serif text-xl md:text-2xl font-semibold leading-tight mb-2"
                            style={{
                              color: isActive ? "#00568C" : "#111827",
                              transition: "color 200ms ease",
                            }}
                          >
                            {program.title}
                          </h3>

                          {/* Tagline */}
                          <p className="font-sans text-sm text-[#6B7280] italic">
                            {program.tagline}
                          </p>
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* ── Expansion Panel for this row ── */}
                <AnimatePresence initial={false}>
                  {isRowExpanded && rowActiveProgram && (
                    <motion.div
                      key={rowActiveProgram.id}
                      ref={(el) => {
                        expansionRefs.current[rowIdx] = el;
                      }}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className="overflow-hidden mb-5"
                    >
                      <div
                        className="rounded-2xl p-8 md:p-10"
                        style={{
                          background:
                            "linear-gradient(135deg, #f0f9ff 0%, #eaf6f8 100%)",
                          border: "1.5px solid rgba(0,86,140,0.12)",
                        }}
                      >
                        <div className="max-w-3xl">
                          {/* Header */}
                          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#00568C] mb-3">
                            {rowActiveProgram.title}
                          </h3>
                          <p className="font-sans text-[#374151] text-sm md:text-base leading-relaxed mb-8">
                            {rowActiveProgram.description}
                          </p>

                          {/* Feature list */}
                          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 mb-9">
                            {rowActiveProgram.points.map((point, i) => (
                              <motion.div
                                key={point}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{
                                  duration: 0.25,
                                  ease: EASE_OUT,
                                  delay: 0.1 + i * 0.04,
                                }}
                                className="flex gap-3 items-start"
                              >
                                <CheckCircle2
                                  className="w-4 h-4 mt-0.5 shrink-0"
                                  style={{ color: "#2FB4E7" }}
                                />
                                <span className="font-sans text-sm text-[#374151]">
                                  {point}
                                </span>
                              </motion.div>
                            ))}
                          </div>

                          {/* CTA */}
                          <button
                            onClick={() => openModal(rowActiveProgram.title)}
                            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-sans font-bold text-sm"
                            style={{
                              background: "#00568C",
                              color: "white",
                              boxShadow: "0 4px 16px rgba(0,86,140,0.25)",
                              transition:
                                "background 200ms ease, box-shadow 200ms ease, transform 120ms ease",
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = "#004a7a";
                              e.currentTarget.style.boxShadow =
                                "0 6px 24px rgba(0,86,140,0.35)";
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = "#00568C";
                              e.currentTarget.style.boxShadow =
                                "0 4px 16px rgba(0,86,140,0.25)";
                            }}
                            onMouseDown={(e) =>
                              (e.currentTarget.style.transform = "scale(0.97)")
                            }
                            onMouseUp={(e) =>
                              (e.currentTarget.style.transform = "scale(1)")
                            }
                          >
                            <CalendarCheck className="w-4 h-4" />
                            Book Free Consultation
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Bottom CTA banner ── */}
      <section
        className="py-14 md:py-24 border-t border-[#e5e7eb]"
        style={{ background: "linear-gradient(135deg, #00568C 0%, #003d66 100%)" }}
      >
        <div className="max-w-xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="font-serif text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Not sure which program fits you?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 }}
            className="font-sans text-sm text-white/70 mb-8 leading-relaxed"
          >
            Talk to one of our Ex-SSB Assessors for free — zero commitment, total clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.18 }}
          >
            <button
              onClick={() => openModal("General Inquiry")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#F6B828] text-[#00568C] px-10 py-4 text-sm font-bold tracking-wide"
              style={{
                boxShadow: "0 4px 20px rgba(246,184,40,0.35)",
                transition:
                  "background-color 200ms ease, box-shadow 200ms ease, transform 120ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e0a720";
                e.currentTarget.style.boxShadow =
                  "0 6px 28px rgba(246,184,40,0.50)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F6B828";
                e.currentTarget.style.boxShadow =
                  "0 4px 20px rgba(246,184,40,0.35)";
              }}
              onMouseDown={(e) =>
                (e.currentTarget.style.transform = "scale(0.97)")
              }
              onMouseUp={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CalendarCheck className="h-4 w-4" />
              Book Free Consultation
            </button>
          </motion.div>
        </div>
      </section>

      <ConsultationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        program={selectedProgram}
      />
    </div>
  );
};

export default Programs;
