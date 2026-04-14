import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, MessageCircle } from "lucide-react";

const WA_NUMBER = "918601407444";
const DUMMY_MSG = "Hi! How can we help you with SSB preparation?";

const WhatsAppChat = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches;

  const scheduleClose = useCallback(() => {
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  }, []);

  const cancelClose = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleSend = () => {
    const trimmed = message.trim();
    if (!trimmed) return;
    const encoded = encodeURIComponent(trimmed);
    window.open(`https://wa.me/${WA_NUMBER}?text=${encoded}`, "_blank", "noopener,noreferrer");
    setMessage("");
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSend();
  };

  return (
    <div
      className="fixed bottom-6 right-5 z-[200] flex flex-col items-end"
      onMouseEnter={isMobile ? undefined : cancelClose}
      onMouseLeave={isMobile ? undefined : scheduleClose}
    >
      {/* Chat box */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, scale: 0.92, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 12 }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
            className="mb-3 w-[300px] sm:w-[320px] rounded-2xl overflow-hidden shadow-2xl"
            style={{
              background: "rgba(255,255,255,0.97)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              border: "1px solid rgba(37,211,102,0.18)",
              boxShadow:
                "0 8px 40px rgba(7,94,84,0.18), 0 1px 4px rgba(0,0,0,0.08)",
            }}
            onMouseEnter={isMobile ? undefined : cancelClose}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "#075E54" }}
            >
              <div className="flex items-center gap-2.5">
                {/* WhatsApp icon */}
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-white" width="18" height="18">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">Chat with us</p>
                  <p className="text-white/70 text-[11px] leading-tight">Typically replies in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
                aria-label="Close chat"
              >
                <X size={16} />
              </button>
            </div>

            {/* Chat body */}
            <div className="px-4 py-4">
              {/* Dummy message bubble */}
              <div className="flex items-start gap-2 mb-4">
                <div
                  className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-white text-[10px] font-bold mt-0.5"
                  style={{ background: "#075E54" }}
                >
                  I
                </div>
                <div
                  className="text-xs text-gray-700 rounded-2xl rounded-tl-sm px-3.5 py-2.5 max-w-[88%] leading-relaxed"
                  style={{
                    background: "#dcf8c6",
                    border: "1px solid rgba(37,211,102,0.18)",
                  }}
                >
                  {DUMMY_MSG}
                </div>
              </div>

              {/* Input row */}
              <div
                className="flex items-center gap-2 rounded-xl px-3 py-2"
                style={{
                  background: "#f4f6f8",
                  border: "1px solid rgba(37,211,102,0.25)",
                }}
              >
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message…"
                  className="flex-1 bg-transparent text-xs text-gray-800 placeholder:text-gray-400 outline-none"
                  autoFocus
                />
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  aria-label="Send message"
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: message.trim() ? "#25D366" : "rgba(37,211,102,0.15)",
                    cursor: message.trim() ? "pointer" : "not-allowed",
                  }}
                >
                  <Send
                    size={13}
                    className="transition-colors"
                    color={message.trim() ? "#fff" : "rgba(37,211,102,0.5)"}
                    style={{ transform: "translateX(1px)" }}
                  />
                </button>
              </div>

              <p className="text-center text-[10px] text-gray-400 mt-2.5">
                Powered by WhatsApp
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        aria-label="Open WhatsApp chat"
        onClick={() => setOpen((v) => !v)}
        onMouseEnter={isMobile ? undefined : () => { cancelClose(); setOpen(true); }}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.94 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#00568C]"
        style={{ background: "#25D366" }}
      >
        {/* Pulse rings */}
        <span
          className="absolute inset-0 rounded-full animate-ping opacity-30"
          style={{ background: "#25D366", animationDuration: "2s" }}
        />
        <span
          className="absolute inset-[-5px] rounded-full animate-ping opacity-15"
          style={{ background: "#25D366", animationDuration: "2s", animationDelay: "0.5s" }}
        />

        {/* Icon toggle */}
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="x"
              initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} color="#fff" />
            </motion.span>
          ) : (
            <motion.span
              key="wa"
              initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
              transition={{ duration: 0.18 }}
            >
              <svg viewBox="0 0 24 24" width="26" height="26" className="fill-white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default WhatsAppChat;
