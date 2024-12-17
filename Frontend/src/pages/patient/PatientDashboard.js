import React, { useEffect, useState } from "react";
import { MdLogin } from "react-icons/md";
import { FaCalendarCheck, FaHospital, FaComment } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import { fetchFeedbacks } from "../services/Api";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const loadFeedbacks = async () => {
      try {
        const feedbacks = await fetchFeedbacks();
        setReviews(feedbacks);
      } catch (error) {
        console.error("Error loading feedbacks:", error);
      }
    };

    loadFeedbacks();
  }, []);

  function moveToHospitalList() {
    navigate("/hospital-list");
  }

  return (
    <div className="min-h-screen md:ml-64 bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-orange-500 to-indigo-500 text-white py-16 px-6 sm:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            Welcome to Your Health Dashboard
          </h1>
          <p className="text-lg sm:text-xl">
            Book appointments with ease and explore our comprehensive services.
          </p>
        </div>
      </header>

      {/* How It Works Section */}
      <section className="py-16 px-6 sm:px-8">
        <h2 className="text-3xl font-semibold text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <MdLogin />,
              title: "Register/Login",
              subtitle: "रजिस्टर/लॉगिन",
            },
            {
              icon: <FaHospital />,
              title: "Select Hospital And Doctor",
              subtitle: "अस्पताल और डॉक्टर का चयन करें",
            },
            {
              icon: <FaCalendarCheck />,
              title: "Fill Appointment Form",
              subtitle: "अपॉइंटमेंट फॉर्म भरें",
            },
            {
              icon: <FaComment />,
              title: "Wait for Confirmation",
              subtitle: "पुष्टि का इंतजार करें",
            },
          ].map((step, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="p-6 bg-white shadow-md rounded-lg text-center"
            >
              <div className="text-4xl text-orange-500 mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold">{step.title}</h3>
              <span className="block text-gray-600">{step.subtitle}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-6 sm:px-8 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-8">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {["Appointments", "Medical Consultations", "AI in Medical"].map(
            (service, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="p-6 bg-white shadow-md rounded-lg text-center"
              >
                <h3 className="text-xl font-semibold mb-2">{service}</h3>
                <p className="text-gray-600">
                  Comprehensive care for {service.toLowerCase()}.
                </p>
              </motion.div>
            )
          )}
        </div>
      </section>

      {/* Happy Customers Section */}
      <section className="py-16 px-6 sm:px-8 bg-gray-100">
        <h2 className="text-3xl font-semibold text-center mb-8">
          Our Served Patients
        </h2>
        <div className="overflow-x-auto">
          <div className="flex space-x-6 overflow-scroll">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="flex-none w-80 sm:w-96 p-6 bg-white shadow-md rounded-lg text-center"
              >
                {/* Display patient image */}
                <img
                  src={review.appointment?.userId?.image}
                  alt={review.appointment?.patientName || "Anonymous"}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold mb-2">
                  {review.appointment?.patientName || "Anonymous"}
                </h3>
                <Rating value={review.rating} readOnly />
                <p className="text-gray-600 mt-2">{review.comments}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <footer className="bg-orange-500 text-white py-8 text-center">
        <button
          className="bg-white text-orange-500 font-semibold py-2 px-4 rounded shadow-md hover:bg-gray-100 transition"
          onClick={moveToHospitalList}
        >
          Book an Appointment
        </button>
      </footer>
    </div>
  );
};

export default PatientDashboard;
