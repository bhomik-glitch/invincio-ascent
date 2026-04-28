import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Download } from "lucide-react";
import { EASE_OUT, TAP_SCALE } from "@/lib/design-system";
import { useEffect } from "react";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  { title: "NDA 1 2026 Notification PDF", link: "https://drive.google.com/file/d/1bzhPckeAASndW3e5nUHd9mINI3vfZ-_f/view" },
  { title: "CDS 1 2026 Notification PDF", link: "https://drive.google.com/file/d/1fY-vSWkwqh-6ZbuNk5fF5cMNcrVOzI8I/view" },
  { title: "JAG 2026 Notification PDF", link: "https://drive.google.com/file/d/1OMkXS_l9fu-sGBlJQB6C6Cr_HrV3ygOu/view" },
  { title: "AFCAT 2026 Notification PDF", link: "https://drive.google.com/file/d/18BwQl5TsDDKLMqDXf89dKOW0vjt9PH44/view" },
  { title: "TGC 143 SSB Dates Out PDF", link: "https://drive.google.com/file/d/1qFM6mKWbkmnLT7fXUXhTRciYk3zBNXsw/view" },
  { title: "10+2 B.Tech Entry 2026 PDF", link: "https://drive.google.com/file/d/1CP1njU_PIGNmz9aBBfxhtUTV46ewBrmA/view" },
  { title: "Combined Notification SSC Tech Men PDF", link: "https://drive.google.com/file/d/1UzftCcny_WH7Iesqpz9rcOZlcwk2dJe8/view" },
  { title: "Combined Notification SSC Tech Women PDF", link: "https://drive.google.com/file/d/13aqC4HS4to8UGbEMdHTPgw6OU7M-JZSU/view" },
  { title: "Women Notification For NCC Spl Entry 124 Course Oct 2026 PDF", link: "https://drive.google.com/file/d/1_CuoRzVj1idkgJVHaSqnejbrAqOyrzX4/view" },
  { title: "Notification For NCC Spl Entry 124 Men Course Oct 2026 PDF", link: "https://drive.google.com/file/d/17f76Id1qGzqeE_h8-7-rety9SXHh4Ure/view" },
];

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
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
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-[#00568C] to-[#004471]">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 backdrop-blur-md">
                    <FileText className="w-5 h-5 text-[#F6B828]" />
                  </div>
                  <div>
                    <h2 className="text-lg font-serif font-bold text-white tracking-tight">Latest Notifications</h2>
                    <p className="text-[11px] text-white/60 font-sans uppercase tracking-widest">Defence Selection Board</p>
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
              <div className="max-h-[60vh] overflow-y-auto p-5 space-y-2.5 bg-[#F1FFFF]/30">
                {notifications.map((notif, index) => (
                  <motion.a
                    key={index}
                    href={notif.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.04, duration: 0.2 }}
                    whileTap={TAP_SCALE}
                    className="group flex items-center justify-between p-4 rounded-xl border border-white bg-white shadow-sm hover:shadow-md hover:border-[#F6B828]/40 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-9 h-9 rounded-lg bg-[#F1FFFF] flex items-center justify-center group-hover:bg-[#F6B828] transition-colors duration-200">
                        <FileText className="w-4 h-4 text-[#00568C] group-hover:text-white" />
                      </div>
                      <span className="text-[14px] font-semibold text-[#374151] group-hover:text-[#00568C] transition-colors duration-200 leading-snug">
                        {notif.title}
                      </span>
                    </div>
                    <Download className="w-4 h-4 text-gray-300 group-hover:text-[#F6B828] transition-colors duration-200 shrink-0" />
                  </motion.a>
                ))}
              </div>
              
              {/* Footer */}
              <div className="p-4 bg-gray-50 border-t border-gray-100 text-center">
                <p className="text-[10px] text-gray-400 font-sans uppercase tracking-[0.2em]">
                  Invincio Ascent — Your Path to Uniform
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationsModal;
