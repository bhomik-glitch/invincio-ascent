import { useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen, CheckCircle2, CalendarCheck, Target, Clock,
  BarChart2, FileText, Users, Layers, ArrowRight,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ConsultationModal from "@/components/ConsultationModal";
import {
  CONTAINER, SECTION_PAD, EYEBROW, H2_LIGHT, H3_LIGHT,
  BODY_LIGHT, EASE_OUT, SECTION_HEADER_MB,
} from "@/lib/design-system";

const modules = [
  {
    icon: BarChart2,
    title: "Mathematics",
    topics: [
      "Algebra & Quadratic Equations",
      "Trigonometry & Geometry",
      "Statistics & Probability",
      "Mensuration & Coordinate Geometry",
      "Number Systems & Simplification",
    ],
  },
  {
    icon: BookOpen,
    title: "General Knowledge",
    topics: [
      "Indian & World History",
      "Geography & Environment",
      "Science & Technology",
      "Current Affairs (Monthly Updates)",
      "Defence & National Security",
    ],
  },
  {
    icon: FileText,
    title: "English",
    topics: [
      "Comprehension & Précis Writing",
      "Grammar & Error Detection",
      "Vocabulary & Synonyms/Antonyms",
      "Fill in the Blanks & Idioms",
      "Essay & Letter Writing",
    ],
  },
  {
    icon: Layers,
    title: "General Science",
    topics: [
      "Physics — Motion, Optics, Electricity",
      "Chemistry — Acids, Bases, Reactions",
      "Biology — Human Body & Ecology",
      "Space Science & Defence Tech",
      "Applied Science for Defence Exams",
    ],
  },
];

const exams = [
  { name: "NDA", full: "National Defence Academy", freq: "Twice/year", seats: "400+" },
  { name: "CDS", full: "Combined Defence Services", freq: "Twice/year", seats: "300+" },
  { name: "AFCAT", full: "Air Force Common Admission Test", freq: "Twice/year", seats: "200+" },
  { name: "MNS", full: "Military Nursing Service", freq: "Once/year", seats: "50+" },
];

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

  return (
    <div className="bg-[#F1FFFF] min-h-screen overflow-x-hidden w-full">
      <HeroSection
        subtitle="Written Examination Training"
        title="Clear the Written. Earn Your SSB Call."
        description="Structured, mentor-driven preparation for NDA, CDS, and AFCAT. Every subject, every module, every attempt — covered."
        backgroundImage="/assets/Whisk_af546ace17f28599d3f4ed17a321bd6fdr.png"
        showStats={false}
      />

      {/* Exams covered */}
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

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {exams.map((exam, i) => (
              <motion.div
                key={exam.name}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.06 }}
                className="bg-white border border-[#e5e7eb] rounded-xl p-6 flex flex-col gap-3"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <span className="inline-block text-2xl font-bold font-serif text-[#00568C]">
                  {exam.name}
                </span>
                <span className="text-xs text-[#6B7280] font-sans leading-snug">{exam.full}</span>
                <div className="mt-auto pt-4 border-t border-[#f0f0f0] flex items-center justify-between">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2FB4E7]">{exam.freq}</span>
                  <span className="text-[10px] text-[#6B7280]">{exam.seats} seats</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subject modules */}
      <section className={`${SECTION_PAD} bg-[#F1FFFF]`}>
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className={SECTION_HEADER_MB}
          >
            <p className={`${EYEBROW} mb-4`}>Curriculum</p>
            <h2 className={H2_LIGHT}>What You Will Study</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {modules.map(({ icon: Icon, title, topics }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.06 }}
                className="bg-white border border-[#e5e7eb] rounded-xl p-8"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-9 h-9 rounded-md bg-[#eaf6f8] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#00568C]" />
                  </div>
                  <h3 className={H3_LIGHT}>{title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {topics.map((t) => (
                    <li key={t} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2FB4E7] mt-[3px] shrink-0" />
                      <span className="font-sans text-sm text-[#374151]">{t}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
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
