import { motion } from "framer-motion";
import { Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { batches } from "@/data/batches";
import NewCoursesModal from "./NewCoursesModal";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];


const UpcomingBatches = () => {
  const [enrolling, setEnrolling] = useState<string | null>(null);
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

              <div className="mb-6 pt-6 border-t border-neutral-100">
                <p className="text-lg font-serif font-bold text-neutral-900">{batch.fee}</p>
                {batch.note && (
                  <p className="text-xs text-neutral-500 font-sans mt-1 leading-relaxed">{batch.note}</p>
                )}
              </div>

              <div className="mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <span className="text-sm font-bold text-neutral-800">
                    Starts: {batch.slots.map((s) => s.label).join(" · ")}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setEnrolling(batch.id)}
                  className="inline-flex items-center justify-center gap-2 text-sm font-bold text-[#00568C] hover:text-[#004a7a] transition-colors group/btn shrink-0"
                >
                  Enroll Now
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <NewCoursesModal isOpen={enrolling !== null} initialBatch={enrolling ?? undefined} onClose={() => setEnrolling(null)} />
    </section>
  );
};

export default UpcomingBatches;
