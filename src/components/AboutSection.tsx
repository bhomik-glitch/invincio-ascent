import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { UserCheck, Brain, HeartHandshake, ClipboardCheck } from "lucide-react";

const features = [
  { icon: UserCheck, title: "Officer-Like Qualities (OLQs)", desc: "Developing the 15 core attributes assessed during the SSB Interview" },
  { icon: Brain, title: "Psychological Assessment", desc: "Comprehensive profiling for the TAT, WAT, SRT, and SD modules" },
  { icon: HeartHandshake, title: "Expert Mentorship", desc: "Exclusive one-on-one guidance conducted by Ex-SSB Assessors" },
  { icon: ClipboardCheck, title: "Strategic Feedback", desc: "Detailed and actionable feedback for every mock simulation" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Left: visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-lg overflow-hidden border border-border">
              <img
                src="/assets/cooperateTraining2.jpeg"
                alt="Invincio — session in progress"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-primary font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              About Invincio
            </p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 leading-tight">
              Where Aspirants Become{" "}
              <span className="gold-text">Officers</span>
            </h2>
            <p className="text-muted-foreground font-sans leading-relaxed mb-4">
              Founded by veteran assessors, we prioritize authentic transformation over traditional coaching. Our 2026 mentorship model focuses exclusively on the genuine development of Officer-Like Qualities (OLQs).
            </p>
            <p className="text-muted-foreground font-sans leading-relaxed">
              Every candidate is unique — and so is our approach. Through personalised mentorship, deep psychological profiling, and strategic feedback, we build the real you.
            </p>
          </motion.div>
        </div>

        {/* Feature blocks */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.1 }}
              className="card-premium text-center transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-serif text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-muted-foreground text-sm font-sans">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
