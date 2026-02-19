const KEY = "sms_tasks";

/* Get All Tasks */
export function getAll() {
  const data = localStorage.getItem(KEY);

  if (!data) return [];

  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

/* Create */
export function create(task) {
  const tasks = getAll();

  const newTask = {
    ...task,
    id: Date.now(),
    status: "Pending",
  };

  tasks.push(newTask);

  localStorage.setItem(KEY, JSON.stringify(tasks));

  return newTask;
}

/* Update */
export function update(id, updatedData) {
  const tasks = getAll();

  const updated = tasks.map(t =>
    t.id === id ? { ...t, ...updatedData } : t
  );

  localStorage.setItem(KEY, JSON.stringify(updated));
}

/* Delete */
export function remove(id) {
  const tasks = getAll().filter(t => t.id !== id);

  localStorage.setItem(KEY, JSON.stringify(tasks));
}
