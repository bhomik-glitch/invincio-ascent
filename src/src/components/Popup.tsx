import { useState } from 'react'
import imageSrc from "../assets/New Collage.jpg"

const Popup = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closePopup = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[500]">
      <div className="bg-white rounded-lg p-4 max-w-[72%] md:max-w-[560px] lg:max-w-[1000px] relative">
        <button
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="mt-4">
          <img
            src={imageSrc}
            alt="YOUR SUCCESS IS OUR MISSION - Invincio Success Stories"
            className="w-full h-auto rounded-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Popup