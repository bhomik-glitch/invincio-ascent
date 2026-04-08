import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import { FaChevronLeft, FaChevronRight, FaChartLine, FaUserTie, FaRoad, FaChartBar, FaLaptop, FaBriefcase, FaTrophy, FaUsers, FaGlobe, FaBrain, FaHandshake, FaHeart, FaMapMarkedAlt, FaGraduationCap, FaBuilding, FaUserCheck, FaFemale, FaLanguage } from 'react-icons/fa'
import offlineClasses from "../assets/offlineclasses.jpeg";
import onlineClasses from "../assets/onlineClasses.jpeg";
import cooperateTraining from "../assets/cooperateTraining2.jpeg"
import sunny from "../assets/mentor/sunny.png"
import 'swiper/swiper-bundle.css';

interface Pedagogy {
  title: string;
  description: string;
  result?: string;
}

interface Service {
  title: string;
  tagline: string;
  seoHeading?: string;
  pedagogy: Pedagogy;
  differentiators: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  offerings?: {
    title: string;
    description: string;
    icon: React.ReactNode;
  }[];
  cta: string;
}

const services: Service[] = [
  {
    title: "SSB INTERVIEW TRAINING",
    tagline: "Not coaching. Cultivating Officers.",
    seoHeading: "Crack the SSB: Expert Online & Offline Coaching with Proven Success Records",
    pedagogy: {
      title: "LEAD Pedagogy",
      description: "LEARN EXPERIMENT ADAPT DELIVER (With simulations, multiple practices of GD, GPE and GTO Tasks) - we don't tell what to do, we facilitate candidate exploring the correct approach for their personality.",
      result: "Recommendations and Personality development"
    },
    differentiators: [
      {
        title: "Veteran Expertise",
        description: "SSB and DIPR Experienced Veterans and Scientists",
        icon: <FaUserTie className="w-12 h-12" />
      },
      {
        title: "Holistic Development",
        description: "Personality + Performance focus leading to holistic development",
        icon: <FaChartLine className="w-12 h-12" />
      },
      {
        title: "Proven Success",
        description: "Testimonial from candidates - recommended and Bhomik(development, not merely SSB recommendation)",
        icon: <FaTrophy className="w-12 h-12" />
      },
      {
        title: "Mission Mode",
        description: "Approach: From assessment to mission-mode training",
        icon: <FaRoad className="w-12 h-12" />
      }
    ],
    cta: "Join the SSB League"
  },
  {
    title: "PERSONALITY PROFILING & CAREER GUIDANCE (SCHOOLS)",
    tagline: "Guiding dreams. Mapping futures.",
    seoHeading: "Our Signature LEAP Module: Personality Profiling & Career Guidance for Schools",
    pedagogy: {
      title: "L.E.A.R.N. Pedagogy",
      description: "L – Lead with Self - Cultivating self-awareness and initiative through psychometric insights.\nE – Evaluate Strengths - Identifying innate traits and behavioral patterns using validated tools.\nA – Adapt with Purpose - Training students to respond, not react—through SSB-inspired simulations.\nR – Reflect and Reshape - Encouraging introspection and growth mindset through guided mentoring.\nN – Navigate Life - Empowering students to make informed career and life decisions."
    },
    differentiators: [
      {
        title: "Professional Branding",
        description: "Exclusive mentorship for Corporate Etiquette, Strategic Networking and Professional Branding",
        icon: <FaBriefcase className="w-12 h-12" />
      },
      {
        title: "Emotional Intelligence",
        description: "Honing Emotional Intelligence & Resilience for High-Pressure Roles",
        icon: <FaBrain className="w-12 h-12" />
      },
      {
        title: "Experiential Learning",
        description: "Experiential Learning & Internship Readiness",
        icon: <FaLaptop className="w-12 h-12" />
      },
      {
        title: "Data-Driven Decisions",
        description: "Business & Data-Driven Decision-Making",
        icon: <FaChartBar className="w-12 h-12" />
      }
    ],
    cta: "Book a Campus Session"
  },
  {
    title: "CORPORATE TRAINING",
    tagline: "From command to collaboration.",
    seoHeading: "Corporate Training: SF-Inspired Modules for High-Performance Teams",
    pedagogy: {
      title: "SF-inspired modules",
      description: "Communication bootcamps, Leadership trails."
    },
    offerings: [
      {
        title: "PACC Module",
        description: "Performance Acceleration and Collaboration Catalyst Module",
        icon: <FaChartLine className="w-12 h-12" />
      },
      {
        title: "Cross-Cultural Communication",
        description: "Decode global mindsets, navigate diversity, and lead with emotional agility across geographies",
        icon: <FaGlobe className="w-12 h-12" />
      },
      {
        title: "Military-Grade Tasks",
        description: "Crisis simulations that push teams into decision-making under uncertainty—reflective of real-world leadership pressure",
        icon: <FaTrophy className="w-12 h-12" />
      },
      {
        title: "SF Mindset Bootcamps",
        description: "Modules drawn from elite military operations—focus, endurance, and mission-mode execution",
        icon: <FaUserTie className="w-12 h-12" />
      }
    ],
    differentiators: [
      {
        title: "Tailored Interventions",
        description: "Every intervention tailored to your business culture, strategic goals, and competency framework",
        icon: <FaUsers className="w-12 h-12" />
      },
      {
        title: "Integrated Analytics",
        description: "Integrated Feedback Loops & Behavioral Analytics",
        icon: <FaChartLine className="w-12 h-12" />
      },
      {
        title: "Flexible Delivery",
        description: "Blended Delivery – Online, Onsite, Offsite",
        icon: <FaGlobe className="w-12 h-12" />
      },
      {
        title: "Military Approach",
        description: "Approach: Diagnose → Design → Deliver → Debrief",
        icon: <FaRoad className="w-12 h-12" />
      }
    ],
    cta: "Train Your Teams Differently"
  },
  {
    title: "Civil Services Interview Preparation",
    tagline: "Skill with soul. Execution with ethics.",
    pedagogy: {
      title: "Field-based modules",
      description: "Field-based modules + emotional & behavioral training - Making candidates Industry and Future-Ready"
    },
    differentiators: [
      {
        title: "Life Skills First",
        description: "Life Skills First, Livelihood Second",
        icon: <FaHeart className="w-12 h-12" />
      },
      {
        title: "Behavioral Training",
        description: "Behaviourial & Emotional Intelligence Training",
        icon: <FaBrain className="w-12 h-12" />
      },
      {
        title: "Workplace Simulation",
        description: "Workplace Simulation Zones",
        icon: <FaLaptop className="w-12 h-12" />
      },
      {
        title: "Career Mapping",
        description: "Psychometric Career Mapping",
        icon: <FaMapMarkedAlt className="w-12 h-12" />
      },
      {
        title: "Ethics Curriculum",
        description: "Ethics & Values-Based Curriculum",
        icon: <FaGraduationCap className="w-12 h-12" />
      },
      {
        title: "Community Hubs",
        description: "Community-Based Skill Hubs",
        icon: <FaBuilding className="w-12 h-12" />
      },
      {
        title: "Industry Integration",
        description: "Corporate & Industry Participation from Day 1",
        icon: <FaHandshake className="w-12 h-12" />
      },
      {
        title: "Placement Tracking",
        description: "Structured Post-Placement Tracking",
        icon: <FaUserCheck className="w-12 h-12" />
      },
      {
        title: "Special Focus",
        description: "Women-Centric & Youth-At-Risk Interventions",
        icon: <FaFemale className="w-12 h-12" />
      },
      {
        title: "Multilingual Delivery",
        description: "Multilingual + Audio-Visual Delivery",
        icon: <FaLanguage className="w-12 h-12" />
      }
    ],
    cta: "Partner With Us"
  }
];

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="w-full" id='services'>
      <div className="bg-white rounded-xl shadow-lg p-8 py-12">
        <div className="text-center mb-8">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2d4b41] mb-4">{service.title}</h2>
          {service.seoHeading && (
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d4b41] mb-4 sr-only">
              {service.seoHeading}
            </h2>
          )}
          <p className="text-2xl text-[#718979] italic mb-6">{service.tagline}</p>
         
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-bold text-[#2d4b41] mb-4">{service.pedagogy.title}</h3>
          <p className="text-xl font-semibold text-gray-600 whitespace-pre-line mb-4">{service.pedagogy.description}</p>
          {service.pedagogy.result && (
            <p className="text-xl text-[#2d4b41] font-bold">Result - {service.pedagogy.result}</p>
          )}
        </div>

        {service.offerings && (
          <div className="border-t border-gray-200 pt-8 mb-12">
            <h4 className="text-3xl font-bold text-[#2d4b41] mb-8 text-center">Our Offerings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {service.offerings.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 p-6"
                >
                  <div className="flex justify-center mb-4 text-[#2d4b41]">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-[#2d4b41] mb-2 text-center">{item.title}</h3>
                  <p className="text-gray-600 text-sm text-center font-medium">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-gray-200 pt-8">
          <h4 className="text-3xl font-bold text-[#2d4b41] mb-8 text-center">Differentiators</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.differentiators.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 p-6"
              >
                <div className="flex justify-center mb-4 text-[#2d4b41]">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-[#2d4b41] mb-2 text-center">{item.title}</h3>
                <p className="text-gray-600 text-sm text-center font-medium">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {service.title === "SSB INTERVIEW TRAINING" && (
            <div className="mb-8 mt-12">
              <p className="text-3xl font-bold text-[#2d4b41] mb-8 text-center">We provide offline and online classes</p>
              <div className="flex flex-col md:flex-row justify-center gap-8 max-w-5xl mx-auto">
                <div className="h-60 w-full max-w-[450px] object-center object-cover rounded-lg overflow-hidden mx-auto text-center">
                  <img src={offlineClasses} alt="Offline Classes" className="w-full h-full object-cover" />
                </div>
                <div className="h-60 w-full max-w-[450px] object-center object-cover rounded-lg overflow-hidden mx-auto text-center">
                  <img src={onlineClasses} alt="Online Classes" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          )}

        {service.title === "CORPORATE TRAINING" && (
            <div className="mb-8 mt-12 max-w-[600px] text-center mx-auto">
                  <img src={cooperateTraining} alt="Offline Classes" className="w-full h-full object-cover mx-auto" />          
            </div>
          )}

          {service.title === "PERSONALITY PROFILING & CAREER GUIDANCE (SCHOOLS)" && 
      <>
      <div className="text-center mb-12 mt-32">
  <h2 className="text-3xl md:text-4xl font-bold text-[#2d4b41] mb-4">
    Financial Literacy Training
  </h2>
  <div className="w-24 h-1 bg-[#718979] mx-auto mb-4"></div>
</div>

{/* Responsive container - column for mobile, row for tablet/desktop */}
<div className="max-w-3xl mx-auto px-4 mb-5 flex flex-col md:flex-row gap-5 items-center">
 
    {/* Image and name - full width on mobile, half width on tablet/desktop */}
    <div className="w-full md:w-1/2 flex flex-col items-center gap-2 mb-4 md:mb-0">
      <img src={sunny} alt="CA Sunny Sabharwal" className="w-full max-w-[200px] md:max-w-[300px] rounded-lg" />
      <h2 className="text-xl font-bold text-[#2d4b41] mt-2">
        CA Sunny Sabharwal
      </h2>
    </div>
    
    {/* Text content - full width on mobile, half width on tablet/desktop */}
    <div className="w-full md:w-1/2">
      <p className="text-gray-600 font-medium text-lg text-center md:text-left">
        Chartered Accountant and Financial Literacy
        Trainer with 18 years of experience in banking,
        risk management, and financial consulting.
        Conducted international training programs
        across Asia, including the Philippines and Nepal.
        Specializes in bridging theory with real-world
        applications through interactive learning and
        case studies. Passionate about equipping
        professionals with financial acumen for better
        decision-making and long-term success.
      </p>
    </div>
  </div>
      </>
          }

<div className="mt-12 text-center flex flex-col md:flex-row justify-center gap-4">
  {service.title === "PERSONALITY PROFILING & CAREER GUIDANCE (SCHOOLS)" &&
  <>
    <a target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSe-Oo1icYKLPNlitYoHo9B_BRyZzkLHHv4lcpirn-_WUqwIaw/viewform?usp=sharing' className="bg-[#2d4b41] text-white px-12 py-4 rounded-lg hover:bg-[#1e3a2f] transition-colors duration-300 text-xl font-bold">
      {service.cta} 
    </a>
    <a target='_blank' href='https://drive.google.com/file/d/1ic_QAFSRMTn_AFciwLX2nJzj1HVRJKK2/view?usp=drive_link' className="border-2 border-[#2d4b41] text-[#2d4b41] px-12 py-4 rounded-lg hover:bg-[#eaf0ed] transition-colors duration-300 text-xl font-bold flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Brochure
    </a>
  </>
  }
  {
    service.title === "SSB INTERVIEW TRAINING" && <>
      <a target='_blank' href='https://forms.gle/jcUHXwXKafQp5ChS9' className="bg-[#2d4b41] text-white px-12 py-4 rounded-lg hover:bg-[#1e3a2f] transition-colors duration-300 text-xl font-bold">
        {service.cta}
      </a>
      <a target='_blank' href='https://drive.google.com/file/d/1HwRt-B-tapGd0QBBSPSqQhzfWMCRUs4v/view?usp=drive_link' className="border-2 border-[#2d4b41] text-[#2d4b41] px-12 py-4 rounded-lg hover:bg-[#eaf0ed] transition-colors duration-300 text-xl font-bold flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Brochure
      </a>
    </>
  }
   {
                    service.title === "Civil Services Interview Preparation" && <>
      <a target='_blank' href='https://forms.gle/jcUHXwXKafQp5ChS9' className="bg-[#2d4b41] text-white px-12 py-4 rounded-lg hover:bg-[#1e3a2f] transition-colors duration-300 text-xl font-bold">
        {service.cta}
      </a>
      <a target='_blank' href='https://drive.google.com/file/d/1HwRt-B-tapGd0QBBSPSqQhzfWMCRUs4v/view?usp=drive_link' className="border-2 border-[#2d4b41] text-[#2d4b41] px-12 py-4 rounded-lg hover:bg-[#eaf0ed] transition-colors duration-300 text-xl font-bold flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Brochure
      </a>
    </>
  }
  {
    service.title === "CORPORATE TRAINING" && <>
      <a target='_blank' href=' https://forms.gle/Y8U7w8xQMWR126eYA' className="bg-[#2d4b41] text-white px-12 py-4 rounded-lg hover:bg-[#1e3a2f] transition-colors duration-300 text-xl font-bold">
        {service.cta} 
      </a>
      <a target='_blank' href='https://drive.google.com/drive/folders/1OjD5tquiaCtNUFyCcoWUR0qJEM0JdU--?usp=drive_link' className="border-2 border-[#2d4b41] text-[#2d4b41] px-12 py-4 rounded-lg hover:bg-[#eaf0ed] transition-colors duration-300 text-xl font-bold flex items-center justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Brochure - Online Training
      </a>
    </>
  }
</div>

      </div>
    </div>
  );
};

const Services: React.FC<{ id?: string; selectedService?: string | null }> = ({ id, selectedService }) => {
  const filteredServices = selectedService 
    ? services.filter(service => service.title === selectedService)
    : services;

  const swiperRef = useRef<any>(null);

  return (
    <section id={id} className="py-32 bg-[#eaeeed]/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2d4b41] mb-4">
            OUR SERVICES
          </h2>
          <div className="w-32 h-1 bg-[#718979] mx-auto mb-6"></div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d4b41] mb-4 sr-only">
            Forging Futures: The Complete SSB Training & Personality Development Program
          </h2>
        </div>

        <div className="w-full flex items-center justify-center gap-6">
          {/* Left Button */}
          <button
            className="bg-[#2d4b41] text-white rounded-full p-3 shadow-lg hover:bg-[#718979] transition-colors"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous Service"
          >
            <FaChevronLeft className="w-6 h-6" />
          </button>

          <div className="w-full max-w-4xl">
            <Swiper
              modules={[Autoplay, Navigation]}
              onSwiper={swiper => (swiperRef.current = swiper)}
              spaceBetween={30}
              slidesPerView={1}
              autoplay={{
                delay: 30000, // 30 seconds delay
                disableOnInteraction: false,
              }}
              loop={true}
              className="mySwiper"
            >
              {filteredServices.map((service, index) => (
                <SwiperSlide key={index}>
                  <ServiceCard service={service} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Right Button */}
          <button
            className="bg-[#2d4b41] text-white rounded-full p-3 shadow-lg hover:bg-[#718979] transition-colors"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next Service"
          >
            <FaChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Services