import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Sidebar() {

  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button className="menu-btn" onClick={() => setOpen(!open)}>
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${open ? "show" : ""}`}>
        <h2>Webnex Admin</h2>

        <nav onClick={() => setOpen(false)}>
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink>
          <NavLink to="/employees" className={({ isActive }) => isActive ? "active" : ""}>Employees</NavLink>
          <NavLink to="/clients" className={({ isActive }) => isActive ? "active" : ""}>Clients</NavLink>
          <NavLink to="/tasks" className={({ isActive }) => isActive ? "active" : ""}>Tasks</NavLink>
          <NavLink to="/attendance" className={({ isActive }) => isActive ? "active" : ""}>Attendance</NavLink>
          <NavLink to="/payments" className={({ isActive }) => isActive ? "active" : ""}>Payments</NavLink>
          <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>Settings</NavLink>
        </nav>
      </aside>
    </>
  );
}
