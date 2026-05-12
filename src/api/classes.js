import { api } from "./api";

export const getAllClasses = async () => {
  try {
    const response = await api.get("/class");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch classes");
  }
};
