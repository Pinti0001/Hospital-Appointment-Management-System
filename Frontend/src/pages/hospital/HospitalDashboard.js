import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { images } from "../../assets/landingPageCardImg"; // Ensure images is correctly exported
import applestore from "../../assets/applestore.svg";
import playstore from "../../assets/playstore.svg";
import nha from "../../assets/nhalogo.svg";
import digital from "../../assets/digitalmissionlogo.svg";
import FeedbackList from "./FeedbackList";
import hslogo from '../../assets/aadhar.png'

export default function HospitalDashboard() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  return (
    <div className="relative bg-slate-100 min-h-screen md:ml-64">
      {/* Navbar */}
      <nav className="bg-gray-200 p-4 fixed top-0 w-full z-20  shadow-md">
        <div className="flex items-center justify-between px-9 sm:px-10">
          <div className="flex items-center pl-12 space-x-10">
            <img src={hslogo} alt="Hospital Logo" className="h-12" />
            <span className="text-4xl font-bold">Hospital Name</span>
          </div>
        </div>
      </nav>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 pt-32 pb-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side Content */}
        <div className="flex flex-col justify-center items-start space-y-6">
          <h1 className="text-4xl sm:text-5xl font-extrabold p-6">
            Welcome to{" "}
            <span className="text-transparent bg-gradient-to-r from-[#4b6af5] to-[#26cad9] bg-clip-text">
              HAMS
            </span>
          </h1>
          <div className="flex space-x-4 mx-10">
            <Link
              to="/schedule"
              className="inline-block bg-green-500 hover:bg-green-600 text-white px-6 py-3 my-5 rounded-md text-lg font-medium"
            >
              Today's Schedule
            </Link>
            <Link
              to="/add-doctor"
              className="inline-block bg-cyan-400 hover:bg-cyan-500 text-white px-6 py-3 my-5 rounded-md text-lg font-medium"
            >
              Add / Manage Staffs
            </Link>
          </div>
          <p className="text-lg font-semibold py-4 text-center text-gray-800 md:text-xl lg:text-2xl bg-gradient-to-r from-blue-700 to-teal-600 bg-clip-text text-transparent">
            मेडिकल के लिए अपॉइंटमेंट और चर्चा के लिए भारत का नंबर 1 ऐप...
          </p>
          <div className="flex space-x-2">
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-3 rounded-md"
            >
              <img src={applestore} alt="Apple Store Logo" />
            </a>
            <a
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-3 rounded-md"
            >
              <img src={playstore} alt="Play Store Logo" />
            </a>
          </div>
        </div>

        {/* Right Side Image Card */}
        <div className="relative w-full h-80 lg:h-auto mt-6 lg:mt-0">
          <div className="absolute inset-0 flex justify-center items-center">
            <img
              src={images[currentImage]}
              alt="Hospital"
              className="object-cover w-full h-full rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <div className="px-6 sm:px-6 lg:px-1 bg-gradient-to-r from-blue-500 to-teal-300 w-full flex items-center justify-between py-4">
        <div className="space-x-4 flex px-20">
          <img src={nha} alt="National Health Authority" />
          <img src={digital} alt="Digital India Mission" />
        </div>
        <h3 className="text-2xl lg:text-3xl px-24 font-bold">
          आप और हम <br />
          भारत को बनाये रोग मुक्त
        </h3>
      </div>
      <FeedbackList />
    </div>
  );
}
