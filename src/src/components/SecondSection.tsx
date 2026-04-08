import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import leaderimg1 from "../assets/leader1.jpeg";
import leaderimg2 from "../assets/leader2.jpeg";
import leaderimg3 from "../assets/lol.jpg";
import leaderimg4 from "../assets/leader4.jpeg";
import leaderimg5 from "../assets/leader5.jpeg";

const SecondSection = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-[#eaeeed]/90">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={containerVariants}
          className="flex flex-col items-center text-center"
        >
          {/* Image grid that's responsive */}
          <motion.div 
            variants={itemVariants} 
            className="mb-12 w-full"
          >
            {/* Mobile layout (single column with center image first) */}
            <div className="flex flex-col items-center gap-4 md:hidden">
              <div>
                <img
                  src={leaderimg4}
                  alt="Lt Col Ankur Sabharwal"
                  className="w-full max-w-sm rounded-lg object-cover shadow-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <img
                    src={leaderimg1}
                    alt="Leader 1"
                    className="w-full h-40 rounded-lg object-cover shadow-lg"
                  />
                  <p className="text-lg font-medium text-[#2d4b41] leading-relaxed">
                    MISSION MARKET DOMINANCE
                  </p>
                </div>
                <div>
                  <img
                    src={leaderimg2}
                    alt="Leader 2"
                    className="w-full h-40 rounded-lg object-cover shadow-lg"
                  />
                  <p className="text-lg font-medium text-[#2d4b41] leading-relaxed">
                    TRAINING NEEDS ASSESSMENT
                  </p>
                </div>
                <div>
                  <img
                    src={leaderimg3}
                    alt="Leader 3"
                    className="w-full h-40 rounded-lg object-cover shadow-lg object-80"
                  />
                  <p className="text-lg font-medium text-[#2d4b41] leading-relaxed">
                    TRAINING THE TRAINERS
                  </p>
                </div>
                <div>
                  <img
                    src={leaderimg5}
                    alt="Leader 4"
                    className="w-full h-40 rounded-lg object-cover shadow-lg"
                  />
                  <p className="text-lg font-medium text-[#2d4b41] leading-relaxed">
                    GLOBAL CUSTOMER EXPERIENCE MEET
                  </p>
                </div>
              </div>
            </div>

            {/* Tablet layout (central image with 2+2 layout) */}
            <div className="hidden md:flex lg:hidden flex-col items-center gap-4">
              <div className="flex gap-3 mb-3">
                <div>
                  <img
                    src={leaderimg1}
                    alt="Leader 1"
                    className="w-48 h-48 rounded-lg object-cover shadow-lg"
                  />
                  <p className="text-lg font-medium text-[#2d4b41] leading-relaxed">
                    MISSION MARKET DOMINANCE
                  </p>
                </div>
                <div>
                  <img
                    src={leaderimg2}
                    alt="Leader 2"
                    className="w-48 h-48 rounded-lg object-cover shadow-lg"
                  />
                  <p className="text-lg font-medium text-[#2d4b41] leading-relaxed">
                    TRAINING NEEDS ASSESSMENT
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={leaderimg4}
                  alt="Lt Col Ankur Sabharwal"
                  className="w-full max-w-md rounded-lg object-cover shadow-lg"
                />
              </div>
              <div className="flex gap-3 mt-3">
                <div>
                  <img
                    src={leaderimg3}
                    alt="Leader 3"
                    className="w-48 h-48 rounded-lg object-cover shadow-lg object-80"
                  />
                  <p className="text-lg font-medium text-[#2d4b41] leading-relaxed">
                    TRAINING THE TRAINERS
                  </p>
                </div>
                <div>
                  <img
                    src={leaderimg5}
                    alt="Leader 4"
                    className="w-48 h-48 rounded-lg object-cover shadow-lg"
                  />
                  <p className="text-lg font-medium text-[#2d4b41] leading-relaxed">
                    GLOBAL CUSTOMER EXPERIENCE MEET
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop layout (horizontal with center image larger) */}
            <div className="hidden lg:flex items-center justify-center gap-4">
              <div className="flex flex-col items-center">
                <img
                  src={leaderimg1}
                  alt="Leader 1"
                  className="w-60 h-60 rounded-lg object-cover shadow-lg"
                />
                <p className="text-lg font-medium text-[#2d4b41] leading-relaxed mt-2">
                  MISSION MARKET DOMINANCE
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={leaderimg2}
                  alt="Leader 2"
                  className="w-60 h-60 rounded-lg object-cover shadow-lg"
                />
                <p className="text-lg font-medium text-[#2d4b41] leading-relaxed mt-2">
                  TRAINING NEEDS ASSESSMENT
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={leaderimg4}
                  alt="Lt Col Ankur Sabharwal"
                  className="w-72 rounded-lg object-cover shadow-lg"
                />
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={leaderimg3}
                  alt="Leader 3"
                  className="w-60 h-60 rounded-lg object-cover shadow-lg object-80"
                />
                <p className="text-lg font-medium text-[#2d4b41] leading-relaxed mt-2">
                  TRAINING THE TRAINERS
                </p>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={leaderimg5}
                  alt="Leader 4"
                  className="w-60 h-60 rounded-lg object-cover shadow-lg"
                />
                <p className="text-lg font-medium text-[#2d4b41] leading-relaxed mt-2">
                  GLOBAL CUSTOMER EXPERIENCE MEET
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2d4b41] mb-6 sr-only">
              Beyond Preparation: Comprehensive SSB & Leadership Training | Invincio Services
            </h2>
            <blockquote className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#2d4b41] mb-4 leading-tight">
              "When preparation meets purpose, transformation happens."
            </blockquote>

            <p className="text-xl md:text-2xl lg:text-2xl font-medium text-[#2d4b41] mb-8 italic leading-relaxed">
              "I've seen transformation in both soldiers and CEOs. It's the same engine and drivers: clarity, conviction, and courage."
            </p>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              — Lt Col Ankur Sabharwal, Military Veteran <br />
              CEO | Military Psychologist | Ex-VP Philips
            </p>

            <p className="text-xl md:text-2xl lg:text-3xl font-semibold text-gray-700 leading-relaxed">
              At Invincio Services, we don't just train. We mold character, unlock potential, and instill the grit to lead from the front—be it in defence, corporate corridors, or community spaces.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default SecondSection;