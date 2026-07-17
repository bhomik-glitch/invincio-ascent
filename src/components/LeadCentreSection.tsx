import { motion } from "framer-motion";
import { Compass, Briefcase, Target, Sprout } from "lucide-react";
import {
  CONTAINER,
  EYEBROW,
  H2_LIGHT,
  BODY_LIGHT,
  SECTION_PAD,
  GRID_GAP,
  EASE_OUT,
} from "@/lib/design-system";

const pillars = [
  { Icon: Compass, title: "Leadership", line: "Build confidence. Lead with purpose." },
  { Icon: Briefcase, title: "Employability", line: "Enhance skills. Unlock opportunities." },
  { Icon: Target, title: "Career Skills", line: "Plan better. Achieve more." },
  { Icon: Sprout, title: "Personal Growth", line: "Stronger mindset. Better you." },
];

const LeadCentreSection = () => {
  return (
    <section className={`bg-white ${SECTION_PAD} border-b border-[#e5e7eb]`}>
      <div className={CONTAINER}>
        {/* Header — text left, signing photo right */}
        <div className="grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-16 items-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <p className={`${EYEBROW} mb-4`}>Institutional Milestone</p>
            <h2 className={H2_LIGHT}>
              The LEAD Centre
              <br />
              of Excellence
            </h2>
            <p className="mt-5 font-sans text-sm font-medium text-[#6B7280] tracking-wide">
              Invincio Services LLP <span className="text-[#2FB4E7] mx-1.5">×</span> HSNC University
              <span className="inline-flex items-center ml-3 px-2.5 py-0.5 rounded-full bg-[#eaf6f8] text-[#00568C] text-[11px] font-semibold uppercase tracking-[0.14em]">
                Now in Mumbai
              </span>
            </p>

            <p className={`${BODY_LIGHT} text-base mt-8`}>
              Invincio and HSNC University proudly announce the establishment of the LEAD Centre
              of Excellence in Mumbai — empowering individuals with life skills, career readiness,
              and leadership to serve the nation in every walk of life.
            </p>
            <p className="mt-4 font-sans text-sm text-[#6B7280]">
              Dreaming of the Armed Forces? Preparing for corporate success? Wanting to become a
              better version of yourself? The journey begins with LEAD.
            </p>
          </motion.div>

          <motion.figure
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-xl overflow-hidden border border-[#e5e7eb] shadow-[0_12px_40px_rgba(0,86,140,0.10)]">
              <img
                src="/assets/lead-mou-signing.jpeg"
                alt="Leadership of Invincio and HSNC University exchanging the MoU establishing the LEAD Centre of Excellence in Mumbai"
                loading="lazy"
                className="w-full h-[320px] md:h-[420px] object-cover object-[center_45%]"
              />
            </div>
            <figcaption className="mt-3 font-sans text-xs text-[#6B7280]/80 tracking-wide">
              Signing of the MoU at HSNC University, Mumbai
            </figcaption>
          </motion.figure>
        </div>

        {/* Pillars */}
        <div className={`grid sm:grid-cols-2 lg:grid-cols-4 ${GRID_GAP}`}>
          {pillars.map(({ Icon, title, line }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: i * 0.05 }}
              className="bg-white border border-[#e5e7eb] rounded-xl p-6 transition-[transform,box-shadow,border-color] duration-[280ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,86,140,0.10)] hover:border-[#00568C]/[0.18]"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="w-9 h-9 rounded-md flex items-center justify-center mb-5 bg-[#eaf6f8]">
                <Icon className="w-4 h-4 text-[#00568C]" />
              </div>
              <h3 className="font-serif text-base font-bold text-[#00568C] mb-1.5">{title}</h3>
              <p className="font-sans text-sm text-[#6B7280] leading-relaxed">{line}</p>
            </motion.div>
          ))}
        </div>

        {/* Closing */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.35, ease: EASE_OUT }}
          className="mt-14 md:mt-16 text-center"
        >
          <div className="w-10 h-px bg-[#e5e7eb] mx-auto mb-6" />
          <p className="font-serif text-lg md:text-xl text-[#00568C]">
            Building leaders for every walk of life.
          </p>
          <p className="mt-2 font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7280]/70">
            Stronger Together for Nation&apos;s Success
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default LeadCentreSection;
