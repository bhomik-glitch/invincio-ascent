import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const socialLinks = [
  {
    src: "/linkedin-svgrepo-com.svg",
    href: "#",
    label: "LinkedIn",
  },
  {
    src: "/assets/instagram-1-svgrepo-com.svg",
    href: "https://www.instagram.com/lt_col_ankur_sabharwal",
    label: "Instagram",
  },
  {
    src: "/assets/instagram-1-svgrepo-com.svg",
    href: "https://www.instagram.com/invincio_ssb/",
    label: "Invincio SSB",
  },
  {
    src: "/youtube-svgrepo-com.svg",
    href: "https://www.youtube.com/@learntolivetolearn",
    label: "YouTube",
  },
  {
    src: "/whatsapp-svgrepo-com.svg",
    href: "https://wa.me/918601407444",
    label: "WhatsApp",
  },
  {
    src: "/facebook-color-svgrepo-com.svg",
    href: "https://www.facebook.com/lt.col.ankur.sabharwal",
    label: "Facebook",
  },
];

const SocialSidebar = () => {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrolled >= 0.1);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.div
      animate={{ x: visible ? 0 : "-120%", opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
      className="fixed left-4 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col items-center gap-1 rounded-2xl py-4 px-2"
      style={{
        background: "rgba(0, 86, 140, 0.08)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(0, 86, 140, 0.12)",
        boxShadow: "0 2px 12px rgba(0, 86, 140, 0.06)",
      }}
    >
      {socialLinks.map(({ src, href, label }, idx) => {
        const isHovered = hoveredIdx === idx;

        return (
          <div key={idx} className="relative flex items-center">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="flex items-center justify-center w-9 h-9 rounded-xl"
              style={{
                background: isHovered ? "#00568C" : "transparent",
                transform: isHovered ? "scale(1.1)" : "scale(1)",
                transition:
                  "background 250ms ease-out, transform 250ms ease-out",
              }}
            >
              <img
                src={src}
                alt={label}
                className="w-[18px] h-[18px] object-contain"
                style={{
                  filter: isHovered
                    ? "brightness(0) invert(1)"
                    : "none",
                  transition: "filter 250ms ease-out",
                }}
              />
            </a>

            {/* Tooltip */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute left-full ml-2.5 px-2.5 py-1 text-white text-[11px] font-medium rounded-lg whitespace-nowrap pointer-events-none font-sans"
                  style={{
                    background: "#00568C",
                    boxShadow: "0 2px 8px rgba(0, 86, 140, 0.3)",
                  }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </motion.div>
  );
};

export default SocialSidebar;
