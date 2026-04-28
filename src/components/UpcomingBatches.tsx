import { motion } from "framer-motion";
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const batches = [
  {
    title: "Offline SSB Mentorship",
    tagline: "The Ultimate 15-Day Immersive Simulation.",
    description:
      "A holistic, offline module conducted strictly on SSB lines. Starts with 15 days of intensive ground training, followed by continuous online support until your actual SSB—even if it's 6 months away.",
    points: [
      "SSB-style personality assessment & psych tests",
      "Live GTO practice on real GTO grounds",
      "Orientation by Ex-Interviewing Officers & GTOs",
      "Individual hand-holding & behavioural correction",
    ],
    dates: "04 May | 11 May | 24 May 2026",
    duration: "15 Days Offline + Online Support",
    highlight: "Limited Seats Available",
  },
  {
    title: "Online Officer Mentorship",
    tagline: "Structured guidance without geographical limits.",
    description:
      "Designed for aspirants balancing college or work who need absolute clarity, personality orientation, and discipline without full-time offline coaching.",
    points: [
      "15-Day focus on officer-like mindset & routine",
      "Continuous interactive live sessions & guided tasks",
      "Personal feedback to fix strengths and weaknesses",
      "Exposure to real SSB expectations & assessment logic",
    ],
    dates: "Next Batch Launch: 04 May 2026",
    duration: "15 Days Initial + Ongoing Support",
    highlight: "Ideal for Working/College Aspirants",
  },
  {
    title: "CDS 2/2026 Preparation",
    tagline: "Personality + Written = Selection.",
    description:
      "A continuous program from April to the CDS exam. We uniquely run personality development parallel to written preparation from Day 1, ensuring you aim for the final merit list.",
    points: [
      "Small focused batches (max 30 students)",
      "Comprehensive Written Prep (English, GS, Maths)",
      "Weekly performance tracking & personal mentoring",
      "Post-written SSB specialization (Psych, GTO, Interview)",
    ],
    dates: "Starts 23 April 2026 (Online & Offline)",
    duration: "April 2026 till Exam",
    highlight: "Parallel Personality Prep",
  },
  {
    title: "NDA 2/2026 Preparation",
    tagline: "Early foundation for future leaders.",
    description:
      "A complete preparation journey from April to September 2026, ensuring structured guidance at every stage for young aspirants aiming for the NDA final merit list.",
    points: [
      "NDA Written Prep (Maths + GAT)",
      "Personality baseline & leadership development",
      "Continuous mentoring & performance feedback",
      "Dedicated SSB preparation post-written exam",
    ],
    dates: "Enrollments Open (Prep from April to Sept)",
    duration: "April 2026 till Sept 2026",
    highlight: "Structured Mentoring",
  },
];

const UpcomingBatches = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAFAFA] border-t border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="mb-16"
        >
          <span className="text-sm font-bold tracking-widest uppercase text-[#C6A15B] mb-3 block font-sans">
            Admissions Open
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-neutral-900 tracking-tight max-w-2xl">
            Upcoming Batches & Flagship Programs
          </h2>
          <p className="mt-4 text-neutral-500 font-sans text-sm md:text-base max-w-xl leading-relaxed">
            Enroll in our carefully structured mentorship tracks designed for real outcomes. Secure your seat in the upcoming cohorts.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {batches.map((batch, idx) => (
            <motion.div
              key={batch.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: EASE_OUT }}
              className="bg-white rounded-3xl p-8 md:p-10 border border-neutral-200 shadow-sm hover:shadow-xl hover:border-[#00568C]/20 transition-all duration-300 flex flex-col group relative overflow-hidden"
            >
              {/* Subtle accent line on top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#00568C] to-[#2FB4E7] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="flex justify-between items-start mb-6">
                <span className="inline-block bg-[#f0f9ff] text-[#00568C] text-xs font-semibold px-3 py-1 rounded-full border border-[#00568C]/10">
                  {batch.highlight}
                </span>
                <span className="text-[11px] font-sans font-bold text-neutral-400 uppercase tracking-widest">
                  {batch.duration}
                </span>
              </div>

              <h3 className="text-2xl md:text-3xl font-serif font-bold text-neutral-900 mb-2 group-hover:text-[#00568C] transition-colors">
                {batch.title}
              </h3>
              <p className="font-sans text-sm font-medium text-[#C6A15B] italic mb-5">
                {batch.tagline}
              </p>
              
              <p className="text-neutral-600 font-sans text-sm leading-relaxed mb-8 flex-1">
                {batch.description}
              </p>

              <div className="space-y-3 mb-10">
                {batch.points.map((point, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-4 h-4 text-[#2FB4E7] mt-0.5 shrink-0" />
                    <span className="text-sm text-neutral-600 font-sans">{point}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-6 border-t border-neutral-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-400" />
                  <span className="text-sm font-bold text-neutral-800">
                    {batch.dates}
                  </span>
                </div>
                
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 text-sm font-bold text-[#00568C] hover:text-[#004a7a] transition-colors group/btn"
                >
                  Enroll Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingBatches;
