import axios from "axios";

const API_URL = "http://localhost:8070/api/";

// Signup Function
export const signup = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}auth/signup`, userData);
    return response.data; // Includes JWT token
  } catch (error) {
    console.error("Error during signup:", error.response?.data || error.message);
    throw error.response?.data || { message: "Signup failed" };
  }
};

// Login Function
export const login = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}auth/login`, loginData);
    return response.data; // Includes JWT token
  } catch (error) {
    console.error("Error during login:", error.response?.data || error.message);
    throw error.response?.data || { message: "Login failed" };
  }
};
