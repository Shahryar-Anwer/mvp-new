import React, { useState } from "react";

function RegisterDB() {
  const [formData, setFormData] = useState({
    host: "",
    database: "",
    user: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: call your .NET backend API here
    console.log("Register DB form submitted:", formData);
  };

  return (
    <div>
      <h2>Register New Database</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Host
          <input
            type="text"
            name="host"
            value={formData.host}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Database
          <input
            type="text"
            name="database"
            value={formData.database}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          User
          <input
            type="text"
            name="user"
            value={formData.user}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <label>
          Password
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <br />

        <button type="submit">Register DB</button>
      </form>
    </div>
  );
}

export default RegisterDB;
