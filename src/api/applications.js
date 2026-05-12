import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getApplications = async () => {
  try {
    const response = await api.get("/applications");
    return response.data;
  } catch (error) {
    console.error("Error fetching applications:", error);
    throw error;
  }
};

export const reviewApplications = async (applicationId, status, remark) => {
  try {
    const response = await api.put(`/applications/${applicationId}`, { status, remark });
    return response.data;
  } catch (error) {
    console.error("Error reviewing application:", error);
    throw error;
  }
};