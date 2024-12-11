import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';  // For rating
import axios from 'axios';

export default function PatientProfile() {
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [review,setReview] = useState('');
  const [rating,setRating] = useState('');

  // Fetch user data and appointments
  useEffect(() => {
    // Assuming you have an endpoint to get the user data and their appointments
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/api/user/profile'); // Adjust endpoint as needed
        setUser(response.data.user);
        
        // Fetch the appointments for the user
        const appointmentResponse = await axios.get(`/api/appointments/${response.data.user._id}`);
        setAppointments(appointmentResponse.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleReviewSubmit = async (appointmentId, review, rating) => {
    try {
      const response = await axios.post(`/api/appointments/review/${appointmentId}`, { review, rating });
      // Update appointments state or re-fetch data
      setAppointments(prev => prev.map(app => app._id === appointmentId ? { ...app, review, rating } : app));
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {user && (
        <>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-semibold">Patient Profile</h1>
            <p className="text-lg">{user.name ? user.name : 'User'}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
            <p className="text-sm text-gray-600">DOB: {user.dob ? new Date(user.dob).toLocaleDateString() : 'N/A'}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment._id} className="p-4 bg-white shadow-md rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="text-xl font-semibold">{appointment.doctorId ? appointment.doctorId.name : 'Doctor Name'}</h3>
                    <p className="text-sm text-gray-500">{new Date(appointment.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-gray-600 mt-2">Status: {appointment.status}</p>

                  {appointment.status === 'Completed' && !appointment.review && (
                    <div className="mt-4">
                      <textarea
                        placeholder="Write your review here..."
                        className="w-full p-2 border rounded-md"
                        rows="3"
                        onChange={(e) => setReview(e.target.value)}  // Add local state for review
                      ></textarea>
                      <div className="flex items-center mt-2">
                        <span className="mr-2">Rating:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FaStar key={star} className="cursor-pointer text-yellow-500" onClick={() => setRating(star)} />
                        ))}
                      </div>
                      <button
                        onClick={() => handleReviewSubmit(appointment._id, review, rating)} // Submit review
                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Submit Review
                      </button>
                    </div>
                  )}

                  {appointment.review && (
                    <div className="mt-4">
                      <p className="text-gray-600 font-semibold">Review:</p>
                      <p>{appointment.review}</p>
                      <p className="text-yellow-500">Rating: {appointment.rating} / 5</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
