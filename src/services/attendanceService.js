import { getData, setData } from "../utils/localStorageHelper";

const KEY = "attendance";

export const getAll = async () => getData(KEY);

export const create = async (record) => {
  const data = getData(KEY);
  const newRecord = { ...record, id: Date.now() };
  data.push(newRecord);
  setData(KEY, data);
  return newRecord;
};

export const update = async (id, updatedRecord) => {
  const data = getData(KEY).map((r) => (r.id === id ? { ...r, ...updatedRecord } : r));
  setData(KEY, data);
};

export const remove = async (id) => {
  const data = getData(KEY).filter((r) => r.id !== id);
  setData(KEY, data);
};

export const filterByEmployee = async (employeeName) => {
  const data = getData(KEY);
  return data.filter((r) => r.employee.toLowerCase().includes(employeeName.toLowerCase()));
};

export const filterByDate = async (date) => {
  const data = getData(KEY);
  return data.filter((r) => r.date === date);
};
