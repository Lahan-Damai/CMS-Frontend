import React, { useEffect } from 'react';

function Home({ setIsLoggedIn }) {
  useEffect(() => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  }, [setIsLoggedIn]);

  return (
    <div className="container mx-auto mt-20 p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to Lahan Damai Admin</h1>
      <p>Please use the navigation menu to access different sections.</p>
    </div>
  );
}

export default Home;