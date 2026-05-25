import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Download, ChevronDown, Clock, ExternalLink } from "lucide-react";
import { EASE_OUT, TAP_SCALE } from "@/lib/design-system";
import { useEffect, useState } from "react";

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface DetailNotification {
  type: "detail";
  title: string;
  badge: string;
  link?: string;
  linkLabel?: string;
  sections: { heading: string; points: string[] }[];
  highlight?: string;
  expected?: { notification: string; application: string };
}

interface LinkNotification {
  type?: "link";
  title: string;
  link: string;
}

type Notification = DetailNotification | LinkNotification;

const notifications: Notification[] = [
  {
    type: "detail",
    title: "Indian Army – TES 56 (10+2)",
    badge: "Applications Open",
    link: "https://www.joinindianarmy.nic.in",
    linkLabel: "Join Indian Army Portal",
    sections: [
      {
        heading: "Eligibility",
        points: [
          "Unmarried Male candidates",
          "Age: 16½ and 19½ years as on 01 Jan 2027",
          "10+2 Class with Physics, Chemistry & Maths (PCM)",
          "Must have appeared in JEE Mains",
        ],
      },
      {
        heading: "Training Program",
        points: [
          "3 Years in CTW (Cadet Training Wing)",
          "1 Year in IMA (Indian Military Academy), Dehradun",
        ],
      },
    ],
    highlight: "Last Date to Apply: 12th June 2026. Direct entry pathway based on JEE Mains — a great opportunity for PCM graduates.",
    expected: {
      notification: "Released (TES-56)",
      application: "Open until 12th June 2026",
    },
  },
  {
    type: "detail",
    title: "Indian Army – TGC 144 (Jan 2027)",
    badge: "Applications Open",
    link: "https://www.joinindianarmy.nic.in",
    linkLabel: "Join Indian Army Portal",
    sections: [
      {
        heading: "Eligibility",
        points: [
          "Unmarried Male candidates",
          "Age: 20 to 27 Years as on 01 Jan 2027",
          "Educational Qualification: Engineering Degree in notified streams (Civil, Computer Science, Electrical, Electronics, Mechanical, etc.)",
        ],
      },
      {
        heading: "Highlights & Benefits",
        points: [
          "Vacancies: 30 (Tentative)",
          "Type of Commission: Permanent Commission",
          "Rank after Training: Lieutenant",
          "Training Academy: Indian Military Academy (IMA), Dehradun (12-month course starting Jan 2027)",
          "Stipend during Training: ₹56,400 per month",
          "Salary on Commissioning: CTC approx. ₹17–18 Lakhs per annum (excludes free medical cover & annual travel allowance)",
        ],
      },
      {
        heading: "Selection Timeline",
        points: [
          "SSB Dates & Centre Selection: Will open for two weeks in June 2026",
          "5-Day SSB Interview: July – September 2026",
          "Joining Course: January 2027",
        ],
      },
    ],
    highlight: "Application Window: 13th May 2026 to 11th June 2026. Opportunity for engineering graduates to join the Indian Army as commissioned officers.",
    expected: {
      notification: "Released",
      application: "13th May 2026 to 11th June 2026",
    },
  },
  {
    type: "detail",
    title: "Indian Navy – B.Tech Entry (10+2)",
    badge: "Upcoming 2027",
    link: "https://www.joinindiannavy.gov.in",
    linkLabel: "Indian Navy Official Portal",
    sections: [
      {
        heading: "Eligibility",
        points: [
          "Class 12 with Physics, Chemistry & Mathematics (PCM)",
          "High PCM percentage required",
          "Valid JEE Main score mandatory",
        ],
      },
      {
        heading: "Selection Process",
        points: [
          "Direct shortlisting through JEE Main score",
          "Followed by SSB Interview",
        ],
      },
    ],
    highlight: "No separate written exam like NDA — a very strong alternative to TES, especially for girls.",
    expected: {
      notification: "December 2026 or early January 2027",
      application: "Approximately 2–3 weeks after notification release",
    },
  },
  { title: "NDA 1 2026 Notification PDF", link: "https://drive.google.com/file/d/1bzhPckeAASndW3e5nUHd9mINI3vfZ-_f/view" },
  { title: "CDS 1 2026 Notification PDF", link: "https://drive.google.com/file/d/1fY-vSWkwqh-6ZbuNk5fF5cMNcrVOzI8I/view" },
  { title: "JAG 2026 Notification PDF", link: "https://drive.google.com/file/d/1OMkXS_l9fu-sGBlJQB6C6Cr_HrV3ygOu/view" },
  { title: "AFCAT 2026 Notification PDF", link: "https://drive.google.com/file/d/18BwQl5TsDDKLMqDXf89dKOW0vjt9PH44/view" },
  { title: "TGC 143 SSB Dates Out PDF", link: "https://drive.google.com/file/d/1qFM6mKWbkmnLT7fXUXhTRciYk3zBNXsw/view" },
  { title: "10+2 B.Tech Entry 2026 PDF", link: "https://drive.google.com/file/d/1CP1njU_PIGNmz9aBBfxhtUTV46ewBrmA/view" },
  { title: "Combined Notification SSC Tech Men PDF", link: "https://drive.google.com/file/d/1UzftCcny_WH7Iesqpz9rcOZlcwk2dJe8/view" },
  { title: "Combined Notification SSC Tech Women PDF", link: "https://drive.google.com/file/d/13aqC4HS4to8UGbEMdHTPgw6OU7M-JZSU/view" },
  { title: "Women Notification For NCC Spl Entry 124 Course Oct 2026 PDF", link: "https://drive.google.com/file/d/1_CuoRzVj1idkgJVHaSqnejbrAqOyrzX4/view" },
  { title: "Notification For NCC Spl Entry 124 Men Course Oct 2026 PDF", link: "https://drive.google.com/file/d/17f76Id1qGzqeE_j8-7-rety9SXHh4Ure/view" },
  { title: "Territorial Army Application Form", link: "https://cdn.digialm.com/EForms/configuredHtml/1258/100459/Index.html" },
];

const DetailCard = ({ notif, index }: { notif: DetailNotification; index: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.04, duration: 0.2 }}
      className="rounded-xl border border-[#F6B828]/40 bg-gradient-to-br from-[#fffbe6] to-white shadow-sm overflow-hidden"
    >
      {/* Card header — always visible */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between p-4 text-left group"
      >
        <div className="flex items-center gap-3.5">
          <div className="w-9 h-9 rounded-lg bg-[#F6B828]/20 flex items-center justify-center shrink-0">
            <Clock className="w-4 h-4 text-[#b8860b]" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[14px] font-semibold text-[#374151] leading-snug group-hover:text-[#00568C] transition-colors duration-200">
                {notif.title}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F6B828] text-[#5a3e00]">
                {notif.badge}
              </span>
            </div>
            <p className="text-[11px] text-[#6B7280] mt-0.5">Click to see eligibility & details</p>
          </div>
        </div>
        <ChevronDown
          className="w-4 h-4 text-gray-400 shrink-0 transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* Expandable details */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail-body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
          >
            <div className="px-4 pb-4 space-y-3 border-t border-[#F6B828]/20 pt-3">

              {/* Sections */}
              {notif.sections.map((sec) => (
                <div key={sec.heading}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#00568C] mb-1.5">
                    📌 {sec.heading}
                  </p>
                  <ul className="space-y-1">
                    {sec.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2 text-[13px] text-[#374151]">
                        <span className="text-[#F6B828] mt-0.5 shrink-0">•</span>
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Highlight */}
              {notif.highlight && (
                <div className="rounded-lg bg-[#eaf6f8] border border-[#2FB4E7]/30 px-3 py-2">
                  <p className="text-[12px] font-semibold text-[#00568C] leading-snug">
                    ⭐ Major Advantage
                  </p>
                  <p className="text-[12px] text-[#374151] mt-0.5">{notif.highlight}</p>
                </div>
              )}

              {/* Expected dates */}
              {notif.expected && (
                <div className="rounded-lg bg-white border border-gray-100 px-3 py-2 space-y-1">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">Expected Dates</p>
                  <p className="text-[12px] text-[#374151]">
                    <span className="font-semibold text-[#00568C]">Notification: </span>
                    {notif.expected.notification}
                  </p>
                  <p className="text-[12px] text-[#374151]">
                    <span className="font-semibold text-[#00568C]">Application Window: </span>
                    {notif.expected.application}
                  </p>
                </div>
              )}

              {/* Official link */}
              {notif.link && (
                <a
                  href={notif.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#2FB4E7] hover:text-[#00568C] transition-colors duration-150"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  {notif.linkLabel ?? notif.link}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const NotificationsModal = ({ isOpen, onClose }: NotificationsModalProps) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (isOpen) document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Detail cards first, then link cards in reverse (newest first)
  const detailCards = notifications.filter((n): n is DetailNotification => n.type === "detail");
  const linkCards = [...notifications.filter((n): n is LinkNotification => n.type !== "detail")].reverse();

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

                {/* Upcoming / detail cards */}
                {detailCards.map((notif, i) => (
                  <DetailCard key={notif.title} notif={notif} index={i} />
                ))}

                {/* PDF link cards */}
                {linkCards.map((notif, index) => (
                  <motion.a
                    key={index}
                    href={notif.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + (detailCards.length + index) * 0.04, duration: 0.2 }}
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
