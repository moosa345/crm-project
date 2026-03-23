import { create } from "zustand";
import axios from "axios";

const API = "http://localhost:5000/api/calendar";

export const useCalendarStore = create((set) => ({
  events: [],

  fetchEvents: async () => {
    const res = await axios.get(API);
    set({ events: res.data });
  },

  addEvent: async (data) => {
    const res = await axios.post(API, data);

    set((state) => ({
      events: [...state.events, res.data],
    }));
  },

  updateEvent: async (id, data) => {
    const res = await axios.put(`${API}/${id}`, data);

    set((state) => ({
      events: state.events.map((event) =>
        event._id === id ? res.data : event
      ),
    }));
  },

  deleteEvent: async (id) => {
    await axios.delete(`${API}/${id}`);

    set((state) => ({
      events: state.events.filter((event) => event._id !== id),
    }));
  },
}));