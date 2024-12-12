import './App.css';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";

import Navbar from "./components/navbar/Navbar";
import HospitalNav from './components/navbar/HospitalNav';
import UserNav from './components/navbar/UserNav';

import Home from './pages/home/Home';
import UserLogin from './pages/auth/UserLogin';
import UserSignup from './pages/auth/UserSignUp';
import HospitalSignup from './pages/auth/HospitalSignUp';
import HospitalLogin from './pages/auth/HospitalLogin';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import HospitalList from './pages/patient/HospitalList';
import HospitalDetails from './pages/patient/HospitalDetails';
import PatientDashboard from './pages/patient/PatientDashboard';
import BookAppointment from "./pages/patient/BookAppointment";
import HospitalProfile from './pages/hospital/HospitalProfile';
import AppointmentList from './pages/hospital/AppointmentList';
import Messages from './pages/patient/Messages';
import PatientProfile from './pages/patient/PatientProfile';
import Footer from './components/footer/Footer';

function App() {
    const hospitalIdFromStore = useSelector((state) => state.hospitalInfo.hospitalObjectId);
    const userIdFromStore = useSelector((state) => state.userInfo.userObjectId);

    const [hospitalObjectId, setHospitalObjectId] = useState(null);
    const [userObjectId, setUserObjectId] = useState(null);

    useEffect(() => {
        setHospitalObjectId(hospitalIdFromStore);
        setUserObjectId(userIdFromStore);
    }, [hospitalIdFromStore, userIdFromStore]);

    const renderNavBar = () => {
        if (hospitalObjectId) {
            return <HospitalNav />;
        } else if (userObjectId) {
            return <UserNav />;
        } else {
            return <Navbar />;
        }
    };

    const isSidebarNav = hospitalObjectId || userObjectId;

    return (
        <>
            {renderNavBar()}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/usersignup" element={<UserSignup />} />
                <Route path="/userlogin" element={<UserLogin />} />
                <Route path="/hospitalsignup" element={<HospitalSignup />} />
                <Route path="/hospitallogin" element={<HospitalLogin />} />
                <Route path="/hospitaldashboard" element={<HospitalDashboard />} />
                <Route path="/hospital-list" element={<HospitalList />} />
                <Route path="/patientdashboard" element={<PatientDashboard />} />
                <Route path="/bookappointment/:hospitalId/:doctorId" element={<BookAppointment />} />
                <Route path="/hospitalpage" element={<HospitalProfile />} />
                <Route path="/schedule" element={<AppointmentList />} />
                <Route path="/hospital/:id" element={<HospitalDetails />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/patientprofile" element={<PatientProfile />} />
            </Routes>

            <Footer className={isSidebarNav ? 'ml-[256px]' : ''} />
        </>
    );
}

export default App;
