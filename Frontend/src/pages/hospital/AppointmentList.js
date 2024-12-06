import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { fetchAppointments } from '../services/Api';

export default function AppointmentList({ hospitalId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAppointments("67513dcad5862c772b7e46c1");
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load appointments');
        setLoading(false);
      }
    };
    fetchData();
  }, [hospitalId]);

  // Change the status
  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      const response = await axios.patch(`/api/appointments/${appointmentId}`, { status: newStatus });
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? response.data : appointment
        )
      );
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  if (loading) return <div className="ml-64 mt-10">Loading appointments...</div>;
  if (error) return <div className="ml-64 mt-10">{error}</div>;

  return (
    <div className="appointment-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 ml-64 mt-10 px-4">
      {appointments.map((appointment) => (
        <div className="appointment-card bg-white border border-gray-300 rounded-lg shadow-lg p-6" key={appointment._id}>
          <div className="appointment-header mb-4">
            <h3 className="text-xl font-semibold">{appointment.patientName}</h3>
            <p className="text-sm text-gray-500">{appointment.patientPhone}</p>
            <p className="text-sm text-gray-500">{appointment.patientEmail}</p>
          </div>

          <div className="appointment-body mb-4">
            <p><strong>Symptoms:</strong> {appointment.symptoms || 'Not provided'}</p>
            <p><strong>Appointment Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
          </div>

          <div className="appointment-footer flex justify-between items-center">
            <p className="text-sm">Status: {appointment.status}</p>
            <select
              className="border border-gray-300 rounded px-2 py-1"
              value={appointment.status}
              onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
            >
              <option value="Scheduled">Scheduled</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      ))}
    </div>
  );
}
