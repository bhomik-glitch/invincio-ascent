import { motion } from "framer-motion";
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { plusDays, isCurrent, SSB_VISIBLE_DAYS, WRITTEN_EXAM_END } from "@/lib/batch-visibility";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const ssbBatch = (date: string, start: string, mode: "Offline" | "Online", session?: string) => ({
  until: plusDays(start, SSB_VISIBLE_DAYS),
  title: `SSB Mentorship — ${date} (${mode})`,
  tagline:
    mode === "Offline"
      ? "The Ultimate 21-Day Immersive Simulation (Project Invincible)."
      : "Structured guidance without geographical limits (Project Invincible).",
  description:
    mode === "Offline"
      ? "A holistic, offline module conducted strictly on SSB lines under Project Invincible. Starts with 21 days of intensive ground training, followed by continuous online support until your actual SSB."
      : "Designed for aspirants balancing college or work who need absolute clarity, personality orientation, and discipline under Project Invincible.",
  points:
    mode === "Offline"
      ? [
          "SSB-style personality assessment & psych tests",
          "Live GTO practice on real GTO grounds",
          "Orientation by Ex-Interviewing Officers & GTOs",
          "Individual hand-holding under Project Invincible",
        ]
      : [
          "21-Day focus on officer-like mindset & routine",
          "Continuous interactive live sessions & guided tasks",
          "Personal feedback to fix strengths and weaknesses",
          "Exposure to real SSB expectations & assessment logic",
        ],
  dates: session ? `Starts: ${date} 2026 — ${session}` : `Starts: ${date} 2026`,
  duration: `21 Days ${mode} + Support`,
  highlight: "Project Invincible",
});

const writtenPoints: Record<string, string[]> = {
  NDA: [
    "Complete Mathematics & General Ability Test coverage",
    "Physics, Chemistry, Biology, History, Geography & Polity",
    "Daily Practice Problems (DPPs) & weekly mock tests",
    "Current affairs, map work & post-written SSB guidance",
  ],
  CDS: [
    "English, General Knowledge & Elementary Mathematics",
    "Sectional drills for speed and accuracy",
    "Weekly full-length mock tests with detailed analysis",
    "Post-written SSB specialization & interview guidance",
  ],
  AFCAT: [
    "General Awareness, Verbal Ability & Numerical Ability",
    "Reasoning & Military Aptitude Test practice",
    "Weekly full-length mock tests with detailed analysis",
    "Post-written AFSB interview guidance",
  ],
};

const writtenBatch = (exam: "NDA" | "CDS" | "AFCAT", mode: "Offline" | "Online") => ({
  until: WRITTEN_EXAM_END[exam],
  title: `${exam} Written Prep Batch (${mode})`,
  tagline:
    mode === "Offline"
      ? `Offline classroom preparation for the ${exam} written exam.`
      : `Live interactive online preparation for the ${exam} written exam.`,
  description:
    mode === "Offline"
      ? `Full-syllabus offline classroom batch for ${exam}, taught by veteran faculty with daily practice, doubt-solving sessions and regular mock tests right up to the exam.`
      : `Live online batch for ${exam} with interactive classes, recorded sessions, daily practice sets, doubt clearing and regular mock tests right up to the exam.`,
  points: writtenPoints[exam],
  dates: "Starts: 01 Oct 2026",
  duration: "01 Oct 2026 till Exam",
  highlight: `${mode} Mode`,
});

const allBatches = [
  ssbBatch("10 Aug", "2026-08-10", "Offline"),
  ssbBatch("17 Aug", "2026-08-17", "Offline"),
  ssbBatch("24 Aug", "2026-08-24", "Offline"),
  ssbBatch("14 Sep", "2026-09-14", "Offline", "Forenoon / Afternoon"),
  ssbBatch("21 Sep", "2026-09-21", "Offline", "Forenoon / Afternoon"),
  ssbBatch("24 Aug", "2026-08-24", "Online"),
  ssbBatch("07 Sep", "2026-09-07", "Online"),
  writtenBatch("NDA", "Offline"),
  writtenBatch("NDA", "Online"),
  writtenBatch("CDS", "Offline"),
  writtenBatch("CDS", "Online"),
  writtenBatch("AFCAT", "Offline"),
  writtenBatch("AFCAT", "Online"),
];

// SSB batches drop off a week after they start; written batches stay until their exam.
const batches = allBatches.filter(isCurrent);

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

        {batches.length === 0 && (
          <p className="text-neutral-500 font-sans text-sm">
            Dates for the next cohort are being finalised —{" "}
            <a href="#contact" className="font-bold text-[#00568C] hover:underline">get in touch</a> to be notified first.
          </p>
        )}

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
                {batch.dates ? (
                  <>
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
                  </>
                ) : (
                  <a
                    href="#contact"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl border text-sm font-bold text-white bg-[#00568C] hover:bg-[#004471] transition-colors shadow-sm hover:shadow-md"
                  >
                    Register Now
                    <ArrowRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingBatches;
