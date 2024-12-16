// import React, { useEffect, useState, useCallback } from 'react';
// import axios from 'axios';
// import { fetchAppointments, updateAppointmentStatus } from '../services/Api';
// import { useSocket } from '../../hooks/useSocket';
// import hslogo from '../../assets/aadhar.png'

// export default function AppointmentList({ hospitalId }) {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // const updateAppointment = useCallback((data) => {
//   //   setAppointments((prevAppointments) =>
//   //     prevAppointments.map((appointment) =>
//   //       appointment._id === data._id ? { ...appointment, ...data } : appointment
//   //     )
//   //   );
//   // }, []);

//   useSocket((socket) => {
//   socket.on("statusUpdated", (updatedAppointment) => {
//     setAppointments((prevAppointments) =>
//       prevAppointments.map((appointment) =>
//         appointment._id === updatedAppointment._id ? updatedAppointment : appointment
//       )
//     );
//   });
// });


//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data = await fetchAppointments('675bda13097d0515df582f0a');
//         setAppointments(data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load appointments');
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, [hospitalId]);

//   const handleStatusChange = async (appointmentId, newStatus) => {
//     try {
//       // Call the API to update the status
//       const updatedAppointment = await updateAppointmentStatus(appointmentId, newStatus);
  
//       // Update the state with the new appointment data
//       setAppointments((prevAppointments) =>
//         prevAppointments.map((appointment) =>
//           appointment._id === appointmentId ? updatedAppointment : appointment
//         )
//       );
//     } catch (err) {
//       console.error("Failed to update status:", err.message);
//     }
//   };
  
  
  

//   if (loading) return <div className="ml-64 mt-10">Loading appointments...</div>;
//   if (error) return <div className="ml-64 mt-10">{error}</div>;

//   return (
//     <>
//       <nav className="bg-gray-200 p-4 fixed top-0 w-full ml-[256px] z-10 shadow-md">
//         <div className="flex items-center justify-between px-10">
//           <div className="flex items-center space-x-10">
//             <img src={hslogo} alt="Hospital Logo" className="h-12" />
//             <span className="text-4xl font-bold">Hospital Name</span>
//           </div>
//         </div>
//       </nav>

//       <div className="appointment-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 ml-64 px-4 py-24">
//         {appointments.map((appointment) => (
//           <div className="appointment-card bg-white border border-gray-300 rounded-lg shadow-lg p-6" key={appointment._id}>
//             <div className="appointment-header mb-4">
//               <h3 className="text-xl font-semibold">{appointment.patientName}</h3>
//               <p className="text-sm text-gray-500">{appointment.patientPhone}</p>
//               <p className="text-sm text-gray-500">{appointment.patientEmail}</p>
//             </div>

//             <div className="appointment-body mb-4">
//               <p><strong>Symptoms:</strong> {appointment.symptoms || 'Not provided'}</p>
//               <p><strong>Appointment Date:</strong> {new Date(appointment.date).toLocaleString()}</p>
//             </div>

//             <div className="appointment-footer flex justify-between items-center">
//               <p className="text-sm">Status: {appointment.status}</p>
//               <select
//                 className="border border-gray-300 rounded px-2 py-1"
//                 value={appointment.status} 
//                 onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
//               >
//                 <option value="Scheduled">Scheduled</option>
//                 <option value="Completed">Completed</option>
//                 <option value="Cancelled">Cancelled</option>
//               </select>

//             </div>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// }
import React, { useEffect, useState } from 'react';
import { fetchAppointments, updateAppointmentStatus } from '../services/Api';
import { useSocket } from '../../hooks/useSocket';
import hslogo from '../../assets/aadhar.png';

export default function AppointmentList({ hospitalId }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useSocket((socket) => {
    socket.on("statusUpdated", (updatedAppointment) => {
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id ? updatedAppointment : appointment
        )
      );
    });
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAppointments('675bda13097d0515df582f0a');
        setAppointments(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load appointments');
        setLoading(false);
      }
    };
    fetchData();
  }, [hospitalId]);

  const handleStatusChange = async (appointmentId, newStatus) => {
    try {
      // Call the API to update the status
      const updatedAppointment = await updateAppointmentStatus(appointmentId, newStatus);
  
      // Update the state with the new appointment data
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId ? updatedAppointment : appointment
        )
      );
    } catch (err) {
      console.error("Failed to update status:", err.message);
    }
  };

  if (loading) return <div className="ml-64 mt-10">Loading appointments...</div>;
  if (error) return <div className="ml-64 mt-10">{error}</div>;

  return (
    <>
      <nav className="bg-gray-200 p-4 fixed top-0 w-full md:ml-[256px] z-10 shadow-md">
        <div className="flex items-center justify-between px-10">
          <div className="flex items-center space-x-10">
            <img src={hslogo} alt="Hospital Logo" className="h-12" />
            <span className="text-4xl font-bold">Hospital Name</span>
          </div>
        </div>
      </nav>

      <div className="appointment-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6 md:ml-64 px-4 py-24">
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
    </>
  );
}
