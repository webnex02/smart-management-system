import { useEffect, useState } from "react";
import * as employeeService from "../services/employeeService";

export default function Employees() {

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    designation: "",
    salary: "",
    joinDate: "",
    status: "Active",
  });

  // Load Employees
  const load = async () => {
    const data = await employeeService.getAll();
    setEmployees(data);
  };

  useEffect(() => {
    load();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add Employee
  const addEmployee = async () => {

    if (!form.name || !form.email) {
      alert("Name & Email Required");
      return;
    }

    await employeeService.create({
      ...form,
      
    });

    // Reset Form
    setForm({
      name: "",
      email: "",
      phone: "",
      department: "",
      designation: "",
      salary: "",
      joinDate: "",
      status: "Active",
    });

    load();
  };

  // Delete Employee
  const deleteEmployee = async (id) => {
    if (window.confirm("Delete this employee?")) {
      await employeeService.remove(id);
      load();
    }
  };

  return (
    <div className="content dashboard-page">

      <h2>Employee Management</h2>

      {/* ================= FORM ================= */}

      <div className="card">

        <h3>Add New Employee</h3>

        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="department"
          placeholder="Department"
          value={form.department}
          onChange={handleChange}
        />

        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
        />

        <input
          name="salary"
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={handleChange}
        />
        
         <div style={{ marginTop: "10px" }}>
  <label style={{ fontSize: "14px", color: "#aaa" }}>
    Join Date
  </label>
      
        
        <input
          name="joinDate"
          type="date"
          value={form.joinDate}
          onChange={handleChange}
        />
        </div>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Active</option>
          <option>Inactive</option>
        </select>

        <button onClick={addEmployee}>
          Add Employee
        </button>

      </div>

      {/* ================= TABLE ================= */}

      <div className="card">

        <h3>Employee List</h3>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Dept</th>
              <th>Post</th>
              <th>Salary</th>
              <th>Join</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {employees.length === 0 && (
              <tr>
                <td colSpan="9" align="center">
                  No Employees Found
                </td>
              </tr>
            )}

            {employees.map((e) => (
              <tr key={e.id}>

                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.phone}</td>
                <td>{e.department}</td>
                <td>{e.designation}</td>
                <td>₹{e.salary}</td>
                <td>{e.joinDate}</td>
                <td>{e.status}</td>

                <td>
                  <button
                    style={{ background: "#ef4444" }}
                    onClick={() => deleteEmployee(e.id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}
