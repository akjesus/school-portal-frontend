import { api } from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/auth/staff/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Login failed");
  }
};

export const logout = async () => {
  try {
    await api.post("/auth/staff/logout");
  } catch (error) {
    throw new Error("Logout failed");
  }
};
