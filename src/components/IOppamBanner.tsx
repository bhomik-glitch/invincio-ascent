import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/lib/design-system";

const WORDS = ["Officer's", "Potential", "Personality", "Assessment", "Measure"];

// One bubble per question, marked in a fixed scatter like a filled answer sheet.
const BUBBLES = Array.from({ length: 120 }, (_, i) => (i * i * 3 + i * 7) % 11 < 3);

/** i-OPPAM announcement, shared by the landing page and the OIR test area. */
const IOppamBanner = ({ className = "" }: { className?: string }) => {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={`overflow-hidden rounded-2xl bg-[#021526] shadow-[0_20px_60px_rgba(0,86,140,0.22)] ${className}`}
      style={{ backgroundImage: "radial-gradient(90% 120% at 0% 0%, #00568C 0%, #043a61 45%, #021526 100%)" }}
    >
      <div className="grid lg:grid-cols-[1.35fr_1fr]">
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
          <p className="flex items-center gap-3 font-sans text-sm font-semibold text-white">
            <span aria-hidden className="flex h-5 w-7 flex-col overflow-hidden rounded-[3px]">
              <span className="flex-1 bg-[#FF9933]" />
              <span className="flex-1 bg-white" />
              <span className="flex-1 bg-[#138808]" />
            </span>
            First in India, by Invincio
          </p>

          <h2 className="mt-5 font-serif text-[clamp(3.25rem,13vw,6.5rem)] font-bold leading-[0.95] tracking-[-0.03em] text-white">
            <span className="italic text-[#F6B828]">i</span>-OPPAM
          </h2>
          <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-white/80">
            Invincio&apos;s own personality assessment for future officers, built on the lines of OPAM.
          </p>
        </div>

        {/* Answer sheet: 120 bubbles for 120 questions */}
        <div className="flex flex-col justify-center border-t border-white/10 bg-white/[0.04] p-6 sm:p-10 lg:border-l lg:border-t-0">
          <p className="flex items-baseline gap-3 text-white">
            <span className="font-serif text-6xl font-bold lining-nums leading-none text-[#F6B828]">120</span>
            <span className="font-sans text-lg font-semibold">questions</span>
          </p>
          <div aria-hidden className="mt-6 grid max-w-[420px] grid-cols-[repeat(15,minmax(0,1fr))] gap-1.5 sm:gap-2">
            {BUBBLES.map((marked, i) => (
              <span key={i} className="relative aspect-square rounded-full border border-white/30">
                {marked && (
                  <motion.span
                    className="absolute inset-0 rounded-full bg-[#F6B828]"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, ease: EASE_OUT, delay: i * 0.008 }}
                  />
                )}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* What the letters stand for */}
      <dl className="grid border-t border-white/10 sm:grid-cols-5">
        {WORDS.map((word) => (
          <div
            key={word}
            className="flex items-center gap-4 border-b border-white/10 px-6 py-3 last:border-b-0 sm:flex-col sm:items-start sm:gap-1 sm:border-b-0 sm:border-r sm:px-5 sm:py-6 sm:last:border-r-0 lg:px-8"
          >
            <dt className="w-8 font-serif text-3xl font-bold leading-none text-[#F6B828] sm:w-auto sm:text-4xl">{word[0]}</dt>
            <dd className="font-sans text-[15px] font-semibold text-white sm:text-sm lg:text-base">
              {word}
              {word === "Potential" && <span className="font-normal text-white/60"> and</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
};

export default IOppamBanner;
