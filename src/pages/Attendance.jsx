import { useEffect, useState } from "react";
import * as attendanceService from "../services/attendanceService";
import * as employeeService from "../services/employeeService";

export default function Attendance() {
  const [records, setRecords] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  // Load all employees & records
  const loadData = async () => {
    setEmployees(await employeeService.getAll());
    setRecords(await attendanceService.getAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Mark attendance
  const markAttendance = async (employee, status) => {
    if (!employee) return alert("Select an employee first!");
    const date = selectedDate || new Date().toLocaleDateString();
    await attendanceService.create({ employee, status, date });
    setRecords(await attendanceService.getAll());
  };

  // Delete record
  const deleteRecord = async (id) => {
    await attendanceService.remove(id);
    setRecords(await attendanceService.getAll());
  };

  // Filter
  const filteredRecords = records.filter((r) => {
    return (
      (selectedEmployee ? r.employee === selectedEmployee : true) &&
      (selectedDate ? r.date === selectedDate : true)
    );
  });

  return (
    <div className="content">
      <h2>Attendance</h2>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px", flexWrap: "wrap" }}>
        <select
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="">-- Select Employee --</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.name}>{emp.name}</option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <button onClick={() => markAttendance(selectedEmployee, "Present")}>Mark Present</button>
        <button onClick={() => markAttendance(selectedEmployee, "Absent")}>Mark Absent</button>
        <button onClick={() => markAttendance(selectedEmployee, "Leave")}>Mark Leave</button>
      </div>

      {/* Attendance Records */}
      <table>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Status</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRecords.length === 0 ? (
            <tr><td colSpan="4" style={{ textAlign: "center" }}>No records found</td></tr>
          ) : (
            filteredRecords.map((r) => (
              <tr key={r.id}>
                <td>{r.employee}</td>
                <td>{r.status}</td>
                <td>{r.date}</td>
                <td>
                  <button onClick={() => deleteRecord(r.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
