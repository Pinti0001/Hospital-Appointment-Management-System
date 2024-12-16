// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Rating } from "@mui/material";
// import { fetchUserAppointments, getUserDetails } from "../services/Api";
// import {
//   saveAdditionalDetails as saveDetails,
//   submitFeedback as sendFeedback,
// } from "../services/Api";

// const PatientProfile = () => {
//   const userId = useSelector((state) => state.userInfo.userObjectId);
//   const [appointments, setAppointments] = useState([]);
//   const [feedback, setFeedback] = useState({});
//   const [user, setUser] = useState({});
//   const [additionalDetails, setAdditionalDetails] = useState({
//     name: "",
//     dob: "",
//     email: "",
//     mobile: "",
//     image: null, // Added field for image
//   });

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       try {
//         const userDetails = await getUserDetails(userId);
//         const response = await fetchUserAppointments(userId);
//         setAppointments(response);
//         setUser(userDetails);
//         setAdditionalDetails({
//           name: userDetails.name || "",
//           dob: userDetails.dob || "",
//           email: userDetails.email || "",
//           mobile: userDetails.mobile || "",
//           image: userDetails.image || null, // Load existing image if available
//         });
//       } catch (error) {
//         console.error("Error fetching appointments:", error);
//       }
//     };

//     if (userId) {
//       fetchAppointments();
//     }
//   }, [userId]);

//   const handleAdditionalDetailsChange = (field, value) => {
//     setAdditionalDetails((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setAdditionalDetails((prev) => ({
//         ...prev,
//         image: file, // Store the file object in the state
//       }));
//     }
//   };

//   const saveAdditionalDetails = async () => {
//     try {
//       const message = await saveDetails(userId, additionalDetails);
//       alert(message);
//     } catch (error) {
//       console.error("Error updating details:", error);
//       alert("Failed to update details. Please try again.");
//     }
//   };

//   const submitFeedback = async (appointmentId) => {
//     try {
//       const feedbackData = {
//         rating: feedback[appointmentId]?.rating || 0,
//         comments: feedback[appointmentId]?.comments || "",
//       };

//       const message = await sendFeedback(appointmentId, feedbackData);
//       alert(message);

//       // Mark appointment as reviewed
//       setAppointments((prevAppointments) =>
//         prevAppointments.map((appointment) =>
//           appointment._id === appointmentId
//             ? { ...appointment, isReviewed: true }
//             : appointment
//         )
//       );
//     } catch (error) {
//       console.error("Error submitting feedback:", error);
//       alert("Failed to submit feedback. Please try again.");
//     }
//   };

//   const handleFeedbackChange = (appointmentId, field, value) => {
//     setFeedback((prev) => ({
//       ...prev,
//       [appointmentId]: {
//         ...prev[appointmentId],
//         [field]: value,
//       },
//     }));
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6 flex ml-64 flex-col items-center">
//       <div className="relative w-full max-w-4xl">
//         {/* Background Section */}
//         <div className="relative h-64 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-t-lg">
//           <div className="absolute inset-0 flex flex-col items-center justify-center">
//             <div className="w-32 h-32 bg-white rounded-full overflow-hidden border-4 border-white">
//               {/* Display user image */}
//               <img
//                 src={additionalDetails.image || "https://via.placeholder.com/150"}
//                 alt="User"
//                 className="w-full h-full object-cover"
//               />
//             </div>
//             <h1 className="text-2xl font-bold text-white mt-4">
//               {additionalDetails.name}
//             </h1>
//           </div>
//         </div>

//         {/* Profile Details Section */}
//         <div className="bg-white shadow-lg rounded-lg p-6 -mt-16 space-y-6">
//           <h2 className="text-xl font-semibold text-gray-700">
//             Profile Information
//           </h2>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-600">Email</label>
//               <input
//                 type="email"
//                 value={additionalDetails.email}
//                 onChange={(e) =>
//                   handleAdditionalDetailsChange("email", e.target.value)
//                 }
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-600">Mobile</label>
//               <input
//                 type="tel"
//                 value={additionalDetails.mobile}
//                 onChange={(e) =>
//                   handleAdditionalDetailsChange("mobile", e.target.value)
//                 }
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-600">Name</label>
//               <input
//                 type="text"
//                 value={additionalDetails.name}
//                 onChange={(e) =>
//                   handleAdditionalDetailsChange("name", e.target.value)
//                 }
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-600">Date of Birth</label>
//               <input
//                 type="date"
//                 value={additionalDetails.dob}
//                 onChange={(e) =>
//                   handleAdditionalDetailsChange("dob", e.target.value)
//                 }
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-600">Profile Image</label>
//               <input
//                 type="file"
//                 onChange={handleImageChange}
//                 className="w-full p-2 border rounded-lg"
//               />
//             </div>
//           </div>
//           <button
//             className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
//             onClick={saveAdditionalDetails}
//           >
//             Save Changes
//           </button>
//         </div>
//       </div>



//       {/* Appointments Section */}
//       <div className="w-full max-w-4xl mt-8">
//         <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
//         {appointments.length === 0 ? (
//           <p>No appointments found.</p>
//         ) : (
//           <div className="space-y-4">
//             {appointments.map((appointment) => (
//               <div
//                 key={appointment._id}
//                 className="border p-4 rounded-lg shadow bg-white"
//               >
//                 <p>
//                   <strong>Hospital:</strong> {appointment.hospitalId.name}
//                 </p>
//                 <p>
//                   <strong>Doctor:</strong> {appointment.doctorId.name}
//                 </p>
//                 <p>
//                   <strong>Date:</strong>{" "}
//                   {new Date(appointment.date).toLocaleDateString()}
//                 </p>
//                 <p>
//                   <strong>Patient Name:</strong> {appointment.patientName}
//                 </p>
//                 <p>
//                   <strong>Status:</strong> {appointment.status}
//                 </p>

//                 {appointment.isReviewed ? (
//                   <p className="text-green-600 mt-4 font-semibold">
//                     You already reviewed this appointment
//                   </p>
//                 ) : (
//                   <div className="mt-4">
//                     <h3 className="text-lg font-semibold">Leave Feedback</h3>
//                     <div className="flex flex-col space-y-2">
//                       <Rating
//                         value={feedback[appointment._id]?.rating || 0}
//                         onChange={(e, newValue) =>
//                           handleFeedbackChange(
//                             appointment._id,
//                             "rating",
//                             newValue
//                           )
//                         }
//                       />
//                       <textarea
//                         className="p-2 border rounded-lg"
//                         placeholder="Write your feedback here..."
//                         value={feedback[appointment._id]?.comments || ""}
//                         onChange={(e) =>
//                           handleFeedbackChange(
//                             appointment._id,
//                             "comments",
//                             e.target.value
//                           )
//                         }
//                       />
//                       <button
//                         className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
//                         onClick={() => submitFeedback(appointment._id)}
//                       >
//                         Submit Feedback
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PatientProfile;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Rating } from "@mui/material";
import { fetchUserAppointments, getUserDetails } from "../services/Api";
import { saveAdditionalDetails as saveDetails, submitFeedback as sendFeedback } from "../services/Api";

const PatientProfile = () => {
  const userId = useSelector((state) => state.userInfo.userObjectId);
  const [appointments, setAppointments] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [user, setUser] = useState({});
  const [additionalDetails, setAdditionalDetails] = useState({
    name: "",
    dob: "",
    email: "",
    mobile: "",
    image: null, // Added field for image
  });

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userDetails = await getUserDetails(userId);
        const response = await fetchUserAppointments(userId);
        setAppointments(response);
        setUser(userDetails);
        setAdditionalDetails({
          name: userDetails.name || "",
          dob: userDetails.dob || "",
          email: userDetails.email || "",
          mobile: userDetails.mobile || "",
          image: userDetails.image || null, // Load existing image if available
        });
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (userId) {
      fetchAppointments();
    }
  }, [userId]);

  const handleAdditionalDetailsChange = (field, value) => {
    setAdditionalDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdditionalDetails((prev) => ({
        ...prev,
        image: file, // Store the file object in the state
      }));
    }
  };

  const saveAdditionalDetails = async () => {
    try {
      const message = await saveDetails(userId, additionalDetails);
      alert(message);
    } catch (error) {
      console.error("Error updating details:", error);
      alert("Failed to update details. Please try again.");
    }
  };

  const submitFeedback = async (appointmentId) => {
    try {
      const feedbackData = {
        rating: feedback[appointmentId]?.rating || 0,
        comments: feedback[appointmentId]?.comments || "",
      };

      const message = await sendFeedback(appointmentId, feedbackData);
      alert(message);

      // Mark appointment as reviewed
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, isReviewed: true }
            : appointment
        )
      );
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    }
  };

  const handleFeedbackChange = (appointmentId, field, value) => {
    setFeedback((prev) => ({
      ...prev,
      [appointmentId]: {
        ...prev[appointmentId],
        [field]: value,
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center md:ml-64">
      {/* Profile Section */}
      <div className="relative w-full max-w-4xl">
        {/* Background Section */}
        <div className="relative h-64 w-full bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 rounded-t-lg">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-white rounded-full overflow-hidden border-4 border-white">
              {/* Display user image */}
              <img
                src={additionalDetails.image || "https://via.placeholder.com/150"}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <h1 className="text-2xl font-bold text-white mt-4">
              {additionalDetails.name}
            </h1>
          </div>
        </div>

        {/* Profile Details Section */}
        <div className="bg-white shadow-lg rounded-lg p-6 -mt-16 space-y-6">
          <h2 className="text-xl font-semibold text-gray-700">Profile Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-600">Email</label>
              <input
                type="email"
                value={additionalDetails.email}
                onChange={(e) =>
                  handleAdditionalDetailsChange("email", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-600">Mobile</label>
              <input
                type="tel"
                value={additionalDetails.mobile}
                onChange={(e) =>
                  handleAdditionalDetailsChange("mobile", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-600">Name</label>
              <input
                type="text"
                value={additionalDetails.name}
                onChange={(e) =>
                  handleAdditionalDetailsChange("name", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-600">Date of Birth</label>
              <input
                type="date"
                value={additionalDetails.dob}
                onChange={(e) =>
                  handleAdditionalDetailsChange("dob", e.target.value)
                }
                className="w-full p-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-600">Profile Image</label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full p-2 border rounded-lg"
              />
            </div>
          </div>
          <button
            className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
            onClick={saveAdditionalDetails}
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="w-full max-w-4xl mt-8">
        <h2 className="text-2xl font-bold mb-4">My Appointments</h2>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment._id}
                className="border p-4 rounded-lg shadow bg-white"
              >
                <p>
                  <strong>Hospital:</strong> {appointment.hospitalId.name}
                </p>
                <p>
                  <strong>Doctor:</strong> {appointment.doctorId.name}
                </p>
                <p>
                  <strong>Date:</strong>{" "}
                  {new Date(appointment.date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Patient Name:</strong> {appointment.patientName}
                </p>
                <p>
                  <strong>Status:</strong> {appointment.status}
                </p>

                {appointment.isReviewed ? (
                  <p className="text-green-600 mt-4 font-semibold">
                    You already reviewed this appointment
                  </p>
                ) : (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Leave Feedback</h3>
                    <div className="flex flex-col space-y-2">
                      <Rating
                        value={feedback[appointment._id]?.rating || 0}
                        onChange={(e, newValue) =>
                          handleFeedbackChange(
                            appointment._id,
                            "rating",
                            newValue
                          )
                        }
                      />
                      <textarea
                        className="p-2 border rounded-lg"
                        placeholder="Write your feedback here..."
                        value={feedback[appointment._id]?.comments || ""}
                        onChange={(e) =>
                          handleFeedbackChange(
                            appointment._id,
                            "comments",
                            e.target.value
                          )
                        }
                      />
                      <button
                        className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600"
                        onClick={() => submitFeedback(appointment._id)}
                      >
                        Submit Feedback
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientProfile;
