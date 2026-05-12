import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getStats = async () => {
  try {
    const response = await api.get("/dashboard");
    return response.data;
  }
    catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};