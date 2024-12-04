import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { userLogin } from "../services/Api";

const UserLogin = () => {
  const [formData, setFormData] = useState({ credential: "", password: "" });
  const [isEmail, setIsEmail] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "credential") {
      // Check if input contains an "@" to classify as email
      setIsEmail(/^[A-Za-z]+$/.test(value));
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create payload dynamically based on input type
      const payload = {
        password: formData.password,
        userType: "patient",
      };
      if (isEmail) {
        payload.email = formData.credential;
      } else {
        payload.mobile = formData.credential;
      }

      const response = await userLogin(payload);

      // Store token and email if available
      localStorage.setItem("token", response.token);
      if (response.email) localStorage.setItem("email", response.email);

      // Navigate to appointment booking page
      navigate("/bookappointment");
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <FaUserCircle size={50} className="text-purple-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">User Login</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">
              {formData.credential === "" ? "Enter Your Email Or Phone Number" : isEmail ? "Email" : "Phone Number"}
            </label>
            <input
              type="text"
              name="credential"
              value={formData.credential}
              onChange={handleInputChange}
              required
              placeholder="Enter email or mobile"
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
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 rounded-md hover:bg-purple-600"
          >
            Login
          </button>
          <div className="flex justify-center mt-4">
            <p className="pr-2">Don't have an account?</p>
            <Link to="/usersignup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
