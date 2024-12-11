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

// Fetch a Single Hospital's Data
export const getHospitalData = async (hospitalId) => {
  try {
    const response = await axios.get(`${API_URL}hospitalprof/hospitalpage/${hospitalId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching hospital data:", error.response?.data || error.message);
    throw error.response?.data || { message: "Error fetching hospital data" };
  }
}

// Fetch All Hospitals
export const fetchHospitals = async () => {
  try {
    const response = await axios.get(`${API_URL}user/getallhospital`);
    return (response.data);
  } catch (error) {
    throw error.response?.data || { message: "Error fetching hospital List" };
  }
};

export const fetchAppointments = async (uniqueId) => {
  try {
    const response = await axios.get(
      `${API_URL}appointments/getappointment?uniqueId=${uniqueId}`
    ); //uniqueId is the Hospital Id
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Error fetching hospital List" };
  }
}

export const bookAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${API_URL}appointments/createappointment`, appointmentData);
    return response.data;
  } catch (error) {
    console.error("Error booking appointment:", error);
    throw error;
  }
};


export const fetchUserAppointments = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}appointments/getuserappointment?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.log("Failed to fetch appointments. Please try again later.");
    throw err
  }
 
};
