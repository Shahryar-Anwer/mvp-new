import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import DbRegistrationForm from "../components/Dashboard/DbRegistrationForm";
import Backups from "../components/Dashboard/Backups";
import Databases from "../components/Dashboard/Databases";

export default function Dashboard() {
  const [showDbForm, setShowDbForm] = useState(true);
  const [showBackups, setShowBackups] = useState(false);
  const [showDatabases, setShowDatabases] = useState(false);

  const handleShowDbForm = () => {
    setShowDbForm(true);
    setShowBackups(false); // Ensure Backups view is hidden
    setShowDatabases(false); // Ensure Backups view is hidden
    console.log("Clicked....");
  };

  const handleShowBackups = () => {
    setShowBackups(true);
    setShowDbForm(false); // Ensure Registration form is hidden
    setShowDatabases(false); // Ensure Backups view is hidden
    console.log("Clicked....1");
  };

  const handleShowDatabases = () => {
    setShowBackups(false);
    setShowDbForm(false); // Ensure Registration form is hidden
    setShowDatabases(true); // Ensure Backups view is hidden
    console.log("Clicked....2");
  };

  return (
    <div className="min-h-screen ">
      <Sidebar
        onRegisterDb={handleShowDbForm}
        onBackupDb={handleShowBackups}
        onBackupDatabases={handleShowDatabases}
      />
      <main className="lg:ml-64 p-8">
        {showDbForm && (
          <div className="flex flex-col items-center max-w-4xl animate-fade-in">
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
