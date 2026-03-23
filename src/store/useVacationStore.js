import { create } from "zustand";
import axios from "axios";

const API = "http://localhost:5000/api/vacations";

export const useVacationStore = create((set) => ({
  vacations: [],

  fetchVacations: async () => {
    const res = await axios.get(API);
    set({ vacations: res.data });
  },

  addVacation: async (data) => {
    const res = await axios.post(API, data);
    set((state) => ({
      vacations: [...state.vacations, res.data],
    }));
  },

  updateVacation: async (id, data) => {
    const res = await axios.put(`${API}/${id}`, data);
    set((state) => ({
      vacations: state.vacations.map((v) =>
        v._id === id ? res.data : v
      ),
    }));
  },

  deleteVacation: async (id) => {
    await axios.delete(`${API}/${id}`);
    set((state) => ({
      vacations: state.vacations.filter((v) => v._id !== id),
    }));
  },
}));