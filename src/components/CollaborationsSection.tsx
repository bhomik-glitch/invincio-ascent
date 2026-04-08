import { motion } from "framer-motion";
import { CONTAINER, EYEBROW, SECTION_PAD, EASE_OUT } from "@/lib/design-system";

const collaborators = [
  "Ministry of Defence Initiatives",
  "Kendriya Vidyalaya Sangathan",
  "State Police Academies",
  "NCC Directorate Programs",
  "Corporate Leadership Programs",
];

const CollaborationsSection = () => {
  return (
    <section className={`bg-[#F1FFFF] ${SECTION_PAD} border-t border-[#e5e7eb]`}>
      <div className={`${CONTAINER} text-center`}>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
        >
          <p className={`${EYEBROW} mb-10`}>Collaborated &amp; Endorsed By</p>

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {collaborators.map((name, i) => (
              <motion.span
                key={name}
                initial={{ opacity: 0, y: 4 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, ease: EASE_OUT, delay: i * 0.05 }}
                className="font-sans text-sm font-medium text-[#6B7280]/70 tracking-wide"
              >
                {name}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CollaborationsSection;
