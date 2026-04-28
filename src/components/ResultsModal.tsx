import { motion, AnimatePresence } from "framer-motion";
import { X, Award, Download, Trophy } from "lucide-react";
import { EASE_OUT, TAP_SCALE } from "@/lib/design-system";
import { useEffect } from "react";

interface ResultsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const results = [
  { title: "NDA 155 Result – 2025", link: "https://drive.google.com/file/d/10Q0aZx3813NEOoYFu1B0FFJSxd3x73en/view" },
  { title: "NDA 156 Result – 2025", link: "https://drive.google.com/file/d/1XM2LBrDZ3bdkTjOj3CyxZTWELT-IK179/view" },
  { title: "ORDER OF MERIT FOR AFCAT", link: "https://drive.google.com/file/d/1AmVYxBd1-rx1D9rhgO27QioazZFaPx9a/view" },
  { title: "CDS 1, 2025 Final Result", link: "https://drive.google.com/file/d/1Bl-2Q8QbXNGXt6bv465G4wlguChSGCrp/view" },
  { title: "10+2 TES 55 Merit List", link: "https://drive.google.com/file/d/1bhoVsOa8xa4vUUUTaTBtSYZI96Acllyw/view" },
];

const ResultsModal = ({ isOpen, onClose }: ResultsModalProps) => {
  // ESC key listener
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Lock body scroll
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
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-[3px]"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 15 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="relative w-full max-w-xl bg-white rounded-2xl shadow-[0_32px_80px_rgba(0,0,0,0.35)] overflow-hidden pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#E66133] to-[#C54E25]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                    <Trophy className="w-5 h-5 text-[#F6B828]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-white tracking-tight">Merit Lists & Results</h2>
                    <p className="text-[11px] text-white/60 font-sans uppercase tracking-widest">Final Selections 2025</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <X className="w-5 h-5 text-white/70 group-hover:text-white" />
                </button>
              </div>
              
              {/* Content List */}
              <div className="max-h-[60vh] overflow-y-auto p-5 space-y-2.5 bg-[#FFF5F1]/40">
                {results.map((result, index) => (
                  <motion.a
                    key={index}
                    href={result.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.04, duration: 0.2 }}
                    whileTap={TAP_SCALE}
                    className="group flex items-center justify-between p-4 rounded-xl border border-white bg-white shadow-sm hover:shadow-md hover:border-[#E66133]/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-[#FFF5F1] flex items-center justify-center group-hover:bg-[#E66133] transition-colors duration-200">
                        <Award className="w-4 h-4 text-[#E66133] group-hover:text-white" />
                      </div>
                      <span className="text-[14px] font-semibold text-[#374151] group-hover:text-[#E66133] transition-colors duration-200 leading-snug">
                        {result.title}
                      </span>
                    </div>
                    <Download className="w-4 h-4 text-gray-300 group-hover:text-[#E66133] transition-colors duration-200 shrink-0" />
                  </motion.a>
                ))}
              </div>
              
              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-[10px] text-gray-400 font-sans uppercase tracking-[0.2em]">
                  Invincio Ascent — Celebrating Your Success
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ResultsModal;
