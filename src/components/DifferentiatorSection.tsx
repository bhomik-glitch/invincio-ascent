import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X, Check } from "lucide-react";

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
  { aspect: "Approach", invincio: "Mentorship & transformation", traditional: "Coaching & repetition" },
  { aspect: "Faculty", invincio: "Ex-SSB Assessors", traditional: "Generic trainers" },
  { aspect: "Feedback", invincio: "Personalised, structured", traditional: "Generic, group-based" },
  { aspect: "Psychology", invincio: "Deep profiling & development", traditional: "Template-based answers" },
  { aspect: "Focus", invincio: "Officer-Like Qualities", traditional: "Interview tricks" },
  { aspect: "Outcome", invincio: "Genuine personality change", traditional: "Temporary behaviour" },
];

const DifferentiatorSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="difference" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            The Invincio Difference
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8">
            Why We're <span className="gold-text">Different</span>
          </h2>
        </motion.div>

        {/* Bold statements */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="space-y-4 mb-8">
              {notThings.map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <X className="w-5 h-5 text-destructive shrink-0" />
                  <span className="font-serif text-xl md:text-2xl font-bold text-muted-foreground line-through decoration-destructive/50">{t}</span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {instead.map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  <span className="font-serif text-xl md:text-2xl font-bold">{t}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="card-premium overflow-hidden p-0"
          >
            <div className="grid grid-cols-3 text-sm font-sans">
              <div className="p-4 bg-muted/50 font-semibold text-muted-foreground">Aspect</div>
              <div className="p-4 bg-primary/10 font-semibold text-primary">Invincio</div>
              <div className="p-4 bg-muted/50 font-semibold text-muted-foreground">Traditional</div>
              {comparison.map((row) => (
                <>
                  <div key={row.aspect + "a"} className="p-4 border-t border-border text-muted-foreground">{row.aspect}</div>
                  <div key={row.aspect + "i"} className="p-4 border-t border-border text-foreground">{row.invincio}</div>
                  <div key={row.aspect + "t"} className="p-4 border-t border-border text-muted-foreground">{row.traditional}</div>
                </>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorSection;
