import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

import * as employeeService from "../services/employeeService";
import * as clientService from "../services/clientService";
import * as taskService from "../services/taskService";
import * as paymentService from "../services/paymentService";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
);

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [clients, setClients] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [payments, setPayments] = useState([]);

 useEffect(() => {
  const loadData = async () => {
    const emps = await employeeService.getAll();
    const cls = await clientService.getAll();
    const tsks = await taskService.getAll();
    const pays = await paymentService.getAll();

    setEmployees(emps);
    setClients(cls);
    setTasks(tsks);
    setPayments(pays);
  };

  loadData();
}, []);

  /* Safe Tasks */
  const safeTasks = Array.isArray(tasks) ? tasks : [];
  const completed = safeTasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status !== "Completed").length;

  /* Total Revenue from Clients */
  const totalRevenue = clients.reduce(
    (sum, c) => sum + Number(c.amount || 0),
    0
  );

  /* ----- Bar Chart Data ----- */
  const barData = {
    labels: ["Employees", "Clients", "Tasks", "Payments"],
    datasets: [
      {
        label: "System Data",
        data: [employees.length, clients.length, tasks.length, payments.length],
        backgroundColor: ["#2563eb", "#22c55e", "#f97316", "#eab308"],
        borderColor: ["#2563eb", "#22c55e", "#f97316", "#eab308"],
        borderWidth: 1,
      },
    ],
  };

  /* ----- Pie Chart Data ----- */
  const pieData = {
    labels: ["Completed", "Pending"],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ["#22c55e", "#f97316"],
        borderColor: ["#111827", "#111827"],
        borderWidth: 1,
      },
    ],
  };

  /* ----- Chart Options for Dark Theme ----- */
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#f8fafc", // text color for dark theme
          font: { size: 14, weight: "500" },
        },
      },
      tooltip: {
        bodyColor: "#f8fafc",
        titleColor: "#f8fafc",
      },
    },
    scales: {
      x: {
        ticks: { color: "#f8fafc", font: { size: 12 } },
        grid: { color: "#334155" },
      },
      y: {
        ticks: { color: "#f8fafc", font: { size: 12 } },
        grid: { color: "#334155" },
      },
    },
  };

  return (
    <div className="dashboard-page p-6 bg-bgDark min-h-screen dashbord-animate">
      <h1 className="text-2xl text-white mb-6 font-semibold">
        Dashboard Analytics
      </h1>

      {/* Stats */}
      <div className="dashboard-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 stat-animate card-hover">
        <StatCard title="Employees" value={employees.length} />
        <StatCard title="Clients" value={clients.length} />
        <StatCard title="Tasks" value={tasks.length} />
        <StatCard title="Revenue" value={`₹${totalRevenue}`} />
      </div>

      {/* Charts */}
      <div className="chart-grid grid grid-cols-1 lg:grid-cols-2 gap-6 chart-animate chart-hover">
        <div className="card chart-box bg-cardBg p-6 rounded-xl shadow-custom">
          <h3 className="text-white mb-4 font-medium">Business Overview</h3>
          <Bar data={barData} options={chartOptions} />
        </div>

        <div className="card chart-box bg-cardBg p-6 rounded-xl shadow-custom chart-animate chart-hover">
          <h3 className="text-white mb-4 font-medium">Task Status</h3>
          <Pie data={pieData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}
