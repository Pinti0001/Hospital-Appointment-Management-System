import './App.css';
import { Routes, Route } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState, useEffect } from "react";
import { io } from 'socket.io-client';

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
import PtMessages from './pages/patient/PtMessages';
import PatientProfile from './pages/patient/PatientProfile';
import Footer from './components/footer/Footer';
import CreateDoctor from './pages/hospital/DoctorInfo';
import DoctorList from './pages/hospital/Staff';

const socket = io("http://localhost:8070"); // Connect to the server


function App() {
    const hospitalIdFromStore = useSelector((state) => state.hospitalInfo.hospitalObjectId);
    const userIdFromStore = useSelector((state) => state.userInfo.userObjectId);

    const [hospitalObjectId, setHospitalObjectId] = useState(null);
    const [userObjectId, setUserObjectId] = useState(null);
    const [appointmentUpdate, setAppointmentUpdate] = useState(null);

    useEffect(() => {
        setHospitalObjectId(hospitalIdFromStore);
        setUserObjectId(userIdFromStore);

        socket.on('appointmentUpdate', (data) => {
            setAppointmentUpdate(data); // Update state with new appointment info
        });

        // Clean up on unmount
        return () => {
            socket.off('appointmentUpdate');
        };
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
                <Route path="/hospital/:hospitalId" element={<HospitalDetails />} />
                <Route path="/ptmessages" element={<PtMessages />} />
                <Route path="/patientprofile" element={<PatientProfile />} />
                <Route path="/add-doctor" element={<CreateDoctor />} />
                <Route path="/staff" element={<DoctorList />} />
            </Routes>

            <Footer className={`${isSidebarNav ? 'ml-0 md:ml-[256px]' : 'ml-0'}`} />

            {/* Display real-time appointment update */}
            {appointmentUpdate && (
                <div className="notification">
                    <p>New appointment update: {appointmentUpdate.details}</p>
                </div>
            )}
        </>
    );
}

export default App;
