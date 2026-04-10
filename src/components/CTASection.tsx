import { motion } from "framer-motion";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import {
  CONTAINER,
  SECTION_PAD,
  EASE_OUT,
  TAP_SCALE,
  TAP_TRANSITION,
} from "@/lib/design-system";

const CTASection = () => {
  return (
    <section
      id="contact"
      className={`${SECTION_PAD}`}
      style={{
        background: "linear-gradient(135deg, #00568C 0%, #003d66 100%)",
      }}
    >
      <div className={CONTAINER}>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
          className="max-w-xl"
        >
          {/* Eyebrow */}
          <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#2FB4E7] mb-6">
            Begin Your Leadership Journey
          </p>

          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
            Your Selection Journey Starts Here
          </h2>

          <p className="font-sans text-sm leading-relaxed text-white/70 mb-10 max-w-md">
            Consult with an Ex-SSB Assessor throughout 2024. Gain absolute clarity on your path to recommendation through our specialized mentorship.
          </p>

          {/* Primary CTA — golden yellow */}
          <div className="mb-8">
            <motion.a
              href="#"
              whileTap={TAP_SCALE}
              transition={TAP_TRANSITION}
              className="inline-flex items-center gap-2 bg-[#F6B828] text-[#00568C] px-8 py-3.5 rounded-lg font-sans font-semibold text-sm tracking-wide"
              style={{
                boxShadow: "0 4px 20px rgba(246,184,40,0.30)",
                transition: "background-color 200ms ease, box-shadow 200ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e0a720";
                e.currentTarget.style.boxShadow = "0 6px 28px rgba(246,184,40,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F6B828";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(246,184,40,0.30)";
              }}
            >
              <CalendarCheck className="w-4 h-4 shrink-0" />
              Book Free Consultation
            </motion.a>
          </div>

          {/* Secondary contact links */}
          <div className="flex items-center gap-6 font-sans text-sm">
            <motion.a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={TAP_SCALE}
              transition={TAP_TRANSITION}
              className="inline-flex items-center gap-1.5 text-white/50"
              style={{ transition: "color 150ms ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </motion.a>

            <span className="text-white/20 select-none">|</span>

            <motion.a
              href="tel:+919999999999"
              whileTap={TAP_SCALE}
              transition={TAP_TRANSITION}
              className="inline-flex items-center gap-1.5 text-white/50"
              style={{ transition: "color 150ms ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.85)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.50)")}
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
