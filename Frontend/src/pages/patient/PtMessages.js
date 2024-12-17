// import React, { useEffect, useState, useCallback } from "react";
// import { useSelector } from "react-redux";
// import { fetchUserAppointments, fetchAppointments } from "../services/Api";
// import { useSocket } from "../../hooks/useSocket";

// export default function PtMessages() {
//   const userObjectId = useSelector((state) => state.userInfo.userObjectId);
//   const [appointments, setAppointments] = useState([]);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const updateAppointment = useCallback((data) => {
//     console.log("Updating appointment with data:", data);
//     setAppointments((prevAppointments) =>
//       prevAppointments.map((appointment) =>
//         appointment._id === data._id ? { ...appointment, ...data } : appointment
//       )
//     );
//   }, []);

//   useSocket((socket) => {
//     console.log("Socket instance initialized:", socket);
//     console.log("Socket connected:", socket.connected)

//     // // Listen for the "statusUpdated" event
//     // socket.on("statusUpdated", (updatedAppointment) => {
//     //   console.log("Socket received statusUpdated:", updatedAppointment); // Debug log
//     //   updateAppointment(updatedAppointment);
//     // });

//     socket.on("statusUpdated", (updatedAppointment) => {
//       console.log("Received status update:", updatedAppointment);
      
//       // Update appointments list
//       setAppointments((prevAppointments) =>
//         prevAppointments.map((appointment) =>
//           appointment._id === updatedAppointment._id ? updatedAppointment : appointment
//         )
//       );

//       // Update selected appointment if it's the one that was updated
//       if (selectedAppointment?._id === updatedAppointment._id) {
//         setSelectedAppointment(updatedAppointment);
//       }
//     });

//     // Cleanup listener when the component unmounts
//     return () => {
//       socket.off("statusUpdated");
//     };
//   }, [updateAppointment]);
//   // useSocket((socket) => {
//   //   console.log("Socket connected:", socket.connected);
  
//   //   const handleStatusUpdate = (updatedAppointment) => {
//   //     console.log("Received real-time update:", updatedAppointment);
//   //     setAppointments((prevAppointments) =>
//   //       prevAppointments.map((appointment) =>
//   //         appointment._id === updatedAppointment._id ? { ...appointment, ...updatedAppointment } : appointment
//   //       )
//   //     );
//   //   };
  
//   //   // Attach the listener
//   //   socket.on("statusUpdated", handleStatusUpdate);
  
//   //   // Clean up on unmount
//   //   return () => {
//   //     socket.off("statusUpdated", handleStatusUpdate);
//   //   };
//   // }, []);

//   useEffect(() => {
//     const loadAppointments = async () => {
//       try {
//         setLoading(true);
//         const data = await fetchUserAppointments(userObjectId);
//         setAppointments(data);
//       } catch (err) {
//         setError("Failed to load appointments.");
//         console.error("Error loading appointments:", err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (userObjectId) {
//       loadAppointments();
//     }
//   }, [userObjectId]);
//   // useEffect(() => {
//   //   const loadAppointments = async () => {
//   //     try {
//   //       const data = await fetchUserAppointments(userObjectId);
//   //       setAppointments(data);
//   //     } catch (err) {
//   //       setError("Failed to load appointments.");
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   if (userObjectId) {
//   //     loadAppointments();
//   //   }
//   // }, [userObjectId]);

//   const handleAppointmentClick = (appointment) => {
//     setSelectedAppointment(appointment);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex ml-64">
//       {/* Left Section: Hospital List */}
//       <div className="w-1/3 bg-white shadow-lg border-r">
//         <div className="p-6">
//           <h1 className="text-2xl font-bold text-orange-500 mb-4">Your Appointments</h1>
//           {loading ? (
//             <p className="text-gray-600">Loading appointments...</p>
//           ) : error ? (
//             <p className="text-red-600">{error}</p>
//           ) : appointments.length === 0 ? (
//             <p className="text-gray-600">No booked appointments. Please book an appointment.</p>
//           ) : (
//             <ul>
//               {appointments.map((appointment) => (
//                 <li
//                   key={appointment._id}
//                   className="p-4 mb-4 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-lg shadow-sm border"
//                   onClick={() => handleAppointmentClick(appointment)}
//                 >
//                   <h2 className="text-lg font-bold text-orange-400">
//                     {appointment.hospitalId.hospitalName}
//                   </h2>
//                   <p className="text-gray-600 text-sm">Doctor: {appointment.doctorId.name}</p>
//                   <p>Status: {appointment.status}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* Right Section: Chat */}
//       <div className="w-2/3 p-6 flex flex-col bg-gray-50">
//         {selectedAppointment ? (
//           <div className="flex flex-col h-full">
//             {/* Header */}
//             <div className="border-b pb-4 mb-4">
//               <h2 className="text-2xl font-bold text-orange-500">
//                 Chat with {selectedAppointment.hospitalId.hospitalName}
//               </h2>
//               <p className="text-gray-600">
//                 Doctor: {selectedAppointment.doctorId.name} (
//                 {selectedAppointment.doctorId.specialization})
//               </p>
//             </div>

//             {/* Chat Messages */}
//             <div className="flex-1 overflow-y-auto p-4 bg-white rounded-lg shadow-inner">
//               {/* User's Initial Message */}
//               <div className="flex items-start mb-4">
//                 <div className="bg-blue-100 p-4 rounded-lg shadow text-gray-800 max-w-md">
//                   <p className="font-semibold">Patient Name: {selectedAppointment.patientName}</p>
//                   <p>Email: {selectedAppointment.patientEmail}</p>
//                   <p>Phone: {selectedAppointment.patientPhone}</p>
//                   <p>Symptoms: {selectedAppointment.symptoms || "N/A"}</p>
//                   <p>Status: {selectedAppointment.status}</p>
//                   <p>
//                     Appointment Date:{" "}
//                     {new Date(selectedAppointment.date).toLocaleDateString()}{" "}
//                     {new Date(selectedAppointment.date).toLocaleTimeString()}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Input for future messages */}
//             <div className="mt-4">
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 className="w-full p-4 rounded-lg border shadow focus:ring focus:ring-blue-200"
//               />
//             </div>
//           </div>
//         ) : (
//           <div className="flex items-center justify-center h-full">
//             <p className="text-gray-600">Select an appointment to view details.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { fetchUserAppointments } from "../services/Api";
import { useSocket } from "../../hooks/useSocket";

export default function PtMessages() {
  const userObjectId = useSelector((state) => state.userInfo.userObjectId);
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const updateAppointment = useCallback((data) => {
    console.log("Updating appointment with data:", data);
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === data._id ? { ...appointment, ...data } : appointment
      )
    );
  }, []);

  useSocket((socket) => {
    console.log("Socket instance initialized:", socket);
    console.log("Socket connected:", socket.connected);

    socket.on("statusUpdated", (updatedAppointment) => {
      console.log("Received status update:", updatedAppointment);

      // Update appointments list
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === updatedAppointment._id ? updatedAppointment : appointment
        )
      );

      // Update selected appointment if it's the one that was updated
      if (selectedAppointment?._id === updatedAppointment._id) {
        setSelectedAppointment(updatedAppointment);
      }
    });

    // Cleanup listener when the component unmounts
    return () => {
      socket.off("statusUpdated");
    };
  }, [updateAppointment]);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setLoading(true);
        const data = await fetchUserAppointments(userObjectId);
        setAppointments(data);
      } catch (err) {
        setError("Failed to load appointments.");
        console.error("Error loading appointments:", err.message);
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
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row ml-0 md:ml-64">
      {/* Left Section: Hospital List */}
      <div className="w-full md:w-1/3 bg-white shadow-lg border-b md:border-r">
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
                  <p>Status: {appointment.status}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Right Section: Chat */}
      <div className="w-full md:w-2/3 p-6 flex flex-col bg-gray-50">
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
