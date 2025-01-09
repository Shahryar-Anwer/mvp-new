import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.scss";

// Example logo (placeholder). Replace with your own image/logo.
const appLogoUrl = "https://via.placeholder.com/150?text=App+Logo";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar__logo">
        <img src={appLogoUrl} alt="App Logo" />
      </div>

      <ul className="sidebar__nav">
        <li>
          <Link to="/home">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        {/* Add more links: /register-db, /backups, etc. */}
      </ul>
    </aside>
  );
};

export default Sidebar;
