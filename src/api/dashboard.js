import { api } from "./api";

export const getStats = async () => {
  try {
    const response = await api.get("/dashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};
