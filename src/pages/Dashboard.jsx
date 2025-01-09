import React from "react";
import Sidebar from "../components/Dashboard/Sidebar";
import Backups from "./Backups";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar />
      <main className="lg:ml-64 p-8">
        <Backups />
      </main>
    </div>
  );
}
