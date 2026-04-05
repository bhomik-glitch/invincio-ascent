import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import {
  CONTAINER,
  EYEBROW,
  BODY_DARK,
  EASE_OUT,
  TAP_SCALE,
  TAP_TRANSITION,
} from "@/lib/design-system";

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center bg-[#0E1116]">
      <div className={`w-full ${CONTAINER} py-32 pt-40`}>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.1 }}
          className={`${EYEBROW} mb-6`}
        >
          Defence Leadership Institute
        </motion.p>

        {/* H1 — scale: 0.99 (subtle — text shouldn't shift too much) */}
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.99 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.18 }}
          className="max-w-3xl mb-7"
        >
          <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.75rem] font-bold leading-[1.1] tracking-tight text-[#E5E7EB]">
            Transforming Defence Aspirants into{" "}
            <span className="text-[#C2A46D]">Officers.</span>
          </h1>
        </motion.div>

        {/* Sub-text */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.3 }}
          className={`${BODY_DARK} max-w-md mb-12`}
        >
          Mentored by Former SSB Assessors. Real personality development.
          Proven selections.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-start gap-4"
        >
          {/* Primary — whileTap gives instant press feedback */}
          <motion.a
            href="#contact"
            whileTap={TAP_SCALE}
            transition={TAP_TRANSITION}
            className="inline-flex items-center gap-2 bg-[#C2A46D] text-[#0E1116] px-8 py-3.5 rounded-lg font-sans font-semibold text-sm tracking-wide"
            style={{ transition: "opacity 150ms ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <CalendarCheck className="w-4 h-4 shrink-0" />
            Book Free Consultation
          </motion.a>

          {/* Secondary */}
          <motion.a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={TAP_SCALE}
            transition={TAP_TRANSITION}
            className="inline-flex items-center gap-2 border border-white/20 text-white px-8 py-3.5 rounded-lg font-sans font-semibold text-sm tracking-wide"
            style={{ transition: "border-color 150ms ease" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)")
            }
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            WhatsApp Us
          </motion.a>

          {/* Tertiary */}
          <motion.a
            href="tel:+919999999999"
            whileTap={TAP_SCALE}
            transition={TAP_TRANSITION}
            className="inline-flex items-center gap-2 text-white/45 px-3 py-3.5 font-sans font-medium text-sm"
            style={{ transition: "color 150ms ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          >
            <Phone className="w-4 h-4 shrink-0" />
            Call Now
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
