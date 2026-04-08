import React from 'react';
import { FaChartLine, FaUserTie, FaBalanceScale, FaRoad, FaChartBar, FaLaptop, FaBriefcase, FaTrophy } from 'react-icons/fa';
import sunny from "../assets/mentor/sunny.png"


interface DifferentiatorData {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const differentiatorData: DifferentiatorData[] = [
  {
    title: "HOLISTIC PERSONALITY ANALYSIS",
    description: "Combines SSB techniques and psychometric tools for a complete evaluation.",
    icon: <FaUserTie className="w-12 h-12" />
  },
  {
    title: "DATA-DRIVEN INDIVIDUAL DEVELOPMENT PLANS",
    description: "Customised training with progress tracking.",
    icon: <FaChartLine className="w-12 h-12" />
  },
  {
    title: "OBJECTIVE AND BIAS-FREE ASSESSMENTS",
    description: "Ensures fair and accurate evaluations.",
    icon: <FaBalanceScale className="w-12 h-12" />
  },
  {
    title: "PREDICTIVE CAREER MAPPING",
    description: "Identifies the best career path based on strengths.",
    icon: <FaRoad className="w-12 h-12" />
  },
  {
    title: "BEHAVIORAL PATTERN RECOGNITION",
    description: "Tracks trends and adapts mentoring accordingly.",
    icon: <FaChartBar className="w-12 h-12" />
  },
  {
    title: "HYBRID LEARNING MODEL",
    description: "Integrates real-world tasks with interactive assessments.",
    icon: <FaLaptop className="w-12 h-12" />
  },
  {
    title: "CORPORATE & DEFENSE READINESS",
    description: "Prepares candidates for leadership roles.",
    icon: <FaBriefcase className="w-12 h-12" />
  },
  {
    title: "INDUSTRY BENCHMARKING",
    description: "Compares performance with industry benchmarks.",
    icon: <FaTrophy className="w-12 h-12" />
  }
];

const OurDifferentiators: React.FC = () => {
  return (
    <section className="py-16 bg-white/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d4b41] mb-4">
            OUR DIFFERENTIATORS
          </h2>
          <div className="w-24 h-1 bg-[#718979] mx-auto mb-4"></div>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Success today requires personality, leadership, and adaptability. Our academy blends SSB profiling with psychometric assessments for holistic development, personalized growth, and career readiness.
          </p>
        </div>

        <div className="text-center mb-12 mt-20">
          <h2 className="text-3xl font-bold text-[#2d4b41] mb-4">
          Financial Literacy Training
          </h2>
        </div>
        <div className="max-w-3xl flex justify-center items-center mx-auto gap-5 mb-5">
          <div className="w-1/2 flex justify-center flex-col items-center gap-2">
          <div
          
              className={`bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl flex flex-row items-center px-6 py-8 w-full md:w-[35rem] gap-8`}
            >
              <div
                className='w-64 h-64 rounded-lg overflow-hidden'
              >
                <img
                  src={sunny}
                  alt={sunny}
                  className="object-cover object-top w-full h-full"
                />
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-bold text-[#2d4b41] mb-3">
                CA Sunny Sabharwal
                </h3>


                <p className="text-gray-600 text-sm">
                Chartered Accountant and Financial Literacy Trainer with 18 years of experience in banking, risk management, and financial consulting. Conducted international training programs across Asia, including the Philippines and Nepal. Specializes in bridging theory with real-world applications through interactive learning and case studies. Passionate about equipping professionals with financial acumen for better decision-making and long-term success.
                </p>
              </div>
            </div>
            </div>
        </div>
        <div className="max-w-5xl mx-auto text-center mt-20 mb-20">
          <h2 className="text-3xl font-bold text-[#2d4b41] text-center">
          Why Financial Literacy Matters in Schools?
          </h2>
          
          <div className="mt-8 text-left">
            <p className="text-gray-600 text-lg mb-6">
              India's education system neglects financial literacy, leaving students unprepared for real-world money management.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#eaeeed] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#2d4b41] mb-3">High Debt</h3>
                <p className="text-gray-600">Easy credit leads to repayment struggles</p>
              </div>
              <div className="bg-[#eaeeed] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#2d4b41] mb-3">Poor Investments</h3>
                <p className="text-gray-600">Lack of knowledge causes financial losses</p>
              </div>
              <div className="bg-[#eaeeed] p-6 rounded-lg">
                <h3 className="text-xl font-bold text-[#2d4b41] mb-3">Financial Stress</h3>
                <p className="text-gray-600">Many live paycheck to paycheck, lack savings</p>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold text-[#2d4b41] mb-6">The Solution</h3>
              <p className="text-gray-600 text-lg mb-6">Schools must teach:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-xl">✔</span>
                  <span className="text-gray-600">Budgeting & Savings</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-xl">✔</span>
                  <span className="text-gray-600">Debt & Credit Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-xl">✔</span>
                  <span className="text-gray-600">Investment Basics</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600 text-xl">✔</span>
                  <span className="text-gray-600">Taxation & Insurance</span>
                </div>
              </div>
            </div>

            <p className="text-gray-600 text-lg mt-8">
              Countries like the U.S. and Singapore have done it—India must, too, for a financially secure future.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {differentiatorData.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105 p-6"
            >
              <div className="flex justify-center mb-4 text-[#2d4b41]">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-[#2d4b41] mb-2 text-center">{item.title}</h3>
              <p className="text-gray-600 text-sm text-center">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurDifferentiators;