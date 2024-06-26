import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { getCurrentUser } from "../services/pengguna";
import defaultProfileImage from "../assets/profile_default.png"; // Make sure to import the default image
import { Circles } from 'react-loader-spinner'; // Import the loader spinner

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true); // State to track if data is being fetched
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsFetching(true); // Set fetching state to true before fetching
        const response = await getCurrentUser();
        console.log(response);
        setCurrentUser(response.data);
        setIsFetching(false); // Set fetching state to false after fetching
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setIsFetching(false); // Set fetching state to false in case of error
      }
    };

    if (isLoggedIn) {
      fetchCurrentUser();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="w-full bg-[#8C705B] text-white p-2.5 fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Lahan Damai - Admin</h1>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <Link to="/artikel-edukasi" className="text-white">
              Artikel Edukasi
            </Link>
            <Link to="/laporan-sengketa" className="text-white">
              Laporan Sengketa
            </Link>
            <Link to="/daftar-profil" className="text-white">
              Daftar Profil
            </Link>
            <Link to="/daftar-ahli" className="text-white">
              Daftar Ahli Tanah
            </Link>
            <Link to="/forum" className="text-white">
              Forum
            </Link>
            <div className="relative" ref={dropdownRef}>
              {isFetching ? (
                <Circles
                  height="40"
                  width="40"
                  color="#ffffff"
                  ariaLabel="loading"
                />
              ) : (
                <img
                  src={currentUser?.foto || defaultProfileImage}
                  alt="Profile"
                  className="w-10 h-10 rounded-full cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
              )}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <button
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Link to="/login" className="text-white">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
