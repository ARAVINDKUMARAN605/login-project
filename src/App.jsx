
import { useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loggedUsername, setLoggedUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Please wait...");

    try {
      const response = await fetch(
        `http://localhost/login-backend/${isRegister ? "register.php" : "login.php"}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            email,
            password,
          }),
        }
      );

      const data = await response.json();
      setMessage(data.message);

      if (data.success && isRegister) {
        setUsername("");
        setEmail("");
        setPassword("");
      }

      if (data.success && !isRegister) {
        setUserId(data.user_id);
        setLoggedUsername(data.username);
        setLoggedIn(true);
      }

    } catch (error) {
      setMessage("Unable to connect to server.");
    }
  };

  if (loggedIn) {
    return (
      <Dashboard
        username={loggedUsername}
        userId={userId}
        onLogout={() => {
          setLoggedIn(false);
          setUserId(null);
          setLoggedUsername("");
          setMessage("");
        }}
      />
    );
  }

  return (
    <div className="container">
      <form className="login-box" onSubmit={handleSubmit}>
        <h2>{isRegister ? "Create Account" : "Welcome Back"}</h2>

        {isRegister && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>

        <p>{message}</p>

        <p>
          {isRegister
            ? "Already have an account?"
            : "Don't have an account?"}

          <span onClick={() => {
            setIsRegister(!isRegister);
            setMessage("");
          }}>
            {isRegister ? " Login" : " Register"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default App;
