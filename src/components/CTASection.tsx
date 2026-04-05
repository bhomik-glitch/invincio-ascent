import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import {
  CONTAINER,
  EYEBROW,
  H2_DARK,
  BODY_DARK,
  SECTION_PAD,
  EASE_OUT,
  TAP_SCALE,
  TAP_TRANSITION,
} from "@/lib/design-system";

const CTASection = () => {
  return (
    <section id="contact" className={`bg-[#0E1116] ${SECTION_PAD}`}>
      <div className={CONTAINER}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="max-w-xl"
        >
          <p className={`${EYEBROW} mb-6`}>Begin Your Officer Journey</p>

          <h2 className={`${H2_DARK} mb-5 leading-tight`}>
            Your Selection Starts Here.
          </h2>

          <p className={`${BODY_DARK} mb-10 max-w-md`}>
            Schedule a free consultation with an ex-SSB assessor. No commitment
            — just clarity on your path forward.
          </p>

          {/* Primary CTA — whileTap for instant press feedback */}
          <div className="mb-8">
            <motion.a
              href="#"
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
          </div>

          {/* Ghost contact links */}
          <div className="flex items-center gap-6 font-sans text-sm">
            <motion.a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={TAP_SCALE}
              transition={TAP_TRANSITION}
              className="inline-flex items-center gap-1.5 text-white/40"
              style={{ transition: "color 150ms ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </motion.a>

            <span className="text-white/15 select-none">|</span>

            <motion.a
              href="tel:+919999999999"
              whileTap={TAP_SCALE}
              transition={TAP_TRANSITION}
              className="inline-flex items-center gap-1.5 text-white/40"
              style={{ transition: "color 150ms ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.7)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.4)")}
            >
              <Phone className="w-4 h-4" />
              Call Now
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
