import axios from "axios";

const getAll = (url, options) => axios.get(url, { headers: options });

const getCodeById = (url, options) => axios.get(url, { headers: options });

const addSession = (url, obj) => axios.post(url, obj);

export { getAll, getCodeById, addSession };
