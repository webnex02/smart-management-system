import { getData, setData } from "../utils/localStorageHelper";

const KEY = "employees";

/* Get All Employees */
export const getAll = async () => {
  return getData(KEY) || [];
};

/* Create New Employee */
export const create = async (employee) => {

  const data = getData(KEY) || [];

  const newEmployee = {
    id: Date.now(),
    ...employee,
    createdAt: new Date().toISOString(),
  };

  data.push(newEmployee);

  setData(KEY, data);
};

/* Delete Employee */
export const remove = async (id) => {

  const data = getData(KEY) || [];

  const filtered = data.filter(e => e.id !== id);

  setData(KEY, filtered);
};

/* Get One Employee (Future Edit Feature) */
export const getById = async (id) => {

  const data = getData(KEY) || [];

  return data.find(e => e.id === id);
};

/* Update Employee (Future Use) */
export const update = async (id, updatedData) => {

  const data = getData(KEY) || [];

  const updated = data.map(e =>
    e.id === id ? { ...e, ...updatedData } : e
  );

  setData(KEY, updated);
};
