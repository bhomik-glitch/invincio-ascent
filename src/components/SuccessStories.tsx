import { motion } from "framer-motion";

const stories = [
  {
    name: "Akshat Mishra",
    info: "Recommended: NDA 151 Course",
    image: "/assets/client_photo/Akshat mishra.jpg",
  },
  {
    name: "Akash Swamy",
    info: "Recommended: TES 50 Course",
    image: "/assets/client_photo/Akash Swamy .jpg",
  },
  {
    name: "Aditya",
    info: "Recommended: IMA 157 Course",
    image: "/assets/client_photo/Aditya.jpg",
  },
  {
    name: "Rudransh",
    info: "Recommended: NDA 152 Course",
    image: "/assets/client_photo/Rudransh.jpg",
  },
  {
    name: "Sankalp",
    info: "Recommended: CDS 2 2023",
    image: "/assets/client_photo/Sankalp.jpg",
  },
  {
    name: "Atharv",
    info: "Recommended: Navy Tech",
    image: "/assets/client_photo/Atharv.jpg",
  },
];

const duplicatedStories = [...stories, ...stories];

const SuccessStories = () => {
  return (
    <section className="bg-[#eaf6f8] py-24">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-12">
        <div className="text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-semibold text-[#00568C] mb-4">
            Individual Success Stories
          </h2>
          <div className="w-20 h-1 bg-[#F6B828] mx-auto rounded-full" />
        </div>
      </div>

      {/* Carousel */}
      <div className="relative overflow-hidden w-full max-w-full">
        {/* Fade edges — match section bg */}
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#eaf6f8] to-transparent pointer-events-none z-10" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#eaf6f8] to-transparent pointer-events-none z-10" />

        {/* Track */}
        <motion.div
          className="flex gap-5 w-max will-change-transform"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
        >
          {duplicatedStories.map((story, index) => (
            <div
              key={index}
              className="group/card flex flex-col bg-white rounded-xl overflow-hidden min-w-[220px] min-h-[420px] cursor-pointer border border-[#e5e7eb]"
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
              {/* Photo */}
              <div className="w-full h-[300px] overflow-hidden rounded-t-xl shrink-0">
                <img
                  src={story.image}
                  alt={story.name}
                  className="w-full h-auto object-cover object-top"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col text-left space-y-1.5 leading-tight p-6">
                <span className="text-sm font-semibold text-[#00568C]">
                  {story.name}
                </span>
                <span className="text-xs text-[#6B7280]">
                  {story.info}
                </span>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessStories;
