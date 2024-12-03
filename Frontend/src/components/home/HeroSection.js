import React, { useState, useEffect } from 'react';
import { images } from '../../assets/landingPageCardImg'
import applestore from '../../assets/applestore.svg';
import playstore from '../../assets/playstore.svg';
import nha from '../../assets/nhalogo.svg';
import digital from '../../assets/digitalmissionlogo.svg';
import { Link } from 'react-router-dom';

const HeroSection = () => {

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative overflow-hidden  bg-slate-100	h-screen  ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center items-start space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold p-6 ">
            Welcome to <span className='text-transparent bg-gradient-to-r from-[#4b6af5] to-[#26cad9] bg-clip-text'>HAMS</span>
          </h1>
          <div className="flex space-x-4 ">
            <Link to="/usersignup" className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 my-5 rounded-md text-lg font-medium"> Book Your Appointment</Link>
            <Link to="/hospitalsignup" className="inline-block bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-3 my-5 rounded-md text-lg font-medium">  Register Your Hospital/Clinic</Link>

          </div>
          <p className="text-lg font-semibold py-4 text-center text-gray-800 md:text-xl lg:text-2xl bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">
            मेडिकल के लिए अपॉइंटमेंट और चर्चा के लिए भारत का नंबर 1 ऐप. . .
          </p>

          <div className="flex space-x-2">
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className=" px-3 py-3 rounded-md"
            >
              <img src={applestore} alt="applestore-logo" />
            </a>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-3 rounded-md"
            >
              <img src={playstore} alt="playstore-logo" />
            </a>
          </div>
        </div>

        {/* Right Side Image Card */}
        <div className="relative w-full h-80 lg:h-auto ">
          <div className="absolute inset-0 flex justify-center items-center">
            <img
              src={images[currentImage]}
              alt="img"
              className="object-cover w-full h-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>
      <div className="px-6 sm:px-6 lg:px-1 bg-gradient-to-r from-blue-500 to-teal-300 w-full flex items-center justify-between py-4">
        <div className="space-x-4 flex px-24">
          <img src={nha} alt="NationalHealthAuthority" />
          <img src={digital} alt="Digitle" />
        </div>
        <h3 className="text-2xl lg:text-3xl px-24 font-bold text-black ">
          भारत का  No. 1 डिजिटल मेडिकल सारथी
        </h3>
      </div>

    </div>
  );
};

export default HeroSection;
