import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="bg-gray-800 p-4 fixed w-full z-50">
      <div className="max-w-auto mx-5 flex items-center justify-between ">
        <div className="flex-shrink-0">
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="h-10" />
          </Link>
        </div>
        <div className="hidden sm:flex space-x-8 ">
          <Link to="/" className="text-white hover:text-orange-400">Home</Link>
          <Link to="/hospital" className="text-white hover:text-orange-400">Hospital</Link>
          <Link to="/service" className="text-white hover:text-orange-400">Service</Link>
          <Link to="/about" className="text-white hover:text-orange-400">About Us</Link>
        </div>
        <div className="hidden sm:block relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="text-white px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600"
          >
            Login / Sign Up
          </button>
          {showDropdown && (
            <div className="dropdown absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md">
              <Link
                to="/hospitallogin"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Hospital Login
              </Link>
              {/* <Link
                to="/hospitalsignup"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Hospital Sign Up
              </Link> */}
              <Link
                to="/userlogin"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                User Login
              </Link>
              {/* <Link
                to="/patient-signup"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                User Sign Up
              </Link> */}
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
      <div
        className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-gray-800 p-4`}
      >
        <Link to="/" className="block text-white py-2 hover:text-orange-400">Home</Link>
        <Link to="/hospital" className="block text-white py-2 hover:text-orange-400">Hospital</Link>
        <Link to="/service" className="block text-white py-2 hover:text-orange-400">Service</Link>
        <Link to="/about" className="block text-white py-2 hover:text-orange-400">About Us</Link>
        <Link
          to="/login"
          className="block text-white py-2 px-4 rounded-md bg-orange-500 hover:bg-orange-600"
        >
          Login / Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

