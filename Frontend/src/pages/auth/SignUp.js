import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { Link, useNavigate} from "react-router-dom";
import { signup } from "../services/Api";

const Signup = () => {
  const [userType, setUserType] = useState("patient");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    hospitalName: "",
    hospitalAddress: "",
  });
  const navigate = useNavigate("");
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
  
    try {
      const response = await signup({
        email: formData.email,
        password: formData.password,
        userType,
        hospitalName: formData.hospitalName,
        hospitalAddress: formData.hospitalAddress,
      });
  
      // Store the JWT token in localStorage or sessionStorage
      localStorage.setItem("token", response.token);
  
      // Navigate based on user type
      if (userType === "hospital") {
        navigate("/hospitaldashboard");
      } else {
        navigate("/bookappointment");
      }
    } catch (error) {
      alert(error.message || "Signup failed");
    }
  };
  
  

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <FaUserPlus size={50} className="text-purple-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">Signup</h2>
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setUserType("patient")}
            className={`px-4 py-2 text-sm font-medium ${
              userType === "patient" ? "bg-purple-500 text-white" : "bg-gray-200"
            } rounded-l-md`}
          >
            Patient
          </button>
          <button
            onClick={() => setUserType("hospital")}
            className={`px-4 py-2 text-sm font-medium ${
              userType === "hospital" ? "bg-purple-500 text-white" : "bg-gray-200"
            } rounded-r-md`}
          >
            Hospital
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          {userType === "hospital" && (
            <>
              <div className="mb-4">
                <label className="block text-gray-600">Hospital Name</label>
                <input
                  type="text"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-600">Hospital Address</label>
                <input
                  type="text"
                  name="hospitalAddress"
                  value={formData.hospitalAddress}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </>
          )}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
          >
            Signup
          </button>
          <div className="flex justify-center" >
        <p className='pr-2'> Already have Account? </p> <Link to ="/login" className="text-blue-500"> Log In</Link>
         </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
