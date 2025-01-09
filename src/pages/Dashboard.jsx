import React, { useState } from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import DbRegistrationForm from "../components/Dashboard/DbRegistrationForm";

export default function Dashboard() {
  const [showDbForm, setShowDbForm] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar onRegisterDb={() => setShowDbForm(true)} />
      <main className="lg:ml-64 p-8">
        {showDbForm ? (
          <div className="max-w-4xl animate-fade-in">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Register New Database
            </h1>
            <DbRegistrationForm />
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
