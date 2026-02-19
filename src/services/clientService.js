const STORAGE_KEY = "clients";

const getData = () =>
  JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const saveData = (data) =>
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

export const getAll = async () => getData();

export const getById = async (id) =>
  getData().find((c) => c.id === id);

export const create = async (client) => {
  const data = getData();
  const newClient = { id: Date.now(), ...client };
  data.push(newClient);
  saveData(data);
  return newClient;
};

export const update = async (id, updatedClient) => {
  const data = getData().map((c) =>
    c.id === id ? { ...c, ...updatedClient } : c
  );
  saveData(data);
};

export const remove = async (id) => {
  const data = getData().filter((c) => c.id !== id);
  saveData(data);
};
 