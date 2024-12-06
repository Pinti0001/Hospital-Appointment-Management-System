import './App.css';

import { Routes, Route, useLocation } from "react-router-dom"
import HospitalList from './pages/patient/HospitalList';


import Navbar from "./components/navbar/Navbar";

import HospitalDashboard from './pages/hospital/HospitalDashboard';
import Home from './pages/home/Home';
import UserLogin from './pages/auth/UserLogin';
import HospitalSignup from './pages/auth/HospitalSignUp';
import HospitalLogin from './pages/auth/HospitalLogin';
import UserSignup from './pages/auth/UserSignUp';
import HospitalDetails from './pages/patient/HospitalDetails';
import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointment from "./pages/patient/BookAppointment"

import HospitalNav from './components/navbar/HospitalNav';
import UserNav from './components/navbar/UserNav';
import HospitalProfile from './pages/hospital/HospitalProfile';
import AppointmentList from './pages/hospital/AppointmentList';


function App() {

  const location = useLocation();

    const renderNavBar = () => {
        if (location.pathname === '/') {
            return <Navbar />;
        } else if (location.pathname.startsWith('/hospitaldashboard')) {
            return <HospitalNav />;
        } else if (location.pathname.startsWith('/userdashboard')) {
            return <UserNav />;
        }
        return null; 
    };
  return (
    <>
      <Navbar />
      {/* <HospitalNav/> */}
      {/* <UserNav/> */}
      {/* {renderNavBar()} */}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/usersignup" element={<UserSignup />} />
        <Route path="/userlogin" element={<UserLogin />} />
        <Route path="/hospitalsignup" element={<HospitalSignup />} />
        <Route path="/hospitallogin" element={<HospitalLogin />} />
        <Route path="/hospitaldashboard" element={<HospitalDashboard />} />
        <Route  path ="/hospital-list" element ={<HospitalList/>}/>
        <Route path="/patientdashboard" element={<PatientDashboard />} />
        <Route path="/bookappointment" element={<BookAppointment />} />
        <Route path="/hospitalpage" element={<HospitalProfile/>} />
        <Route path="/schedule" element={<AppointmentList/>} />
        <Route path="/hospital/:id" element={<HospitalDetails />} />

      </Routes></>

  );
}

export default App;