import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:5000/api"
  baseURL: "https://poetry-backend-zygv.onrender.com/api"
});

// 🔐 Helper → Admin header auto attach
const adminHeader = () => ({
  headers: {
    Authorization: localStorage.getItem("adminToken")
  }
});

/* ================= POEMS ================= */

// Get all poems
export const getAllPoems = () => api.get("/poems");

// Get poem by ID
export const getPoemById = (id) =>
  api.get(`/poems/single/${id}`);

// Update poem (Admin)
export const updatePoem = (id, data) =>
  api.put(`/poems/update/${id}`, data, adminHeader());

// Add poem (Admin)
export const addPoem = (data) =>
  api.post("/poems/add", data, adminHeader());

export default api;