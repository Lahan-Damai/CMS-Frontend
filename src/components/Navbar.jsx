import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../services/auth";
import { getCurrentUser } from "../services/pengguna";
import defaultProfileImage from "../assets/profile_default.png";
import { Circles } from "react-loader-spinner";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("/dashboard");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        setIsFetching(true);
        const response = await getCurrentUser();
        setCurrentUser(response.data);
        setIsFetching(false);
      } catch (error) {
        console.error("Failed to fetch current user:", error);
        setIsFetching(false);
      }
    };

    if (isLoggedIn) {
      fetchCurrentUser();
      if (location.pathname === "/login") {
        navigate("/dashboard");
      }
    }
  }, [isLoggedIn, navigate, location.pathname]);

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

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
      setIsDropdownOpen(false); 
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleLogoClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
      setActiveLink("/dashboard");
    } else {
      navigate("/");
      setActiveLink("/");
    }
  };

  const linkClasses = (path) =>
    `px-4 py-2 ${
      activeLink === path
        ? "bg-white text-[#8C705B] font-bold"
        : "text-white hover:bg-[#6f4e3c] hover:text-white"
    } rounded`;

  return (
    <nav className="w-full bg-[#8C705B] text-white p-2.5 fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          <Link to={isLoggedIn ? "/dashboard" : "/"} onClick={handleLogoClick}>
            {isLoggedIn ? "Lahan Damai - Admin" : "Lahan Damai"}
          </Link>
        </h1>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <Link
              to="/artikel-edukasi"
              className={linkClasses("/artikel-edukasi")}
              onClick={() => setActiveLink("/artikel-edukasi")}
            >
              Artikel Edukasi
            </Link>
            <Link
              to="/laporan-sengketa"
              className={linkClasses("/laporan-sengketa")}
              onClick={() => setActiveLink("/laporan-sengketa")}
            >
              Laporan Sengketa
            </Link>
            <Link
              to="/daftar-profil"
              className={linkClasses("/daftar-profil")}
              onClick={() => setActiveLink("/daftar-profil")}
            >
              Daftar Profil
            </Link>
            <Link
              to="/daftar-ahli"
              className={linkClasses("/daftar-ahli")}
              onClick={() => setActiveLink("/daftar-ahli")}
            >
              Daftar Ahli Tanah
            </Link>
            <Link
              to="/forum"
              className={linkClasses("/forum")}
              onClick={() => setActiveLink("/forum")}
            >
              Forum
            </Link>
            <Link
              to="/chatbot"
              className={linkClasses("/chatbot")}
              onClick={() => setActiveLink("/chatbot")}
            >
              Context File
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
          <Link
            to="/login"
            className={linkClasses("/login")}
            onClick={() => setActiveLink("/login")}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
