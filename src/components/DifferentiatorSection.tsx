import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const notThings = [
  "Not Coaching.",
  "Not Memorised Answers.",
  "Not Fake Confidence.",
];

const instead = [
  "Real psychological profiling",
  "Real behavioural feedback",
  "Real transformation",
];

const comparison = [
  { aspect: "Approach",   invincio: "Mentorship & transformation",    traditional: "Coaching & repetition"       },
  { aspect: "Faculty",    invincio: "Ex-SSB Assessors",               traditional: "Generic trainers"            },
  { aspect: "Feedback",   invincio: "Personalised, structured",       traditional: "Generic, group-based"        },
  { aspect: "Psychology", invincio: "Deep profiling & development",   traditional: "Template-based answers"      },
  { aspect: "Focus",      invincio: "Officer-Like Qualities",         traditional: "Interview tricks"            },
  { aspect: "Outcome",    invincio: "Genuine personality change",     traditional: "Temporary behaviour"         },
];

const DifferentiatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="difference"
      className="px-6 py-20 md:px-12 lg:px-20 xl:px-32 bg-[#F1FFFF]"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="text-center mb-14"
        >
          <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#2FB4E7] mb-4">
            The Invincio Difference
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#00568C] mb-2">
            Why We're Different
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left column — bold contrast statements */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.15 }}
          >
            <div className="space-y-4 mb-8">
              {notThings.map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <X className="w-5 h-5 text-[#E66133] shrink-0" />
                  <span className="font-serif text-xl md:text-2xl font-bold text-[#6B7280] line-through decoration-[#E66133]/50">
                    {t}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {instead.map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-[#00568C] shrink-0" />
                  <span className="font-serif text-xl md:text-2xl font-bold text-[#00568C]">
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.28 }}
            className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden"
            style={{ boxShadow: "0 2px 12px rgba(0,86,140,0.06)" }}
          >
            <div className="overflow-x-auto">
            <div className="grid grid-cols-3 text-sm font-sans min-w-[400px]">
              {/* Header row */}
              <div className="p-4 bg-[#eaf6f8] font-semibold text-[#6B7280]">Aspect</div>
              <div className="p-4 bg-[#00568C]/8 font-semibold text-[#00568C]" style={{ background: "rgba(0,86,140,0.07)" }}>Invincio</div>
              <div className="p-4 bg-[#eaf6f8] font-semibold text-[#6B7280]">Traditional</div>

              {comparison.map((row) => (
                <>
                  <div key={row.aspect + "a"} className="p-4 border-t border-[#e5e7eb] text-[#6B7280]">
                    {row.aspect}
                  </div>
                  <div key={row.aspect + "i"} className="p-4 border-t border-[#e5e7eb] text-[#00568C] font-medium">
                    {row.invincio}
                  </div>
                  <div key={row.aspect + "t"} className="p-4 border-t border-[#e5e7eb] text-[#6B7280]">
                    {row.traditional}
                  </div>
                </>
              ))}
            </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorSection;
