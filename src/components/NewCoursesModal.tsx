import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import { EASE_OUT, TAP_SCALE } from "@/lib/design-system";
import { useEffect } from "react";

interface NewCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const batches = [
  {
    title: "Offline SSB Mentorship",
    tagline: "The Ultimate 15-Day Immersive Simulation.",
    description: "A holistic, offline module conducted strictly on SSB lines. Starts with 15 days of intensive ground training.",
    dates: "04 May | 11 May | 24 May 2026",
    highlight: "Limited Seats",
  },
  {
    title: "Online Officer Mentorship",
    tagline: "Structured guidance without geographical limits.",
    description: "Designed for aspirants balancing college or work who need absolute clarity and personality orientation.",
    dates: "Next Batch: 04 May 2026",
    highlight: "Online Mode",
  },
  {
    title: "CDS 2/2026 Preparation",
    tagline: "Personality + Written = Selection.",
    description: "Comprehensive Written Prep with parallel personality development from Day 1.",
    dates: "Starts 23 April 2026",
    highlight: "Written + SSB",
  },
  {
    title: "NDA 2/2026 Preparation",
    tagline: "Early foundation for future leaders.",
    description: "A complete preparation journey ensuring structured guidance at every stage for young aspirants.",
    dates: "Enrollments Open",
    highlight: "Full Prep",
  },
];

const NewCoursesModal = ({ isOpen, onClose }: NewCoursesModalProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-[3px]"
          />

          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="relative w-full max-w-2xl bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#00568C] to-[#004471]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                    <BookOpen className="w-5 h-5 text-[#F6B828]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-white tracking-tight">New Course Batches</h2>
                    <p className="text-[11px] text-white/60 font-sans uppercase tracking-widest">Admissions Open — 2026</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <X className="w-5 h-5 text-white/70 group-hover:text-white" />
                </button>
              </div>
              
              {/* Content Grid */}
              <div className="max-h-[70vh] overflow-y-auto p-6 grid sm:grid-cols-2 gap-4 bg-gray-50/50">
                {batches.map((batch, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3 }}
                    className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#00568C]/20 transition-all duration-200 flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold text-[#00568C] bg-[#f0f9ff] px-2 py-0.5 rounded-full border border-[#00568C]/10 uppercase">
                        {batch.highlight}
                      </span>
                    </div>
                    <h3 className="text-[15px] font-bold text-[#1F2937] group-hover:text-[#00568C] transition-colors mb-1">
                      {batch.title}
                    </h3>
                    <p className="text-[11px] text-[#C6A15B] font-medium italic mb-2 leading-tight">
                      {batch.tagline}
                    </p>
                    <p className="text-[12px] text-gray-500 mb-4 line-clamp-2">
                      {batch.description}
                    </p>
                    <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700">
                        <Calendar className="w-3 h-3 text-gray-400" />
                        {batch.dates}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Footer */}
              <div className="p-4 bg-white border-t border-gray-100 flex items-center justify-between">
                <p className="text-[10px] text-gray-400 font-sans uppercase tracking-[0.1em]">
                  Limited seats per batch
                </p>
                <a
                  href="/programs"
                  onClick={onClose}
                  className="flex items-center gap-1.5 text-[12px] font-bold text-[#00568C] hover:underline"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NewCoursesModal;
