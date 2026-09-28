import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { EASE_OUT } from "@/lib/design-system";
import { useModalLock } from "@/lib/modal-lock";
import { WA_LABEL_SITE, trackWhatsApp } from "@/lib/whatsapp";
import { MASTERCLASS } from "@/data/masterclass";

interface MasterclassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** Masterclass flyer with a Register button — opened from the hero while the masterclass is live. */
const MasterclassModal = ({ isOpen, onClose }: MasterclassModalProps) => {
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
              className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-2xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.35)] pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute right-3 top-3 z-10 rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm hover:bg-black/70"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="overflow-y-auto">
                <img src={MASTERCLASS.poster} alt={`${MASTERCLASS.title}, ${MASTERCLASS.dates}`} className="block w-full" />
              </div>

              <div className="border-t border-gray-100 bg-gray-50 p-4">
                <a
                  href={MASTERCLASS.registerHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsApp(WA_LABEL_SITE)}
                  className="flex w-full items-center justify-center rounded-xl bg-[#F6B828] py-3.5 text-[14px] font-bold text-[#1a1a1a] shadow-md hover:brightness-105"
                >
                  Register Now — It's Free
                </a>
                <p className="mt-2 text-center text-[11px] text-gray-500">
                  Live on Zoom · 7:00 – 9:15 PM IST · Registration mandatory
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MasterclassModal;
