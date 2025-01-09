// src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li>
          <Link to="/backup-management">Backups</Link>
        </li>
        <li>
          <Link to="/archive-management">Archives</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
