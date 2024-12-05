import './App.css';
import { Routes, Route } from "react-router-dom"
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import Home from './pages/home/Home';
import UserLogin from './pages/auth/UserLogin';
import HospitalSignup from './pages/auth/HospitalSignUp';
import HospitalLogin from './pages/auth/HospitalLogin';
import UserSignup from './pages/auth/UserSignUp';
import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointment from "./pages/patient/BookAppointment"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/hospitalsignup" element={<HospitalSignup />} />
        <Route path="/hospitallogin" element={<HospitalLogin />} />
        <Route path="/hospitaldashboard" element={<HospitalDashboard />} />
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="book-appointment" element ={<BookAppointment/>}/>

      </Routes></>

  );
}

export default App;