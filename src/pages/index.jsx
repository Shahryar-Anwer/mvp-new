import React from "react";
import Sidebar from "../components/Sidebar"; // import the Sidebar
import "../styles/Home.scss"; // home page styles

function Home() {
  return (
    <div className="home">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="home__content">
        <h1>Welcome to the Dashboard</h1>
        <p>This is your home page with a sidebar for navigation.</p>
      </div>
    </div>
  );
}

export default Home;
