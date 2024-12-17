import React, { useState } from "react";
import { useSelector } from "react-redux"; 
import { useParams } from "react-router-dom"; 
import { FcCalendar } from "react-icons/fc";
import { bookAppointment } from "../services/Api"; 
import socket from "../../hooks/useSocket";

export default function BookAppointment() {
  const { hospitalId, doctorId } = useParams(); 
  const { userObjectId } = useSelector((state) => state.userInfo); 
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    date: "",
    symptoms: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      userId : userObjectId,
      hospitalId,
      doctorId,
    };

    try {
      const response = await bookAppointment(payload);
      alert("Appointment booked successfully!");

      // Emit a real-time event
      socket.emit("appointmentBooked", response.data);

      setFormData({
        patientName: "",
        patientEmail: "",
        patientPhone: "",
        date: "",
        symptoms: "",
      });
    } catch (error) {
      console.error("Failed to book appointment:", error);
      alert("Failed to book appointment. Please try again.");
    }
  };

  return (
    <div className="md:ml-64 flex-1 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-lg md:max-w-2xl">
        <h1 className="text-2xl font-bold text-orange-500 flex items-center space-x-2">
          <FcCalendar className="w-8 h-8" />
          <span>Book an Appointment</span>
        </h1>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              name="patientEmail"
              value={formData.patientEmail}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your email (optional)"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="patientPhone"
              value={formData.patientPhone}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter your phone number"
            />
          </div>

          {/* Appointment Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Appointment Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
            />
          </div>

          {/* Symptoms */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Symptoms</label>
            <textarea
              name="symptoms"
              value={formData.symptoms}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500"
              placeholder="Describe your symptoms (optional)"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-500 text-white py-2 px-4 rounded-md shadow-md transition"
          >
            Submit Appointment
          </button>
        </form>
      </div>
    </div>
  );
}
