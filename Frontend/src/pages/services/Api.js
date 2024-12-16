import axios from "axios";

const API_URL = "https://hospital-appointment-management-system-1.onrender.com/api/";

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
export const fetchDoctorsByHospitalId = async (hospitalId) => {
  try {
    const response = await axios.get(`${API_URL}doctor/${hospitalId}`);
    return response.data; // Assuming this returns the list of doctors
  } catch (error) {
    throw error.response?.data || { message: "Error fetching doctors list" };
  }
};

export const fetchHospitals = async (latitude, longitude) => {
  try {
    const response = await axios.get(`${API_URL}user/getNearbyHospitals`, {
      params: { latitude, longitude },
    });
    return response.data; // Assuming this returns the hospital data
  } catch (error) {
    throw error.response?.data || { message: "Error fetching hospital list" };
  }
};

export const fetchAppointments = async (uniqueId) => {
  try {
    const response = await axios.get(
      `${API_URL}appointments/getappointment?uniqueId=${uniqueId}`
    );
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


export const getUserDetails = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}user/getuserDetails?userId=${userId}`);
    return response.data;
  } catch (err) {
    console.log("Failed to fetch appointments. Please try again later.");
    throw err
  }
 
};
export const saveAdditionalDetails = async (userId, additionalDetails) => {
  const formData = new FormData();
  Object.keys(additionalDetails).forEach((key) => {
    formData.append(key, additionalDetails[key]);
  });

  try {
    await axios.put(`${API_URL}user/update/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    });
    return "Details updated successfully!";
  } catch (error) {
    console.log("Error updating details ", error);
    throw new Error("Failed to update details");
  }
};

export const submitFeedback = async (appointmentId, feedbackData) => {
  try {
    await axios.post(`${API_URL}review/${appointmentId}/feedback`, feedbackData);
    return ("Feedback submitted successfully!");
  } catch (error) {
    console.log("Error submitting feedback ", error);
    
  }
};

export const fetchFeedbacks = async () => {
  try {
    const response = await axios.get(`${API_URL}review/feedbacks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
};

export const createDoctor = async (doctorData) => {
  try {
    const response = await axios.post(`${API_URL}doctors/createdoctor`, doctorData);
    return response.data;
  } catch (error) {
    console.error("Error adding new doctor:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to add doctor" };
  }
};

export const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const response = await axios.patch(`${API_URL}appointments/${appointmentId}`, { status });
    return response.data; // Returns updated appointment data
  } catch (error) {
    console.error("Error updating appointment status:", error.response?.data || error.message);
    throw error.response?.data || { message: "Failed to update appointment status" };
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}doctors/getalldoctors`);
    return response.data;
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    throw error;
  }
};