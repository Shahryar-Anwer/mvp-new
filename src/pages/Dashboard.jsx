import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import DbRegistrationForm from "../components/Dashboard/DbRegistrationForm";
import Backups from "./Backups";

export default function Dashboard() {
  const [showDbForm, setShowDbForm] = useState(false);
  const [showBackups, setShowBackups] = useState(false);

  const handleShowDbForm = () => {
    setShowDbForm(true);
    setShowBackups(false); // Ensure Backups view is hidden
  };

  const handleShowBackups = () => {
    setShowBackups(true);
    setShowDbForm(false); // Ensure Registration form is hidden
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar onRegisterDb={handleShowDbForm} onBackupDb={handleShowBackups} />
      <main className="lg:ml-64 p-8">
        {showDbForm ? (
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Register New Database
            </h1>
            <DbRegistrationForm />
          </div>
        ) : showBackups ? (
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Database Backups
            </h1>
            <Backups />
          </div>
        ) : (
          <div className="max-w-4xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Welcome to Dashboard
            </h1>
            <p className="text-gray-600">
              This is your main content area. The sidebar is fully responsive -
              try resizing your browser window or viewing on a mobile device!
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

{
  /* <Backups /> */
}
