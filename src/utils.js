import axios from "axios";

const getAll = (url, options) => axios.get(url, { headers: options });

const getCodeById = (url, options) => axios.get(url, { headers: options });

const getById = (url, id) => axios.get(`${url}/${id}`);

const addItem = (url, obj) => axios.post(url, obj);

const updateItem = (url, id, obj) => axios.put(`${url}/${id}`, obj);

const deleteItem = (url, id) => axios.delete(`${url}/${id}`);

export { getAll, getById, addItem, updateItem, deleteItem, getCodeById };
