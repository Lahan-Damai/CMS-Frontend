import api from "./api";

export const getProfilPengguna = async () => {
  try {
    const response = await api.get("/api/users/get/all");
    return response;
  } catch (error) {
    throw error;
  }
};

export const switchUserRole = async (email) => {
  try {
    const response = await api.put("/api/users/update/role", { email });
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUserByNik = async (nik) => {
  try {
    const response = await api.get(`/api/users/${nik}/get/`);
    return response;
  } catch (error) {
    throw error;
  }
};
