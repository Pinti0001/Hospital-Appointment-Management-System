import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FcHome, FcCalendar, FcReading, FcSms,  FcManager } from "react-icons/fc";
import { FaHospitalUser } from "react-icons/fa";
import HosLogo from "../../assets/HosLogo.jpeg"


const HospitalNav = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleSidebar = () => {
        setIsCollapsed(!isCollapsed);
    };

    return (
        <div
            className={`${isCollapsed ? 'w-16' : 'w-64'
                } bg-gray-800 text-white h-screen fixed flex flex-col transition-width duration-300`}
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
                    icon={<FcReading className="w-6 h-6" />}
                    text="Patient Record"
                    link="/patient-record"
                    isCollapsed={isCollapsed}
                />
                <NavItem
                    icon={<FcSms className="w-6 h-6" />}
                    text="Messages"
                    link="/messages"
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
            <div className={`  ${isCollapsed ? 'px-0' : 'px-4'} ${showDropdown && !isCollapsed ? 'mb-32' : ''} mt-auto mb-10 `} >
                <div className="relative">
                    <button
                        onClick={() => setShowDropdown(!showDropdown)}
                        className="block text-white py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-600 w-full"
                    >
                        {isCollapsed ? <FcManager className="w-6 h-6 mx-auto" /> : "Profile"}
                    </button>
                    {!isCollapsed && showDropdown && (
                        <div className="absolute mt-2 w-full bg-white text-black shadow-lg rounded-md">
                            <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">
                                Profile
                            </Link>
                            <Link to="/logout" className="block px-4 py-2 hover:bg-gray-200">
                                Logout
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const NavItem = ({ icon, text, link, isCollapsed }) => (
    <Link
        to={link}
        className={`flex items-center px-4 py-3 hover:bg-gray-700 ${isCollapsed ? 'justify-center' : ''
            }`}
    >
        {icon}
        {!isCollapsed && <span className="ml-3">{text}</span>}
    </Link>
);

export default HospitalNav;
