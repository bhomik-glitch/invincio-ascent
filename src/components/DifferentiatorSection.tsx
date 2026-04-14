import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { X, Check, MapPin } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const notThings = [
  "Not generic coaching.",
  "Not memorized templates.",
  "Not fabricated confidence.",
];

const instead = [
  "Strategic psychological profiling",
  "Authentic behavioral assessment",
  "Genuine leadership transformation",
  "Access to one of the largest GTO training grounds",
];

const comparison = [
  { aspect: "Approach",   invincio: "Mentorship and transformation",    traditional: "Coaching and repetition" },
  { aspect: "Faculty",    invincio: "Ex-SSB Assessors",                 traditional: "Generic trainers"            },
  { aspect: "Feedback",   invincio: "Highly personalized",              traditional: "Generic and group-based"     },
  { aspect: "Psychology", invincio: "Deep profiling and development",   traditional: "Template-based responses"    },
  { aspect: "Core Focus", invincio: "Officer-Like Qualities (OLQs)",    traditional: "Interview tricks"            },
  { aspect: "Outcome",    invincio: "Genuine personality evolution",    traditional: "Temporary behavioral shifts" },
];

const DifferentiatorSection = () => {
  const sectionRef = useRef(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  /* Subtle parallax — bg moves at 30% of scroll speed */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  return (
    <section
      id="difference"
      ref={sectionRef}
      className="relative px-6 py-20 md:px-12 lg:px-20 xl:px-32 overflow-hidden"
    >
      {/* Parallax background image */}
      <motion.div
        aria-hidden
        className="absolute inset-0 w-full h-full"
        style={{ y: bgY }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage: "url('/assets/GTO background.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            transform: "scale(1.15)", /* slight overscale to prevent white edges during parallax */
          }}
        />
      </motion.div>

      {/* Dark overlay — solid base + directional vignette for depth */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: "rgba(0,10,28,0.82)" }}
      />
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,6,20,0.30) 0%, rgba(0,40,80,0.10) 50%, rgba(0,6,20,0.30) 100%)",
        }}
      />

      {/* Content */}
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="text-center mb-14"
        >
          <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#2FB4E7] mb-4">
            The Invincio Difference
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl font-bold text-white mb-3"
            style={{ textShadow: "0 1px 12px rgba(0,0,0,0.55)" }}
          >
            Why We're Different
          </h2>
          {/* GTO ground subtext */}
          <p className="inline-flex items-center gap-1.5 font-sans text-sm text-white/75 mt-1">
            <MapPin size={13} className="text-[#2FB4E7] shrink-0" />
            Train in one of the largest and most realistic GTO grounds available
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.15 }}
          >
            <div className="space-y-4 mb-8">
              {notThings.map((t) => (
                <div key={t} className="flex items-center gap-3">
                  <X className="w-5 h-5 text-[#E66133] shrink-0" />
                  <span className="font-serif text-xl md:text-2xl font-bold text-white/78 line-through decoration-[#E66133]/60" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.4)" }}>
                    {t}
                  </span>
                </div>
              ))}
            </div>
            <div className="space-y-4">
              {instead.map((t, i) => (
                <div key={t} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      background: i === instead.length - 1
                        ? "rgba(47,180,231,0.25)"
                        : "rgba(255,255,255,0.12)",
                      border: i === instead.length - 1
                        ? "1px solid rgba(47,180,231,0.5)"
                        : "1px solid rgba(255,255,255,0.2)",
                    }}
                  >
                    <Check
                      size={11}
                      strokeWidth={2.5}
                      className={i === instead.length - 1 ? "text-[#2FB4E7]" : "text-white"}
                    />
                  </div>
                  <span
                    className="font-serif text-xl md:text-2xl font-bold leading-snug"
                    style={{
                      color: i === instead.length - 1 ? "#2FB4E7" : "rgba(255,255,255,0.96)",
                      textShadow: "0 1px 10px rgba(0,0,0,0.45)",
                    }}
                  >
                    {t}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — comparison table */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.28 }}
            className="rounded-xl overflow-hidden"
            style={{
              background: "rgba(0,10,30,0.72)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.10)",
              boxShadow: "0 8px 48px rgba(0,0,0,0.45)",
            }}
          >
            <div className="overflow-x-auto">
              <div className="grid grid-cols-3 text-sm font-sans min-w-[400px]">
                {/* Header row */}
                <div className="p-4 font-semibold text-white/40 text-xs uppercase tracking-widest"
                  style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  Aspect
                </div>
                <div className="p-4 font-semibold text-[#2FB4E7] text-xs uppercase tracking-widest"
                  style={{ background: "rgba(47,180,231,0.10)", borderBottom: "1px solid rgba(47,180,231,0.15)" }}>
                  Invincio
                </div>
                <div className="p-4 font-semibold text-white/40 text-xs uppercase tracking-widest"
                  style={{ background: "rgba(255,255,255,0.04)", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
                  Traditional
                </div>

                {comparison.map((row) => (
                  <>
                    <div key={row.aspect + "a"}
                      className="p-4 text-white/75 text-[13px]"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      {row.aspect}
                    </div>
                    <div key={row.aspect + "i"}
                      className="p-4 text-white font-medium text-[13px]"
                      style={{ background: "rgba(47,180,231,0.10)", borderTop: "1px solid rgba(47,180,231,0.14)" }}>
                      {row.invincio}
                    </div>
                    <div key={row.aspect + "t"}
                      className="p-4 text-white/65 text-[13px]"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                      {row.traditional}
                    </div>
                  </>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DifferentiatorSection;
