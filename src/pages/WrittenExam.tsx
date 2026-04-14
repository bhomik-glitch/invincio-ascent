import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen, CheckCircle2, CalendarCheck, Target, Clock,
  BarChart2, FileText, Users, Layers, ArrowRight, ChevronDown,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ConsultationModal from "@/components/ConsultationModal";
import {
  CONTAINER, SECTION_PAD, EYEBROW, H2_LIGHT, H3_LIGHT,
  BODY_LIGHT, EASE_OUT, SECTION_HEADER_MB,
} from "@/lib/design-system";

const exams = [
  { name: "NDA",   full: "National Defence Academy"        },
  { name: "CDS",   full: "Combined Defence Services"       },
  { name: "AFCAT", full: "Air Force Common Admission Test" },
  { name: "TA",    full: "Technical Entry (SSB)"           },
];

type ExamKey = "NDA" | "CDS" | "AFCAT" | "TA";

type SyllabusGroup = { heading: string; items: string[] };
type SyllabusCard  = { icon: React.ElementType; title: string; groups: SyllabusGroup[] };

const syllabusMap: Record<ExamKey, SyllabusCard[]> = {
  NDA: [
    {
      icon: BarChart2,
      title: "Maths",
      groups: [
        { heading: "Algebra", items: ["Quadratic Equations", "Complex Numbers", "Logarithms", "Inequalities & Linear Programming"] },
        { heading: "Trigonometry", items: ["Identities & Formulae", "Heights & Distances", "Inverse Trigonometric Functions"] },
        { heading: "Calculus", items: ["Limits & Continuity", "Differentiation (basic)", "Integration & Applications"] },
        { heading: "Geometry & Mensuration", items: ["2D & 3D Shapes", "Coordinate Geometry", "Vectors & 3D Geometry"] },
        { heading: "Probability & Statistics", items: ["Mean, Median, Mode", "Basic Probability", "Permutations & Combinations"] },
      ],
    },
    {
      icon: BookOpen,
      title: "General Ability Test (GAT)",
      groups: [
        { heading: "History", items: ["Ancient India", "Medieval India", "Modern India & Freedom Struggle", "World History Highlights"] },
        { heading: "Geography", items: ["Physical Geography", "Indian Geography (rivers, climate, soil)", "World Geography & Map Work"] },
        { heading: "Current Affairs", items: ["Defence & Military Updates", "National Events", "International Affairs"] },
        { heading: "Science", items: ["Physics — Motion, Light, Electricity", "Chemistry — Periodic Table, Reactions", "Biology — Human Body, Ecology"] },
      ],
    },
    {
      icon: FileText,
      title: "English",
      groups: [
        { heading: "Grammar", items: ["Tenses", "Voice & Narration", "Prepositions & Articles", "Sentence Correction"] },
        { heading: "Vocabulary", items: ["Synonyms & Antonyms", "Idioms & Phrases", "One-Word Substitution"] },
        { heading: "Comprehension", items: ["Unseen Passages", "Précis Writing", "Inference & Tone"] },
        { heading: "Writing Skills", items: ["Essay Writing", "Letter Writing", "Report Writing"] },
      ],
    },
    {
      icon: Layers,
      title: "Physics, Chemistry & GK",
      groups: [
        { heading: "Physics", items: ["Motion & Newton's Laws", "Work, Energy & Power", "Heat & Thermodynamics", "Light & Optics", "Electricity & Magnetism"] },
        { heading: "Chemistry", items: ["Atomic Structure", "Periodic Table", "Chemical Reactions & Bonding", "Acids, Bases & Salts", "Carbon & Its Compounds"] },
        { heading: "Biology", items: ["Human Body Systems", "Cell Biology & Genetics", "Ecology & Environment", "Nutrition & Health"] },
      ],
    },
  ],
  CDS: [
    {
      icon: FileText,
      title: "English",
      groups: [
        { heading: "Grammar", items: ["Tenses & Modals", "Articles & Prepositions", "Voice & Narration", "Sentence Structure & Clause Analysis"] },
        { heading: "Vocabulary", items: ["Synonyms & Antonyms", "Analogies", "Idioms & Phrases", "Word Usage in Context"] },
        { heading: "Comprehension", items: ["Unseen Passages", "Inference-Based Questions", "Title & Theme Identification"] },
        { heading: "Writing Skills", items: ["Précis Writing", "Sentence Rearrangement", "Para Completion"] },
      ],
    },
    {
      icon: BookOpen,
      title: "General Knowledge",
      groups: [
        { heading: "History", items: ["Ancient & Medieval India", "Modern History & National Movement", "World History"] },
        { heading: "Geography", items: ["Physical Geography", "Indian Geography", "World Geography & Atlas"] },
        { heading: "Polity & Economy", items: ["Indian Constitution", "Governance & Panchayati Raj", "Basic Economics & Budget"] },
        { heading: "Science & Current Affairs", items: ["Science Innovations & Tech", "Defence Technology", "National & International Events"] },
      ],
    },
    {
      icon: BarChart2,
      title: "Elementary Mathematics",
      groups: [
        { heading: "Arithmetic", items: ["Number Systems & HCF/LCM", "Fractions & Decimals", "Ratio, Proportion & Percentages", "Profit, Loss & Interest"] },
        { heading: "Algebra", items: ["Linear & Quadratic Equations", "Indices & Logarithms", "Polynomials"] },
        { heading: "Geometry & Mensuration", items: ["Lines, Angles & Triangles", "Circles & Quadrilaterals", "Areas & Volumes"] },
        { heading: "Trigonometry & Statistics", items: ["Basic Trigonometric Ratios", "Heights & Distances", "Mean, Median, Mode & Range"] },
      ],
    },
  ],
  AFCAT: [
    {
      icon: BookOpen,
      title: "General Awareness",
      groups: [
        { heading: "History & Culture", items: ["Indian History & Heritage", "Art & Culture", "World History Overview"] },
        { heading: "Geography", items: ["Physical & Human Geography", "Indian Geography", "World Geography"] },
        { heading: "Science & Technology", items: ["Basic Science Concepts", "Space & Defence Tech", "IT & Computers"] },
        { heading: "Current Affairs", items: ["National Events", "International Affairs", "Sports & Defence Updates"] },
      ],
    },
    {
      icon: FileText,
      title: "Verbal Ability",
      groups: [
        { heading: "Grammar", items: ["Error Spotting", "Sentence Improvement", "Fill in the Blanks"] },
        { heading: "Vocabulary", items: ["Synonyms & Antonyms", "Analogies", "Idioms & Phrases"] },
        { heading: "Comprehension", items: ["Reading Passages", "Inference & Deduction", "Title Identification"] },
        { heading: "Sentence Skills", items: ["Sentence Rearrangement", "Para Jumbles", "Completion"] },
      ],
    },
    {
      icon: BarChart2,
      title: "Numerical Ability",
      groups: [
        { heading: "Arithmetic", items: ["Percentages & Profit/Loss", "Simple & Compound Interest", "Ratio, Time & Work", "Speed, Distance & Time"] },
        { heading: "Algebra & Data", items: ["Linear Equations", "Data Interpretation", "Graphs, Tables & Charts"] },
        { heading: "Geometry & Mensuration", items: ["Areas & Perimeters", "Volumes of 3D Shapes", "Basic Geometric Properties"] },
      ],
    },
    {
      icon: Layers,
      title: "Reasoning & Military Aptitude",
      groups: [
        { heading: "Verbal Reasoning", items: ["Analogy & Classification", "Series Completion", "Coding-Decoding", "Blood Relations"] },
        { heading: "Non-Verbal Reasoning", items: ["Pattern Recognition", "Figure Matrix", "Mirror & Water Images"] },
        { heading: "Spatial Ability", items: ["3D Visualization", "Cube & Dice Problems", "Embedded Figures"] },
        { heading: "Military Aptitude", items: ["Situational Judgment", "Decision Making Under Pressure", "Leadership Scenario Analysis"] },
      ],
    },
  ],
  TA: [
    {
      icon: Layers,
      title: "Engineering Basics",
      groups: [
        { heading: "Mathematics", items: ["Differential Equations", "Linear Algebra", "Calculus & Complex Analysis"] },
        { heading: "Physics", items: ["Mechanics & Thermodynamics", "Electromagnetic Theory", "Optics & Modern Physics"] },
        { heading: "Engineering Drawing", items: ["Orthographic Projections", "Isometric Views", "CAD Basics"] },
        { heading: "Electrical & Electronics", items: ["Circuit Theory & Theorems", "Digital Logic & Gates", "Basic Semiconductor Devices"] },
      ],
    },
    {
      icon: BarChart2,
      title: "Technical Subject Knowledge",
      groups: [
        { heading: "Civil Engineering", items: ["Structural Analysis", "Fluid Mechanics", "Soil Mechanics", "Construction Materials & Management"] },
        { heading: "Mechanical Engineering", items: ["Thermodynamics & Heat Transfer", "Machine Design & Manufacturing", "Strength of Materials"] },
        { heading: "Electrical Engineering", items: ["Power Systems & Machines", "Control Systems", "Signal & Systems"] },
      ],
    },
    {
      icon: BookOpen,
      title: "Logical Reasoning",
      groups: [
        { heading: "Verbal Reasoning", items: ["Analogy & Classification", "Syllogisms", "Statement–Conclusion", "Blood Relations"] },
        { heading: "Non-Verbal Reasoning", items: ["Pattern Series", "Figure Analysis", "Mirror & Water Images"] },
        { heading: "Analytical Ability", items: ["Data Sufficiency", "Puzzles & Seating Arrangement", "Critical Reasoning"] },
      ],
    },
    {
      icon: Users,
      title: "SSB Interview Prep",
      groups: [
        { heading: "Officer Like Qualities", items: ["Self-confidence & Determination", "Initiative & Leadership", "Social Adaptability"] },
        { heading: "Psychological Tests", items: ["TAT — Thematic Apperception Test", "WAT — Word Association Test", "SRT — Situation Reaction Test", "SDT — Self Description Test"] },
        { heading: "GTO Tasks", items: ["Group Discussion & Planning Exercise", "Progressive Group Task", "Command Task & Half Group Task"] },
        { heading: "Personal Interview", items: ["Bio-data & Background Questions", "Current Affairs & Defence Awareness", "Motivation & Career Goals"] },
      ],
    },
  ],
};

// ── Accordion syllabus card ───────────────────────────────────────────────────
const SyllabusCardItem = ({ icon: Icon, title, groups }: SyllabusCard) => {
  const [open, setOpen] = useState<Set<string>>(new Set(groups.map((g) => g.heading)));

  const toggle = (heading: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(heading) ? next.delete(heading) : next.add(heading);
      return next;
    });

  return (
    <div
      className="bg-white border border-[#e5e7eb] rounded-xl p-8"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-md bg-[#eaf6f8] flex items-center justify-center shrink-0">
          <Icon className="w-4 h-4 text-[#00568C]" />
        </div>
        <h3 className={H3_LIGHT}>{title}</h3>
      </div>

      <div className="space-y-3">
        {groups.map(({ heading, items }) => {
          const isOpen = open.has(heading);
          return (
            <div key={heading} className="border border-[#f0f4f8] rounded-lg overflow-hidden">
              <button
                onClick={() => toggle(heading)}
                className="w-full flex items-center justify-between px-4 py-2.5 text-left"
                style={{
                  background: isOpen ? "rgba(47,180,231,0.06)" : "rgba(0,86,140,0.02)",
                  transition: "background 150ms ease",
                }}
              >
                <span className="text-sm font-semibold text-[#00568C]">{heading}</span>
                <ChevronDown
                  className="w-4 h-4 text-[#2FB4E7] shrink-0"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 200ms ease",
                  }}
                />
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                    className="overflow-hidden px-4 pb-3 pt-2 space-y-1.5"
                  >
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span
                          className="shrink-0 mt-[7px] rounded-full bg-[#2FB4E7]"
                          style={{ width: 5, height: 5 }}
                        />
                        <span className="font-sans text-xs text-[#374151] leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const methodology = [
  { icon: Target, title: "Baseline Diagnostic", desc: "Day-1 assessment to identify your exact weak zones — no generic study plans." },
  { icon: Layers, title: "Module-by-Module Coverage", desc: "Each subject broken into small, digestible chapters with spaced repetition." },
  { icon: BarChart2, title: "Weekly Mock Tests", desc: "Timed tests that mirror actual exam patterns. Analytics reviewed with an Ex-SSB Assessor." },
  { icon: Users, title: "Strategic Doubt Sessions", desc: "Live doubt-clearing every week — one-on-one with a subject expert." },
  { icon: Clock, title: "Revision Cycles", desc: "Structured revision at 7, 21, and 45-day intervals before the exam." },
  { icon: FileText, title: "Past Paper Deep Dives", desc: "Analysis of the last 10 years of papers for patterns, frequency, and trap questions." },
];

const outcomes = [
  "Clear NDA, CDS, or AFCAT written exams in your 1st Attempt",
  "Subject-wise score improvement tracked every 2 weeks",
  "Comprehensive exam-day strategy including time management",
  "Full syllabus coverage with zero architectural gaps",
  "Confirmed shortlist for the SSB Interview and beyond",
];

const WrittenExam = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeExam, setActiveExam] = useState<ExamKey>("NDA");

  return (
    <div className="bg-[#F1FFFF] min-h-screen overflow-x-hidden w-full">
      <HeroSection
        subtitle="Written Examination Training"
        title="Clear the Written. Earn Your SSB Call."
        description="Structured, mentor-driven preparation for NDA, CDS, and AFCAT. Every subject, every module, every attempt — covered."
        backgroundImage="/assets/NDA building.webp"
        showStats={false}
      />

      {/* Exams covered + Dynamic Syllabus */}
      <section className={`${SECTION_PAD} bg-[#eaf6f8]`}>
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className={SECTION_HEADER_MB}
          >
            <p className={`${EYEBROW} mb-4`}>Exams We Cover</p>
            <h2 className={H2_LIGHT}>One Program. All Major Defence Exams.</h2>
          </motion.div>

          {/* Clickable exam cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mb-12">
            {exams.map((exam, i) => {
              const isActive = activeExam === exam.name;
              return (
                <motion.button
                  key={exam.name}
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.06 }}
                  onClick={() => setActiveExam(exam.name as ExamKey)}
                  className="bg-white rounded-xl p-6 flex flex-col gap-3 text-left w-full"
                  style={{
                    border: isActive ? "2px solid #2FB4E7" : "2px solid #e5e7eb",
                    boxShadow: isActive
                      ? "0 0 0 4px rgba(47,180,231,0.12), 0 4px 20px rgba(0,86,140,0.12)"
                      : "0 1px 4px rgba(0,0,0,0.04)",
                    transform: isActive ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)",
                    transition: "border-color 200ms ease, box-shadow 200ms ease, transform 200ms ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
                      e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,86,140,0.10)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.transform = "translateY(0) scale(1)";
                      e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                    }
                  }}
                >
                  <span
                    className="inline-block text-2xl font-bold font-serif"
                    style={{ color: isActive ? "#2FB4E7" : "#00568C" }}
                  >
                    {exam.name}
                  </span>
                  <span className="text-xs text-[#6B7280] font-sans leading-snug">{exam.full}</span>
                  <div className="mt-auto pt-4 flex flex-wrap gap-2">
                    {["Final Merit Focused", "Psychology Focused"].map((pill) => (
                      <span
                        key={pill}
                        className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium text-[#2FB4E7] transition-all duration-150"
                        style={{
                          background: "rgba(47,180,231,0.08)",
                          border: "1px solid rgba(47,180,231,0.18)",
                        }}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Dynamic syllabus */}
          <div>
            <div className="mb-8">
              <p className={`${EYEBROW} mb-2`}>Curriculum</p>
              <h3 className={H2_LIGHT}>
                {activeExam} Syllabus
              </h3>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeExam}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.28, ease: EASE_OUT }}
                className="grid md:grid-cols-2 gap-6"
              >
                {syllabusMap[activeExam].map((card) => (
                  <SyllabusCardItem key={card.title} {...card} />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className={`${SECTION_PAD} bg-[#eaf6f8]`}>
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className={SECTION_HEADER_MB}
          >
            <p className={`${EYEBROW} mb-4`}>Our Approach</p>
            <h2 className={H2_LIGHT}>How We Prepare You</h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {methodology.map(({ icon: Icon, title, desc }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.05 }}
                className="bg-white border border-[#e5e7eb] rounded-xl p-7 flex flex-col gap-4"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="w-9 h-9 rounded-md bg-[#eaf6f8] flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-[#00568C]" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#00568C] mb-1.5">{title}</h3>
                  <p className={BODY_LIGHT}>{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className={`${SECTION_PAD} bg-[#F1FFFF]`}>
        <div className={CONTAINER}>
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, ease: EASE_OUT }}
              className="mb-10"
            >
              <p className={`${EYEBROW} mb-4`}>What You Gain</p>
              <h2 className={H2_LIGHT}>Outcomes of This Program</h2>
            </motion.div>
            <ul className="space-y-4">
              {outcomes.map((o, i) => (
                <motion.li
                  key={o}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.3, ease: EASE_OUT, delay: i * 0.06 }}
                  className="flex items-start gap-3 bg-white border border-[#e5e7eb] rounded-xl px-6 py-4"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                >
                  <CheckCircle2 className="w-4 h-4 text-[#F6B828] mt-0.5 shrink-0" />
                  <span className="font-sans text-sm text-[#374151]">{o}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24"
        style={{ background: "linear-gradient(135deg, #00568C 0%, #003d66 100%)" }}
      >
        <div className="max-w-xl mx-auto text-center px-6">
          <motion.h2
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="font-serif text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Ready to clear the written?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 }}
            className="font-sans text-sm text-white/70 mb-8 leading-relaxed"
          >
            Book a free consultation with an Ex-SSB Assessor and get a personalized prep roadmap.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.18 }}
          >
            <button
              onClick={() => setModalOpen(true)}
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
            </button>
          </motion.div>
        </div>
      </section>

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} program="Written Examination Training" />
    </div>
  );
};

export default WrittenExam;
