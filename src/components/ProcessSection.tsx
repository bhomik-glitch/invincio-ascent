import { ClipboardList, Compass, BookOpen, ShieldCheck, HeartHandshake } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { EYEBROW, CONTAINER } from "@/lib/design-system";

const steps = [
  {
    number: "01",
    title:  "Pre-Assessment",
    desc:   "Baseline diagnostic to map your strengths, gaps, and OLQ potential before training begins",
    Icon:   ClipboardList,
  },
  {
    number: "02",
    title:  "Orientation",
    desc:   "Structured onboarding to the SSB process, psychological framework, and Invincio methodology",
    Icon:   Compass,
  },
  {
    number: "03",
    title:  "Mock Practice",
    desc:   "Rigorous simulation of GTO, psychology, and interview tasks with detailed performance feedback",
    Icon:   BookOpen,
  },
  {
    number: "04",
    title:  "Final Assessment",
    desc:   "Full-length SSB mock with merit evaluation and readiness score before your actual board",
    Icon:   ShieldCheck,
  },
  {
    number: "05",
    title:  "Follow-up Mentorship",
    desc:   "Post-board debrief, feedback integration, and continued guidance for repeat aspirants",
    Icon:   HeartHandshake,
  },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="process" className="bg-[#eaf6f8] py-24">
      <div className={CONTAINER}>

        {/* Header */}
        <div className="mb-14">
          <p className={`${EYEBROW} mb-4`}>The Journey</p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#00568C] max-w-sm leading-tight">
              A Disciplined Path<br />To Selection
            </h2>
            <p className="font-sans text-sm leading-relaxed text-[#6B7280] max-w-xs md:text-right">
              Five rigorous phases designed to transition you from an aspirant to a recommended candidate in 2026.
            </p>
          </div>
        </div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1], delay: i * 0.08 }}
            >
              <StepCard step={step} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

interface StepData {
  number: string;
  title:  string;
  desc:   string;
  Icon:   React.ElementType;
}

const StepCard = ({ step }: { step: StepData }) => (
  <div
    className="group relative bg-white rounded-2xl overflow-hidden h-full flex flex-col"
    style={{
      border: "1px solid #e9eef4",
      boxShadow: "0 2px 12px rgba(0,86,140,0.06)",
      transition: "transform 260ms cubic-bezier(0.23,1,0.32,1), box-shadow 260ms ease, border-color 260ms ease",
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.transform   = "translateY(-4px)";
      el.style.boxShadow   = "0 16px 40px rgba(0,86,140,0.11)";
      el.style.borderColor = "rgba(0,86,140,0.18)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.transform   = "translateY(0)";
      el.style.boxShadow   = "0 2px 12px rgba(0,86,140,0.06)";
      el.style.borderColor = "#e9eef4";
    }}
  >
    {/* Ghost number — decorative background */}
    <span
      aria-hidden
      className="absolute top-3 right-4 font-sans font-black leading-none select-none pointer-events-none"
      style={{
        fontSize: "4.5rem",
        color: "rgba(0,86,140,0.045)",
        letterSpacing: "-0.04em",
        lineHeight: 1,
      }}
    >
      {step.number}
    </span>

    <div className="relative flex flex-col gap-4 p-5 flex-1">
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, rgba(0,86,140,0.10) 0%, rgba(47,180,231,0.10) 100%)",
          border: "1px solid rgba(47,180,231,0.20)",
        }}
      >
        <step.Icon size={17} strokeWidth={1.6} className="text-[#00568C]" />
      </div>

      {/* Title + desc */}
      <div className="flex flex-col gap-1.5 flex-1">
        <h3 className="font-serif text-[0.9375rem] font-bold text-[#0f2942] leading-snug">
          {step.title}
        </h3>
        <p className="font-sans text-[0.775rem] leading-relaxed text-[#7a8899]">
          {step.desc}
        </p>
      </div>

      {/* Number badge — bottom left */}
      <div className="flex items-center gap-1.5 mt-1">
        <span
          className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white"
          style={{ background: "linear-gradient(135deg,#00568C,#2FB4E7)" }}
        >
          {parseInt(step.number)}
        </span>
        <span className="font-sans text-[10.5px] font-semibold text-[#9aaab8] tracking-wide uppercase">
          Phase {step.number}
        </span>
      </div>
    </div>
  </div>
);

export default ProcessSection;
