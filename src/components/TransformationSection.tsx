import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import {
  CONTAINER,
  EYEBROW,
  EASE_OUT,
} from "@/lib/design-system";

const echoes = [
  {
    name: "Atharv",
    text: "Recommended from 19 SSB for SSC(Tech) Entry — Now in OTA, Chennai",
    video: "/assets/candidates/ATHARV RECOMMENDED FROM 19 SSB FOR SSC(TECH) ENTRY, NOW IN OTA, CHENNAI.mp4",
  },
  {
    name: "Shalley Yadav",
    text: "Recommended from NSB Kolkata for SSC GS(X) Entry",
    video: "/assets/candidates/SHALLEY YADAV RECOMMENDED FROM NSB KOLKATA FOR SSC GS(X) ENTRY.mp4",
  },
  {
    name: "Shivangi",
    text: "Recommended from 34 SSB for JAG Entry — Now in OTA Chennai",
    video: "/assets/candidates/SHIVANGI RECOMMENDED FROM 34 SSB FOR JAG ENTRY. NOW IN OTA CHENNAI.mp4",
  },
  {
    name: "Shivaansh",
    text: "Recommended from 22 SSB, Bhopal for NDA Entry",
    video: "/assets/candidates/SHIVAANSH RECOMMENDED FROM 22 SSB, BHOPAL FOR NDA ENTRY.mp4",
  },
  {
    name: "Colonel Anirudh Das",
    text: "Father of Invincible Rishit Das (Batch Life Skills — 042025)",
    video: "/assets/candidates/Colonel Anirudh Das, father of Invincible Rishit Das (Batch Life Skills - 042025).mp4",
  },
  {
    name: "Cdr Praveen Pola",
    text: "Principal, Sainik School, East Siang",
    video: "/assets/candidates/Cdr Praveen Pola, Principal, Sainik School, East Siang.mp4",
  },
  {
    name: "Col Manjit Singh",
    text: "Father of Invincible Hameshul Singh (Life Skills Batch 032025)",
    video: "/assets/candidates/Col Manjit Singh fo Invincible Hameshul Singh  (life skills batch 032025).mp4",
  },
  {
    name: "Lt Col Roy",
    text: "Father of Araina Roy (Class 9th, Batch — Life Skills 032025)",
    video: "/assets/candidates/Lt Col Roy, mo Araina Roy (Class 9th, batch - Life Skills - 032025).mp4",
  },
  {
    name: "Mr Deka",
    text: "Senior Master, Sainik School, East Siang, Arunachal Pradesh",
    video: "/assets/candidates/Mr Deka, Senior Master, Sainik School, East Siang, Arunachal Pradesh.mp4",
  },
];

const stories = [
  { name: "Vivek Sharma",      info: "SSC Navy ATC Entry — 16th Attempt",               image: "/assets/client_photo/Vivek Sharma .jpg" },
  { name: "S R Hari Kumar",    info: "SSC Tech — 16th Attempt",                          image: "/assets/client_photo/S R Hari Kumar.jpg" },
  { name: "Prashant Upadhyay", info: "Batch RNDA-46843 — NDA 155 Entry",                image: "/assets/client_photo/Prashant Upadhyay.jpg" },
  { name: "Sanyog Tiwari",     info: "SSC Tech Entry — 10th Attempt",                   image: "/assets/client_photo/Sanyog Tiwari.jpg" },
  { name: "Akash Swamy",       info: "CDS OTA Entry — 7th Attempt",                     image: "/assets/client_photo/Akash Swamy .jpg" },
  { name: "Gyanendra Yadav",   info: "4 AFSB Varanasi — Batch VNDA(M)/729",            image: "/assets/client_photo/Gyanendra.jpg" },
  { name: "Akshat Mishra",     info: "NDA/62806 — Batch VNDA(M)/729",                  image: "/assets/client_photo/Akshat mishra.jpg" },
  { name: "Atharv",            info: "Batch DSTL 39818 — 19 SSB Prayagraj, Chest No. 7", image: "/assets/client_photo/Atharv.jpg" },
  { name: "Rudransh Kishore",  info: "Batch KNDA 40815 — 20 SSB, Chest No. 02",        image: "/assets/client_photo/Rudransh.jpg" },
  { name: "Aditya Gupta",      info: "Batch KNDA 40816 — 20 SSB, Chest No. 09",        image: "/assets/client_photo/Aditya.jpg" },
  { name: "Sankalp Jaiswal",   info: "Batch PNDA 72255 — 21 SSB, Chest No. 03",        image: "/assets/client_photo/Sankalp.jpg" },
];

const duplicatedStories = [...stories, ...stories];

// ── Video Card ────────────────────────────────────────────────────────────────
const VideoCard = ({
  item,
  index,
  currentPlaying,
  onPlay,
}: {
  item: (typeof echoes)[0];
  index: number;
  currentPlaying: number | null;
  onPlay: (i: number) => void;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState(false);

  const handleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.requestFullscreen) el.requestFullscreen();
    else if ((el as any).webkitRequestFullscreen) (el as any).webkitRequestFullscreen();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay: (index % 3) * 0.06 }}
      className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden flex flex-col"
      style={{
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        transition: "transform 280ms cubic-bezier(0.23,1,0.32,1), box-shadow 280ms cubic-bezier(0.23,1,0.32,1), border-color 280ms ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,86,140,0.08)";
        e.currentTarget.style.borderColor = "rgba(47,180,231,0.30)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
        e.currentTarget.style.borderColor = "#e5e7eb";
      }}
    >
      <div className="relative w-full aspect-video bg-gray-100">
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-xs text-[#6B7280] text-center px-4">Video unavailable</p>
          </div>
        ) : (
          <video
            ref={videoRef}
            controls
            controlsList="nodownload noplaybackrate"
            disablePictureInPicture
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover"
            title={`${item.name}'s testimonial`}
            onPlay={() => onPlay(index)}
            onError={() => setError(true)}
          >
            <source src={item.video} type="video/mp4" />
          </video>
        )}
        {!error && (
          <button
            onClick={handleFullscreen}
            className="absolute bottom-2 right-2 p-1.5 bg-black/50 rounded-md text-white hover:bg-black/70 transition-colors duration-150 z-10"
            title="Fullscreen"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
      <div className="px-5 py-4 flex flex-col gap-1">
        <p className="font-serif font-semibold text-sm text-[#00568C]">{item.name}</p>
        <p className="font-sans text-xs text-[#6B7280] leading-snug">{item.text}</p>
      </div>
    </motion.div>
  );
};

// ── Main ──────────────────────────────────────────────────────────────────────
const TransformationSection = () => {
  const [currentPlaying, setCurrentPlaying] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handlePlay = (index: number) => {
    if (currentPlaying !== null && currentPlaying !== index) {
      videoRefs.current[currentPlaying]?.pause();
    }
    setCurrentPlaying(index);
  };

  return (
    <>
      {/* Echoes of Transformation — videos */}
      <section className="bg-[#eaf6f8] py-24">
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="mb-14 text-center"
          >
            <p className={`${EYEBROW} mb-4`}>In Their Own Words</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#00568C]">
              Echoes of Transformation
            </h2>
            <div className="w-20 h-1 bg-[#F6B828] mx-auto mt-6 rounded-full" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {echoes.map((item, i) => (
              <VideoCard
                key={item.name}
                item={item}
                index={i}
                currentPlaying={currentPlaying}
                onPlay={handlePlay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Individual Success Stories — carousel */}
      <section className="bg-white py-24">
        <div className="mb-14 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
          >
            <p className={`${EYEBROW} mb-4`}>The Hall of Honour</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#00568C]">
              Individual Success Stories
            </h2>
            <div className="w-20 h-1 bg-[#F6B828] mx-auto mt-6 rounded-full" />
          </motion.div>
        </div>

        {/* Itanagar group highlight */}
        <div className="max-w-3xl mx-auto px-6 mb-14">
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
            className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden"
            style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            <img
              src="/assets/client_photo/75 out of 87 mentored at Success point at Itanagar.jpg"
              alt="75 out of 87 mentored at Success point at Itanagar"
              className="w-full h-64 object-cover"
            />
            <div className="px-8 py-5 text-center">
              <p className="font-serif font-bold text-[#00568C] text-lg">Itanagar Milestone</p>
              <p className="font-sans text-sm text-[#6B7280] mt-1">
                75 out of 87 students mentored at Success Point, Itanagar — selected in final interviews
              </p>
            </div>
          </motion.div>
        </div>

        {/* Scrolling carousel */}
        <div className="relative overflow-hidden w-full max-w-full" style={{ contain: "paint" }}>
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />

          <motion.div
            className="flex gap-5 w-max will-change-transform"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 35, ease: "linear", repeat: Infinity }}
          >
            {duplicatedStories.map((story, index) => (
              <div
                key={index}
                className="group/card flex items-center gap-4 bg-white rounded-xl px-5 py-4 min-w-[280px] cursor-pointer border border-[#e5e7eb]"
                style={{
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "transform 250ms cubic-bezier(0.23,1,0.32,1), box-shadow 250ms ease, border-color 250ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 6px 24px rgba(0,86,140,0.10)";
                  e.currentTarget.style.borderColor = "rgba(47,180,231,0.30)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                  e.currentTarget.style.borderColor = "#e5e7eb";
                }}
              >
                <div className="w-16 h-14 rounded-md overflow-hidden shrink-0">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-full h-full object-cover object-[center_20%]"
                  />
                </div>
                <div className="flex flex-col text-left leading-tight max-w-[160px]">
                  <span className="font-serif text-sm font-semibold text-[#00568C]">
                    {story.name}
                  </span>
                  <span className="font-sans text-xs text-[#6B7280] mt-0.5 line-clamp-2">
                    {story.info}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default TransformationSection;
