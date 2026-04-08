import React from 'react';
import WisdomWell from './WisdomWell';
import Recomendes from './Recomendes';

const WisdomWellSection: React.FC = () => {
  return (
    <section className="py-16 bg-white/90">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left side - WisdomWell */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d4b41] mb-8 text-center">
              Wisdom Well
            </h2>
            <div className="w-24 h-1 bg-[#718979] mx-auto mb-12"></div>
            <div className="h-[700px] overflow-y-auto wisdom-well-scroll">
              <div className="space-y-6 px-4">
                <WisdomWell />
              </div>
            </div>
          </div>

          {/* Right side - Recomendes */}
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-bold text-[#2d4b41] mb-8 text-center">
              Echoes of transformation
            </h2>
            <div className="w-24 h-1 bg-[#718979] mx-auto mb-12"></div>
            <div className="h-[700px] overflow-y-auto wisdom-well-scroll">
              <div className="space-y-8 px-4">
                <Recomendes />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WisdomWellSection; 