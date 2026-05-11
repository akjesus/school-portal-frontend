import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



export const getAllStaff = async () => {
  try {
    const response = await api.get("/staff");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch staff members");
  }
};
