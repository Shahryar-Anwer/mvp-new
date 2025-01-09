import React, { useEffect, useState } from "react";

function Backups() {
  const [backups, setBackups] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Example GET request to your .NET backend
    // e.g., fetch("https://your-backend/api/backups")
    fetch("/api/backups")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error fetching backups.");
        }
        return res.json();
      })
      .then((data) => {
        setBackups(data);
      })
      .catch((err) => {
        setError(err.message || "Something went wrong.");
      });
  }, []);

  return (
    <div>
      <h2>Backups</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {backups.length === 0 && !error ? (
        <p>No backups found.</p>
      ) : (
        <ul>
          {backups.map((backup) => (
            <li key={backup.id}>
              {/* Adjust to the structure of your backup object */}
              <strong>{backup.name}</strong> - {backup.date}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Backups;
