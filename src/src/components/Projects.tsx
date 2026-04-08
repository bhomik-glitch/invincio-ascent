import React from 'react'
import pune1 from "../assets/projects/pune/punr-project-2.jpg"
import pune2 from "../assets/projects/pune/pune-project-3.jpg"
import pune3 from "../assets/projects/pune/pune-project-4.jpg"
import punjab2 from "../assets/projects/punjab/img-2.jpg"
import punjab3 from "../assets/projects/punjab/img-3.jpg"
import punjab4 from "../assets/projects/punjab/img-4.jpg"
import yodha1 from "../assets/projects/yodha/img-1.jpg"
import yodha2 from "../assets/projects/yodha/img-2.jpg"
import yodha3 from "../assets/projects/yodha/img-3.jpg"
import yodha4 from "../assets/projects/yodha/img-4.jpg"
import haryana1 from "../assets/projects/harayana/img-1.png"
import chattisgarh1 from "../assets/projects/chattisgarh/img1.jpg"
import chattisgarh2 from "../assets/projects/chattisgarh/img2.jpg"
import chattisgarh3 from "../assets/projects/chattisgarh/img3.jpg"
// import ambala from "../assets/projects/ambala/image.png"
// import ambikapur from "../assets/projects/ambikapur/image.png"
// import katurpula1 from "../assets/projects/katurpula/katurpula1.webp"
// import katurpula2 from "../assets/projects/katurpula/katurpula2.webp"
// import katurpula3 from "../assets/projects/katurpula/katurpula3.webp"
// import katurpula4 from "../assets/projects/katurpula/katurpula4.webp"
// import katurpula5 from "../assets/projects/katurpula/katurpula5.webp"
import eastSiang1 from "../assets/Sainik_School_East_Siang/img1.jpg"
import eastSiang2 from "../assets/Sainik_School_East_Siang/img2.jpg"
import eastSiang3 from "../assets/Sainik_School_East_Siang/img3.jpg"
import eastSiang4 from "../assets/Sainik_School_East_Siang/img4.jpg"
import kapurthala11_1 from "../assets/projects/class-11th-kapurthala/img-1.jpg"
import kapurthala11_2 from "../assets/projects/class-11th-kapurthala/img-2.jpg"
import kapurthala11_3 from "../assets/projects/class-11th-kapurthala/img-3.jpg"
import kapurthala11_4 from "../assets/projects/class-11th-kapurthala/img-4.jpg"
import ambikapur2 from "../assets/projects/infra-development/img-2.jpg"
import ambikapur3 from "../assets/projects/infra-development/img-3.jpg"
import ambikapur4 from "../assets/projects/infra-development/img-4.jpg"
import trainers1 from "../assets/projects/training-the-trainers/img-1.jpg"
import trainers2 from "../assets/projects/training-the-trainers/img-2.jpg"
import trainers3 from "../assets/projects/training-the-trainers/img-3.jpg"
import trainers4 from "../assets/projects/training-the-trainers/img-4.jpg"
import online1 from "../assets/projects/online/img-1.jpg"
import online2 from "../assets/projects/online/img-2.jpg"
import online3 from "../assets/projects/online/img-3.jpg"
import writtenOnline1 from "../assets/written online/Screenshot 2025-08-13 223102.png"
import writtenOnline2 from "../assets/written online/Screenshot 2025-08-13 223137.png"
import writtenOnline3 from "../assets/written online/Screenshot 2025-08-13 223202.png"
import ssbEasy from "../assets/projects/ssb-easy/img-1.jpg"
import holdingHands from "../assets/projects/holding-hands/img-1.jpg"
import consultancy from "../assets/projects/consultancy/img-1.jpg"
import devender from "../assets/projects/devender/devender.jpg"
import money from "../assets/projects/money/img-1.jpg"
import debriefing from "../assets/projects/debriefing/img-1.jpg"
// Import Itanagar images
import itanagar1 from "../assets/Itanagar images/2.jpg"
import itanagar2 from "../assets/Itanagar images/3.jpg"
import itanagar3 from "../assets/Itanagar images/4.png"
import itanagar4 from "../assets/Itanagar images/10.png"
import itanagar5 from "../assets/client_photo/75 out of 87 mentored at Success point at Itanagar.jpg"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

interface Project {
  title: string;
  description: string;
  images: string[];
  link?: string;
}

const Projects: React.FC<{ id?: string }> = ({ id }) => {
  const leapProjects: Project[] = [
    {
      title: "Mentoring the APPSCCE-2024 Aspirants",
      description: "In the heart of Itanagar, our mock interview sessions for aspiring candidates fostered confidence and clarity, paving their way to success. Surrounded by the city's vibrancy and cultural richness, the experience blended professional growth with the spirit of Arunachal Pradesh.",
      images: [itanagar5, itanagar1, itanagar2, itanagar3, itanagar4]
    },
    {
      title: "Sainik School Kapurthala Takes the LEAP Again! | Class 11 Students Step into Clarity & Confidence!!",
      description: "LEAP isn't just another leadership program, it's a curated experience, built from armed forces-inspired practices and psychological mentoring",
      images: [kapurthala11_1, kapurthala11_2, kapurthala11_3, kapurthala11_4]
    },
    {
      title: "From naivety to awareness, from self-doubt to belief: Class 12 at Sainik School East Siang took the LEAP",
      description: "Successfully completed our inaugural project by delivering expert-led training sessions and actionable strategic guidance to the future defenders of our nation at Sainik School, East Siang.",
      images: [eastSiang1, eastSiang2, eastSiang3, eastSiang4]
    },
    {
      title: "Mentoring the Mentors at SS Ambikapur: learning never ends!!",
      description: "Empowering educators with advanced training methodologies and leadership skills to better guide the next generation of leaders",
      images: [trainers1, trainers2, trainers3, trainers4]
    },
    {
      title: "YODDHAA Defence Academy, Pune",
      description: "Successfully executed our first project, delivering expert-led training and strategic insights to aspiring defense candidates.",
      images: [pune1, pune2, pune3]
    }
  ]

  const infraProjects: Project[] = [
    {
      title: "Sainik School Ambikapur",
      description: "Hallmark personality development and infrastructure creation project at Sainik School, catapulting the training of aspirants to greater heights",
      images: [ambikapur2, ambikapur3, ambikapur4]
    },
    {
      title: "Sainik School Kapurthala, Punjab",
      description: "Training the next generation with precision! Custom-built structures for cadets to experience authentic realistic scenarios and prepare for life's challenges.",
      images: [punjab2, punjab3, punjab4]
    },
    {
      title: "YODDHAA Defence Academy, Pune",
      description: "With SSB centric outdoor tasks and psychological testing setups, this blends Invincio's pedagogy with region-specific mentoring, creating leaders with purpose.",
      images: [yodha1, yodha2, yodha3, yodha4]
    },
    {
      title: "SSB GUIDE DEFENCE ACADEMY, Ambala, Haryana",
      description: "Where clarity meets challenge! Equipped with SSB-standard obstacles, individual task setups, and personality assessment zones, this flagship centre is designed for immersive, all-round preparation.",
      images: [haryana1]
    },
    {
      title: "SAINIK SCHOOL AMBIKAPUR, CHATTISGARH",
      description: "A full-scale outdoor obstacle course and GTO training area constructed in challenging terrain to help cadets train with realism and purpose.",
      images: [chattisgarh1, chattisgarh2, chattisgarh3]
    }
  ]

  return (
    <section id={id} className="py-32 bg-[#eaeeed]/90">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#2d4b41] mb-4">
            Missions Accomplished
          </h2>
          <div className="w-24 h-1 bg-[#718979] mx-auto mb-4"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto items-start relative">
          {/* LEAP Module Section */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#2d4b41] text-center">
              Leadership Development and Personality Growth Module
            </h3>
            <div className="flex flex-col gap-8">
              {leapProjects.map((project, index) => (
                <div key={index} className="flex flex-col gap-8 items-center min-h-[500px]">
                  {/* Image Section */}
                  <div className="w-full relative">
                    {project.images.length > 1 ? (
                      <>
                        <Swiper
                          modules={[Autoplay, Pagination, Navigation]}
                          pagination={{ clickable: true }}
                          navigation={{
                            nextEl: `.swiper-button-next-leap-${index}`,
                            prevEl: `.swiper-button-prev-leap-${index}`,
                          }}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                          className="rounded-lg shadow-lg"
                        >
                        {project.images.map((image, imgIndex) => (
                          <SwiperSlide key={imgIndex}>
                            <img
                              src={image}
                              alt={`${project.title} - Image ${imgIndex + 1}`}
                              className="w-full h-[300px] object-cover rounded-lg"
                            />
                          </SwiperSlide>
                        ))}
                        </Swiper>
                        {/* Custom Navigation Buttons */}
                        <div className={`swiper-button-prev-leap-${index} absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer transition-colors`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </div>
                        <div className={`swiper-button-next-leap-${index} absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer transition-colors`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-[300px] object-cover rounded-lg shadow-lg"
                      />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="w-full">
                                                                                   <div className={`bg-white p-6 rounded-lg shadow-md ${project.title === "Mentoring the APPSCCE-2024 Aspirants" ? "pb-[34px]" : ""} ${project.title === "Sainik School Kapurthala Takes the LEAP Again! | Class 11 Students Step into Clarity & Confidence!!" ? "pb-[33px]" : ""} ${project.title === "Mentoring the Mentors at SS Ambikapur: learning never ends!!" ? "pb-[45px]" : ""} ${project.title === "Sainik School Ambikapur" ? "pb-[113px]" : ""} ${project.title === "Sainik School Kapurthala, Punjab" ? "pb-[121px]" : ""} ${project.title === "YODDHAA Defence Academy, Pune" ? "pb-[83px]" : ""}`}>
                      <h3 className="text-2xl font-semibold text-[#2d4b41] mb-4">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {project.description}
                      </p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2d4b41] hover:text-[#1a2f27] font-medium mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Infra Development Section */}
          <div className="flex flex-col gap-8">
            <h3 className="text-2xl md:text-3xl font-bold text-[#2d4b41] text-center">
              Infra<br />Development
            </h3>
            <div className="flex flex-col gap-8">
              {infraProjects.map((project, index) => (
                <div key={index} className="w-full flex flex-col gap-8 items-center min-h-[500px]">
                  {/* Image Section */}
                  <div className="w-full relative">
                    {project.images.length > 1 ? (
                      <>
                        <Swiper
                          modules={[Autoplay, Pagination, Navigation]}
                          pagination={{ clickable: true }}
                          navigation={{
                            nextEl: `.swiper-button-next-infra-${index}`,
                            prevEl: `.swiper-button-prev-infra-${index}`,
                          }}
                          autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                          }}
                          className="rounded-lg shadow-lg"
                        >
                        {project.images.map((image, imgIndex) => (
                          <SwiperSlide key={imgIndex}>
                            <img
                              src={image}
                              alt={`${project.title} - Image ${imgIndex + 1}`}
                              className="w-full h-[300px] object-cover rounded-lg"
                            />
                          </SwiperSlide>
                        ))}
                        </Swiper>
                        {/* Custom Navigation Buttons */}
                        <div className={`swiper-button-prev-infra-${index} absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer transition-colors`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </div>
                        <div className={`swiper-button-next-infra-${index} absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer transition-colors`}>
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </>
                    ) : (
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-[300px] object-cover rounded-lg shadow-lg"
                      />
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="w-full">
                    <div className={`bg-white p-6 rounded-lg shadow-md ${project.title === "Sainik School Ambikapur" ? "pb-[113px]" : ""} ${project.title === "Sainik School Kapurthala, Punjab" ? "pb-[93px]" : ""} ${project.title === "YODDHAA Defence Academy, Pune" ? "pb-[85px]" : ""}`}>
                      <h3 className="text-2xl font-semibold text-[#2d4b41] mb-4">
                        {project.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {project.description}
                      </p>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#2d4b41] hover:text-[#1a2f27] font-medium mt-4 inline-block"
                        >
                          Learn More →
                        </a>
                      )}
                    </div>
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
                 </div>



         {/* Bytes to Breakthroughs Section */}
        <div className="text-center mt-32">
          <h3 className="text-2xl md:text-3xl font-bold text-[#2d4b41] mb-8">
            LEAP delivery in digital mode - Distances no bar!!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-7xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Swiper
                  modules={[Pagination, Autoplay, Navigation]}
                  pagination={{ clickable: true }}
                  navigation={{
                    nextEl: '.swiper-button-next-written',
                    prevEl: '.swiper-button-prev-written',
                  }}
                  autoplay={{ delay: 3000 }}
                  className="h-full"
                >
                  <SwiperSlide>
                    <img
                      src={writtenOnline1}
                      alt="Online Written Class - Image 1"
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={writtenOnline2}
                      alt="Online Written Class - Image 2"
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={writtenOnline3}
                      alt="Online Written Class - Image 3"
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                </Swiper>
                {/* Custom Navigation Buttons */}
                <div className="swiper-button-prev-written absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="swiper-button-next-written absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#2d4b41]">Online Written Class</h3>
                <p className="text-gray-600">Interactive online written classes to build vocabulary, enhance grammar, and strengthen language skills — all from the comfort of home.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <Swiper
                  modules={[Pagination, Autoplay, Navigation]}
                  pagination={{ clickable: true }}
                  navigation={{
                    nextEl: '.swiper-button-next-leap-online',
                    prevEl: '.swiper-button-prev-leap-online',
                  }}
                  autoplay={{ delay: 3000 }}
                  className="h-full"
                >
                  <SwiperSlide>
                    <img
                      src={online1}
                      alt="Online LEAP delivery - Image 1"
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={online2}
                      alt="Online LEAP delivery - Image 2"
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                  <SwiperSlide>
                    <img
                      src={online3}
                      alt="Online LEAP delivery - Image 3"
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                </Swiper>
                {/* Custom Navigation Buttons */}
                <div className="swiper-button-prev-leap-online absolute left-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="swiper-button-next-leap-online absolute right-2 top-1/2 transform -translate-y-1/2 z-10 w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#2d4b41]">LEAP delivery in digital mode - Distances no bar!!</h3>
                <p className="text-gray-600">Breaking geographical barriers through innovative online delivery of the LEAP program, ensuring quality training reaches every corner of the nation.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={ssbEasy}
                  alt="SSB is Easy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#2d4b41]">SSB is Easy! Yes, Very Easy....</h3>
                <p className="text-gray-600">From confusion to confidence—our online sessions turn SSB prep into a cakewalk!</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={consultancy}
                  alt="Image Consultancy"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#2d4b41]">Image Consultancy - I must present my originality!</h3>
                <p className="text-gray-600">Empowering individuals to present their authentic selves through professional image consulting and personal branding.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={devender}
                  alt="Free Sessions for our Future Leader's Group Members"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#2d4b41]">Free Sessions for our Future Leader's Group Members</h3>
                <p className="text-gray-600">Exclusive complimentary training sessions designed to nurture and develop the next generation of leaders.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={holdingHands}
                  alt="Hand-holding till you succeed"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#2d4b41]">Hand-holding till you succeed!</h3>
                <p className="text-gray-600">Every step, every doubt, every drill—guided personally till success salutes you.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={money}
                  alt="Finance! who says we don't understand! We have Conquered it"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#2d4b41]">Finance! who says we don't understand! We have Conquered it</h3>
                <p className="text-gray-600">Mastering financial literacy and management to empower our future leaders with essential life skills.</p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="relative h-48">
                <img
                  src={debriefing}
                  alt="Debriefing the Parents"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-[#2d4b41]">Debriefing the Parents</h3>
                <p className="text-gray-600">Keeping parents informed and involved in their child's development journey through regular updates and guidance sessions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects