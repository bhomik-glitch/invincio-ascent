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
    title: "SSB Offline Mentorship Batches",
    badge: "Aug & Sep 2026",
    sections: [
      {
        heading: "Batch Start Dates",
        points: [
          "10th August 2026",
          "17th August 2026",
          "24th August 2026",
          "14th September 2026 — Forenoon / Afternoon",
          "21st September 2026 — Forenoon / Afternoon",
        ],
      },
      {
        heading: "Program Details",
        points: [
          "Flagship 21-Day Immersive SSB Mentorship programme",
          "Strictly conducted on SSB lines with real GTO ground simulations",
          "Comprehensive psychological evaluation & interview guidance",
          "Personalized feedback by former SSB Presidents & Assessor Veterans",
          "21 Days Offline Ground Training + Continuous Online Support until SSB",
        ],
      },
    ],
    highlight: "Five offline batches across August & September 2026. Limited seats per batch for ground training.",
    expected: {
      notification: "Admissions Open",
      application: "Next batch starts 10 Aug 2026",
    },
  },
  {
    type: "detail",
    title: "SSB Online Mentorship Batches",
    badge: "Aug & Sep 2026",
    sections: [
      {
        heading: "Batch Start Dates",
        points: [
          "24th August 2026",
          "07th September 2026",
        ],
      },
      {
        heading: "Program Details",
        points: [
          "21-Day structured online mentorship programme",
          "Designed for college students & working aspirants needing flexible, high-impact guidance",
          "Live interactive sessions covering Psych, Interviewing Officer & GTO logic",
          "Continuous task submission & individual behavioral corrections",
        ],
      },
    ],
    highlight: "Two online batches — 24 Aug and 07 Sep 2026. Flexible training with veteran guidance.",
    expected: {
      notification: "Admissions Open",
      application: "Next batch starts 24 Aug 2026",
    },
  },
  {
    type: "detail",
    title: "NDA, CDS & AFCAT Written Prep Batches (Online & Offline)",
    badge: "Starts: 01 Oct 2026",
    sections: [
      {
        heading: "Batches Available",
        points: [
          "NDA Written Prep — Offline & Online",
          "CDS Written Prep — Offline & Online",
          "AFCAT Written Prep — Offline & Online",
        ],
      },
      {
        heading: "Program Details",
        points: [
          "Full-syllabus coverage by veteran faculty for each exam",
          "Daily practice problems & dedicated doubt-solving sessions",
          "Weekly full-length mock tests with detailed performance analysis",
          "Post-written SSB / AFSB interview guidance",
        ],
      },
      {
        heading: "Important Dates",
        points: [
          "Batch Commencement: 01st October 2026",
          "Classes continue right up to the respective exam dates",
        ],
      },
    ],
    highlight: "All written preparation batches start 01 October 2026, in both offline classroom and live online modes.",
    expected: {
      notification: "Admissions Open",
      application: "Starts 01 Oct 2026",
    },
  },
  {
    type: "detail",
    title: "Indian Army – NCC Special Entry 125th Course (Apr 2027)",
    badge: "Applications Open",
    link: "https://www.joinindianarmy.nic.in",
    linkLabel: "Join Indian Army Portal",
    sections: [
      {
        heading: "Important Dates",
        points: [
          "Online Applications Open: 20th July 2026 at 1500 HRS",
          "Online Applications Close: 20th August 2026 at 1500 HRS",
        ],
      },
      {
        heading: "Eligibility Details",
        points: [
          "NCC Special Entry Scheme for Men (including Wards of Battle Casualties of Army Personnel)",
          "Course starting in April 2027",
        ],
      },
    ],
    highlight: "Online Applications are open from 20th July 2026 to 20th August 2026. Direct shortlisting for SSB interview without written exam.",
    expected: {
      notification: "Released (125th Course)",
      application: "20th July 2026 to 20th August 2026",
    },
  },
  {
    type: "detail",
    title: "UPSC – NDA 2-2026",
    badge: "Exam: 13 Sept",
    link: "https://www.upsc.gov.in",
    linkLabel: "UPSC Official Portal",
    sections: [
      {
        heading: "Exam Date",
        points: [
          "Written Examination: 13th September 2026",
        ],
      },
      {
        heading: "Eligibility Details",
        points: [
          "Gender: Unmarried Male & Female candidates",
          "Age Limit: Between 16.5 and 19.5 years",
          "Educational Qualification: 12th Pass (Army Wing) / 12th Pass with Physics & Mathematics (Air Force & Navy Wings)",
        ],
      },
    ],
    highlight: "Exam Date: 13th September 2026. Joint services academy of the Indian Armed Forces, recruiting candidates right after high school.",
  },
  {
    type: "detail",
    title: "UPSC – CDS 2-2026",
    badge: "Exam: 13 Sept",
    link: "https://www.upsc.gov.in",
    linkLabel: "UPSC Official Portal",
    sections: [
      {
        heading: "Exam Date",
        points: [
          "Written Examination: 13th September 2026",
        ],
      },
      {
        heading: "Eligibility Details",
        points: [
          "Age Limits: 19 to 24 years (IMA & INA), 19 to 25 years (OTA & AFA)",
          "Educational Qualification: Graduation (IMA/OTA), B.E/B.Tech (INA/AFA)",
        ],
      },
    ],
    highlight: "Exam Date: 13th September 2026. Recruitment for Indian Military Academy, Indian Naval Academy, Air Force Academy, and Officers Training Academy.",
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
  { title: "Jag entry 125 course", link: "https://joinindianarmy.nic.in/writereaddata/Portal/NotificationPDF/Notification_for_JAG_Entry_Scheme_124rd_Course__Oct_2026_.pdf" },
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
