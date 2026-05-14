import { useState } from "react";
import { motion } from "framer-motion";
import {
  Users, CheckCircle2, CalendarCheck, Brain, MessageSquare,
  Eye, Zap, Shield, BarChart2, ArrowRight,
} from "lucide-react";
import HeroSection from "@/components/HeroSection";
import ConsultationModal from "@/components/ConsultationModal";
import SEO from "@/components/SEO";
import {
  CONTAINER, SECTION_PAD, EYEBROW, H2_LIGHT, H3_LIGHT,
  BODY_LIGHT, EASE_OUT, SECTION_HEADER_MB,
} from "@/lib/design-system";

const days = [
  {
    day: "Day 1",
    label: "Screening",
    activities: [
      "Officer Intelligence Rating (OIR) — verbal & non-verbal reasoning",
      "Picture Perception & Description Test (PPDT)",
      "Group storytelling and narration",
      "Preliminary screening result announcement",
    ],
  },
  {
    day: "Day 2",
    label: "Psychology",
    activities: [
      "Thematic Apperception Test (TAT) — 12 pictures, 1 blank",
      "Word Association Test (WAT) — 60 words in 30 seconds",
      "Situation Reaction Test (SRT) — 60 real-life situations",
      "Self Description Test (SD) — 5 open-ended questions",
    ],
  },
  {
    day: "Day 3 & 4",
    label: "GTO Tasks",
    activities: [
      "Group Discussion (GD) — 2 rounds",
      "Group Planning Exercise (GPE)",
      "Progressive Group Task (PGT) & Half Group Task (HGT)",
      "Individual Obstacles & Command Task",
      "Lecturette — 3-minute prepared talk",
      "Final Group Task (FGT)",
    ],
  },
  {
    day: "Day 4 & 5",
    label: "Personal Interview",
    activities: [
      "In-depth interview by an Interviewing Officer (IO)",
      "PIQ form analysis — hobbies, family, academics, achievements",
      "Current affairs & national security questions",
      "Stress testing, contradiction probing",
      "Conference — final board discussion",
    ],
  },
];

const trainingAreas = [
  {
    icon: Brain,
    title: "Psychological Battery",
    desc: "Master the TAT, WAT, SRT, and SD modules through precision practice. Learn to project your OLQs authentically — not mechanically.",
    points: [
      "Extensive TAT story reviews",
      "WAT speed and quality optimization",
      "SRT situational response patterns",
      "Comprehensive SD self-awareness coaching",
    ],
  },
  {
    icon: Users,
    title: "GTO Training",
    desc: "Simulate every GTO Task in an authentic outdoor environment under the observation of Ex-GTOs.",
    points: [
      "PGT, HGT, and FGT group task practice",
      "Command Task leadership execution",
      "Individual Obstacle confidence building",
      "Group cohesion and initiative training",
    ],
  },
  {
    icon: MessageSquare,
    title: "Personal Interview",
    desc: "Master the Interviewing Officer (IO) round through repeated simulations and deep analytical feedback.",
    points: [
      "PIQ form deep-dive analysis",
      "Strategic stress question handling",
      "Body language and voice modulation",
      "Current affairs and policy preparation",
    ],
  },
  {
    icon: Eye,
    title: "OLQ Development",
    desc: "Officer-Like Qualities (OLQs) must be genuinely built. Our 15 OLQ framework remains the backbone of our 2026 training methodology.",
    points: [
      "Effective Intelligence and Reasoning",
      "Social Adaptability and Team Spirit",
      "Initiative, Confidence, and Determination",
      "Speed of Decision and Emotional Stability",
    ],
  },
];

const boards = [
  { name: "SSB", full: "Service Selection Board", for: "Army, Navy, Air Force" },
  { name: "AFSB", full: "Air Force Selection Board", for: "AFCAT, NDA (Air Force)" },
  { name: "NSB", full: "Naval Selection Board", for: "NDA (Navy), TES" },
  { name: "PSB", full: "Pilot Selection Board", for: "Flying branch candidates" },
  { name: "FSB", full: "Force Selection Board", for: "Coast Guard & SSF entries" },
];

const outcomes = [
  "Comprehensive understanding of assessor expectations",
  "Genuine development of Officer-Like Qualities (OLQs)",
  "Full 5-day Mock SSB simulation",
  "Detailed personal feedback reports",
  "Conference preparation and stress management",
  "Psychological consistency across all assessment modules",
];

const SSBInterview = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="bg-[#F1FFFF] min-h-screen overflow-x-hidden w-full">
      <SEO
        title="SSB Interview Coaching by Ex-SSB Assessors | Invincio"
        description="Train directly with Ex-SSB Assessors — GTOs, Interviewing Officers and Psychologists. Develop the 15 Officer Like Qualities through realistic mock boards and conferences."
        path="/programs/ssb-interview"
        keywords="SSB interview coaching, GTO training, SSB psychologist, SSB mock interview, OLQ development"
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: "Programs", path: "/programs" },
          { name: "SSB Interview", path: "/programs/ssb-interview" },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Course",
          name: "SSB Interview Coaching",
          description: "5-day SSB Interview preparation by Ex-SSB Assessors covering screening, psych tests, GTO, personal interview and conference.",
          provider: {
            "@type": "Organization",
            name: "Invincio Services LLP",
            sameAs: "https://www.invincioservices.com/",
          },
          inLanguage: "en",
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: ["Online", "Onsite"],
            courseWorkload: "P5D",
          },
        }}
      />
      <HeroSection
        subtitle="SSB Interview Preparation"
        title="Train Like an Officer"
        description="Learn directly from ex-SSB assessors who have evaluated thousands of candidates. Develop strong OLQs through structured guidance, realistic mock scenarios, and practical preparation strategies that align with actual board expectations."
        backgroundImage="/assets/IMA image.jpg"
        backgroundPosition="center 30%"
        backgroundSize="cover"
        showStats={false}
      />

      {/* What is SSB */}
      <section className={`${SECTION_PAD} bg-[#eaf6f8]`}>
        <div className={CONTAINER}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              <p className={`${EYEBROW} mb-4`}>What Is SSB</p>
              <h2 className={`${H2_LIGHT} mb-5`}>5 Days That Define Your Future</h2>
              <p className={`${BODY_LIGHT} mb-5`}>
                The Services Selection Board is a 5-day psychological and personality assessment conducted by the Indian Armed Forces. It evaluates 15 Officer Like Qualities across three assessors — Interviewing Officer, GTO, and Psychologist.
              </p>
              <p className={BODY_LIGHT}>
                Only candidates who demonstrate consistent OLQs across all three independent assessors receive a recommendation. This is why surface-level coaching fails — only genuine personality development works.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
              className="flex flex-col gap-3"
            >
              {["Effective Intelligence", "Reasoning Ability", "Organising Ability", "Power of Expression", "Social Adaptability", "Cooperation", "Sense of Responsibility", "Initiative", "Self-Confidence", "Speed of Decision", "Ability to Influence", "Liveliness", "Determination", "Courage", "Stamina"].map((olq, i) => (
                <div key={olq} className="flex items-center gap-3 bg-white rounded-lg px-4 py-2.5 border border-[#e5e7eb]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
                  <span className="font-sans text-[10px] font-bold text-[#2FB4E7] w-5 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-sans text-sm text-[#374151]">{olq}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5-Day breakdown */}
      <section className={`${SECTION_PAD} bg-[#F1FFFF]`}>
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className={SECTION_HEADER_MB}
          >
            <p className={`${EYEBROW} mb-4`}>The Board</p>
            <h2 className={H2_LIGHT}>Day-by-Day SSB Breakdown</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {days.map(({ day, label, activities }, i) => (
              <motion.div
                key={day}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.06 }}
                className="bg-white border border-[#e5e7eb] rounded-xl p-8"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <span className="font-sans text-[11px] font-bold tracking-[0.22em] text-[#2FB4E7] uppercase">{day}</span>
                  <span className="w-px h-4 bg-[#e5e7eb]" />
                  <span className="font-serif text-base font-bold text-[#00568C]">{label}</span>
                </div>
                <ul className="space-y-2.5">
                  {activities.map((a) => (
                    <li key={a} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#2FB4E7] mt-[3px] shrink-0" />
                      <span className="font-sans text-sm text-[#374151]">{a}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Training areas */}
      <section className={`${SECTION_PAD} bg-[#eaf6f8]`}>
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className={SECTION_HEADER_MB}
          >
            <p className={`${EYEBROW} mb-4`}>How We Train You</p>
            <h2 className={H2_LIGHT}>Four Pillars of SSB Prep</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {trainingAreas.map(({ icon: Icon, title, desc, points }, i) => (
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
                <ul className="space-y-2">
                  {points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5">
                      <span className="w-1 h-1 rounded-full bg-[#2FB4E7] mt-[7px] shrink-0" />
                      <span className="font-sans text-sm text-[#374151]">{p}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Boards covered */}
      <section className={`${SECTION_PAD} bg-[#F1FFFF]`}>
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className={SECTION_HEADER_MB}
          >
            <p className={`${EYEBROW} mb-4`}>Coverage</p>
            <h2 className={H2_LIGHT}>All Selection Boards. One Preparation.</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
            {boards.map((b, i) => (
              <motion.div
                key={b.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.05 }}
                className="bg-white border border-[#e5e7eb] rounded-xl p-6"
                style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
              >
                <span className="font-serif text-2xl font-bold text-[#00568C] block mb-1">{b.name}</span>
                <span className="font-sans text-xs text-[#6B7280] block mb-3">{b.full}</span>
                <span className="inline-block text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                  style={{ background: "rgba(47,180,231,0.08)", color: "#00568C", borderColor: "rgba(47,180,231,0.25)" }}>
                  {b.for}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className={`${SECTION_PAD} bg-[#eaf6f8]`}>
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
        className="py-14 md:py-24"
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
            Ready for the board?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.1 }}
            className="font-sans text-sm text-white/70 mb-8 leading-relaxed"
          >
            Book a free one-on-one session with an Ex-SSB Assessor. Understand your OLQ gaps before the actual board assessment.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.18 }}
          >
            <button
              onClick={() => setModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#F6B828] text-[#00568C] px-10 py-4 text-sm font-bold tracking-wide"
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

      <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} program="SSB Interview Preparation" />
    </div>
  );
};

export default SSBInterview;
