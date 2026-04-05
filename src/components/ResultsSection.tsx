import { motion } from "framer-motion";
import { Star, Award, Users, Calendar } from "lucide-react";
import {
  CONTAINER,
  EYEBROW,
  H2_DARK,
  BODY_DARK,
  TEXT_PRIMARY_DARK,
  TEXT_SECONDARY_DARK,
  SECTION_PAD,
  SECTION_HEADER_MB,
  GRID_GAP,
  EASE_OUT,
} from "@/lib/design-system";

const stats = [
  { icon: Award, value: "500+", label: "Officers Recommended" },
  { icon: Calendar, value: "15+", label: "Years of Experience" },
  { icon: Users, value: "5,000+", label: "Students Mentored" },
  { icon: Star, value: "4.9 / 5", label: "Average Rating" },
];

const testimonials = [
  {
    name: "Capt. Arjun Sharma",
    rank: "Indian Army",
    attempt: "3rd Attempt — Recommended",
    text: "After two conference outs, Invincio's mentorship changed everything. The psychological profiling helped me understand my real weaknesses. I walked into my third SSB as a different person.",
  },
  {
    name: "Lt. Priya Mehta",
    rank: "Indian Navy",
    attempt: "1st Attempt — Recommended",
    text: "The structured feedback after every mock was invaluable. My mentors — real ex-assessors — knew exactly what the board looks for. Invincio doesn't just prepare you for SSB, they prepare you for life.",
  },
  {
    name: "Sub Lt. Rahul Verma",
    rank: "Indian Air Force",
    attempt: "2nd Attempt — Recommended",
    text: "What sets Invincio apart is the personal attention. My mentor spent hours understanding my personality before we even started prep. The transformation was genuine, not surface-level.",
  },
];

const ResultsSection = () => {
  return (
    <section id="results" className={`bg-[#0E1116] ${SECTION_PAD}`}>
      <div className={CONTAINER}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className={SECTION_HEADER_MB}
        >
          <p className={`${EYEBROW} mb-4`}>Results &amp; Selections</p>
          <h2 className={H2_DARK}>Stories of Transformation</h2>
        </motion.div>

        {/* Stats — scale: 0.98 initial, 50ms stagger */}
        <div className={`grid grid-cols-2 md:grid-cols-4 ${GRID_GAP} mb-16`}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.05 }}
              className="bg-[#161A22] border border-white/[0.08] rounded-xl p-8 text-center"
              style={{ transition: "border-color 150ms ease" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
              }
            >
              <s.icon className="w-4 h-4 text-[#C2A46D] mx-auto mb-3" />
              <p className={`font-serif text-3xl font-bold ${TEXT_PRIMARY_DARK} mb-1`}>
                {s.value}
              </p>
              <p className={`font-sans text-xs ${TEXT_SECONDARY_DARK} tracking-wide uppercase`}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials — scale: 0.98 initial, 50ms stagger */}
        <div className={`grid md:grid-cols-3 ${GRID_GAP}`}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.05 }}
              className="bg-[#161A22] border border-white/[0.08] rounded-xl p-8 flex flex-col"
              style={{ transition: "border-color 150ms ease" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")
              }
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#C2A46D] text-[#C2A46D]" />
                ))}
              </div>

              <p className={`${BODY_DARK} mb-6 flex-1 italic`}>"{t.text}"</p>

              <div className="border-t border-white/[0.08] pt-4">
                <p className={`font-serif font-semibold text-sm ${TEXT_PRIMARY_DARK}`}>
                  {t.name}
                </p>
                <p className={`font-sans text-xs ${TEXT_SECONDARY_DARK} mt-0.5`}>
                  {t.rank}
                </p>
                <p className="font-sans text-xs text-[#C2A46D] font-medium mt-1">
                  {t.attempt}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
