// src/components/HospitalProfile.js

import React, { useState, useEffect } from 'react';
import { getHospitalData } from '../services/Api';  // Import the function
import { Link } from 'react-router-dom';

const HospitalProfile = () => {
    const [hospital, setHospital] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the email from localStorage
        const hospitalEmail = localStorage.getItem('hospitalEmail');

        if (!hospitalEmail) {
            setError('No hospital email found in localStorage.');
            setLoading(false);
            return;
        }

        // Fetch the hospital data using the email
        const fetchHospitalData = async () => {
            try {
                const response = await getHospitalData(hospitalEmail);  
                setHospital(response);
                setLoading(false);
            } catch (err) {
                setError('Error fetching hospital data.');
                setLoading(false);
            }
        };

        fetchHospitalData();
    }, []);

    if (loading) return <div className='ml-64'>Loading...</div>;
    if (error) return <div className='ml-64'>{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 ml-64">
            {/* Navbar */}
            <nav className="bg-gray-800 p-4 flex justify-between items-center text-white">
                <div className="flex items-center space-x-4">
                    <img src="/logo.png" alt="Hospital Logo" className="h-12" />
                    <span className="text-xl font-semibold">{hospital?.hospitalName}</span>
                </div>
                <Link to="/update-details" className="bg-orange-500 px-4 py-2 rounded-md hover:bg-orange-600">
                    Update Details
                </Link>
            </nav>

            {/* Hospital Profile Card */}
            <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Hospital Profile</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
