// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";

// // Layout
// import AdminLayout from "./layouts/AdminLayout";

// // Pages
// import Login from "./pages/Login";
// import Home from "./pages/index";
// import RegisterDB from "./pages/RegisterDB";
// import Backups from "./pages/Backups";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public route for login */}
//         <Route path="/login" element={<Login />} />

//         {/* If someone visits "/", redirect to "/dashboard/home" */}
//         <Route path="/" element={<Navigate to="/dashboard/home" />} />

//         {/* Admin Layout */}
//         <Route path="/dashboard" element={<AdminLayout />}>
//           {/* Nested routes in the Admin Layout */}
//           <Route path="home" element={<Home />} />
//           <Route path="register-db" element={<RegisterDB />} />
//           <Route path="backups" element={<Backups />} />
//         </Route>
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Import pages
import Home from "./pages/index";

// Import the layout (or we can define it right here)
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect the root path to /home (optional) */}
        <Route path="/" element={<Navigate to="/home" />} />

        {/* 
          Use Layout for all other routes that should share 
          the NavBar (top) + Sidebar (left).
        */}
        <Route element={<Layout />}>
          {/* Define child routes that appear in the Layout’s main area */}
          <Route path="/home" element={<Home />} />

          {/* Add more routes: /register-db, /backups, etc. */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
