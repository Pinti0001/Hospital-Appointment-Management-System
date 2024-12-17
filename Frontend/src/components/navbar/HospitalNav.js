import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FcHome,
  FcCalendar,
  FcReading,
  FcSms,
  FcManager,
} from "react-icons/fc";
import { FaHospitalUser } from "react-icons/fa";
import HosLogo from "../../assets/HosLogo.jpeg";
import { useDispatch } from "react-redux";
import { logout } from "../../slice/hospitalInfo";

const HospitalNav = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false); // State for mobile nav toggle
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Clear Redux state
    navigate("/");
  };

  return (
    <div>
      {/* Mobile Hamburger Icon and Sidebar for Mobile */}
      <div className="md:hidden  relative  ">
        <button
          onClick={toggleMobileNav}
          className="text-4xl fixed top-3 left-5 z-50"
        >
          ☰
        </button>
        {isMobileNavOpen && (
          <div
            className={`fixed top-0 left-0 w-full h-screen bg-gray-800 text-white z-50`}
            style={{ zIndex: 999 }}
          >
            <div className="flex justify-between items-center p-3">
              <Link to="/hospitaldashboard">
                <img src={HosLogo} alt="Logo" className="h-10" />
              </Link>
              <button onClick={toggleMobileNav} className="text-white text-3xl">
                X
              </button>
            </div>

            <div className="flex flex-col space-y-4 px-4 mt-4">
              <NavItem
                icon={<FcHome className="w-6 h-6" />}
                text="Home"
                link="/hospitaldashboard"
                isCollapsed={false}
                onClick={toggleMobileNav} // Close on click
              />
              <NavItem
                icon={<FcCalendar className="w-6 h-6" />}
                text="Today's Schedule"
                link="/schedule"
                isCollapsed={false}
                onClick={toggleMobileNav} // Close on click
              />
              <NavItem
                icon={<FaHospitalUser className="w-6 h-6" />}
                text="Hospital Profile"
                link="/hospitalpage"
                isCollapsed={false}
                onClick={toggleMobileNav} // Close on click
              />
              <NavItem
                icon={<FcManager className="w-6 h-6" />}
                text="Staff Management"
                link="/staff"
                isCollapsed={false}
                onClick={toggleMobileNav} // Close on click
              />
            </div>

            <div className="px-4 py-2 mt-auto">
              <button
                onClick={() => {
                  handleLogout();
                  toggleMobileNav(); // Close on logout
                }}
                className="w-full text-center text-white bg-orange-500 hover:bg-orange-600 py-2 rounded-md"
              >
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Sidebar for Desktop */}
      <div
        className={`hidden md:flex ${
          isCollapsed ? "w-16" : "w-64"
        } bg-gray-800 text-white h-screen fixed flex-col transition-width duration-300`}
      >
        {/* Toggle and Logo Section */}
        <div className="flex items-center space-x-32 p-3">
          {!isCollapsed && (
            <div className="flex-shrink-0 mb-10">
              <Link to="/hospitaldashboard">
                <img src={HosLogo} alt="Logo" className="h-10" />
              </Link>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="hover:bg-gray-700 text-4xl focus:outline-none p-2 pb-4 rounded"
          >
            ☰
          </button>
        </div>

        {/* Sidebar Menu Links */}
        <div className="flex flex-col mt-4 space-y-4">
          <NavItem
            icon={<FcHome className="w-6 h-6" />}
            text="Home"
            link="/hospitaldashboard"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<FcCalendar className="w-6 h-6" />}
            text="Today's Schedule"
            link="/schedule"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<FaHospitalUser className="w-6 h-6" />}
            text="Hospital Profile"
            link="/hospitalpage"
            isCollapsed={isCollapsed}
          />
          <NavItem
            icon={<FcManager className="w-6 h-6" />}
            text="Staff Management"
            link="/staff"
            isCollapsed={isCollapsed}
          />
        </div>

        {/* Profile/Logout Section */}
        <div
          className={` ${isCollapsed ? "px-0" : "px-4"} ${
            showDropdown && !isCollapsed ? "mb-32" : ""
          } mt-auto mb-10 `}
        >
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="block text-white py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-600 w-full"
            >
              {isCollapsed ? (
                <FcManager className="w-6 h-6 mx-auto" />
              ) : (
                "Profile"
              )}
            </button>
            {!isCollapsed && showDropdown && (
              <div className="absolute mt-2 w-full bg-white text-black text-center shadow-lg rounded-md">
                <Link
                  to="/hospitalpage"
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Profile
                </Link>
                <button
                  className="block px-4 py-2 w-full hover:bg-gray-200"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// const NavItem = ({ icon, text, link, isCollapsed }) => (
//     <Link
//         to={link}
//         className={`flex items-center px-4 py-3 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''
//             }`}
//     >
//         {icon}
//         {!isCollapsed && <span className="ml-3">{text}</span>}
//     </Link>
// );
const NavItem = ({ icon, text, link, isCollapsed, onClick }) => (
  <Link
    to={link}
    onClick={onClick} // Close the sidebar on click
    className={`flex items-center px-4 py-3 hover:bg-gray-700 ${
      isCollapsed ? "justify-center" : ""
    }`}
  >
    {icon}
    {!isCollapsed && <span className="ml-3">{text}</span>}
  </Link>
);

export default HospitalNav;
