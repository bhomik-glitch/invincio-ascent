import { motion } from "framer-motion";
import { BookOpen, Users, Building } from "lucide-react";
import {
  CONTAINER,
  EYEBROW,
  H2_LIGHT,
  H3_LIGHT,
  BODY_LIGHT,
  SECTION_PAD,
  SECTION_HEADER_MB,
  GRID_GAP,
  EASE_OUT,
} from "@/lib/design-system";

const offerings = [
  {
    Icon: BookOpen,
    title: "Written Examination Training",
    summary: "Structured prep for NDA, CDS, and AFCAT written tests.",
    bullets: [
      "Subject-wise modules: GK, Maths, English",
      "Test series with performance analytics",
      "Past paper analysis and exam strategy",
    ],
  },
  {
    Icon: Users,
    title: "SSB Interview Preparation",
    summary:
      "End-to-end SSB mentorship by former assessors who know the board from inside.",
    bullets: [
      "Psychology: TAT, WAT, SRT, SD practice",
      "GTO tasks, group discussion, command task",
      "Personal interview and full mock SSBs",
    ],
  },
  {
    Icon: Building,
    title: "Leadership & Govt Collaboration",
    summary:
      "Institutional programs developing officer-like qualities in students and professionals.",
    bullets: [
      "OLQ-based leadership development",
      "School, college, and corporate workshops",
      "Certified government collaboration programs",
    ],
  },
];

const CoreOffering = () => {
  return (
    <section id="programs" className={`bg-[#F5F7FA] ${SECTION_PAD}`}>
      <div className={CONTAINER}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className={SECTION_HEADER_MB}
        >
          <p className={`${EYEBROW} mb-4`}>What We Offer</p>
          <h2 className={H2_LIGHT}>
            Three Distinct Tracks.
            <br />
            One Clear Mission.
          </h2>
        </motion.div>

        {/* 3-column grid — stagger 50ms, scale 0.98 initial */}
        <div className={`grid md:grid-cols-3 ${GRID_GAP}`}>
          {offerings.map(({ Icon, title, summary, bullets }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.05 }}
              className="bg-white border border-gray-200 rounded-xl p-8 flex flex-col"
              style={{ transition: "border-color 150ms ease" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "#D1D5DB")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#E5E7EB")
              }
            >
              {/* Icon */}
              <div className="w-9 h-9 bg-gray-100 rounded-md flex items-center justify-center mb-6 shrink-0">
                <Icon className="w-4 h-4 text-[#C2A46D]" />
              </div>

              <h3 className={`${H3_LIGHT} mb-3 leading-snug`}>{title}</h3>
              <p className={`${BODY_LIGHT} mb-6`}>{summary}</p>

              <div className="w-6 h-px bg-gray-200 mb-6" />

              <ul className="space-y-2.5 mt-auto">
                {bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="flex items-start gap-2.5 font-sans text-sm text-[#6B7280]"
                  >
                    <span className="w-1 h-1 rounded-full bg-[#C2A46D] mt-[7px] shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreOffering;
