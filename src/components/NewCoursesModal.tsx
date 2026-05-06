import { motion, AnimatePresence } from "framer-motion";
import { X, BookOpen, Calendar, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { EASE_OUT, TAP_SCALE } from "@/lib/design-system";
import { useEffect, useState } from "react";

interface NewCoursesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const WA_NUMBER = "918601407444";

const batches = [
  {
    title: "Offline SSB Mentorship",
    tagline: "The Ultimate 15-Day Immersive Simulation.",
    description: "A holistic, offline module conducted strictly on SSB lines. Starts with 15 days of intensive ground training.",
    highlight: "Limited Seats",
    slots: ["11 May 2026", "25 May 2026", "1 Jun 2026", "15 Jun 2026", "6 July 2026"],
  },
  {
    title: "Online Officer Mentorship",
    tagline: "Structured guidance without geographical limits.",
    description: "Designed for aspirants balancing college or work who need absolute clarity and personality orientation.",
    highlight: "Online Mode",
    slots: ["11 May 2026", "25 May 2026", "8 Jun 2026", "22 Jun 2026", "6 July 2026"],
  },
  {
    title: "Summer Bootcamp",
    tagline: "Intensive summer training for serious aspirants.",
    description: "A focused summer programme for aspirants who want to utilise their break to accelerate SSB preparation.",
    highlight: "Bootcamp",
    slots: ["25 May 2026", "1 Jun 2026", "15 Jun 2026"],
  },
  {
    title: "CDS 2/2026 Preparation",
    tagline: "Personality + Written = Selection.",
    description: "Comprehensive Written Prep with parallel personality development from Day 1.",
    highlight: "Written + SSB",
    slots: ["Starts 23 April 2026"],
  },
  {
    title: "NDA 2/2026 Preparation",
    tagline: "Early foundation for future leaders.",
    description: "A complete preparation journey ensuring structured guidance at every stage for young aspirants.",
    highlight: "Full Prep",
    slots: ["Enrollments Open"],
  },
];

const NewCoursesModal = ({ isOpen, onClose }: NewCoursesModalProps) => {
  const [activeBatch, setActiveBatch] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeBatch !== null) {
          setActiveBatch(null);
          setSelectedSlot(null);
        } else {
          onClose();
        }
      }
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose, activeBatch]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setActiveBatch(null);
      setSelectedSlot(null);
    }
  }, [isOpen]);

  const handleBook = () => {
    if (!selectedSlot || activeBatch === null) return;
    const batch = batches[activeBatch];
    const msg = encodeURIComponent(
      `Hi Invincio, I'd like to book a slot for *${batch.title}* starting *${selectedSlot}*. Please confirm availability.`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, "_blank", "noopener,noreferrer");
  };

  const batch = activeBatch !== null ? batches[activeBatch] : null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              if (activeBatch !== null) { setActiveBatch(null); setSelectedSlot(null); }
              else onClose();
            }}
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
                  {activeBatch !== null && (
                    <button
                      onClick={() => { setActiveBatch(null); setSelectedSlot(null); }}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors mr-1"
                    >
                      <ArrowLeft className="w-4 h-4 text-white/80" />
                    </button>
                  )}
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                    <BookOpen className="w-5 h-5 text-[#F6B828]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-white tracking-tight">
                      {batch ? batch.title : "New Course Batches"}
                    </h2>
                    <p className="text-[11px] text-white/60 font-sans uppercase tracking-widest">
                      {batch ? "Select a batch start date" : "Admissions Open — 2026"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <X className="w-5 h-5 text-white/70 group-hover:text-white" />
                </button>
              </div>

              <AnimatePresence mode="wait">
                {activeBatch === null ? (
                  /* Batch Grid */
                  <motion.div
                    key="grid"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="max-h-[65vh] overflow-y-auto p-6 grid sm:grid-cols-2 gap-4 bg-gray-50/50"
                  >
                    {batches.map((b, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 + index * 0.05, duration: 0.25 }}
                        whileTap={TAP_SCALE}
                        onClick={() => { setActiveBatch(index); setSelectedSlot(null); }}
                        className="group bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#00568C]/20 transition-all duration-200 flex flex-col text-left cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <span className="text-[10px] font-bold text-[#00568C] bg-[#f0f9ff] px-2 py-0.5 rounded-full border border-[#00568C]/10 uppercase">
                            {b.highlight}
                          </span>
                          <span className="text-[10px] text-gray-400 font-medium">
                            {b.slots.length} slot{b.slots.length > 1 ? "s" : ""}
                          </span>
                        </div>
                        <h3 className="text-[15px] font-bold text-[#1F2937] group-hover:text-[#00568C] transition-colors mb-1">
                          {b.title}
                        </h3>
                        <p className="text-[11px] text-[#C6A15B] font-medium italic mb-2 leading-tight">
                          {b.tagline}
                        </p>
                        <p className="text-[12px] text-gray-500 mb-4 line-clamp-2">
                          {b.description}
                        </p>
                        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                          <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-700">
                            <Calendar className="w-3 h-3 text-gray-400" />
                            {b.slots[0]}{b.slots.length > 1 ? ` + ${b.slots.length - 1} more` : ""}
                          </div>
                          <span className="text-[11px] font-semibold text-[#00568C] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            Pick slot <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </motion.button>
                    ))}
                  </motion.div>
                ) : (
                  /* Slot Picker */
                  <motion.div
                    key="slots"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    className="p-6 bg-gray-50/50"
                  >
                    <p className="text-[11px] text-[#C6A15B] font-medium italic mb-4">{batch!.tagline}</p>
                    <p className="text-[12px] text-gray-500 mb-5">{batch!.description}</p>

                    <p className="text-[11px] font-bold text-[#00568C]/60 uppercase tracking-widest mb-3">
                      Available Start Dates
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 mb-6">
                      {batch!.slots.map((slot) => {
                        const isSelected = selectedSlot === slot;
                        return (
                          <motion.button
                            key={slot}
                            whileTap={TAP_SCALE}
                            onClick={() => setSelectedSlot(slot)}
                            className={`relative flex items-center justify-center gap-2 p-3 rounded-xl border text-[13px] font-semibold transition-all duration-200 ${
                              isSelected
                                ? "bg-[#00568C] border-[#00568C] text-white shadow-md"
                                : "bg-white border-gray-200 text-[#374151] hover:border-[#00568C]/40 hover:shadow-sm"
                            }`}
                          >
                            {isSelected && <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />}
                            {slot}
                          </motion.button>
                        );
                      })}
                    </div>

                    <motion.button
                      whileTap={TAP_SCALE}
                      onClick={handleBook}
                      disabled={!selectedSlot}
                      className={`w-full py-3.5 rounded-xl font-bold text-[14px] flex items-center justify-center gap-2 transition-all duration-200 ${
                        selectedSlot
                          ? "bg-[#00568C] text-white hover:bg-[#004471] shadow-md hover:shadow-lg"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {selectedSlot ? (
                        <>Book via WhatsApp — {selectedSlot} <ArrowRight className="w-4 h-4" /></>
                      ) : (
                        "Select a date to continue"
                      )}
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

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
