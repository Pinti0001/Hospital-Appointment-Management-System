import axios from "axios";

const API_URL = "http://localhost:8070/api/";

// Signup Function
export const hospitalSignup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}auth/signuphospital`, userData);
    return response.data; // Includes JWT token
  } catch (error) {
    console.error("Error during signup:", error.response?.data || error.message);
    throw error.response?.data || { message: "Signup failed" };
  }
};

// Login Function
export const hospitalLogin = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}auth/loginhospital`, loginData);
    return response.data; // Includes JWT token
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};


export const userSignup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}auth/signupuser`, userData);
    return response.data; // Includes JWT token
  } catch (error) {
    console.error("Error during signup:", error.response?.data || error.message);
    throw error.response?.data || { message: "Signup failed" };
  }
};


export const userLogin = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}auth/loginuser`, userData);
    return response.data; // Includes JWT token
  } catch (error) {
    console.error("Error during Login:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};