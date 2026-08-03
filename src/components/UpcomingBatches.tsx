import { motion } from "framer-motion";
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const batches = [
  {
    title: "Offline SSB Mentorship",
    tagline: "The Ultimate 21-Day Immersive Simulation (Project Invincible).",
    description:
      "A holistic, offline module conducted strictly on SSB lines under Project Invincible. Starts with 21 days of intensive ground training, followed by continuous online support until your actual SSB.",
    points: [
      "SSB-style personality assessment & psych tests",
      "Live GTO practice on real GTO grounds",
      "Orientation by Ex-Interviewing Officers & GTOs",
      "Individual hand-holding under Project Invincible",
    ],
    dates: "10 Aug 2026",
    duration: "21 Days Offline + Online Support",
    highlight: "Project Invincible",
  },
  {
    title: "Online Officer Mentorship",
    tagline: "Structured guidance without geographical limits (Project Invincible).",
    description:
      "Designed for aspirants balancing college or work who need absolute clarity, personality orientation, and discipline under Project Invincible.",
    points: [
      "21-Day focus on officer-like mindset & routine",
      "Continuous interactive live sessions & guided tasks",
      "Personal feedback to fix strengths and weaknesses",
      "Exposure to real SSB expectations & assessment logic",
    ],
    dates: "Next Batch Launch: 01 Aug 2026",
    duration: "21 Days Initial + Ongoing Support",
    highlight: "Project Invincible",
  },
  {
    title: "NDA Intense Revision Batch (Offline)",
    tagline: "Complete Revision & Exam-Oriented Preparation — 6:00 PM Onwards.",
    description:
      "Immersive offline classroom revision batch for NDA 2/2026. Focused revision of all high-priority topics across the NDA syllabus — from Maths & General Studies every day, to Biology, Chemistry & Physics on alternate days, with marathon sessions, doubt clearance, mock tests, DPPs, and current affairs.",
    points: [
      "Maths & General Studies — Daily Classes",
      "Biology, Chemistry & Physics — Alternate Classes",
      "Marathon Sessions for comprehensive revision",
      "Dedicated Doubt-Solving Sessions every week",
      "Weekly Mock Tests — August: 1 every week; September: 2 per week",
      "Practice Questions & Daily Practice Problems (DPPs)",
      "Weekly Current Affairs Session",
      "Regular Map Work for geographical awareness",
    ],
    dates: "Batch: 03 Aug – 12 Sep 2026 | Classes from 6:00 PM",
    duration: "03 Aug – 12 Sep 2026",
    highlight: "Offline Mode",
  },
  {
    title: "NDA Intense Revision Batch (Online)",
    tagline: "Complete Revision & Exam-Oriented Preparation — 6:00 PM Onwards.",
    description:
      "Live interactive online revision batch for NDA 2/2026. High-yield revision of the full NDA syllabus — Maths & General Studies every day, Biology, Chemistry & Physics on alternate days — with marathon sessions, doubt clearance, mock tests, DPPs, and current affairs coverage.",
    points: [
      "Maths & General Studies — Daily Live Classes",
      "Biology, Chemistry & Physics — Alternate Live Classes",
      "Marathon Sessions for comprehensive topic revision",
      "Dedicated Doubt-Solving Sessions every week",
      "Weekly Mock Tests — August: 1 every week; September: 2 per week",
      "Practice Questions & Daily Practice Problems (DPPs)",
      "Weekly Current Affairs Session",
      "Regular Map Work for geographical awareness",
    ],
    dates: "Batch: 03 Aug – 12 Sep 2026 | Classes from 6:00 PM",
    duration: "03 Aug – 12 Sep 2026",
    highlight: "Online Mode",
  },
  {
    title: "CDS Intense Revision Batch (Offline)",
    tagline: "Classroom Fast-Track Revision for CDS 2/2026.",
    description:
      "Rigorous offline classroom preparation for English, General Studies & Maths tailored for CDS 2/2026 aspirants.",
    points: [
      "Offline Classroom Instruction & Practice",
      "Comprehensive coverage of English, GS & Maths",
      "Weekly full-length mock tests & analysis",
      "Post-written SSB specialization & interview guidance",
    ],
    dates: "Batch Starts: 03 Aug 2026",
    duration: "03 Aug 2026 till Exam",
    highlight: "Offline Mode",
  },
  {
    title: "CDS Intense Revision Batch (Online)",
    tagline: "Live Interactive Revision for CDS 2/2026.",
    description:
      "Interactive online fast-track batch providing targeted revision for CDS 2/2026 written exam with flexible access.",
    points: [
      "Live Interactive Online Sessions & Doubt Clearing",
      "High-yield revision of English, GS & Mathematics",
      "Daily practice questions & mock paper discussions",
      "Continuous mentoring until the CDS written exam",
    ],
    dates: "Batch Starts: 03 Aug 2026",
    duration: "03 Aug 2026 till Exam",
    highlight: "Online Mode",
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
