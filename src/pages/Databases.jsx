import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Database,
  Save,
  Calendar,
  ChevronDown,
  CheckCircle,
  XCircle,
} from "lucide-react";

const backupFrequencies = ["Daily", "Weekly", "Monthly"];

export default function Databases() {
  const [databases, setDatabases] = useState([]); // Dynamically fetched databases
  const [selectedDates, setSelectedDates] = useState({});
  const [showCalendar, setShowCalendar] = useState({});
  const [selectedFrequencies, setSelectedFrequencies] = useState({});
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState({});
  const [notification, setNotification] = useState({
    show: false,
    success: false,
    message: "",
  });
  const [loading, setLoading] = useState(true);

  // Fetch databases from an API
  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const response = await axios.get(
          "http://10.0.12.94:45455/api/v1/Backup"
        ); // Replace with your API endpoint

        setDatabases(response.data); // Assuming the API returns a list of databases
        setLoading(false);
      } catch (error) {
        console.error("Error fetching databases:", error);
        setLoading(false);
      }
    };

    fetchDatabases();
  }, []);

  const handleBackup = async (dbId, connectionStringDB) => {
    const date = selectedDates[dbId];
    const frequency = selectedFrequencies[dbId];

    // if (!date || !frequency) {
    //   setNotification({
    //     show: true,
    //     success: false,
    //     message: "Please select both a date and a frequency before backing up.",
    //   });
    //   setTimeout(() => {
    //     setNotification({ show: false, success: false, message: "" });
    //   }, 3000);
    //   return;
    // }

    console.log(connectionStringDB, "connectionStringDB");

    const connectionStringEncoded = encodeURIComponent(connectionStringDB); // Encode the connection string to ensure it's URL-safe
    const endpoint = `http://10.0.12.94:45455/api/v1/Backup/CreateBackup?ConnectionString=${connectionStringEncoded}`;

    try {
      const response = await axios.post(endpoint); // Use POST without a request body
      console.log(response, "response from create Backup");
      setNotification({
        show: true,
        success: true,
        message: `Backup initiated successfully for database ${dbId}.`,
      });
    } catch (error) {
      console.error("Error initiating backup:", error);
      setNotification({
        show: true,
        success: false,
        message: "Failed to initiate backup. Please try again.",
      });
    }

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, success: false, message: "" });
    }, 3000);
  };

  const handleDateSelect = (dbId, date) => {
    setSelectedDates((prev) => ({ ...prev, [dbId]: date }));
    setShowCalendar((prev) => ({ ...prev, [dbId]: false }));
  };

  const handleFrequencySelect = (dbId, frequency) => {
    setSelectedFrequencies((prev) => ({ ...prev, [dbId]: frequency }));
    setShowFrequencyDropdown((prev) => ({ ...prev, [dbId]: false }));
  };

  const toggleFrequencyDropdown = (dbId) => {
    setShowFrequencyDropdown((prev) => ({
      ...prev,
      [dbId]: !prev[dbId],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
      {/* Notification Popup */}
      {notification.show && (
        <div
          className={`fixed top-4 right-4 z-50 p-4 rounded-md transform transition-transform duration-300 ${
            notification.success ? "bg-green-50" : "bg-red-50"
          } flex items-center gap-2 shadow-md ${
            notification.show ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {notification.success ? (
            <CheckCircle className="w-5 h-5 text-green-500" />
          ) : (
            <XCircle className="w-5 h-5 text-red-500" />
          )}
          <p
            className={`text-sm ${
              notification.success ? "text-green-700" : "text-red-700"
            }`}
          >
            {notification.message}
          </p>
        </div>
      )}

      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Database className="h-5 w-5" />
        Database Management
      </h2>

      <div className="space-y-4">
        {databases.map((db) => (
          <div
            key={db.id}
            className="grid grid-cols-[1fr,auto] items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Database className="h-5 w-5 text-gray-600" />
              <span className="font-medium text-gray-900">{db.name}</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Backup Button */}
              <button
                onClick={() => handleBackup(db.id, db.connectionStringDB)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
              >
                <Save className="h-4 w-4" />
                Backup
              </button>

              {/* Frequency Dropdown */}
              <div className="relative">
                <button
                  onClick={() => toggleFrequencyDropdown(db.id)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  {selectedFrequencies[db.id] || "Select Frequency"}
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showFrequencyDropdown[db.id] && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                    {backupFrequencies.map((frequency) => (
                      <button
                        key={frequency}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg"
                        onClick={() => handleFrequencySelect(db.id, frequency)}
                      >
                        {frequency}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Date Selector */}
              <div className="relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-gray-900">
                  <Calendar className="h-4 w-4" />
                  <input
                    type="date"
                    value={selectedDates[db.id] || ""}
                    onChange={(e) => handleDateSelect(db.id, e.target.value)}
                    className="border-none bg-transparent p-0 focus:outline-none cursor-pointer"
                    placeholder="Select Date"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
