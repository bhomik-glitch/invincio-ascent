import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { EASE_OUT } from "@/lib/design-system";
import { useModalLock } from "@/lib/modal-lock";

/* Slider media — drop more ground photos/videos into public/assets/gto and list them here.
   Videos play muted and advance when they end; `poster` doubles as the blurred fill. */
type GtoMedia = { src: string; poster?: string };
const GTO_MEDIA: GtoMedia[] = [
  { src: "/assets/gto/gto-rope-obstacle.mp4", poster: "/assets/gto/gto-rope-obstacle.webp" },
  { src: "/assets/gto/gto-briefing.webp" },
  { src: "/assets/gto/gto-balance-beam.webp" },
  { src: "/assets/gto/gto-ground-pan.mp4", poster: "/assets/gto/gto-ground-pan.webp" },
  { src: "/assets/gto/gto-ground-overview.webp" },
];

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
  const go = (d: number) => setIdx(i => (i + d + GTO_MEDIA.length) % GTO_MEDIA.length);
  const many = GTO_MEDIA.length > 1;
  const item = GTO_MEDIA[idx];

  // Photos auto-advance; videos advance on `ended` instead.
  useEffect(() => {
    if (!isOpen || !many || item.poster) return;
    const id = setInterval(() => go(1), 4000);
    return () => clearInterval(id);
  }, [isOpen, many, idx, item.poster]);

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

              {/* Media — slider (swipe, arrows, dots). object-contain over a blurred fill so
                  portrait phone shots and the landscape overview both show uncropped. */}
              <div className="p-5 space-y-3 bg-[#F5F9FC]">
                <div className="relative h-[min(62vh,540px)] overflow-hidden rounded-xl border border-white shadow-sm bg-[#021526]">
                  <AnimatePresence initial={false} mode="popLayout">
                    <motion.div
                      key={idx}
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
                      className="absolute inset-0"
                    >
                      <img
                        src={item.poster ?? item.src}
                        alt=""
                        aria-hidden
                        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-xl"
                        draggable={false}
                      />
                      {item.poster ? (
                        <video
                          src={item.src}
                          poster={item.poster}
                          autoPlay
                          muted
                          playsInline
                          onEnded={() => go(1)}
                          aria-label={`Invincio GTO training ground — video ${idx + 1}`}
                          className="relative h-full w-full object-contain"
                        />
                      ) : (
                        <img
                          src={item.src}
                          alt={`Invincio GTO training ground — photo ${idx + 1}`}
                          className="relative h-full w-full object-contain"
                          draggable={false}
                        />
                      )}
                    </motion.div>
                  </AnimatePresence>
                  {many && (
                    <>
                      <button onClick={() => go(-1)} aria-label="Previous slide" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm hover:bg-black/60">
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button onClick={() => go(1)} aria-label="Next slide" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white backdrop-blur-sm hover:bg-black/60">
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <div className="absolute inset-x-0 bottom-2 flex justify-center gap-1.5">
                        {GTO_MEDIA.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setIdx(i)}
                            aria-label={`Slide ${i + 1}`}
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
