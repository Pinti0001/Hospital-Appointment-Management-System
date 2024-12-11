import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserAppointments } from "../services/Api";

export default function Messages() {
  const userObjectId = useSelector((state) => state.userInfo.userObjectId);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchUserAppointments(userObjectId);
        setAppointments(data);
      } catch (err) {
        setError("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    if (userObjectId) {
      loadAppointments();
    }
  }, [userObjectId]);

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex ml-64">
      {/* Left Section: Hospital List */}
      <div className="w-1/3 bg-white shadow-lg border-r">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-orange-500 mb-4">Your Appointments</h1>
          {loading ? (
            <p className="text-gray-600">Loading appointments...</p>
          ) : error ? (
            <p className="text-red-600">{error}</p>
          ) : appointments.length === 0 ? (
            <p className="text-gray-600">No booked appointments. Please book an appointment.</p>
          ) : (
            <ul>
              {appointments.map((appointment) => (
                <li
                  key={appointment._id}
                  className="p-4 mb-4 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-lg shadow-sm border"
                  onClick={() => handleAppointmentClick(appointment)}
                >
                  <h2 className="text-lg font-bold text-orange-400">
                    {appointment.hospitalId.hospitalName}
                  </h2>
                  <p className="text-gray-600 text-sm">Doctor: {appointment.doctorId.name}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right Section: Chat */}
      <div className="w-2/3 p-6 flex flex-col bg-gray-50">
        {selectedAppointment ? (
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="border-b pb-4 mb-4">
              <h2 className="text-2xl font-bold text-orange-500">
                Chat with {selectedAppointment.hospitalId.hospitalName}
              </h2>
              <p className="text-gray-600">
                Doctor: {selectedAppointment.doctorId.name} (
                {selectedAppointment.doctorId.specialization})
              </p>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-inner">
              {/* User's Initial Message */}
              <div className="flex items-start mb-4">
                <div className="bg-blue-100 p-4 rounded-lg shadow text-gray-800 max-w-md">
                  <p className="font-semibold">Patient Name: {selectedAppointment.patientName}</p>
                  <p>Email: {selectedAppointment.patientEmail}</p>
                  <p>Phone: {selectedAppointment.patientPhone}</p>
                  <p>Symptoms: {selectedAppointment.symptoms || "N/A"}</p>
                  <p>Status: {selectedAppointment.status}</p>
                  <p>
                    Appointment Date:{" "}
                    {new Date(selectedAppointment.date).toLocaleDateString()}{" "}
                    {new Date(selectedAppointment.date).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </div>

            {/* Input for future messages */}
            <div className="mt-4">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full p-4 rounded-lg border shadow focus:ring focus:ring-blue-200"
              />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-600">Select an appointment to view details.</p>
          </div>
        )}
      </div>
    </div>
  );
}
