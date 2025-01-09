import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import Dashboard from "./pages/Dashboard.jsx";
import Backups from "./components/Dashboard/Backups.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="backups" element={<Backups />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
