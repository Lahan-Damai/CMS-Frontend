import api from "./api";

export const getProfilPengguna = async () => {
  try {
    const response = await api.get("/api/users/get/all");
    return response;
  } catch (error) {
    if (error.response) {
      console.error(
        "Server responded with error status:",
        error.response.status
      );
      console.error("Error message from server:", error.response.data);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error during request setup:", error.message);
    }
    throw error;
  }
};

export const switchUserRole = async (email) => {
  try {
    const response = await api.put("/api/users/update/role", { email });
    return response;
  } catch (error) {
    if (error.response) {
      console.error(
        "Server responded with error status:",
        error.response.status
      );
      console.error("Error message from server:", error.response.data);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error during request setup:", error.message);
    }
    throw error;
  }
};

export const getUserByNik = async (nik) => {
  try {
    const response = await api.get(`/api/users/${nik}/get/`);
    return response;
  } catch (error) {
    if (error.response) {
      console.error(
        "Server responded with error status:",
        error.response.status
      );
      console.error("Error message from server:", error.response.data);
    } else if (error.request) {
      console.error("No response received from server:", error.request);
    } else {
      console.error("Error during request setup:", error.message);
    }
    throw error;
  }
};
