import { useEffect, useState } from "react";
import * as taskService from "../services/taskService";
import * as employeeService from "../services/employeeService";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Load tasks and employees
  const loadData = async () => {
    setTasks(await taskService.getAll());
    setEmployees(await employeeService.getAll());
  };

  useEffect(() => {
    loadData();
  }, []);

  // Add new task
  const addTask = async () => {
    if (!title || !assignedTo || !dueDate) return;
    await taskService.create({
      title,
      description,
      assignedTo,
      status: "Pending",
      dueDate,
    });
    setTitle(""); setDescription(""); setAssignedTo(""); setDueDate("");
    loadData();
  };

  // Delete task
  const deleteTask = async (id) => {
    await taskService.remove(id);
    loadData();
  };

  // Toggle status
  const toggleStatus = async (task) => {
    await taskService.update(task.id, {
      status: task.status === "Pending" ? "Completed" : "Pending",
    });
    loadData();
  };

  // Filtered tasks based on search and status
  const filteredTasks = tasks.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? t.status === statusFilter : true;
    const matchesEmployee = assignedTo ? t.assignedTo === assignedTo : true;
    return matchesSearch && matchesStatus && matchesEmployee;
  });

  return (
    <div className="content p-6">
      <h2 className="text-2xl font-semibold mb-4">Tasks</h2>

      {/* Add Task Form */}
      <div className="mb-6 p-4 bg-cardBg rounded-xl shadow">
        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-2 p-2 rounded w-full"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mb-2 p-2 rounded w-full"
        />
        <select
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="mb-2 p-2 rounded w-full"
        >
          <option value="">Assign to Employee</option>
          {employees.map((e) => (
            <option key={e.id} value={e.name}>{e.name}</option>
          ))}
        </select>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="mb-2 p-2 rounded w-full"
        />
        <button
          onClick={addTask}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Task
        </button>
      </div>

      {/* Search & Filter */}
      <div className="mb-4 flex gap-2">
        <input
          placeholder="Search by title"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded flex-1"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="p-2 rounded"
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Tasks List */}
      <ul>
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className="mb-2 p-4 bg-cardBg rounded shadow flex justify-between items-center"
          >
            <div>
              <h3 className="font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Assigned to: {task.assignedTo}</p>
              <p>Due: {task.dueDate}</p>
              <p>Status: <span className={task.status === "Completed" ? "text-green-500" : "text-yellow-500"}>{task.status}</span></p>
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => toggleStatus(task)}
                className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-700 transition"
              >
                Toggle Status
              </button>
              <button
                onClick={() => deleteTask(task.id)}
                className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
