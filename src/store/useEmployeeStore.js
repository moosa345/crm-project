import { create } from "zustand";
import axios from "axios";

const API = "https://crm-backend-2yi4.onrender.com/api/employees";

export const useEmployeeStore = create((set) => ({
  employees: [],

  fetchEmployees: async () => {
    const res = await axios.get(API);
    set({ employees: res.data });
  },

  addEmployee: async (data) => {
    const res = await axios.post(API, data);
    set((state) => ({
      employees: [...state.employees, res.data],
    }));
  },

  updateEmployee: async (id, data) => {
    const res = await axios.put(`${API}/${id}`, data);
    set((state) => ({
      employees: state.employees.map((e) =>
        e._id === id ? res.data : e
      ),
    }));
  },

  deleteEmployee: async (id) => {
    await axios.delete(`${API}/${id}`);
    set((state) => ({
      employees: state.employees.filter((e) => e._id !== id),
    }));
  },
}));