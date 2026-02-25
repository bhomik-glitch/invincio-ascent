import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Who are the mentors at Invincio?",
    a: "Our mentors are former SSB assessors and defence officers with decades of experience in evaluating candidates. They bring an insider's perspective that no traditional coaching institute can offer.",
  },
  {
    q: "Is this coaching or mentorship?",
    a: "Strictly mentorship. We don't believe in rote learning or memorised answers. Our approach focuses on genuine personality development, psychological readiness, and building real officer-like qualities.",
  },
  {
    q: "How is the program personalised?",
    a: "Every candidate undergoes deep psychological profiling before we design their mentorship plan. No two candidates receive the same program — it's tailored to your unique personality and areas of development.",
  },
  {
    q: "Do you help with repeater candidates?",
    a: "Absolutely. A significant portion of our recommended candidates were repeaters. We specialise in identifying why candidates get screened out or conference out, and addressing those specific gaps.",
  },
  {
    q: "What is the duration of the program?",
    a: "Programs range from 2 to 8 weeks depending on your needs. We offer SSB Mentorship, Personality Development, Psychometric Assessments, and Corporate/School Workshops.",
  },
  {
    q: "Do you offer online mentorship?",
    a: "Yes, we offer both online and offline mentorship options. Our online program delivers the same quality with live one-on-one sessions, mock interviews, and real-time feedback.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding bg-muted/30" ref={ref}>
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-primary font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-4">
            FAQs
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold">
            Frequently Asked <span className="gold-text">Questions</span>
          </h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.05 }}
              className="border border-border rounded-lg overflow-hidden bg-card"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-sans font-semibold text-sm md:text-base pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-muted-foreground font-sans text-sm leading-relaxed">{faq.a}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
