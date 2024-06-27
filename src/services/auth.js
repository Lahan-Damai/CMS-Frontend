import api from "./api";

export const login = async (email, password) => {
  try {
    const response = await api.post("/api/users/login", { email, password });

    if (response.data.role !== "admin") {
      throw new Error("Forbidden: Only admins can login.");
    }

    localStorage.setItem("token", response.data.token);

    return response;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    const response = await api.delete("/api/users/logout");

    localStorage.removeItem("token");

    return response;
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/api/users/current");
    return response.data;
  } catch (error) {
    throw error;
  }
};

