// import mongoose from "mongoose";
// import Hospital from "./src/models/Hospital.js"; // Adjust path as needed
// import bcrypt from "bcryptjs"

// const insertHospitals = async () => {
//   try {
//     await mongoose.connect("mongodb+srv://choudharyprateek131:9927729187@cluster0.nkeq4ce.mongodb.net/hospital_management?retryWrites=true&w=majority&appName=Cluster0", {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });

//     const hospitals = [
//       {
//         email: "hospital1@example.com",
//         password: await bcrypt.hash("password123", 10),
//         hospitalName: "CarePoint Hospital",
//         hospitalAddress: "Sector 14, Gurgaon",
//         state: "Haryana",
//         district: "Gurgaon",
//         city: "Gurgaon",
//         mobile: "9876543210",
//         location: {
//           type: "Point",
//           coordinates: [76.858847, 28.312345],
//         },
//       },
//       {
//         email: "hospital2@example.com",
//         password: await bcrypt.hash("password456", 10),
//         hospitalName: "MediCare Clinic",
//         hospitalAddress: "Sector 21, Gurgaon",
//         state: "Haryana",
//         district: "Gurgaon",
//         city: "Gurgaon",
//         mobile: "9876543220",
//         location: {
//           type: "Point",
//           coordinates: [76.864234, 28.295678],
//         },
//       },
//       {
//         email: "hospital3@example.com",
//         password: await bcrypt.hash("password789", 10),
//         hospitalName: "HealthFirst Hospital",
//         hospitalAddress: "Sector 45, Gurgaon",
//         state: "Haryana",
//         district: "Gurgaon",
//         city: "Gurgaon",
//         mobile: "9876543230",
//         location: {
//           type: "Point",
//           coordinates: [76.850500, 28.278000],
//         },
//       },
//       {
//         email: "hospital4@example.com",
//         password: await bcrypt.hash("securepass123", 10),
//         hospitalName: "Fortis Healthcare",
//         hospitalAddress: "South Delhi",
//         state: "Delhi",
//         district: "South Delhi",
//         city: "Delhi",
//         mobile: "9876543240",
//         location: {
//           type: "Point",
//           coordinates: [77.208000, 28.613939],
//         },
//       },
//     ];

//     await Hospital.insertMany(hospitals);
//     console.log("Hospitals inserted successfully!");
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error inserting hospitals:", error);
//   }
// };

// insertHospitals();
import mongoose from "mongoose";
import Doctor from "./src/models/Doctor.js"; // Adjust path as needed

const doctors = [
  // {
  //   name: "Dr. Arjun Mehta",
  //   specialization: "Cardiologist",
  //   hospital: "675bc0e17a315e12333f430e",
  //   availableSlots: [
  //     { date: "2024-12-15", time: "10:00 AM" },
  //     { date: "2024-12-15", time: "2:00 PM" },
  //     { date: "2024-12-16", time: "11:00 AM" }
  //   ],
  //   reviews: [
  //     { patient: "675bc0e17a315e12333f4312", rating: 5, comment: "Very knowledgeable and kind." },
  //     { patient: "675bc0e17a315e12333f4313", rating: 4, comment: "Helped me with my heart condition." }
  //   ]
  // },
  {
    name: "Dr. Neha Sharma",
    specialization: "Dermatologist",
    hospital: "675bda13097d0515df582f0a",
    availableSlots: [
      { date: "2024-12-17", time: "9:00 AM" },
      { date: "2024-12-17", time: "1:00 PM" },
      { date: "2024-12-18", time: "4:00 PM" }
    ],
    reviews: [
      { patient: "675bc0e17a315e12333f4314", rating: 4, comment: "Great experience, very attentive." }
    ]
  },
  // Add remaining doctors...
];

async function insertDoctors() {
  try {
    await mongoose.connect("mongodb+srv://choudharyprateek131:9927729187@cluster0.nkeq4ce.mongodb.net/hospital_management?retryWrites=true&w=majority&appName=Cluster0", { useNewUrlParser: true, useUnifiedTopology: true });
    await Doctor.insertMany(doctors);
    console.log("Doctors inserted successfully!");
  } catch (err) {
    console.error("Error inserting doctors:", err);
  } finally {
    mongoose.connection.close();
  }
}

insertDoctors();
