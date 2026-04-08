import React from 'react';

// Import photos
import AtharvPhoto from "../assets/client_photo/Atharv.jpg";
import RudranshPhoto from "../assets/client_photo/Rudransh.jpg";
import AdityaPhoto from "../assets/client_photo/Aditya.jpg";
import SankalpPhoto from "../assets/client_photo/Sankalp.jpg";
import VivekSharmaPhoto from "../assets/client_photo/Vivek Sharma .jpg";
import SRHariKumarPhoto from "../assets/client_photo/S R Hari Kumar.jpg";
import PrashantUpadhyayPhoto from "../assets/client_photo/Prashant Upadhyay.jpg";
import SanyogTiwariPhoto from "../assets/client_photo/Sanyog Tiwari.jpg";
import AkashSwamyPhoto from "../assets/client_photo/Akash Swamy .jpg";
import GyanendraPhoto from "../assets/client_photo/Gyanendra.jpg";
import AkshatMishraPhoto from "../assets/client_photo/Akshat mishra.jpg";
import ItanagarGroupPhoto from "../assets/client_photo/75 out of 87 mentored at Success point at Itanagar.jpg";

// Gallery data
const galleryData = [
  {
    name: "VIVEK SHARMA",
    text: "SSC Navy ATC Entry, 16th Attempt",
    photo: VivekSharmaPhoto
  },
  {
    name: "S R HARI KUMAR",
    text: "SSC TECH, 16th attempt",
    photo: SRHariKumarPhoto
  },
  {
    name: "PRASHANT UPADHYAY",
    text: "Batch no- RNDA-46843, Entry- NDA155",
    photo: PrashantUpadhyayPhoto
  },
  {
    name: "SANYOG TIWARI",
    text: "SSC TECH Entry, 10th attempt",
    photo: SanyogTiwariPhoto
  },
  {
    name: "AKASH SWAMY",
    text: "CDS OTA Entry, 7th attempt",
    photo: AkashSwamyPhoto
  },
  {
    name: "GYANENDRA YADAV",
    text: "From 4 afsb Varanasi, Batch no. VNDA(M)/729, Chest no. 5",
    photo: GyanendraPhoto
  },
  {
    name: "AKSHAT MISHRA",
    text: "B-NDA/62806, Batch no. VNDA(M)/729, Chest no. 5",
    photo: AkshatMishraPhoto
  },
  {
    name: "ATHARV",
    text: "Atharv, batch- DSTL 39818, SSB-19 SSB PRAYAGRAJ, Chest No. 7",
    photo: AtharvPhoto
  },
  {
    name: "RUDRANSH",
    text: "Rudransh Kishore, Batch- KNDA 40815, SSB-20 SSB, Chest No.- 02",
    photo: RudranshPhoto
  },
  {
    name: "ADITYA",
    text: " Aditya Gupta, batch- KNDA 40816, SSB - 20 SSB, Chest No.- 09",
    photo: AdityaPhoto
  },
  {
    name: "SANKALP",
    text: "Sankalp Jaiswal , batch- PNDA 72255, SSB-21 SSB, Chest No.- 03",
    photo: SankalpPhoto
  }
];

const SuccessStories: React.FC = () => {
  return (
    <section className="py-16 bg-[#eaeeed]/90">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-[#2d4b41] mb-8 text-center">
          Our Success Stories
        </h2>
        <div className="w-24 h-1 bg-[#718979] mx-auto mb-12"></div>
        
        {/* Special Highlight - Itanagar Group Success */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="p-6">
              <div className="w-full h-64 mb-6">
                <img
                  src={ItanagarGroupPhoto}
                  alt="75 out of 87 mentored at Success point at Itanagar"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <h3 className="text-2xl font-bold text-[#2d4b41] mb-3 text-center">
                ITANAGAR SUCCESS STORY
              </h3>
              <p className="text-gray-600 text-lg text-center">
                Proud moment 75 out of 87 selected in final interviews
              </p>
            </div>
          </div>
        </div>
        
        {/* Individual Success Stories */}
        <h3 className="text-2xl md:text-3xl font-bold text-[#2d4b41] mb-8 text-center">
          Individual Success Stories
        </h3>
        <div className="w-16 h-1 bg-[#718979] mx-auto mb-8"></div>
        
        {/* Scrolling container */}
        <div className="overflow-hidden">
          <div className="flex animate-[marquee_20s_linear_infinite] hover:pause">
            {/* First set of cards */}
            {galleryData.map((item, index) => (
              <div 
                key={`first-${index}`}
                className="flex-none w-96 bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl mx-4"
              >
                <div className="p-6">
                  {/* Photo section */}
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#eaeeed] mb-6">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#2d4b41] mb-2 text-center">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {galleryData.map((item, index) => (
              <div 
                key={`second-${index}`}
                className="flex-none w-96 bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl mx-4"
              >
                <div className="p-6">
                  {/* Photo section */}
                  <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-[#eaeeed] mb-6">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#2d4b41] mb-2 text-center">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-sm text-center mb-4">
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories; 