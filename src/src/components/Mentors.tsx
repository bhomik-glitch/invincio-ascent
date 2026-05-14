import React from "react";
import BrigAjaySharma from "../assets/mentor/Brig Sharma.jpg";
import ColSuden from "../assets/mentor/Col Suden.jpg";
import ColRanjit from "../assets/mentor/RANJIT.jpg";
import ColKarandeepSingh from "../assets/mentor/Col Karandeep.jpg";
import GpCaptVikramSingh from "../assets/mentor/Gp Capt Vikram Singh.jpg";
import BrigSanjay from "../assets/mentor/sanjay.png";
import havilSanjay from "../assets/mentor/havildarSanjay.png";
import havilRajest from "../assets/mentor/havildarRajseh.png";
import radhika from "../assets/mentor/radhika.png";
import hina from "../assets/mentor/hina.png";
import vinod from "../assets/mentor/vinod.png"
import pooja from "../assets/mentor/pooja.png"
import hema from "../assets/mentor/hema.png"
import tanugola from "../assets/mentor/tanugola.jpeg"
import devendra from "../assets/mentor/Devendra Sharma's Photo 1.png"
import sunny from "../assets/mentor/sunny.png"

interface MentorData {
  name: string;
  title?: string;
  description: string;
  imageUrl: string;
}

const mentorData: MentorData[] = [
  {
    name: "Brig Ajay Sharma, VSM",
    description:
      "Expert in personality assessment with extensive experience, having conducted 2500+ interviews and mentored 1000+ aspirants, many of whom have joined Officer Training Institutions of the Armed Forces.",
    imageUrl: BrigAjaySharma,
  },
  {
    name: "Brig Sanjay Kurelay",
    description:
      "Veteran with 42 years in uniform, NDA & IMA alum, and MTech from IIT Kharagpur. Served as SSB President, conducting 3,500+ interviews and mentoring countless aspirants.",
    imageUrl: BrigSanjay,
  },
  {
    name: "Col Anupam Suden",
    description:
      "He is a Personality Profiler, Assessor, and Behavior Analyst with years of experience, mentoring 3,500+ candidates. He conducts personality enhancement sessions, team bonding events, and campus placement workshops.",
    imageUrl: ColSuden,
  },
  {
    name: "Col Ranjit Singh",
    description:
      "Army veteran with 30+ years of service, expert in SSB assessments and training. Assessed 3,000+ candidates, trained 7,000+ aspirants, and conducted 3,500+ interviews with high success rates.",
    imageUrl: ColRanjit,
  },
  {
    name: "Col Karandeep Singh",
    description:
      "Veteran with 27 years in military and corporate leadership. Expert in personality development, assessing 2,100+ candidates, and mentoring future leaders.",
    imageUrl: ColKarandeepSingh,
  },
  {
    name: "Gp Capt Vikram Singh",
    description:
      "A Gold Medalist in Aviation Law & Air Transport Management, this highly experienced Air Force veteran excels in aviation, leadership, and combat operations. With 3,000+ accident-free flight hours and Flight Safety 3 Stars, he has mentored thousands to success.",
    imageUrl: GpCaptVikramSingh,
  },
  {
    name: "Havildar Sanjay Kumar Choubey",
    description:
      " Hav Sanjay Kumar Choubey, a Kargil War veteran from Bihar, served with 1st BIHAR in the Batalik Sector. Former Havildar Major at 34 SSB,  Allahabad, he is dedicated to training future defence aspirants. ",
    imageUrl: havilSanjay,
  },
  {
    name: "Havildar Rajesh Kumar",
    description:
      "Havildar Rajesh Kumar, a veteran from Punjab, served with 6 Dogra in Siachen and Manipur. Former Havildar Major at 11 SSB, Allahabad, he is dedicated to mentoring defence aspirants.",
    imageUrl: havilRajest,
  },
  {
    name: "Sunny Sabharwal",
    description:
      "With 18+ years of experience in infrastructure finance, banking, and financial services, Sunny works with governments and businesses to design goal-oriented financial strategies for infrastructure projects and sustainable growth.",
    imageUrl: sunny,
  },
  {
    name: "Reena Beri",
    description:
      "Training professional with over 11 years of experience in Functional & Technical training. Expert in the design, development, and implementation of learning solutions and strategies.",
    imageUrl: "/assets/reena-beri.png",
  },
  {
    name: "Priyanka Gupta",
    description:
      "Internationally Certified Soft Skill Trainer, Leadership Expert, POSH Trainer, Personal Branding Consultant, Corporate Trainer, Image Consultant, and Personality Trainer.",
    imageUrl: "/assets/priyanka-gupta.png",
  },
  {
    name: "Devendra Sharma",
    description:
      "Advance Diploma in Digital Marketing, now working as Digital Marketing Executive. With 1 year of experience, he has successfully managed digital projects for 30+ companies across industries like Manufacturing, Pharma, Real Estate, and Fitness. A master of SEO, expert social media marketer, graphic designer, and video editor — Devendra Sharma brings powerful versatility to our team",
    imageUrl: devendra,
  },
];

const ourMentors = [
  {
    name: "Maj Gen Vinod, VSM",
    description:
      "A military veteran with 37 years in Army Air Defence and SSB expertise, mentoring thousands in interviews, leadership, and  Career success. His strategic guidance empowers individuals to excel, and we're honoured to have him as our mentor.",
    imageUrl: vinod,
  },
  {
    name: "Puja Sabharwal",
    description:
      "An educationist with 17+ years of experience, is dedicated to mentoring future leaders. As the mentor she blends philosophy with experiential learning to empower young minds. Her commitment has earned her widespread recognition for shaping the next generation's success.",
    imageUrl: pooja,
  },
  {
    name: "Dr. Hema Diwan",
    description:
      ` Associate Professor at IIM
Mumbai, specializing in
Corporate Sustainability, ESG,
and Environmental
Management. A Gold Medalist
and award-winning researcher,
she has trained professionals
from top industries and
mentored young minds for
sustainability-driven growth. `,
    imageUrl: hema,
  },
];

const Mentors: React.FC<{ id?: string }> = ({ id }) => {
  return (
    <section id={id} className="py-32 bg-[#eaeeed]/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2d4b41] mb-4">
            MEET OUR TEAM
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d4b41] mb-4 sr-only">
            Mentors Who Have Assessed You: Meet Our Panel of SSB Experts
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d4b41] mb-4 sr-only">
            Achieve Defence Success: SSB Training from Ex-Presidents and Experienced
          </h2>
          <div className="w-24 h-1 bg-[#718979] mx-auto mb-4"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-10 mt-10 max-w-screen-2xl mx-auto">
          {mentorData.map((mentor, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl ${
                index < 6
                  ? "flex flex-col md:flex-row items-center px-6 py-8 w-full md:w-[35rem] gap-8"
                  : "flex flex-col items-center px-6 py-8 w-full md:w-[22rem]"
              }`}
            >
              <div
                className={`${
                  index < 6
                    ? "w-64 h-64 rounded-lg overflow-hidden"
                    : "w-48 h-48 rounded-full overflow-hidden border-4 border-[#eaeeed]"
                }`}
              >
                <img
                  src={mentor.imageUrl}
                  alt={mentor.name}
                  className="object-cover object-top w-full h-full"
                />
              </div>

              <div className={`${index < 6 ? "flex-1 text-center md:text-left" : "text-center"}`}>
                <h3 className="text-xl font-bold text-[#2d4b41] mb-3">
                  {mentor.name}
                </h3>

                {mentor.title && (
                  <p className="text-[#718979] font-medium mb-3">
                    {mentor.title}
                  </p>
                )}

                <p className="text-gray-600 text-sm">{mentor.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-12 mt-32">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2d4b41] mb-4">
          OUR MENTORS
          </h2>
          <div className="w-24 h-1 bg-[#718979] mx-auto mb-4"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-10 mt-10 max-w-6xl mx-auto">
          {ourMentors.map((mentor, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl flex flex-col items-center px-6 py-8 w-full md:w-[22rem]"
            >
              <div className="w-48 h-48 mb-6 rounded-full overflow-hidden border-4 border-[#eaeeed]">
                <img
                  src={mentor.imageUrl}
                  alt={mentor.name}
                  className="object-cover object-top w-full h-full"
                />
              </div>

              <div className="text-center">
                <h3 className="text-xl font-bold text-[#2d4b41] mb-3">
                  {mentor.name}
                </h3>

                <p className="text-gray-600 text-sm">{mentor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Mentors;