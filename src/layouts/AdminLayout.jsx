import React from "react";
import NavBar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/AdminLayout.scss";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      {/* Top NavBar */}
      <NavBar />

      {/* Main Section with Sidebar + content */}
      <div className="admin-layout__body">
        <Sidebar />
        <div className="admin-layout__content">
          {/* The <Outlet /> will render nested routes (Home, RegisterDB, Backups, etc.) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
