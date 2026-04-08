import * as React from 'react';

const newsItems = [
  `Invincio Services conducted a LEAP (Leadership and Personality Growth Module) training for Class 12 cadets at Sainik School, Kapurthala, focusing on leadership, confidence, and goal-setting through activity-based learning. We thank the school for their warm welcome.`,
  `At Sainik School, East Siang, Invincio Services delivered a LEAP (Leadership and Personality Growth Module) session for Class 12 cadets, enhancing leadership, confidence, and communication skills. Grateful for the school's support.`,
  `Invincio Services will hold a LEAP (Leadership and Personality Growth Module) training for Class 11 cadets at Sainik School, East Siang in June 2025, focusing on leadership, communication, and confidence-building through experiential learning.`,
  `In June 2025, Invincio Services will conduct a LEAP (Leadership and Personality Growth Module) session at Sainik School, Kapurthala for Class 11 cadets, emphasizing leadership, discipline, and communication through activity-based learning.`,
  `Bulletin: Aadhaar authentication is being introduced for applicants — a major step towards secure and seamless identity verification. Apply now at: https://upsconline.nic.in Applications open for: CDS Exam-II, 2025, NDA & NA Exam-II, 2025 (Notification date: 28.05.2025) Read the official PIB release: https://lnkd.in/gjyjMj2B` ,
  `NDA/NA forms out, last date`,
  `NDA Merit list`,
];

const RecentUpdates: React.FC = () => {
  const displayItems = [...newsItems, ...newsItems]; // duplicate for smooth loop

  return (
    <div
      className="w-full bg-[#2d4b41] text-white py-4 overflow-hidden border-b border-[#718979]"
      style={{position: 'relative', zIndex: 30, minHeight: '3.5rem'}}
    >
      <div className="flex items-center">
        <ul
          className="flex space-x-8 auto-scroll"
          style={{animationDuration: `${displayItems.length * 7}s`}}
        >
          {displayItems.map((item, idx) => (
            <li
              key={idx}
              className="whitespace-nowrap text-lg px-2"
            >
              <span className="inline-block bg-white/80 text-[#2d4b41] rounded px-4 py-2 shadow-sm font-medium">
                {item}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <style>{`
        .auto-scroll {
          animation: scroll-x 50s linear infinite;
        }
        @keyframes scroll-x {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default RecentUpdates; 