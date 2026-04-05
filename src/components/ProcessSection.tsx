import { motion } from "framer-motion";
import {
  CONTAINER,
  EYEBROW,
  H2_LIGHT,
  H3_LIGHT,
  BODY_LIGHT,
  SECTION_PAD,
  SECTION_HEADER_MB,
  EASE_OUT,
} from "@/lib/design-system";

const steps = [
  {
    number: "01",
    title: "Assessment",
    desc: "Initial baseline screening to map your strengths, gaps, and development areas.",
  },
  {
    number: "02",
    title: "Profiling",
    desc: "Deep psychological and personality profiling to build a tailored mentorship plan.",
  },
  {
    number: "03",
    title: "Mentorship",
    desc: "Structured sessions with ex-SSB assessors covering written prep, GTO, psychology, and interviews.",
  },
  {
    number: "04",
    title: "Selection",
    desc: "Full SSB simulation, conference-day readiness, and strategy to walk in recommended.",
  },
];

const ProcessSection = () => {
  return (
    <section id="process" className={`bg-[#F5F7FA] ${SECTION_PAD}`}>
      <div className={CONTAINER}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className={SECTION_HEADER_MB}
        >
          <p className={`${EYEBROW} mb-4`}>The Journey</p>
          <h2 className={`${H2_LIGHT} max-w-2xl`}>A Disciplined Path to Selection</h2>
        </motion.div>

        {/* Vertical step layout */}
        <div className="relative pl-10 md:pl-14">
          <div className="absolute left-4 md:left-5 top-1 bottom-1 w-px bg-black/10" />

          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                /* scale: 0.98 — nothing appears from nothing */
                initial={{ opacity: 0, y: 8, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.05 }}
                className="relative"
              >
                <div className="absolute -left-10 md:-left-14 top-0 w-8 h-8 rounded-full border border-black/10 bg-white flex items-center justify-center">
                  <span className="font-sans text-[11px] font-bold text-[#C2A46D]">
                    {step.number}
                  </span>
                </div>

                <h3 className={`${H3_LIGHT} mb-2`}>{step.title}</h3>
                <p className={`${BODY_LIGHT} max-w-lg`}>{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
