// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import "./styles/styles.scss"; // Import your global Sass

// // Import pages
// import Login from "./pages/Login";
// import Home from "./pages/index";

// // Import components (example: Navbar)
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="container">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />

//           {/* Future routes: Dashboard, Backup Management, etc. */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./styles/styles.scss"; // Main Sass import

// Pages
import Home from "./pages/index";
import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import BackupManagement from "./pages/BackupManagement";
// import ArchiveManagement from "./pages/ArchiveManagement";
// import Settings from "./pages/Settings";

// Components
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* Protected/Admin pages */}
          {/* <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/backup-management" element={<BackupManagement />} />
          <Route path="/archive-management" element={<ArchiveManagement />} />
          <Route path="/settings" element={<Settings />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
