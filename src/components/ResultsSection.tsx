import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Award, Users, Calendar } from "lucide-react";

const stats = [
  { icon: Award, value: "500+", label: "Recommendations" },
  { icon: Calendar, value: "15+", label: "Years of Experience" },
  { icon: Users, value: "5,000+", label: "Students Mentored" },
  { icon: Star, value: "4.9", label: "Average Rating" },
];

const testimonials = [
  {
    name: "Capt. Arjun Sharma",
    attempt: "3rd Attempt — Recommended",
    text: "After two conference outs, Invincio's mentorship changed everything. The psychological profiling helped me understand my real weaknesses. I walked into my third SSB as a different person.",
  },
  {
    name: "Lt. Priya Mehta",
    attempt: "1st Attempt — Recommended",
    text: "The structured feedback after every mock was invaluable. My mentors — real ex-assessors — knew exactly what the board looks for. Invincio doesn't prepare you for SSB, they prepare you for life.",
  },
  {
    name: "Sub Lt. Rahul Verma",
    attempt: "2nd Attempt — Recommended",
    text: "What sets Invincio apart is the personal attention. My mentor spent hours understanding my personality before we even started prep. The transformation was genuine, not just surface-level.",
  },
];

const ResultsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="results" className="section-padding bg-muted/30" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Results & Success
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Stories of <span className="gold-text">Transformation</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {stats.map((s) => (
            <div key={s.label} className="text-center card-premium">
              <s.icon className="w-6 h-6 text-primary mx-auto mb-3" />
              <p className="font-serif text-3xl md:text-4xl font-bold gold-text mb-1">{s.value}</p>
              <p className="text-muted-foreground text-sm font-sans">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.15 }}
              className="card-premium flex flex-col"
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-muted-foreground font-sans text-sm leading-relaxed mb-6 flex-1 italic">
                "{t.text}"
              </p>
              <div>
                <p className="font-serif font-semibold text-foreground">{t.name}</p>
                <p className="text-primary text-xs font-sans font-medium">{t.attempt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
