import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getStudents = async () => {
  try {
    const response = await api.get("/students");
    return response.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

export const addStudent = async (data) => {
  try {
    const response = await api.post("/students", data);
    return response.data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};
