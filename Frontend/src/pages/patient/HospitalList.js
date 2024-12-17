import React, { useEffect, useState } from "react";
import { FaHospital } from "react-icons/fa";
import { Link } from "react-router-dom";
import { fetchHospitals } from "../services/Api";

export const HospitalList = () => {
  const [hospitals, setHospitals] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);

  // Get user's location
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation({ latitude, longitude });
          },
          (error) => {
            setLocationError("Unable to retrieve your location.");
          }
        );
      } else {
        setLocationError("Geolocation is not supported by this browser.");
      }
    };
    getUserLocation();
  }, []);

  // Fetch hospitals once the location is available
  useEffect(() => {
    if (userLocation) {
      const { latitude, longitude } = userLocation;
      fetchHospitals(latitude, longitude)
        .then((response) => setHospitals(response.data))
        .catch((error) => {
          console.error(error);
          setLocationError("Error fetching hospitals.");
        });
    }
  }, [userLocation]);

  // Filter hospitals based on search term
  const filteredHospitals = hospitals.filter((hospital) =>
    hospital.hospitalName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen md:ml-64 bg-gray-100 p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 text-center mb-6">
        Hospitals Near You
      </h1>

      <div className="max-w-4xl mx-auto">
        <input
          type="text"
          placeholder="Search by name..."
          className="w-full p-3 border rounded mb-6 outline-none focus:ring-2 focus:ring-orange-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {locationError && (
          <p className="text-red-500 text-center mb-4">{locationError}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHospitals.map((hospital) => (
            <Link
              to={`/hospital/${hospital._id}`}
              state={{ hospital }}
              key={hospital._id}
              className="bg-white shadow-md rounded-lg p-5 flex items-center gap-4 transition-all duration-300 ease-in-out transform hover:scale-105"
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
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HospitalList;
