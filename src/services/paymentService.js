import { getData, setData } from "../utils/localStorageHelper";

const KEY = "payments";

export const getAll = async () => getData(KEY) || []; // ensure array

export const getById = async (id) => {
  const data = getData(KEY) || [];
  return data.find((p) => p.id === id);
};

export const create = async (payment) => {
  const data = getData(KEY) || [];
  const newPayment = { id: Date.now(), ...payment };
  data.push(newPayment);
  setData(KEY, data);
  return newPayment;
};

export const update = async (id, updatedPayment) => {
  const data = (getData(KEY) || []).map((p) => 
    p.id === id ? { ...p, ...updatedPayment } : p
  );
  setData(KEY, data);
};

export const remove = async (id) => {
  const data = (getData(KEY) || []).filter((p) => p.id !== id);
  setData(KEY, data);
};
