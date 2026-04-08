import { motion } from "framer-motion";
import { CalendarCheck } from "lucide-react";

const EASE_OUT = [0.23, 1, 0.32, 1] as [number, number, number, number];

const stats = [
  { value: "75/87", label: "Selected – Itanagar" },
  { value: "500+",  label: "Aspirants Mentored"  },
  { value: "10+",   label: "Institutions"         },
  { value: "100%",  label: "Real SSB Mentors"     },
];

const achievements = [
  {
    title: "Mentoring the APPSCCE-2024 Aspirants",
    desc: "In the heart of Itanagar, our mock interview sessions for aspiring candidates fostered confidence and clarity, paving their way to success. The experience blended professional growth with the spirit of Arunachal Pradesh.",
    tag: "Mentorship",
    image: "/assets/client_photo/75 out of 87 mentored at Success point at Itanagar.jpg",
  },
  {
    title: "Sainik School Kapurthala — Class 11 Takes the LEAP",
    desc: "LEAP isn't just another leadership program — it's a curated experience built from armed forces-inspired practices and psychological mentoring, bringing clarity and confidence to every cadet.",
    tag: "LEAP Program",
    image: "/assets/projects/class-11th-kapurthala/img-1.jpg",
  },
  {
    title: "Sainik School East Siang",
    desc: "From naivety to awareness, from self-doubt to belief: Class 12 at Sainik School East Siang took the LEAP. Expert-led training sessions and strategic guidance for the future defenders of our nation.",
    tag: "Leadership Training",
    image: "/assets/Sainik_School_East_Siang/img1.jpg",
  },
  {
    title: "Mentoring the Mentors — SS Ambikapur",
    desc: "Empowering educators with advanced training methodologies and leadership skills to better guide the next generation of leaders. Because learning never ends.",
    tag: "Trainer Development",
    image: "/assets/projects/training-the-trainers/img-1.jpg",
  },
  {
    title: "YODDHAA Defence Academy, Pune",
    desc: "Successfully executed our first project, delivering expert-led training and strategic insights to aspiring defence candidates at YODDHAA Defence Academy.",
    tag: "Execution",
    image: "/assets/projects/pune/punr-project-2.jpg",
  },
  {
    title: "SSB Guide Defence Academy, Ambala",
    desc: "Equipped with SSB-standard obstacles, individual task setups, and personality assessment zones — a flagship centre designed for immersive, all-round preparation.",
    tag: "Infrastructure",
    image: "/assets/projects/harayana/img-1.png",
  },
  {
    title: "Sainik School Ambikapur — Infra Development",
    desc: "Hallmark personality development and infrastructure creation project, catapulting the training of aspirants to greater heights with purpose-built SSB simulation setups.",
    tag: "Infrastructure",
    image: "/assets/projects/infra-development/img-2.jpg",
  },
  {
    title: "Sainik School Kapurthala, Punjab — Infra",
    desc: "Training the next generation with precision. Custom-built structures for cadets to experience authentic, realistic scenarios and prepare for life's challenges.",
    tag: "Infrastructure",
    image: "/assets/projects/punjab/img-2.jpg",
  },
];

const ImpactSection = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-12 border-t border-[#e5e7eb]">
      <div className="max-w-7xl mx-auto">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="text-center mb-16"
        >
          <span className="font-sans text-xs font-semibold tracking-[0.3em] uppercase text-[#2FB4E7] mb-3 block">
            Real mentoring. Real institutions. Real results.
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#00568C] tracking-tight">
            Proven Impact on Ground
          </h2>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.4, ease: EASE_OUT }}
              className="bg-[#eaf6f8] rounded-2xl p-8 text-center border border-[#e5e7eb]"
              style={{
                transition: "transform 280ms cubic-bezier(0.23,1,0.32,1), box-shadow 280ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,86,140,0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#00568C] mb-2">
                {stat.value}
              </h3>
              <p className="font-sans text-sm font-medium text-[#6B7280] uppercase tracking-wide">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          {achievements.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.07, duration: 0.4, ease: EASE_OUT }}
              className="group bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] flex flex-col"
              style={{
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                transition: "transform 280ms cubic-bezier(0.23,1,0.32,1), box-shadow 280ms ease, border-color 280ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = "0 12px 40px rgba(0,86,140,0.10)";
                e.currentTarget.style.borderColor = "rgba(0,86,140,0.18)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                e.currentTarget.style.borderColor = "#e5e7eb";
              }}
            >
              <div className="aspect-[16/9] w-full overflow-hidden bg-[#eaf6f8]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="mb-4">
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1.5 rounded-lg"
                    style={{ background: "#eaf6f8", color: "#00568C" }}
                  >
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-bold text-[#00568C] mb-3 group-hover:text-[#2FB4E7] transition-colors duration-200">
                  {item.title}
                </h3>
                <p className="font-sans text-sm md:text-base leading-relaxed text-[#374151] mt-auto">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Block */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="text-center rounded-3xl p-12 md:p-16 border border-[#e5e7eb] relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #F1FFFF 0%, #eaf6f8 100%)",
          }}
        >
          {/* Subtle deep-blue glow decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
            style={{ background: "rgba(47,180,231,0.08)" }} />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none"
            style={{ background: "rgba(0,86,140,0.06)" }} />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h3 className="font-serif text-3xl font-bold text-[#00568C] mb-6">
              Start Your Journey with Invincio
            </h3>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F6B828] text-[#00568C] px-8 py-4 text-sm font-bold tracking-wide"
              style={{
                boxShadow: "0 4px 20px rgba(246,184,40,0.30)",
                transition: "background-color 200ms ease, box-shadow 200ms ease, transform 120ms ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#e0a720";
                e.currentTarget.style.boxShadow = "0 6px 28px rgba(246,184,40,0.45)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F6B828";
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(246,184,40,0.30)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              <CalendarCheck className="h-5 w-5 shrink-0" />
              Book Free Consultation
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ImpactSection;
