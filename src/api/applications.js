import { api } from "./api";

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