import React from "react";
import { Link, useLocation } from "react-router-dom";

const HospitalDetails = () => {
  const { state } = useLocation();
  const hospital = state?.hospital;

  if (!hospital) {
    return <p>No hospital data found. Please select a hospital.</p>;
  }

  return (
    <div className="flex">
      <div className="fixed w-64 h-full">
       
      </div>

      {/* Content */}
      <div className="ml-64 flex-1 bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">
          {hospital.hospitalName}
        </h1>
        <p className="text-gray-600 text-center">{hospital.hospitalAddress}</p>
        <p className="text-center text-gray-500">
          {hospital.city}, {hospital.district}, {hospital.state}
        </p>
        <h2 className="text-2xl font-semibold text-gray-800 mt-6">Doctors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {hospital.doctors.map((doctor) => (
            <div
              key={doctor._id}
              className="bg-white shadow-lg rounded-lg p-5 flex flex-col gap-4 hover:shadow-xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
              <p className="text-orange-500">{doctor.specialization}</p>
              <div>
                <h4 className="font-semibold text-gray-800">
                  Available Slots:
                </h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {doctor.availableSlots.map((slot) => (
                    <li key={slot._id}>
                      {slot.date} at {slot.time}
                    </li>
                  ))}
                </ul>
              </div>
              <Link to={`/bookappointment/${hospital._id}/${doctor._id}`}>
                <button className="mt-auto bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition-colors">
                  Book Appointment
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalDetails;
