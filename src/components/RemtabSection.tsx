import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";
import {
  CONTAINER,
  EYEBROW,
  H2_LIGHT,
  BODY_LIGHT,
  SECTION_PAD,
  GRID_GAP,
  EASE_OUT,
  BTN_PRIMARY,
} from "@/lib/design-system";

const pillars = [
  { Icon: GraduationCap, title: "Empower", line: "Building skills and self-belief." },
  { Icon: Users, title: "Enable", line: "Creating opportunities for growth." },
  { Icon: Target, title: "Elevate", line: "Transforming potential into performance." },
  { Icon: TrendingUp, title: "Equip", line: "Preparing for careers and leadership." },
];

const photos = [
  {
    src: "/assets/remtab/DSC05411.jpg",
    alt: "Signing of the agreement between Invincio and Remtab Care Foundation for the Future Leaders Employment Readiness Scholarship",
  },
  {
    src: "/assets/remtab/DSC05460.jpg",
    alt: "Representatives of Invincio and Remtab Care Foundation shaking hands at the scholarship launch",
  },
  {
    src: "/assets/remtab/DSC05468.jpg",
    alt: "The Invincio and Remtab Care Foundation team at the Future Leaders scholarship launch",
  },
  {
    src: "/assets/remtab/DSC05448.jpg",
    alt: "Invincio's Hall of Invincibles — aspirants recommended for the armed forces",
  },
];

const SLIDE_MS = 5000;

const FORM_URL = "https://forms.gle/UBCDSatWnNQjT4WF8";

const applyColumns = [
  {
    title: "Who can apply",
    items: [
      "Ward of a Veer Nari or of a war-wounded soldier",
      "Ward of serving or retired Armed Forces personnel",
      "Serving or retired CAPF personnel",
      "Economically Weaker Section (EWS)",
      "Any other deserving and dedicated aspirant",
    ],
  },
  {
    title: "What the support covers",
    items: [
      "Full or partial scholarship",
      "Course and training fee assistance",
      "SSB mentorship and written exam preparation",
      "Books, study material and educational expenses",
      "Career guidance, personality and communication development",
    ],
  },
  {
    title: "How the selection works",
    items: [
      "Submit the application form",
      "Document verification of the category claimed",
      "Initial interaction with the program team",
      "Final interview and approval by the Scholarship Committee",
    ],
  },
];

const PhotoSlider = () => {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const go = (step: number) =>
    setIndex((i) => (i + step + photos.length) % photos.length);

  // Restarts whenever index changes, so manual nav resets the dwell time.
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => go(1), SLIDE_MS);
    return () => clearTimeout(id);
  }, [index, paused]);

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative rounded-xl overflow-hidden border border-[#e5e7eb] shadow-[0_12px_40px_rgba(0,86,140,0.10)] h-[320px] md:h-[420px] bg-[#eaf6f8]">
        <AnimatePresence initial={false}>
          <motion.img
            key={index}
            src={photos[index].src}
            alt={photos[index].alt}
            loading="lazy"
            draggable={false}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
            className="absolute inset-0 w-full h-full object-cover object-center cursor-grab active:cursor-grabbing"
          />
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/85 text-[#00568C] shadow-[0_2px_10px_rgba(0,0,0,0.12)] hover:bg-white transition-[background-color,transform] duration-[200ms] ease-out active:scale-[0.97]"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full flex items-center justify-center bg-white/85 text-[#00568C] shadow-[0_2px_10px_rgba(0,0,0,0.12)] hover:bg-white transition-[background-color,transform] duration-[200ms] ease-out active:scale-[0.97]"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4">
        {photos.map((photo, i) => (
          <button
            key={photo.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to photo ${i + 1}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-[width,background-color] duration-[280ms] [transition-timing-function:cubic-bezier(0.23,1,0.32,1)] ${
              i === index ? "w-6 bg-[#00568C]" : "w-1.5 bg-[#00568C]/25 hover:bg-[#00568C]/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const RemtabSection = () => {
  return (
    <section className={`bg-[#F1FFFF] ${SECTION_PAD} border-b border-[#e5e7eb]`}>
      <div className={CONTAINER}>
        {/* Header — text left, launch photos right */}
        <div className="grid md:grid-cols-[1.15fr_1fr] gap-10 md:gap-16 items-center mb-14 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <p className={`${EYEBROW} mb-4`}>Social Impact Initiative</p>
            <h2 className={H2_LIGHT}>
              Future Leaders
              <br />
              Employment Readiness Scholarship
            </h2>
            <p className="mt-5 font-sans text-sm font-medium text-[#6B7280] tracking-wide">
              Invincio Services LLP <span className="text-[#2FB4E7] mx-1.5">×</span> Remtab Care
              Foundation
              <span className="inline-flex items-center ml-3 px-2.5 py-0.5 rounded-full bg-[#eaf6f8] text-[#00568C] text-[11px] font-semibold uppercase tracking-[0.14em]">
                Proud Partners in Nation Building
              </span>
            </p>

            <p className={`${BODY_LIGHT} text-base mt-8`}>
              Empowering deserving students with the skills, confidence and opportunities to become
              capable leaders and contribute to the nation — a scholarship initiative launched by
              Invincio in collaboration with the Remtab Care Foundation.
            </p>
            <p className="mt-4 font-sans text-sm text-[#6B7280]">
              Potential alone is rarely enough. The scholarship supports promising candidates
              preparing for NDA, CDS, TES and the SSB and AFSB selection pathways, so that guidance
              and opportunity — not circumstance — decide how far they go.
            </p>
            <p className="mt-4 font-serif text-base text-[#00568C]">
              A scholarship isn&apos;t just financial support. It&apos;s a message that we believe
              in you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 }}
          >
            <PhotoSlider />
          </motion.div>
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

        {/* Apply */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="mt-14 md:mt-20 bg-white border border-[#e5e7eb] rounded-xl p-8 md:p-10 shadow-[0_1px_4px_rgba(0,0,0,0.04)]"
        >
          <p className={`${EYEBROW} mb-3`}>Applications Open</p>
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#00568C]">
            Apply for the Scholarship
          </h3>
          <p className={`${BODY_LIGHT} text-base mt-4 max-w-3xl`}>
            REMTAB Foundation and Invincio invite applications from deserving, dedicated and
            desirous aspirants who need financial assistance, mentorship or other support to pursue
            their educational and career goals.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {applyColumns.map(({ title, items }) => (
              <div key={title}>
                <h4 className="font-serif text-base font-bold text-[#00568C] mb-4">{title}</h4>
                <ul className="space-y-2.5">
                  {items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <Check className="w-4 h-4 mt-0.5 shrink-0 text-[#2FB4E7]" />
                      <span className="font-sans text-sm text-[#6B7280] leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-[#e5e7eb] flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`${BTN_PRIMARY} shrink-0`}
            >
              Start Your Application
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <p className="font-sans text-xs text-[#6B7280] leading-relaxed">
              Keep ready: proof of the category claimed, supporting financial documents if
              shortlisted, and a 60–90 second video introduction. Submission of the form does not
              automatically entitle an applicant to a scholarship — every application is assessed
              through a structured selection process.
            </p>
          </div>
        </motion.div>

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
            Because every student deserves a chance.
          </p>
          <p className="mt-2 font-sans text-xs font-semibold tracking-[0.2em] uppercase text-[#6B7280]/70">
            Together, We Invest in Futures
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default RemtabSection;
