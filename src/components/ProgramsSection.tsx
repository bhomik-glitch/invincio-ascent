import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const programs = [
  {
    title: "SSB Mentorship Program",
    summary: "Comprehensive end-to-end SSB preparation with mock interviews, GTO simulations, and psychological testing under ex-assessor guidance.",
    audience: "NDA, CDS, AFCAT aspirants",
    duration: "4–8 Weeks",
  },
  {
    title: "Personality & Leadership Development",
    summary: "Develop the 15 Officer-Like Qualities through behavioural workshops, self-awareness exercises, and leadership simulations.",
    audience: "Repeat SSB candidates & first-timers",
    duration: "3–6 Weeks",
  },
  {
    title: "Psychometric Assessments",
    summary: "In-depth TAT, WAT, SRT, and SD practice with psychological profiling and structured improvement plans.",
    audience: "Candidates needing psych improvement",
    duration: "2–4 Weeks",
  },
  {
    title: "Corporate & School Workshops",
    summary: "Leadership, teamwork, and personality development workshops tailored for educational institutions and corporate teams.",
    audience: "Schools, colleges & corporates",
    duration: "1–5 Days",
  },
];

const ProgramsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="programs" className="section-padding bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Our Programs
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Structured Paths to <span className="gold-text">Transformation</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {programs.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
              className="card-premium group transition-all duration-300 flex flex-col"
            >
              <h3 className="font-serif text-xl md:text-2xl font-bold mb-3">{p.title}</h3>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-5 flex-1">
                {p.summary}
              </p>
              <div className="flex flex-wrap gap-4 text-xs font-sans font-medium text-muted-foreground mb-6">
                <span className="bg-muted px-3 py-1.5 rounded">{p.audience}</span>
                <span className="bg-muted px-3 py-1.5 rounded">{p.duration}</span>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 text-primary font-sans font-semibold text-sm group-hover:gap-3 transition-all"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
