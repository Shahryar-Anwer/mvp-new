import React, { useState } from "react";
import { Database } from "lucide-react";

function DbRegistrationForm() {
  const [credentials, setCredentials] = useState({
    host: "",
    user: "",
    password: "",
    database: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register-db", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to register database");
      }

      // Clear form after successful submission
      setCredentials({
        host: "",
        user: "",
        password: "",
        database: "",
      });

      alert("Database registered successfully!");
    } catch (error) {
      console.error("Error registering database:", error);
      alert("Failed to register database");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="flex items-center gap-2 mb-6">
        <Database className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">
          Register New Database
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="host"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Host
          </label>
          <input
            type="text"
            id="host"
            name="host"
            value={credentials.host}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="user"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            User
          </label>
          <input
            type="text"
            id="user"
            name="user"
            value={credentials.user}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="database"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Database
          </label>
          <input
            type="text"
            id="database"
            name="database"
            value={credentials.database}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Register Database
        </button>
      </form>
    </div>
  );
}

export default DbRegistrationForm;
