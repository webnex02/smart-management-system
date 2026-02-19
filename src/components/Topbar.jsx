import { useNavigate } from "react-router-dom";
import * as authService from "../services/authService";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await authService.logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <h3>Smart Management System</h3>
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
}
