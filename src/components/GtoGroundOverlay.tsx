import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE_OUT } from "@/lib/design-system";
import { useModalLock } from "@/lib/modal-lock";

/* Slider images — drop more ground photos into public/assets and list them here. */
const GTO_IMAGES = ["/assets/GTO background.png"];

interface GtoGroundOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const GtoGroundOverlay = ({ isOpen, onClose }: GtoGroundOverlayProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useModalLock(isOpen);

  const [idx, setIdx] = useState(0);
  const go = (d: number) => setIdx(i => (i + d + GTO_IMAGES.length) % GTO_IMAGES.length);
  const many = GTO_IMAGES.length > 1;

  useEffect(() => {
    if (!isOpen || !many) return;
    const id = setInterval(() => go(1), 4000);
    return () => clearInterval(id);
  }, [isOpen, many, idx]);

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

          {/* Modal */}
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
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#00568C] to-[#003D66]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                    <MapPin className="w-5 h-5 text-[#F6B828]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-white tracking-tight">Our GTO Ground</h2>
                    <p className="text-[11px] text-white/60 font-sans uppercase tracking-widest">Biggest in North-India</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <X className="w-5 h-5 text-white/70 group-hover:text-white" />
                </button>
              </div>

              {/* Images — slider (swipe, arrows, dots) */}
              <div className="p-5 space-y-3 bg-[#F5F9FC]">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-white shadow-sm bg-[#021526]">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.img
                      key={idx}
                      src={GTO_IMAGES[idx]}
                      alt={`Invincio GTO training ground — photo ${idx + 1}`}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      drag={many ? "x" : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -50) go(1);
                        else if (info.offset.x > 50) go(-1);
                      }}
                      className="absolute inset-0 h-full w-full object-cover"
                      draggable={false}
                    />
                  </AnimatePresence>
                  {many && (
                    <>
                      <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm hover:bg-black/60">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm hover:bg-black/60">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
                        {GTO_IMAGES.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setIdx(i)}
                            aria-label={`Photo ${i + 1}`}
                            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-5 bg-[#F6B828]" : "w-1.5 bg-white/60"}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <p className="pt-1 text-[13px] text-[#4B5563] font-sans leading-relaxed">
                  Full-scale obstacles and real group tasks — practised exactly the way they run at the SSB centre.
                </p>
              </div>

              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-[10px] text-gray-400 font-sans uppercase tracking-[0.2em]">
                  Invincio Ascent — Train Where It Counts
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default GtoGroundOverlay;
