import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "Who are the mentors at Invincio?",
    a: "Our core team is comprised exclusively of Ex-SSB Assessors, including GTOs, TOs, and Interviewing Officers.",
  },
  {
    q: "Is this a coaching or mentorship program?",
    a: "We are a dedicated Mentorship Institute. We reject rote memorization in favor of genuine personality evolution.",
  },
  {
    q: "How is the program personalized?",
    a: "Recognizing that every candidate is unique, we create a bespoke development roadmap for each aspirant.",
  },
  {
    q: "Do you support repeater candidates?",
    a: "Yes. We specialize in repeaters, addressing the psychological aspects of previous attempts.",
  },
  {
    q: "What is the duration of the 2026 programs?",
    a: "Flagship programs typically range from 2–4 weeks depending on the specific track.",
  },
  {
    q: "Is online mentorship available?",
    a: "Yes. Our digital platform provides the same level of rigorous mentorship remotely.",
  },
];

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const FAQSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 bg-[#F1FFFF]" ref={ref}>
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: EASE_OUT }}
          className="text-center mb-16"
        >
          <p className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#2FB4E7] mb-4">
            Insights & Clarity
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#00568C] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-[#6B7280] max-w-xl mx-auto text-sm md:text-base font-sans">
            Everything you need to know about our mentorship philosophy and selection process.
          </p>
        </motion.div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.1 + i * 0.06 }}
              className="group rounded-xl border overflow-hidden"
              style={{
                background: open === i ? "#ffffff" : "#ffffff",
                borderColor: open === i ? "rgba(0,86,140,0.25)" : "#e5e7eb",
                boxShadow: open === i
                  ? "0 4px 24px rgba(0,86,140,0.08)"
                  : "0 1px 4px rgba(0,0,0,0.04)",
                transition: "border-color 250ms ease, box-shadow 250ms ease",
              }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 md:p-7 text-left"
              >
                <span
                  className="font-serif text-lg md:text-xl font-medium tracking-tight pr-8"
                  style={{
                    color: open === i ? "#00568C" : "#374151",
                    transition: "color 200ms ease",
                  }}
                >
                  {faq.q}
                </span>
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: open === i ? "#F6B828" : "#eaf6f8",
                    color: open === i ? "#00568C" : "#6B7280",
                    transition: "background 200ms ease, color 200ms ease",
                  }}
                >
                  {open === i
                    ? <Minus className="w-4 h-4" />
                    : <Plus className="w-4 h-4" />
                  }
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.32, ease: EASE_OUT }}
                  >
                    <div className="px-6 md:px-7 pb-7 pt-0">
                      <div className="h-px w-full bg-[#e5e7eb] mb-5" />
                      <p className="font-sans text-[15px] leading-relaxed text-[#374151] max-w-2xl">
                        {faq.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
