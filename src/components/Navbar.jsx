import React from "react";
import "../styles/NavBar.scss";

const NavBar = () => {
  const handleLogout = () => {
    // handle logout logic
    console.log("Logging out...");
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">My Backup App</div>
      <button className="navbar__logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavBar;
