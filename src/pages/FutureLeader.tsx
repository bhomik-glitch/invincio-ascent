import { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield, CheckCircle2, CalendarCheck, Star, Users,
  MessageSquare, Clock, Zap, BookOpen, ArrowRight,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ConsultationModal from "@/components/ConsultationModal";
import {
  CONTAINER, SECTION_PAD, EYEBROW, H2_LIGHT, H3_LIGHT,
  BODY_LIGHT, EASE_OUT, SECTION_HEADER_MB,
} from "@/lib/design-system";

const pillars = [
  {
    icon: Star,
    title: "Personality & Confidence",
    desc: "Build a strong self-image from the ground up. Students learn to carry themselves with purpose, speak with conviction, and act without hesitation.",
    points: [
      "Public speaking & stage confidence",
      "Self-awareness and identity exercises",
      "Positive self-talk and mental conditioning",
      "Overcoming social anxiety",
    ],
  },
  {
    icon: MessageSquare,
    title: "Communication & Leadership",
    desc: "Officers lead through clear communication. We train students to articulate thoughts, manage group dynamics, and influence peers constructively.",
    points: [
      "Structured group discussions",
      "Debate and argumentation skills",
      "Active listening and empathy",
      "Peer leadership exercises",
    ],
  },
  {
    icon: Clock,
    title: "Discipline & Routine",
    desc: "Discipline is the foundation of every officer. We help students build structured daily routines, goal-setting habits, and a long-term vision mindset.",
    points: [
      "Daily schedule planning & execution",
      "Goal-setting frameworks",
      "Study discipline & time management",
      "Physical fitness habits",
    ],
  },
  {
    icon: Shield,
    title: "SSB Mindset Exposure",
    desc: "Early introduction to what the Services Selection Board looks for — not to teach tricks, but to build the genuine qualities that get candidates recommended.",
    points: [
      "Introduction to Officer Like Qualities",
      "Basic PPDT & WAT exercises",
      "Situational response practice (age-appropriate)",
      "Understanding the armed forces career path",
    ],
  },
];

const timeline = [
  { phase: "Month 1–2", focus: "Foundation", desc: "Personality mapping, communication basics, confidence-building workshops." },
  { phase: "Month 3–4", focus: "Development", desc: "Leadership exercises, discipline structuring, group dynamics, public speaking." },
  { phase: "Month 5–6", focus: "Application", desc: "Mock group tasks, SSB mindset introduction, real-world scenario practice." },
  { phase: "Month 7–12", focus: "Reinforcement", desc: "Ongoing mentorship, progress reviews, exam awareness, and goal refinement." },
];

const whyEarly = [
  {
    title: "Habits form before Class 11",
    desc: "The window from Class 9–10 is when foundational habits of discipline, focus, and communication are most easily shaped.",
  },
  {
    title: "Competitive edge at SSB",
    desc: "Candidates who started personality development early are consistently more natural and less rehearsed at the board.",
  },
  {
    title: "Academics + defence prep together",
    desc: "The bootcamp is designed to complement school academics — not compete with them. Sessions are structured around school schedules.",
  },
  {
    title: "Mentorship before pressure",
    desc: "Starting in Class 9 means 3–4 years of mentorship before the NDA exam — building genuine maturity, not last-minute cramming.",
  },
];

const outcomes = [
  "Strong communication and leadership foundation before Class 11",
  "Disciplined daily routine with consistent follow-through",
  "Awareness of the SSB process and defence career paths",
  "Increased self-confidence and public presence",
  "Academic performance improvement through structured habits",
  "Head start on personality development for future SSB attempts",
];

const FutureLeader = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-[#F1FFFF] min-h-screen overflow-x-hidden w-full">
      <HeroSection
        subtitle="Future Leader Bootcamp"
        title="Build the Officer Before the Exam Begins."
        description="A foundational program for Class 9 students onwards. Personality, discipline, communication, and SSB mindset — developed early, developed right."
        backgroundImage="/assets/hero-bg.png"
        showStats={false}
      />

      {/* Who is this for */}
      <section className={`${SECTION_PAD} bg-[#eaf6f8]`}>
        <div className={CONTAINER}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <p className={`${EYEBROW} mb-4`}>Who Is This For</p>
              <h2 className={`${H2_LIGHT} mb-5`}>Class 9 Onwards. The Earlier, the Better.</h2>
              <p className={`${BODY_LIGHT} mb-5`}>
                Most defence aspirants start preparing in Class 11 or 12. By then, years of prime personality-development time have passed. The Future Leader Bootcamp fills that gap.
              </p>
              <p className={`${BODY_LIGHT} mb-5`}>
                Designed specifically for students in Class 9 and above, this program builds the foundation that written exam prep and SSB coaching later builds upon. It is not about appearing like an officer — it is about becoming one.
              </p>
              <p className={BODY_LIGHT}>
                No prior knowledge of the defence selection process is needed. Just a willingness to grow.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
              className="flex flex-col gap-4"
            >
              {whyEarly.map(({ title, desc }, i) => (
                <div
                  key={title}
                  className="bg-white border border-[#e5e7eb] rounded-xl p-6"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                >
                  <h3 className="font-serif text-base font-bold text-[#00568C] mb-1.5">{title}</h3>
                  <p className="font-sans text-sm text-[#374151] leading-relaxed">{desc}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Four pillars */}
      <section className={`${SECTION_PAD} bg-[#F1FFFF]`}>
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className={SECTION_HEADER_MB}
          >
            <p className={`${EYEBROW} mb-4`}>What We Build</p>
            <h2 className={H2_LIGHT}>Four Pillars of the Bootcamp</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {pillars.map(({ icon: Icon, title, desc, points }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.06 }}
                className="bg-white border border-[#e5e7eb] rounded-xl p-8"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-md bg-[#eaf6f8] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-[#00568C]" />
                  </div>
                  <h3 className={H3_LIGHT}>{title}</h3>
                </div>
                <p className={`${BODY_LIGHT} mb-5`}>{desc}</p>
                <ul className="space-y-2.5">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2FB4E7] mt-[3px] shrink-0" />
                      <span className="font-sans text-sm text-[#374151]">{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className={`${SECTION_PAD} bg-[#eaf6f8]`}>
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className={SECTION_HEADER_MB}
          >
            <p className={`${EYEBROW} mb-4`}>Program Structure</p>
            <h2 className={H2_LIGHT}>12-Month Roadmap</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            {timeline.map(({ phase, focus, desc }, i) => (
              <motion.div
                key={phase}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.06 }}
                className="bg-white border border-[#e5e7eb] rounded-xl p-6 flex flex-col gap-3"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <span className="font-sans text-[10px] font-bold tracking-[0.22em] text-[#2FB4E7] uppercase">{phase}</span>
                <h3 className="font-serif text-base font-bold text-[#00568C]">{focus}</h3>
                <p className="font-sans text-sm text-[#374151] leading-relaxed">{desc}</p>
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
              <h2 className={H2_LIGHT}>What Students Walk Away With</h2>
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
            Start the journey in Class 9.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 }}
            className="font-sans text-sm text-white/70 mb-8 leading-relaxed"
          >
            Talk to a mentor today and understand how early preparation shapes the officer your child becomes.
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

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} program="Future Leader Bootcamp" />
    </div>
  );
};

export default FutureLeader;
