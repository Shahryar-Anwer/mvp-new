import React from "react";
import { Link } from "react-router-dom";
import "../styles/Sidebar.scss";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <ul>
        {/* Replace the routes below with real paths once available */}
        <li>
          <Link to="/register-db">Register DB</Link>
        </li>
        <li>
          <Link to="/backups">Backups</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
