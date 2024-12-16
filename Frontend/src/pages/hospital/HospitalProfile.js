import React, { useState, useEffect } from "react";
import { getHospitalData } from "../services/Api"; // Import the API function
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import hslogo from '../../assets/aadhar.png'

const HospitalProfile = () => {
    const [hospital, setHospital] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    // Fetch hospital ID from Redux
    const hospitalObjectId = useSelector((state) => state.hospitalInfo.hospitalObjectId);

    useEffect(() => {
        if (!hospitalObjectId) {
            setError("No hospital ID found in the state.");
            setLoading(false);
            return;
        }

        const fetchHospitalData = async () => {
            try {
                const response = await getHospitalData(hospitalObjectId); // Use the API with ID
                setHospital(response.data); // Assuming the API returns data in `response.data`
                setLoading(false);
            } catch (err) {
                setError("Error fetching hospital data.");
                setLoading(false);
            }
        };

        fetchHospitalData();
    }, [hospitalObjectId]);

    const handleAddDoctorClick = () => {
        navigate("/add-doctor");
    };

    if (loading) return <div className="md:ml-64 mt-10">Loading...</div>;
    if (error) return <div className="md:ml-64 mt-10">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 md:ml-64">
            {/* Navbar */}
            <nav className="bg-gray-200 p-4 flex justify-between items-center">
                <div className="flex items-center pl-12 space-x-4">
                    <img src={hslogo} alt="Hospital Logo" className="h-12" />
                    <span className="text-4xl font-bold">{hospital?.hospitalName}</span>
                </div>
                <div className="flex items-center space-x-1">
                    {/* <Link
                        to="/update-details"
                        className="bg-orange-500 px-4 py-2 rounded-md hover:bg-orange-600"
                    >
                        Update Details
                    </Link> */}
                    <button
                        className="bg-green-500 px-4 py-2 rounded-md hover:bg-green-600"
                        onClick={handleAddDoctorClick}
                    >
                        Add Doctor
                    </button>
                </div>
            </nav>

            {/* Hospital Profile Card */}
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Hospital Profile</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <p><strong>Hospital Name:</strong> {hospital?.hospitalName}</p>
                        <p><strong>Address:</strong> {hospital?.hospitalAddress}</p>
                        <p><strong>City:</strong> {hospital?.city}</p>
                        <p><strong>District:</strong> {hospital?.district}</p>
                        <p><strong>State:</strong> {hospital?.state}</p>
                    </div>
                    <div className="space-y-2">
                        <p><strong>Email:</strong> {hospital?.email}</p>
                        <p><strong>Mobile:</strong> {hospital?.mobile}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HospitalProfile;
