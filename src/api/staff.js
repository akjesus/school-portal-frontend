import { api } from "./api";

export const getAllStaff = async () => {
  try {
    const response = await api.get("/staff");
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch staff members");
  }
};
