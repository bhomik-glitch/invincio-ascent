import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-padding relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-br from-navy-light via-background to-secondary/30" />
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            Begin Your Journey
          </p>
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Ready to Begin Your{" "}
            <span className="gold-text">Officer Journey?</span>
          </h2>
          <p className="text-muted-foreground font-sans text-lg max-w-2xl mx-auto mb-10">
            Take the first step towards your defence career. Schedule a free consultation with our ex-SSB assessor mentors today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded font-sans font-semibold text-base hover:bg-gold-dark transition-colors w-full sm:w-auto justify-center"
            >
              <CalendarCheck className="w-5 h-5" />
              Schedule Consultation
            </a>
            <a
              href="https://wa.me/919999999999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-primary/40 text-primary px-8 py-4 rounded font-sans font-semibold text-base hover:bg-primary/10 transition-colors w-full sm:w-auto justify-center"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp
            </a>
            <a
              href="tel:+919999999999"
              className="flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded font-sans font-semibold text-base hover:bg-muted transition-colors w-full sm:w-auto justify-center"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
