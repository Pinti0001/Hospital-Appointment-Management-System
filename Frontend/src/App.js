import './App.css';
import {Routes, Route} from "react-router-dom"
import Navbar from "./components/navbar/Navbar";
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import HospitalDashboard from './pages/hospital/HospitalDashboard';
import BookAppointment from './pages/patient/BookAppointment';
import AboutUs from './pages/about/AboutUs';
import Home from './pages/home/Home';

function App() {
  return (
   <>
    <Navbar/>
   <Routes>
    <Route path="/" element={<Home/>}/> 
    <Route path="/signup" element={<SignUp/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/hospitaldashboard" element={<HospitalDashboard/>}/>
    <Route path="/bookappointment" element={<BookAppointment/>}/>

   </Routes></>

  );
}

export default App;