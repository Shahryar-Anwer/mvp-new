// import React, { useState } from "react";
// import axios from "axios"; // Import Axios
// import { Database, CheckCircle, XCircle } from "lucide-react";

// function DbRegistrationForm() {
//   const [credentials, setCredentials] = useState({
//     host: "",
//     user: "",
//     password: "",
//     database: "",
//   });
//   const [notification, setNotification] = useState({
//     show: false,
//     success: false,
//     message: "",
//   });

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/register-db", credentials);

//       if (response.data.success) {
//         setNotification({
//           show: true,
//           success: true,
//           message: "Database registered successfully!",
//         });

//         // Clear form
//         setCredentials({
//           host: "",
//           user: "",
//           password: "",
//           database: "",
//         });
//       } else {
//         throw new Error(response.data.message || "Failed to register database");
//       }
//     } catch (error) {
//       console.error("Error registering database:", error);
//       setNotification({
//         show: true,
//         success: false,
//         message:
//           error.response?.data?.message ||
//           error.message ||
//           "Failed to register database",
//       });
//     }

//     // Hide notification after 3 seconds
//     setTimeout(() => {
//       setNotification({ show: false, success: false, message: "" });
//     }, 3000);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCredentials((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
//       {/* Notification Popup */}
//       {notification.show && (
//         <div
//           className={`fixed top-4 right-4 z-50 p-4 rounded-md transform transition-transform duration-300 ${
//             notification.success ? "bg-green-50" : "bg-red-50"
//           } flex items-center gap-2 shadow-md ${
//             notification.show ? "translate-x-0" : "translate-x-full"
//           }`}
//         >
//           {notification.success ? (
//             <CheckCircle className="w-5 h-5 text-green-500" />
//           ) : (
//             <XCircle className="w-5 h-5 text-red-500" />
//           )}
//           <p
//             className={`text-sm ${
//               notification.success ? "text-green-700" : "text-red-700"
//             }`}
//           >
//             {notification.message}
//           </p>
//         </div>
//       )}

//       <div className="flex items-center gap-2 mb-6">
//         <Database className="w-6 h-6 text-blue-600" />
//         <h2 className="text-xl font-semibold text-gray-800">
//           Register New Database
//         </h2>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label
//             htmlFor="host"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Host
//           </label>
//           <input
//             type="text"
//             id="host"
//             name="host"
//             value={credentials.host}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="user"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             User
//           </label>
//           <input
//             type="text"
//             id="user"
//             name="user"
//             value={credentials.user}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             name="password"
//             value={credentials.password}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label
//             htmlFor="database"
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             Database
//           </label>
//           <input
//             type="text"
//             id="database"
//             name="database"
//             value={credentials.database}
//             onChange={handleChange}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
//         >
//           Register Database
//         </button>
//       </form>
//     </div>
//   );
// }

// export default DbRegistrationForm;

import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { Database, CheckCircle, XCircle } from "lucide-react";

function DbRegistrationForm() {
  const [credentials, setCredentials] = useState({
    host: "localhost",
    user: "postgres",
    password: "Ashhad123",
    database: "EasyParseDB",
  });
  const [notification, setNotification] = useState({
    show: false,
    success: false,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = "http://10.0.12.94:45455/api/v1/Backup/CreateBackup";

    try {
      const response = await axios.post(endpoint, {
        postgresPassword: credentials.password,
        postgresUser: credentials.user,
        postgresHost: credentials.host,
        postgresDatabase: credentials.database,
      });

      console.log(response, "response");

      if (response.data.success || response.data) {
        setNotification({
          show: true,
          success: true,
          message: "Backup completed successfully!",
        });
      } else {
        throw new Error(response.data.message || "Failed to complete backup");
      }
    } catch (error) {
      console.error("Error during backup:", error);
      setNotification({
        show: true,
        success: false,
        message:
          error.response?.data?.message ||
          error.message ||
          "Failed to complete backup",
      });
    }

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, success: false, message: "" });
    }, 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md relative">
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

      <div className="flex items-center gap-2 mb-6">
        <Database className="w-6 h-6 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-800">Backup Database</h2>
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
          Backup Database
        </button>
      </form>
    </div>
  );
}

export default DbRegistrationForm;
