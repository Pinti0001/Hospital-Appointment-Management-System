import './App.css';
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/navbar/Navbar";
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import BookAppointment from './pages/patient/BookAppointment';
import Home from './pages/home/Home';
import UserLogin from './pages/auth/UserLogin';
import HospitalSignup from './pages/auth/HospitalSignUp';
import HospitalLogin from './pages/auth/HospitalLogin';
import UserSignup from './pages/auth/UserSignUp';

function App() {
  return (
   <>
    <Navbar/>
   <Routes>
    <Route path="/" element={<Home/>}/> 
    <Route path="/usersignup" element={<UserSignup/>}/>
    <Route path="/userlogin" element={<UserLogin/>}/>
    <Route path="/hospitalsignup" element={<HospitalSignup/>}/>
    <Route path="/hospitallogin" element={<HospitalLogin/>}/>
    <Route path="/hospitaldashboard" element={<HospitalDashboard/>}/>
    <Route path="/bookappointment" element={<BookAppointment/>}/>

   </Routes></>

  );
}

export default App;