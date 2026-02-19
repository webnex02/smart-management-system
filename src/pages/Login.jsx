import { useState } from "react";
import { login } from "../services/authService";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await login(email, password);
      window.location.href = "/";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form login-animate">
        <h2>Admin Login</h2>

        <input
          type="text"
          placeholder="Email"
          className="input-animate"
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Password"
          className="input-animate"
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="button" 
        onClick={handleLogin}
        className="login-btn"
        >

          Login
        </button>
      </form>
    </div>
  );
}
