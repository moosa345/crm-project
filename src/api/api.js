import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Employee APIs
export const getEmployees = () => API.get("/employees");
export const createEmployee = (data) => API.post("/employees", data);
export const updateEmployee = (id, data) => API.put(`/employees/${id}`, data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

// Vacation APIs
export const getVacations = () => API.get("/vacations");
export const createVacation = (data) => API.post("/vacations", data);
export const updateVacation = (id, data) => API.put(`/vacations/${id}`, data);
export const deleteVacation = (id) => API.delete(`/vacations/${id}`);


export default API;
