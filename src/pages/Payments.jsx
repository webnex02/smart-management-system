import { useEffect, useState } from "react";
import * as paymentService from "../services/paymentService";
import * as clientService from "../services/clientService";

export default function Payments() {
  const [payments, setPayments] = useState([]);
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    id: null,
    clientId: "",
    amount: "",
    date: new Date().toISOString().slice(0, 10), // default today
    method: "Cash",
    notes: "",
  });
  const [search, setSearch] = useState("");

  // Load payments & clients
  const loadData = async () => {
    const allPayments = await paymentService.getAll();
    const allClients = await clientService.getAll();
    setPayments(allPayments);
    setClients(allClients);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.clientId) return alert("Select a client!");
    if (!form.amount || !form.date) return alert("Fill required fields!");

    if (form.id) {
      await paymentService.update(form.id, form);
    } else {
      await paymentService.create(form);
    }

    setForm({
      id: null,
      clientId: "",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      method: "Cash",
      notes: "",
    });

    loadData();
  };

  const handleEdit = (payment) => {
    setForm(payment);
  };

  const handleDelete = async (id) => {
    await paymentService.remove(id);
    loadData();
  };

  // Filtered Payments
  const filtered = payments.filter((p) => {
    const client = clients.find((c) => c.id === Number(p.clientId));
    return (
      client?.name.toLowerCase().includes(search.toLowerCase()) ||
      p.amount.toString().includes(search) ||
      p.date.includes(search)
    );
  });

  return (
    <div className="content p-6 bg-bgDark min-h-screen">
      <h2 className="text-2xl text-white font-semibold mb-4">Payments</h2>

      {/* Payment Form */}
      <div className="card bg-cardBg p-4 rounded-xl mb-6">
        <h3 className="text-white font-medium mb-3">
          {form.id ? "Edit Payment" : "Add Payment"}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <select
            name="clientId"
            value={form.clientId}
            onChange={handleInputChange}
          >
            <option value="">Select Client</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={form.amount}
            onChange={handleInputChange}
          />

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleInputChange}
          />

          <select
            name="method"
            value={form.method}
            onChange={handleInputChange}
          >
            <option>Cash</option>
            <option>Bank</option>
            <option>Online</option>
          </select>

          <input
            type="text"
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleInputChange}
            className="sm:col-span-2 lg:col-span-4"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {form.id ? "Update Payment" : "Add Payment"}
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by client, amount, date..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 rounded w-full"
      />

      {/* Payments Table */}
      <table className="w-full text-white border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2">Client</th>
            <th className="border-b p-2">Amount</th>
            <th className="border-b p-2">Date</th>
            <th className="border-b p-2">Method</th>
            <th className="border-b p-2">Notes</th>
            <th className="border-b p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((p) => {
            const client = clients.find((c) => c.id === Number(p.clientId));
            return (
              <tr key={p.id} className="hover:bg-gray-800">
                <td className="border-b p-2">{client ? client.name : "Unknown"}</td>
                <td className="border-b p-2">₹{p.amount}</td>
                <td className="border-b p-2">{p.date}</td>
                <td className="border-b p-2">{p.method}</td>
                <td className="border-b p-2">{p.notes}</td>
                <td className="border-b p-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="mr-2 bg-yellow-500 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-500 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
