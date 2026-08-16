import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import { useEffect } from "react";
import { EASE_OUT } from "@/lib/design-system";
import { useModalLock } from "@/lib/modal-lock";

/* Same ground imagery as the /difference section. Add more files for a grid. */
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
                    <p className="text-[11px] text-white/60 font-sans uppercase tracking-widest">Biggest in Delhi</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors group"
                >
                  <X className="w-5 h-5 text-white/70 group-hover:text-white" />
                </button>
              </div>

              {/* Images */}
              <div className="max-h-[60vh] overflow-y-auto p-5 space-y-3 bg-[#F5F9FC]">
                {GTO_IMAGES.map((src, i) => (
                  <motion.img
                    key={src}
                    src={src}
                    alt="Invincio GTO training ground"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.08, duration: 0.35, ease: EASE_OUT }}
                    className="w-full rounded-xl border border-white shadow-sm object-cover"
                  />
                ))}
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
