import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import {
  CONTAINER,
  EYEBROW,
  EASE_OUT,
} from "@/lib/design-system";
import { candidateStories as stories } from "@/data/candidate-selections";

const echoes = [
  {
    name: "Atharv",
    text: "Recommended from 19 SSB for SSC (Tech) Entry — Now in OTA, Chennai",
    video: "/assets/candidates/ATHARV RECOMMENDED FROM 19 SSB FOR SSC(TECH) ENTRY, NOW IN OTA, CHENNAI.mp4",
  },
  {
    name: "Shalley Yadav",
    text: "Recommended from NSB Kolkata for SSC GS(X) Entry",
    video: "/assets/candidates/SHALLEY YADAV RECOMMENDED FROM NSB KOLKATA FOR SSC GS(X) ENTRY.mp4",
  },
  {
    name: "Shivangi",
    text: "Recommended from 34 SSB for JAG Entry — Now in OTA, Chennai",
    video: "/assets/candidates/SHIVANGI RECOMMENDED FROM 34 SSB FOR JAG ENTRY. NOW IN OTA CHENNAI.mp4",
  },
  {
    name: "Shivaansh",
    text: "Recommended from 22 SSB, Bhopal for NDA Entry",
    video: "/assets/candidates/SHIVAANSH RECOMMENDED FROM 22 SSB, BHOPAL FOR NDA ENTRY.mp4",
  },
  {
    name: "Colonel Anirudh Das",
    text: "Father of Invincible Rishit Das (Batch: Life Skills — 042026)",
    video: "/assets/candidates/Colonel Anirudh Das, father of Invincible Rishit Das (Batch Life Skills - 042025).mp4",
  },
  {
    name: "Cdr Praveen Pola",
    text: "Principal, Sainik School East Siang",
    video: "/assets/candidates/Cdr Praveen Pola, Principal, Sainik School, East Siang.mp4",
  },
  {
    name: "Col Manjit Singh",
    text: "Father of Invincible Hameshul Singh (Life Skills Batch: 032026)",
    video: "/assets/candidates/Col Manjit Singh fo Invincible Hameshul Singh  (life skills batch 032025).mp4",
  },
  {
    name: "Lt Col Roy",
    text: "Mother of Araina Roy (Class 9 onwards, Batch: Life Skills — 032026)",
    video: "/assets/candidates/Lt Col Roy, mo Araina Roy (Class 9th, batch - Life Skills - 032025).mp4",
  },
  {
    name: "Mr Deka",
    text: "Senior Master, Sainik School East Siang, Arunachal Pradesh",
    video: "/assets/candidates/Mr Deka, Senior Master, Sainik School, East Siang, Arunachal Pradesh.mp4",
  },
];

type Story = (typeof stories)[number];

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const isThisWeek = (addedAt?: string) =>
  !!addedAt && Date.now() - new Date(addedAt).getTime() < WEEK_MS;

const sortedStories = [...stories].sort((a, b) =>
  (b.addedAt ?? "").localeCompare(a.addedAt ?? "")
);
const freshStories = sortedStories.filter((s) => isThisWeek(s.addedAt));

const PhotoCard = ({ story, fresh }: { story: Story; fresh?: boolean }) => (
  <div className="relative flex flex-col bg-white rounded-xl border border-[#e5e7eb] overflow-hidden shadow-[0_1px_4px_rgba(0,0,0,0.04)]">
    {fresh && (
      <span className="absolute top-3 right-3 z-10 rounded-full bg-[#F6B828] text-[#1f2937] text-[10px] font-bold uppercase tracking-[0.12em] px-2.5 py-1">
        New
      </span>
    )}
    <div className="w-full aspect-square overflow-hidden bg-[#f3f4f6]">
      <img
        src={story.image}
        alt={story.name}
        loading="lazy"
        className="block w-full h-full object-cover object-[center_20%]"
      />
    </div>
    <div className="flex flex-col text-left leading-tight p-5">
      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#F6B828]">Invincible</span>
      <span className="font-serif font-semibold text-[#00568C] text-lg">{story.name}</span>
      <span className="font-sans text-[#6B7280] text-sm mt-1.5 whitespace-pre-line">{story.info}</span>
    </div>
  </div>
);

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

  const isSenior = item.name === "Colonel Anirudh Das" || item.name === "Cdr Praveen Pola" || item.name === "Col Manjit Singh" || item.name === "Lt Col Roy" || item.name === "Mr Deka";

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
        <div className="flex flex-col">
          {!isSenior && (
            <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#F6B828]">Invincible</span>
          )}
          <p className="font-serif font-semibold text-sm text-[#00568C]">
            {item.name}
          </p>
        </div>
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
      {/* 1 — Individual Success Stories: static photo grid, auto-fed weekly by the WhatsApp automation */}
      <section className="bg-white py-24">
        <div className={CONTAINER}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="mb-14 text-center"
          >
            <p className={`${EYEBROW} mb-4`}>The Hall of Honour</p>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#00568C]">
              Individual Success Stories
            </h2>
            <div className="w-20 h-1 bg-[#F6B828] mx-auto mt-6 rounded-full" />
          </motion.div>

          {/* Itanagar group highlight */}
          <div className="max-w-3xl mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="bg-white border border-[#e5e7eb] rounded-xl overflow-hidden"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div className="w-full aspect-[16/9] overflow-hidden">
                <img
                  src="/assets/client_photo/75 out of 87 mentored at Success point at Itanagar.jpg"
                  alt="75 out of 87 mentored at Success point at Itanagar"
                  className="block w-full h-full object-cover"
                />
              </div>
              <div className="px-8 py-5 text-center">
                <p className="font-serif font-bold text-[#00568C] text-lg">Itanagar Milestone</p>
                <p className="font-sans text-sm text-[#6B7280] mt-1">
                  75 out of 87 students mentored in 2026 at Success Point, Itanagar — recommended in final selection rounds.
                </p>
              </div>
            </motion.div>
          </div>

          {freshStories.length > 0 && (
            <div className="mb-16">
              <h3 className="font-serif text-2xl font-bold text-[#00568C] mb-6">
                Recommended this week
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {freshStories.map((story) => (
                  <PhotoCard key={story.image} story={story} fresh />
                ))}
              </div>
            </div>
          )}

          <div>
            {freshStories.length > 0 && (
              <h3 className="font-serif text-2xl font-bold text-[#00568C] mb-6">
                All Invincibles
              </h3>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedStories.map((story) => (
                <PhotoCard key={story.image} story={story} fresh={isThisWeek(story.addedAt)} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2 — Echoes of Transformation: videos */}
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
    </>
  );
};

export default TransformationSection;
