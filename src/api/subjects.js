import { api } from "./api";

export const getSubjects = async () => {
  try {
    const response = await api.get("/subjects");
    return response.data;
  } catch (error) {
    console.error("Error fetching subjects:", error);
    throw error;
  }
};
