import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import DbRegistrationForm from "../components/Dashboard/DbRegistrationForm";
import Backups from "./Backups";
import Databases from "./Databases";

export default function Dashboard() {
  const [showDbForm, setShowDbForm] = useState(false);
  const [showBackups, setShowBackups] = useState(false);
  const [showDatabases, setShowDatabases] = useState(false);

  const handleShowDbForm = () => {
    setShowDbForm(true);
    setShowBackups(false); // Ensure Backups view is hidden
    setShowDatabases(false); // Ensure Backups view is hidden
  };

  const handleShowBackups = () => {
    setShowBackups(true);
    setShowDbForm(false); // Ensure Registration form is hidden
    setShowDatabases(false); // Ensure Backups view is hidden
  };

  const handleShowDatabases = () => {
    setShowBackups(false);
    setShowDbForm(false); // Ensure Registration form is hidden
    setShowDatabases(true); // Ensure Backups view is hidden
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        onRegisterDb={handleShowDbForm}
        onBackupDb={handleShowBackups}
        onBackupDatabases={handleShowDatabases}
      />
      <main className="lg:ml-64 p-8">
        {showDbForm && (
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Register New Database
            </h1>
            <DbRegistrationForm />
          </div>
        )}

        {showBackups && (
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Database Backups
            </h1>
            <Backups />
          </div>
        )}

        {showDatabases && <Databases />}
      </main>
    </div>
  );
}

{
  /* <Backups /> */
}
