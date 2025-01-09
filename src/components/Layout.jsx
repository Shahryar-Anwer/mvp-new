import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
import "../styles/App.scss"; // Main or layout-specific styles

const Layout = () => {
  return (
    <div className="layout">
      {/* Top navbar (always 100% width) */}
      <NavBar />

      {/* The row containing Sidebar + main content */}
      <div className="layout__body">
        <Sidebar />
        <div className="layout__content">
          {/* The <Outlet> will render whatever child route is active (Home, About, etc.) */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
