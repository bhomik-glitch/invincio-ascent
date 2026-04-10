import { motion } from "framer-motion";
import { Star, Award, Users, Calendar } from "lucide-react";
import {
  CONTAINER,
  EYEBROW,
  SECTION_PAD,
  SECTION_HEADER_MB,
  GRID_GAP,
  EASE_OUT,
} from "@/lib/design-system";

const stats = [
  { icon: Award,    value: "500+",    label: "Officers Recommended" },
  { icon: Calendar, value: "12+",     label: "Years of Excellence"  },
  { icon: Users,    value: "5,000+",  label: "Students Mentored"    },
  { icon: Star,     value: "4.9 / 5", label: "Satisfied Aspirants"   },
];

const testimonials = [
  {
    name: "Capt. Arjun Sharma",
    rank: "Indian Army",
    attempt: "1st Attempt — Recommended",
    text: "Invincio's mentorship was the decisive turning point in my preparation. The psychological profiling revealed my core areas for growth, allowing me to approach the board with genuine confidence.",
  },
  {
    name: "Lt. Priya Mehta",
    rank: "Indian Navy",
    attempt: "1st Attempt — Recommended",
    text: "The structured feedback from Ex-SSB Assessors was indispensable. They don’t just teach you how to pass; they mentor you to embody the qualities required of a military leader.",
  },
  {
    name: "Sub Lt. Rahul Verma",
    rank: "Indian Air Force",
    attempt: "1st Attempt — Recommended",
    text: "The personal attention I received was exceptional. My mentors spent significant time understanding my personality before initiating prep, ensuring my transformation in 2024 was authentic.",
  },
];

const ResultsSection = () => {
  return (
    <section id="results" className={`bg-white ${SECTION_PAD}`}>
      <div className={CONTAINER}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className={SECTION_HEADER_MB}
        >
          <p className={`${EYEBROW} mb-4`}>Proven Success</p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#00568C]">
            Stories Of Authentic Transformation
          </h2>
        </motion.div>

        {/* Stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 ${GRID_GAP} mb-16`}>
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: i * 0.05 }}
              className="bg-white border border-[#e5e7eb] rounded-xl p-8 text-center"
              style={{
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "transform 280ms cubic-bezier(0.23,1,0.32,1), box-shadow 280ms cubic-bezier(0.23,1,0.32,1), border-color 280ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,86,140,0.08)";
                e.currentTarget.style.borderColor = "rgba(47,180,231,0.30)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <s.icon className="w-4 h-4 text-[#2FB4E7] mx-auto mb-3" />
              <p className="font-serif text-3xl font-bold text-[#00568C] mb-1">
                {s.value}
              </p>
              <p className="font-sans text-xs text-[#6B7280] tracking-wide uppercase">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Testimonials */}
        <div className={`grid md:grid-cols-3 ${GRID_GAP}`}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.05 }}
              className="bg-white border border-[#e5e7eb] rounded-xl p-8 flex flex-col"
              style={{
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "transform 280ms cubic-bezier(0.23,1,0.32,1), box-shadow 280ms cubic-bezier(0.23,1,0.32,1), border-color 280ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,86,140,0.08)";
                e.currentTarget.style.borderColor = "rgba(47,180,231,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-[#F6B828] text-[#F6B828]" />
                ))}
              </div>
              <p className="font-sans text-sm leading-relaxed text-[#374151] mb-6 flex-1 italic">
                "{t.text}"
              </p>
              <div className="border-t border-[#e5e7eb] pt-4">
                <p className="font-serif font-semibold text-sm text-[#00568C]">{t.name}</p>
                <p className="font-sans text-xs text-[#6B7280] mt-0.5">{t.rank}</p>
                <p className="font-sans text-xs text-[#2FB4E7] font-medium mt-1">{t.attempt}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ResultsSection;
