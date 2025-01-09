// import React from "react";
// import { Database, RotateCcw } from "lucide-react";

// const databases = [
//   { id: 1, name: "Production DB" },
//   { id: 2, name: "Development DB 1" },
//   { id: 3, name: "Development DB 2" },
//   { id: 4, name: "Development DB 3" },
//   { id: 5, name: "Development DB 4" },
//   { id: 6, name: "Development DB 5" },
//   { id: 7, name: "Development DB 6" },
//   { id: 8, name: "Development DB 7" },
//   { id: 9, name: "Development DB 8" },
//   { id: 10, name: "Development DB 9" },
//   { id: 11, name: "Development DB 10" },
//   { id: 12, name: "Development DB 11" },
//   { id: 13, name: "Development DB 12" },
// ];

// export default function Backup() {
//   const handleRestore = (dbName) => {
//     console.log(`Restoring database: ${dbName}`);
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-6">
//       <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
//         <Database className="h-5 w-5" />
//         Database Management
//       </h2>

//       <div className="space-y-4">
//         {databases.map((db) => (
//           <div
//             key={db.id}
//             className="grid grid-cols-2 items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
//           >
//             <div className="flex items-center gap-3">
//               <Database className="h-5 w-5 text-gray-600" />
//               <span className="font-medium text-gray-900">{db.name}</span>
//             </div>
//             <div className="flex justify-end">
//               <button
//                 onClick={() => handleRestore(db.name)}
//                 className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
//               >
//                 <RotateCcw className="h-4 w-4" />
//                 Restore
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Database, RotateCcw } from "lucide-react";
import api from "../../services/api";
export default function Backup() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBackups = async () => {
      try {
        // const response = await axios.get(
        //   "http://10.0.12.94:45455/api/v1/Backup/getData"
        // );
        const response = await api.get("/getData");
        if (response.data.success) {
          setBackups(response.data.data);
        } else {
          setError("Failed to fetch backups.");
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "An error occurred while fetching backups."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBackups();
  }, []);

  const handleRestore = (dbName) => {
    console.log(`Restoring database: ${dbName}`);
    // Add restore logic here if needed
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Database className="h-5 w-5" />
        Database Backups
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading backups...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : backups.length === 0 ? (
        <p className="text-gray-600">No backups available.</p>
      ) : (
        <div className="space-y-4">
          {backups.map((backup) => (
            <div
              key={backup.id}
              className="grid grid-cols-2 items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Database className="h-5 w-5 text-gray-600" />
                <span className="font-medium text-gray-900">
                  {backup.postgresDatabase}
                </span>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={() => handleRestore(backup.postgresDatabase)}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  <RotateCcw className="h-4 w-4" />
                  Restore
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
