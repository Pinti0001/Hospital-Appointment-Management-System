import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { hospitalLogin } from "../services/Api";
import { useDispatch, useSelector } from "react-redux";
import { setHospitalInfo } from "../../slice/hospitalInfo";

const HospitalLogin = () => {
    const hospitalData = useSelector((state) => state.hospitalInfo);
    const dispatch = useDispatch();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await hospitalLogin({
        email: formData.email,
        password: formData.password,
        userType: "hospital", // Explicitly set userType as "hospital"
      });
      dispatch(
        setHospitalInfo({
          hospitalName: response.hospitalName,
          email: response.email,
          number: response.mobile,
          address: response.hospitalAddress,
          state: response.state,
          district: response.district,
          city_pinCode: response.city,
          hospitalObjectId: response._id,
        })
      );
      // Store the JWT token in localStorage or sessionStorage
      localStorage.setItem("token", response.token);
      localStorage.setItem("email", response.email);

      // Navigate to hospital dashboard
      navigate("/hospitaldashboard");
    } catch (error) {
      alert(error.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <div className="text-center mb-6">
          <FaUserCircle size={50} className="text-orange-500 mx-auto" />
          <h2 className="text-2xl font-bold text-gray-800">Hospital Login</h2>
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <button
            type="submit"

            className="w-full bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600"
            

          >
            Login
          </button>
          <div className="flex justify-center mt-4">
            <p className="pr-2">Don't have an account?</p>
            <Link to="/hospitalsignup" className="text-blue-500">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HospitalLogin;
