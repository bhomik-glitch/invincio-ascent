import { motion } from "framer-motion";
import { Shield, Phone, MessageCircle, CalendarCheck } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const trustBadges = [
  { icon: Shield, label: "Ex-SSB Assessors" },
  { icon: Shield, label: "Real Mentorship" },
  { icon: Shield, label: "Proven Track Record" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="Military academy training" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <p className="text-primary font-sans text-sm md:text-base font-semibold tracking-[0.25em] uppercase mb-6">
            Leadership Transformation Institute
          </p>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 text-balance">
            Transforming Defence Aspirants{" "}
            <span className="gold-text">into Officers.</span>
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 font-sans leading-relaxed">
            Mentorship by Former SSB Assessors. Real Leadership. Real Transformation.
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <a
            href="#contact"
            className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-4 rounded font-sans font-semibold text-base hover:bg-gold-dark transition-colors w-full sm:w-auto justify-center"
          >
            <CalendarCheck className="w-5 h-5" />
            Book Free Consultation
          </a>
          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-primary/40 text-primary px-8 py-4 rounded font-sans font-semibold text-base hover:bg-primary/10 transition-colors w-full sm:w-auto justify-center"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Now
          </a>
          <a
            href="tel:+919999999999"
            className="flex items-center gap-2 border border-border text-foreground px-8 py-4 rounded font-sans font-semibold text-base hover:bg-muted transition-colors w-full sm:w-auto justify-center"
          >
            <Phone className="w-5 h-5" />
            Call Us
          </a>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="flex flex-wrap items-center justify-center gap-6 md:gap-10"
        >
          {trustBadges.map((badge) => (
            <div key={badge.label} className="flex items-center gap-2 text-muted-foreground">
              <badge.icon className="w-4 h-4 text-primary" />
              <span className="text-sm font-sans font-medium tracking-wide">{badge.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
