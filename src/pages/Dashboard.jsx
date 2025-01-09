import React from "react";
import Sidebar from "../components/Dashboard/Sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <main className="lg:ml-64 p-8">
        <div className="max-w-4xl">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Welcome to Dashboard
          </h1>
          <p className="text-gray-600">
            This is your main content area. The sidebar is fully responsive -
            try resizing your browser window or viewing on a mobile device!
          </p>
        </div>
      </main>
    </div>
  );
}
