import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HosLogo from "../../assets/HosLogo.jpeg"
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-50">
      <div className="max-w-auto mx-5 flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={HosLogo} alt="Logo" className="h-10" />
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex space-x-8">
          <Link to="/" className="text-white hover:text-orange-400">Home</Link>
          <Link to="/hospital" className="text-white hover:text-orange-400">Hospital</Link>
          <Link to="/service" className="text-white hover:text-orange-400">Service</Link>
          <Link to="/notification" className="text-white hover:text-orange-400">Notifications</Link>
        </div>

        {/* Desktop Login/Signup Button */}
        <div className="hidden sm:block relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-white px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600"
          >
            Login / Sign Up
          </button>
          {showDropdown && (
            <div className="dropdown absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
              <Link to="/hospitallogin" className="block px-4 py-2 hover:bg-gray-200">Hospital Login</Link>
              <Link to="/userlogin" className="block px-4 py-2 hover:bg-gray-200">User Login</Link>
            </div>
          )}
        </div>

        {/* Hamburger Button */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-800 p-4`}>
        <Link to="/" className="block text-white py-2 hover:text-orange-400">Home</Link>
        <Link to="/hospital" className="block text-white py-2 hover:text-orange-400">Hospital</Link>
        <Link to="/service" className="block text-white py-2 hover:text-orange-400">Service</Link>
        <Link to="/notification" className="block text-white py-2 hover:text-orange-400">Notifications</Link>

        {/* Login / Sign Up Button for Mobile */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="block text-white py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-600 w-full"
          >
            Login / Sign Up
          </button>
          {showDropdown && (
            <div className="dropdown mt-2 w-full bg-white text-black shadow-lg rounded-md">
              <Link to="/hospitallogin" className="block px-4 py-2 hover:bg-gray-200">Hospital Login</Link>
              <Link to="/userlogin" className="block px-4 py-2 hover:bg-gray-200">User Login</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
