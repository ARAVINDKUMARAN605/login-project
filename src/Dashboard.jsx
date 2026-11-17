
import { useState } from "react";
import "./App.css";

function Dashboard({ username, userId, onLogout }) {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAttendance = async (action) => {
    setLoading(true);
    setMessage("Please wait...");

    try {
      const response = await fetch(
        "http://localhost/login-backend/attendance.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: userId,
            action: action,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.message);

    } catch (error) {
      setMessage("Unable to connect to server.");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="login-box">
        <h2>Employee Dashboard</h2>

        <h3>Welcome, {username}!</h3>

        <p>Manage your daily attendance here.</p>

        <button
          disabled={loading}
          onClick={() => handleAttendance("check_in")}
        >
          Check In
        </button>

        <br /><br />

        <button
          disabled={loading}
          onClick={() => handleAttendance("check_out")}
        >
          Check Out
        </button>

        <p>{message}</p>

        <button onClick={onLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
