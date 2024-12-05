import React, { useEffect, useState } from "react";
import { FaHospital } from "react-icons/fa";
import UserNav from "../../components/navbar/UserNav";
import { fetchHospitals } from "../services/Api"; // Importing the fetchHospitals function

const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch hospital data from the backend using fetchHospitals
  useEffect(() => {
    const getHospitals = async () => {
      try {
        const data = await fetchHospitals();
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    getHospitals();
  }, []);

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <UserNav />
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-orange-600 text-center mb-6">
          Hospital List
        </h1>
        <div className="max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search by name..."
            className="w-full p-3 border rounded mb-6 outline-none focus:ring-2 focus:ring-orange-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredHospitals.map((hospital) => (
              <div
                key={hospital._id}
                className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4"
              >
                <FaHospital className="text-orange-500 text-3xl" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {hospital.hospitalName}
                  </h2>
                  <p className="text-gray-600">{hospital.hospitalAddress}</p>
                  <p className="text-sm text-gray-500">
                    {hospital.city}, {hospital.district}, {hospital.state}
                  </p>
                  <p className="text-sm text-gray-500">📞 {hospital.mobile}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalList;
