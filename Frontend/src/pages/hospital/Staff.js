import React, { useState, useEffect } from "react";
import { getAllDoctors } from "../services/Api";

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const data = await getAllDoctors();
                setDoctors(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchDoctors();
    }, []);

    if (loading) {
        return (
            <div className="text-center text-xl font-semibold mt-10 md:ml-64">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-red-500 text-xl font-semibold mt-10 md:ml-64">
                Error: {error}
            </div>
        );
    }

    return (
        <div className="relative bg-slate-100 min-h-screen md:ml-64 px-4 sm:px-6 lg:px-8">
            {/* Doctors List Title */}
            <h1 className="text-4xl font-extrabold text-center pt-10 mb-8 text-gray-800">
                Doctors
            </h1>

            {/* Doctor Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {doctors.map((doctor) => (
                    <div
                        key={doctor._id}
                        className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="p-6">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                                {doctor.name}
                            </h2>
                            <p className="text-gray-600 mb-3">
                                <span className="font-bold">Specialization:</span>{" "}
                                {doctor.specialization}
                            </p>
                            <div>
                                <p className="text-gray-800 font-bold mb-2">Available Slots:</p>
                                <ul className="list-disc pl-5 space-y-1">
                                    {doctor.availableSlots.map((slot, index) => (
                                        <li key={index} className="text-gray-600">
                                            {new Date(slot.date).toLocaleDateString()} at {slot.time}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DoctorList;
