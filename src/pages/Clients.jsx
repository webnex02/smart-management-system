import { useEffect, useState } from "react";
import * as clientService from "../services/clientService";

export default function Clients() {

  const [clients, setClients] = useState([]);

  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    project: "",
    amount: "",
    startDate: "",
    status: "Ongoing",
    payment: "Pending",
  });

  // Load Clients
  const loadClients = async () => {
    const data = await clientService.getAll();
    setClients(data);
  };

  useEffect(() => {
    loadClients();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Add Client
  const addClient = async () => {

    if (!form.name || !form.phone) {
      alert("Client Name & Phone Required");
      return;
    }

    await clientService.create(form);

    // Reset Form
    setForm({
      name: "",
      company: "",
      phone: "",
      email: "",
      project: "",
      amount: "",
      startDate: "",
      status: "Ongoing",
      payment: "Pending",
    });

    loadClients();
  };

  // Delete Client
  const deleteClient = async (id) => {

    if (!window.confirm("Delete this client?")) return;

    await clientService.remove(id);
    loadClients();
  };

  return (
    <div className="content dashboard-page">

      <h2>Client Management</h2>

      {/* ================= FORM ================= */}

      <div className="card">

        <h3>Add New Client</h3>

        <input
          name="name"
          placeholder="Client Name"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handleChange}
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="project"
          placeholder="Project Type (Website / App etc)"
          value={form.project}
          onChange={handleChange}
        />

        <input
          name="amount"
          type="number"
          placeholder="Deal Amount (₹)"
          value={form.amount}
          onChange={handleChange}
        />

        <label>Project Start Date</label>

        <input
          name="startDate"
          type="date"
          value={form.startDate}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Ongoing</option>
          <option>Completed</option>
          <option>On Hold</option>
        </select>

        <select
          name="payment"
          value={form.payment}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Partial</option>
          <option>Paid</option>
        </select>

        <button onClick={addClient}>
          Add Client
        </button>

      </div>

      {/* ================= TABLE ================= */}

      <div className="card">

        <h3>Client List</h3>

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Phone</th>
              <th>Project</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {clients.length === 0 && (
              <tr>
                <td colSpan="8" align="center">
                  No Clients Found
                </td>
              </tr>
            )}

            {clients.map((c) => (
              <tr key={c.id}>

                <td>{c.name}</td>
                <td>{c.company}</td>
                <td>{c.phone}</td>
                <td>{c.project}</td>
                <td>₹{c.amount}</td>
                <td>{c.status}</td>
                <td>{c.payment}</td>

                <td>
                  <button
                    style={{ background: "#ef4444" }}
                    onClick={() => deleteClient(c.id)}
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
