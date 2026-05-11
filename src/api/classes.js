import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAllClasses = async () => {
  try {
    const response = await api.get("/class");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch classes");
  }
};
