
import millitary from "../assets/whychooseinvincio/millitary.png";
import career from "../assets/whychooseinvincio/career.png";
import hybrid from "../assets/whychooseinvincio/hybrid.png";
import realworld from "../assets/whychooseinvincio/image.png";
import mentorship from "../assets/whychooseinvincio/image2.png";
import aiimage from "../assets/whychooseinvincio/ai-image.jpg"

const WhySection = () => {
  return (
    <section className="py-16 bg-white/90" id="whyChooseInvincio">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2d4b41] mb-4">
            WHY CHOOSE INVINCIO?
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d4b41] mb-4 sr-only">
            The Invincio Way: Military-Grade Training for Real-World Leadership
          </h2>
          <div className="w-24 h-1 bg-[#718979] mx-auto mb-4"></div>
        </div>

        <div className="flex gap-6 justify-center flex-wrap">
          <div className="bg-white max-w-md rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative h-48 ">
              <img
                src={millitary}
                alt={millitary}
                className="object-cover w-full h-full "
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2d4b41] mb-2">
                Military - Inspired Leadership Development:
              </h3>
              <p className="text-gray-600 mb-4 text-sm  ">
                Ensuring Discipline & Adaptability
              </p>
            </div>
          </div>
          {/* ###############3 */}
          <div className="bg-white max-w-md rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative h-48 ">
              <img
                src={hybrid}
                alt={hybrid}
                className="object-cover w-full h-full "
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2d4b41] mb-2">
                Hybrid Learning Approach:
              </h3>
              <p className="text-gray-600 mb-4 text-sm  ">
                A perfect mix of online & ofline assessments, yielding detailed
                personality profile.
              </p>
            </div>
          </div>
          {/* ############## */}
          <div className="bg-white max-w-md rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative h-48 ">
              <img
                src={career}
                alt={career}
                className="object-cover w-full h-full "
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2d4b41] mb-2">
                Not merely Career Counseling:
              </h3>
              <p className="text-gray-600 mb-4 text-sm  ">
                We provide Career planning & Career Mapping Platform as well
              </p>
            </div>
          </div>
          {/* ############### */}
          <div className="bg-white max-w-md rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative h-48 ">
              <img
                src={realworld}
                alt={realworld}
                className="object-cover w-full h-full object-right"
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2d4b41] mb-2">
                Real-World Readines:
              </h3>
              <p className="text-gray-600 mb-4 text-sm  ">
                Industry-relevant Experiential Training and simulations
              </p>
            </div>
          </div>
          {/* ########## */}
          <div className="bg-white max-w-md rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative h-48 ">
              <img
                src={mentorship}
                alt={mentorship}
                className="object-cover w-full h-full "
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2d4b41] mb-2">
                Continuous Mentorship and Alumni Network:
              </h3>
              <p className="text-gray-600 mb-4 text-sm  ">
                Enabling Valuable Connections and Learning from the Best
              </p>
            </div>
          </div>
           {/* ########## */}
           <div className="bg-white max-w-md rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:transform hover:scale-105">
            <div className="relative h-48 ">
              <img
                src={aiimage}
                alt={aiimage}
                className="object-cover w-full h-full "
              />
            </div>

            <div className="p-6">
              <h3 className="text-xl font-bold text-[#2d4b41] mb-2">
              AI Psychometric & Military-Inspired Candidate Evaluation
              </h3>
              <p className="text-gray-600 mb-4 text-sm  ">
              A unique blend of AI-driven psychometric assessments and military-style training to provide a holistic understanding of candidates' potential.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhySection;
