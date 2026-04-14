import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ── Team Data ─────────────────────────────────────────────────────── */

interface Member {
  name: string;
  role: string;
  bio: string;
  image: string;
  objectPosition?: string;
}

const teamMembers: Member[] = [
  {
    name: "Brig Ajay Sharma, VSM",
    role: "Brigadier (Retd) · SSB Assessor",
    bio: "Expert in personality assessment with extensive experience, having conducted 2,500+ interviews and mentored 1,000+ aspirants, many of whom have joined Officer Training Institutions of the Armed Forces.",
    image: "/assets/mentor/Brig Sharma.jpg",
    objectPosition: "top",
  },
  {
    name: "Brig Sanjay Kurelay",
    role: "Brigadier (Retd) · SSB President",
    bio: "Veteran with 42 years in uniform, NDA & IMA alum, and MTech from IIT Kharagpur. Served as SSB President, conducting 3,500+ interviews and mentoring countless aspirants.",
    image: "/assets/mentor/sanjay.png",
    objectPosition: "top",
  },
  {
    name: "Col Anupam Suden",
    role: "Colonel (Retd) · Personality Profiler",
    bio: "Personality Profiler, Assessor, and Behaviour Analyst with years of experience mentoring 3,500+ candidates. Conducts personality enhancement sessions, team bonding events, and campus placement workshops.",
    image: "/assets/mentor/Col Suden.jpg",
    objectPosition: "top",
  },
  {
    name: "Col Ranjit Singh",
    role: "Colonel (Retd) · SSB Expert",
    bio: "Army veteran with 30+ years of service, expert in SSB assessments and training. Assessed 3,000+ candidates, trained 7,000+ aspirants, and conducted 3,500+ interviews with high success rates.",
    image: "/assets/mentor/RANJIT.jpg",
    objectPosition: "top",
  },
  {
    name: "Col Karandeep Singh",
    role: "Colonel (Retd) · Leadership Coach",
    bio: "Veteran with 27 years in military and corporate leadership. Expert in personality development, assessing 2,100+ candidates, and mentoring future leaders.",
    image: "/assets/mentor/Col Karandeep.jpg",
    objectPosition: "top",
  },
  {
    name: "Gp Capt Vikram Singh",
    role: "Group Captain (Retd) · Aviation Expert",
    bio: "Gold Medalist in Aviation Law & Air Transport Management. Highly experienced Air Force veteran with 3,000+ accident-free flight hours and Flight Safety 3 Stars, mentoring thousands to success.",
    image: "/assets/mentor/Gp Capt Vikram Singh.jpg",
    objectPosition: "top",
  },
  {
    name: "Havildar Sanjay Kumar Choubey",
    role: "Kargil War Veteran · SSB Trainer",
    bio: "Kargil War veteran from Bihar, served with 1st BIHAR in the Batalik Sector. Former Havildar Major at 34 SSB, Allahabad — dedicated to training future defence aspirants.",
    image: "/assets/mentor/havildarSanjay.png",
    objectPosition: "top",
  },
  {
    name: "Havildar Rajesh Kumar",
    role: "Army Veteran · SSB Trainer",
    bio: "Veteran from Punjab, served with 6 Dogra in Siachen and Manipur. Former Havildar Major at 11 SSB, Allahabad — dedicated to mentoring defence aspirants.",
    image: "/assets/mentor/havildarRajseh.png",
    objectPosition: "top",
  },
  {
    name: "Radhika Bali",
    role: "Presence Sculptor · Image Consultant",
    bio: "Empowers professionals in executive presence, communication, and personal branding. With 24+ years of experience, Founder of Aक्स by Radhika and PSAI Delhi Chapter President.",
    image: "/assets/mentor/radhika.png",
    objectPosition: "center",
  },
  {
    name: "Hina Arora",
    role: "Engineering Manager · Career Coach",
    bio: "Helped 500+ students secure jobs, optimized 1,000+ LinkedIn profiles, and built a 300K+ social media following. Specialises in ATS resumes and interview success strategies.",
    image: "/assets/mentor/hina.png",
    objectPosition: "center",
  },
  {
    name: "Tanu Gola",
    role: "Junior Consultant",
    bio: "Economics undergrad at LSR College with interests in consulting and decision-making. Junior Consultant at LSR Consulting Club, active in WICCI, skilled in Canva and event coordination.",
    image: "/assets/mentor/tanugola.jpeg",
    objectPosition: "top",
  },
  {
    name: "Devendra Sharma",
    role: "Digital Marketing Executive",
    bio: "Advance Diploma in Digital Marketing with 1 year of experience managing digital projects for 30+ companies across Manufacturing, Pharma, Real Estate, and Fitness sectors.",
    image: "/assets/mentor/Devendra Sharma's Photo 1.png",
    objectPosition: "top",
  },
];

const mentors: Member[] = [
  {
    name: "Maj Gen Vinod, VSM",
    role: "Major General (Retd) · Strategic Mentor",
    bio: "Military veteran with 37 years in Army Air Defence and SSB expertise, mentoring thousands in interviews, leadership, and career success. Strategic guidance that empowers individuals to excel.",
    image: "/assets/mentor/vinod.png",
    objectPosition: "top",
  },
  {
    name: "Puja Sabharwal",
    role: "Educationist · Mentor",
    bio: "Educationist with 17+ years of experience dedicated to mentoring future leaders. Blends philosophy with experiential learning to empower young minds and shape the next generation's success.",
    image: "/assets/mentor/pooja.png",
    objectPosition: "top",
  },
  {
    name: "Dr. Hema Diwan",
    role: "Associate Professor, IIM Mumbai",
    bio: "Specialising in Corporate Sustainability, ESG, and Environmental Management. Gold Medalist and award-winning researcher who has trained professionals from top industries.",
    image: "/assets/mentor/hema.png",
    objectPosition: "top",
  },
];

/* ── Animation Variants ─────────────────────────────────────────────── */

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] } },
};

/* ── Team Card (horizontal) ─────────────────────────────────────────── */

const TeamCard = ({ member }: { member: Member }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,86,140,0.13)" }}
    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    className="flex flex-col sm:flex-row gap-0 bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] cursor-default"
    style={{ boxShadow: "0 2px 16px rgba(0,86,140,0.07)" }}
  >
    {/* Image */}
    <div className="sm:w-[140px] md:w-[160px] flex-shrink-0 bg-[#eaf6f8]">
      <div className="w-full h-48 sm:h-full">
        <img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover"
          style={{ objectPosition: member.objectPosition ?? "top" }}
        />
      </div>
    </div>

    {/* Content */}
    <div className="flex-1 p-5 md:p-6 flex flex-col justify-center gap-1.5">
      <h3 className="font-serif text-[17px] font-bold text-[#1a2c3d] leading-snug">
        {member.name}
      </h3>
      <p
        className="text-[11px] font-semibold tracking-[0.12em] uppercase"
        style={{ color: "#00568C" }}
      >
        {member.role}
      </p>
      <p className="text-[13px] text-[#6B7280] leading-relaxed mt-1 line-clamp-4">
        {member.bio}
      </p>
    </div>
  </motion.div>
);

/* ── Mentor Card (portrait) ─────────────────────────────────────────── */

const MentorCard = ({ member }: { member: Member }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,86,140,0.13)" }}
    transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
    className="flex flex-col items-center text-center bg-white rounded-2xl overflow-hidden border border-[#e5e7eb] p-7 cursor-default"
    style={{ boxShadow: "0 2px 16px rgba(0,86,140,0.07)" }}
  >
    <div
      className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4"
      style={{ borderColor: "rgba(0,86,140,0.12)" }}
    >
      <img
        src={member.image}
        alt={member.name}
        loading="lazy"
        className="w-full h-full object-cover"
        style={{ objectPosition: member.objectPosition ?? "top" }}
      />
    </div>
    <h3 className="font-serif text-[17px] font-bold text-[#1a2c3d] leading-snug mb-1">
      {member.name}
    </h3>
    <p
      className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-3"
      style={{ color: "#00568C" }}
    >
      {member.role}
    </p>
    <p className="text-[13px] text-[#6B7280] leading-relaxed line-clamp-4">
      {member.bio}
    </p>
  </motion.div>
);

/* ── Section Header ─────────────────────────────────────────────────── */

const SectionHeader = ({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
}) => (
  <div className="text-center mb-12">
    <p className="text-primary font-sans text-sm font-semibold tracking-[0.2em] uppercase mb-3">
      {eyebrow}
    </p>
    <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#1a2c3d] leading-tight mb-4">
      {title}
    </h2>
    <p className="text-muted-foreground font-sans text-base max-w-xl mx-auto">
      {subtitle}
    </p>
    <div
      className="mx-auto mt-5 h-[3px] w-16 rounded-full"
      style={{ background: "linear-gradient(90deg,#00568C,#2FB4E7)" }}
    />
  </div>
);

/* ── Main Export ────────────────────────────────────────────────────── */

const TeamSection = () => {
  const teamRef = useRef(null);
  const mentorRef = useRef(null);
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" });
  const mentorInView = useInView(mentorRef, { once: true, margin: "-80px" });

  return (
    <section className="section-padding bg-muted/40">
      <div className="max-w-7xl mx-auto">

        {/* ── Our Team ── */}
        <SectionHeader
          eyebrow="The Invincio Faculty"
          title={
            <>
              Meet Our <span className="gold-text">Team</span>
            </>
          }
          subtitle="Learn from experienced SSB assessors and defence professionals dedicated to your transformation."
        />

        <motion.div
          ref={teamRef}
          variants={containerVariants}
          initial="hidden"
          animate={teamInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-5"
        >
          {teamMembers.map((m) => (
            <TeamCard key={m.name} member={m} />
          ))}
        </motion.div>

        {/* ── Our Mentors ── */}
        <div className="mt-24">
          <SectionHeader
            eyebrow="Strategic Guidance"
            title={
              <>
                Our <span className="gold-text">Mentors</span>
              </>
            }
            subtitle="Senior leaders who shape our pedagogy and guide our mission."
          />

          <motion.div
            ref={mentorRef}
            variants={containerVariants}
            initial="hidden"
            animate={mentorInView ? "visible" : "hidden"}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto"
          >
            {mentors.map((m) => (
              <MentorCard key={m.name} member={m} />
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default TeamSection;
