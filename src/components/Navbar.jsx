import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

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
  }, [dropdownRef, setIsDropdownOpen]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <nav className="w-full bg-[#8C705B] text-white p-2.5 fixed top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Lahan Damai - Admin</h1>
        {isLoggedIn && (
          <div className="flex items-center space-x-4">
            <Link to="/artikel-edukasi" className="text-white">Artikel Edukasi</Link>
            <Link to="/laporan-sengketa" className="text-white">Laporan Sengketa</Link>
            <Link to="/daftar-profil" className="text-white">Daftar Profil</Link>
            <Link to="/daftar-ahli-tanah" className="text-white">Daftar Ahli Tanah</Link>
            <div className="relative" ref={dropdownRef}>
              <img
                src="damal.jpg" 
                alt="Profile"
                className="w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              />
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
        )}
      </div>
    </nav>
  );
}

export default Navbar;
