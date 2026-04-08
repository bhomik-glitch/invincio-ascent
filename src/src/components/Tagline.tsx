// import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import hero1 from "../assets/projects/katurpula/katurpula5.webp";
import hero4 from "../assets/herosection/bgimage1.jpeg";
import image1 from "../assets/herosection/image 1.jpg";
import image2 from "../assets/herosection/image 2.jpg";
import image10 from "../assets/herosection/image 10.jpg";
import image6 from "../assets/herosection/image 6.jpg";
import RecentUpdates from './RecentUpdates';

const Tagline = () => {
  const images = [hero1, hero4, image1, image2, image10, image6];

  // const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   e.preventDefault();
  //   const href = e.currentTarget.getAttribute('href');
  //   if (href && href.startsWith('#')) {
  //     const element = document.querySelector(href);
  //     if (element) {
  //       element.scrollIntoView({ behavior: 'smooth' });
  //     }
  //   }
  // };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full w-full"
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <div 
                className="h-full w-full"
                style={{
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Content */}
      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="sr-only">
            Invincio: India's Premier SSB Interview Coaching Led by Military Veterans
          </h1>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-none">
            Forging Futures.<br />
            The Invincio Way.
          </h1>
          
          {/* <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <a href='#services' onClick={handleClick} className="px-8 py-4 bg-white text-[#2d4b41] font-semibold rounded-lg hover:bg-opacity-90 transition-all duration-300 text-lg">
              Explore Our Services
            </a>
            <a href='#contact' onClick={handleClick}  className="bg-[#2c4d42] hover:bg-[#718979] text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors duration-200">
              Talk to Us
            </a>
          </div> */}
        </div>
      </div>

      {/* Recent Updates Section */}
      <div className="relative z-20 w-full">
        <RecentUpdates />
      </div>
    </section>
  );
};

export default Tagline;