import React from "react";
import { Link, useNavigate } from "react-router-dom";

function PageNotFound({ isLoggedIn }) {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">That's an error.</p>
      <p className="text-xl text-gray-600 mb-8">
        The requested URL was not found on this server.
      </p>
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {isLoggedIn ? "Go to Dashboard" : "Go to Homepage"}
      </button>
    </div>
  );
}

export default PageNotFound;
