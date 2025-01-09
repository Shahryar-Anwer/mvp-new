import React, { useState } from "react";
import { Database, Save, Calendar, ChevronDown } from "lucide-react";

// Generate 20 sample databases
const databases = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  name: `Database ${i + 1}`,
}));

const backupFrequencies = ["Daily", "Weekly", "Monthly"];

export default function Databases() {
  const [selectedDates, setSelectedDates] = useState({});
  const [showCalendar, setShowCalendar] = useState({});
  const [selectedFrequencies, setSelectedFrequencies] = useState({});
  const [showFrequencyDropdown, setShowFrequencyDropdown] = useState({});

  const handleBackup = (dbId) => {
    console.log(`Backing up database ${dbId}`);
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

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 overflow-hidden">
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
                onClick={() => handleBackup(db.id)}
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
