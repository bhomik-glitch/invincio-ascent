import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, CalendarCheck } from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ConsultationModal from "@/components/ConsultationModal";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const programs = [
  {
    title: "NDA/CDS Online",
    description: "Comprehensive digital mentorship ensuring geographic distance is never a barrier to your officer dreams.",
    points: [
      "Live interactive strategy sessions",
      "Comprehensive digital study material",
      "Regular online mock assessments",
      "Direct doubt clearing with mentors",
      "Personalized performance tracking"
    ],
    tagline: "Officer prep, anywhere, anytime.",
    duration: "4-6 Months",
    audience: ["College Students", "Job Holders", "Distance Learners"]
  },
  {
    title: "NDA/CDS Offline",
    description: "Immersive classroom experience with rigorous discipline and peer-to-peer learning environment.",
    points: [
      "Direct face-to-face mentorship",
      "Structured classroom environment",
      "Daily physical conditioning drills",
      "In-house library & resources",
      "Regular group discussion practice"
    ],
    tagline: "Precision training in person.",
    duration: "6 Months",
    audience: ["Full-time Aspirants", "Local Students"]
  },
  {
    title: "SSB / AFSB / NSB / PSB / FSB",
    description: "Specialized personality development program tailored for all selection boards of the Indian Armed Forces.",
    points: [
      "Real-world GTO task simulations",
      "Psychological battery practice",
      "One-on-one Mock Interviews",
      "Individualized feedback sessions",
      "Confidence & Clarity workshops"
    ],
    tagline: "Master the psychology of selection.",
    duration: "2-4 Weeks",
    audience: ["Written Qualified Candidates", "Direct Entry Aspirants"]
  },
  {
    title: "Young Leaders",
    description: "Foundational character-building program designed to instill Officer-Like Qualities from an early age.",
    points: [
      "Leadership & Initiative workshops",
      "Effective communication training",
      "Critical thinking & logic puzzles",
      "Ethical decision making drills",
      "Public speaking & articulation"
    ],
    tagline: "Drafting the future of leadership.",
    duration: "1 Year",
    audience: ["School Students", "Early Dreamers"]
  },
  {
    title: "UPSC Interview",
    description: "Refined guidance for the Civil Services personality test with a focus on administrative leadership and poise.",
    points: [
      "In-depth DAF analysis & briefing",
      "Mock panels with retired officers",
      "Current affairs & policy discussions",
      "Body language & voice modulation",
      "Stress management techniques"
    ],
    tagline: "The final step to prestige.",
    duration: "2 Months",
    audience: ["UPSC Mains Qualified"]
  }
];

const Programs = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>();

  const openModal = (program: string) => {
    setSelectedProgram(program);
    setModalOpen(true);
  };

  return (
    <div className="bg-[#F1FFFF] min-h-screen">
      {/* Hero */}
      <HeroSection
        subtitle="Our Training Programs"
        title="Specialized Mentorship for Defence Excellence."
        description="From NDA/CDS written prep to SSB personality development, our programs are designed to build the next generation of military leaders with precision and purpose."
        backgroundImage="/assets/offlineclasses.jpeg"
        showStats={false}
      />

      {/* Programs Grid */}
      <section className="py-24 px-6 md:px-12 bg-[#F1FFFF]">
        <div className="max-w-7xl mx-auto">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="mb-14"
          >
            <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#2FB4E7] mb-4">
              What We Offer
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#00568C]">
              Choose Your Path to Selection
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {programs.map((program, idx) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.45, ease: EASE_OUT, delay: idx * 0.05 }}
                className="bg-white border border-[#e5e7eb] rounded-2xl p-8 flex flex-col"
                style={{
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "transform 280ms cubic-bezier(0.23,1,0.32,1), box-shadow 280ms cubic-bezier(0.23,1,0.32,1), border-color 280ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,86,140,0.10)";
                  e.currentTarget.style.borderColor = "rgba(0,86,140,0.20)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <div>
                  {/* Audience tags + duration */}
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-wrap gap-2">
                      {program.audience.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full font-sans font-semibold border"
                          style={{
                            background: "rgba(47,180,231,0.08)",
                            color: "#00568C",
                            borderColor: "rgba(47,180,231,0.25)",
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span
                      className="shrink-0 text-[10px] px-3 py-1 rounded-full font-sans font-medium"
                      style={{ background: "#eaf6f8", color: "#00568C" }}
                    >
                      {program.duration}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-serif text-2xl md:text-[1.6rem] font-semibold mb-3 leading-tight text-[#00568C]"
                    style={{ transition: "color 200ms ease" }}
                  >
                    {program.title}
                  </h3>

                  <p className="text-[#374151] text-sm md:text-base mb-8 leading-relaxed font-sans">
                    {program.description}
                  </p>

                  {/* Bullet points */}
                  <div className="space-y-3 mb-10">
                    {program.points.map((point) => (
                      <div key={point} className="flex gap-3 items-start">
                        <CheckCircle2
                          className="w-4 h-4 mt-0.5 shrink-0"
                          style={{ color: "#2FB4E7" }}
                        />
                        <span className="text-[#374151] text-sm font-sans">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card footer */}
                <div
                  className="mt-auto pt-5 border-t border-[#e5e7eb] flex items-center justify-between"
                >
                  <p className="italic text-[#6B7280] text-sm font-sans">
                    {program.tagline}
                  </p>
                  <button
                    onClick={() => openModal(program.title)}
                    className="flex items-center gap-1.5 text-[#00568C] text-xs font-semibold uppercase tracking-widest group/btn"
                    style={{ transition: "color 150ms ease" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#2FB4E7")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "#00568C")}
                  >
                    Learn More
                    <ArrowRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section
        className="py-24 border-t border-[#e5e7eb]"
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
            Talk to one of our ex-SSB assessors for free — zero commitment, total clarity.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.18 }}
          >
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F6B828] text-[#00568C] px-10 py-4 text-sm font-bold tracking-wide"
              style={{
                boxShadow: "0 4px 20px rgba(246,184,40,0.35)",
                transition: "background-color 200ms ease, box-shadow 200ms ease, transform 120ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e0a720";
                e.currentTarget.style.boxShadow = "0 6px 28px rgba(246,184,40,0.50)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F6B828";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(246,184,40,0.35)";
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <CalendarCheck className="h-4 w-4" />
              Book Free Consultation
            </a>
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
