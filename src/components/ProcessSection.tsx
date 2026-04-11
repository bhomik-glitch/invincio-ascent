import { Target, Brain, Users, Trophy } from "lucide-react";
import { EYEBROW, CONTAINER } from "@/lib/design-system";

const steps = [
  {
    number: "01",
    title:  "Assessment",
    desc:   "Baseline diagnostic assessment",
    Icon:   Target,
  },
  {
    number: "02",
    title:  "Profiling",
    desc:   "Integrated personality and written preparation",
    Icon:   Brain,
  },
  {
    number: "03",
    title:  "Mentorship",
    desc:   "Continuous performance tracking and mentorship",
    Icon:   Users,
  },
  {
    number: "04",
    title:  "Selection",
    desc:   "Advanced SSB Interview specialization and merit readiness",
    Icon:   Trophy,
  },
];

const ProcessSection = () => (
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
            Four rigorous phases designed to transition you from an aspirant to a recommended candidate in 2026.
          </p>
        </div>
      </div>

      {/* Cards grid */}
      <div className="relative">
        {/* Connector line — desktop only */}
        <div
          aria-hidden
          className="hidden md:block absolute top-[2.75rem] left-[calc(12.5%+1rem)] right-[calc(12.5%+1rem)] h-px"
          style={{ background: "linear-gradient(90deg, transparent 0%, #2FB4E7 15%, #2FB4E7 85%, transparent 100%)", opacity: 0.25 }}
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {steps.map((step) => (
            <StepCard key={step.number} step={step} />
          ))}
        </div>
      </div>

    </div>
  </section>
);

interface StepData {
  number: string;
  title:  string;
  desc:   string;
  Icon:   React.ElementType;
}

const StepCard = ({ step }: { step: StepData }) => (
  <div
    className="group relative bg-white rounded-2xl border border-[#e5e7eb] p-7 flex flex-col gap-5"
    style={{
      boxShadow: "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)",
      transition: "transform 280ms cubic-bezier(0.23,1,0.32,1), box-shadow 280ms cubic-bezier(0.23,1,0.32,1), border-color 280ms ease",
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.transform     = "translateY(-4px)";
      el.style.boxShadow     = "0 8px 32px rgba(0,86,140,0.10)";
      el.style.borderColor   = "rgba(0,86,140,0.20)";
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.transform     = "translateY(0)";
      el.style.boxShadow     = "0 1px 3px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.04)";
      el.style.borderColor   = "#e5e7eb";
    }}
  >
    {/* Icon badge */}
    <div
      className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center self-start"
      style={{
        background: "rgba(47,180,231,0.10)",
        border:     "1px solid rgba(47,180,231,0.25)",
      }}
    >
      <step.Icon size={17} className="text-[#00568C]" strokeWidth={1.5} />
    </div>

    {/* Content */}
    <div className="flex flex-col gap-2">
      <span className="font-sans text-[11px] font-bold tracking-[0.22em] text-[#2FB4E7] uppercase">
        {step.number}
      </span>
      <h3 className="font-serif text-[1.0625rem] font-bold text-[#00568C] leading-snug">
        {step.title}
      </h3>
      <p className="font-sans text-[0.8125rem] leading-relaxed text-[#374151]">
        {step.desc}
      </p>
    </div>
  </div>
);

export default ProcessSection;
