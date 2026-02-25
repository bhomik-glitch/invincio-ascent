import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  { number: "01", title: "Assessment", desc: "Initial screening to understand your baseline strengths and areas for development." },
  { number: "02", title: "Profiling", desc: "Deep psychological and personality profiling to create a tailored mentorship plan." },
  { number: "03", title: "Mentorship", desc: "One-on-one sessions with ex-SSB assessors focused on genuine personality development." },
  { number: "04", title: "Simulation", desc: "Full SSB simulations including GTO, interview, and psychology testing." },
  { number: "05", title: "Feedback", desc: "Structured, detailed feedback after every session to track and accelerate growth." },
  { number: "06", title: "Final Preparation", desc: "Conference-day readiness, confidence building, and last-mile strategy." },
];

const ProcessSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="process" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Our Process
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            A Disciplined Path to <span className="gold-text">Success</span>
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                  className={`md:grid md:grid-cols-2 md:gap-12 items-center ${i > 0 ? "md:mt-8" : ""}`}
                >
                  <div className={`${isLeft ? "md:text-right" : "md:col-start-2"}`}>
                    <div className={`card-premium ${isLeft ? "md:ml-auto" : ""} max-w-md`}>
                      <span className="font-serif text-3xl font-bold gold-text">{step.number}</span>
                      <h3 className="font-serif text-xl font-bold mt-2 mb-2">{step.title}</h3>
                      <p className="text-muted-foreground font-sans text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                  {/* Dot on timeline */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background" style={{ marginTop: i === 0 ? "2rem" : undefined }} />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
