import { create } from "zustand";
import axios from "axios";

const API = "https://crm-backend-2yi4.onrender.com/api/projects";

export const useProjectStore = create((set) => ({
  projects: [],

  fetchProjects: async () => {
    const res = await axios.get(API);
    set({ projects: res.data });
  },

  addProject: async (data) => {
    const res = await axios.post(API, data);
    set((state) => ({
      projects: [...state.projects, res.data],
    }));
  },

  updateProject: async (id, data) => {
    const res = await axios.put(`${API}/${id}`, data);

    set((state) => ({
      projects: state.projects.map((p) =>
        p._id === id ? res.data : p
      ),
    }));
  },

  deleteProject: async (id) => {
    await axios.delete(`${API}/${id}`);

    set((state) => ({
      projects: state.projects.filter((p) => p._id !== id),
    }));
  },
}));