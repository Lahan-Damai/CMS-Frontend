import api from "./api";

export const getAllExperts = async () => {
  try {
    const response = await api.get("/api/konsultasi/ahli/get");
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteExpert = async (id) => {
  try {
    const response = await api.delete(`/api/konsultasi/ahli/delete/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const createAhli = async (formData) => {
  try {
    const response = await api.post(`/api/konsultasi/ahli/create`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateAhli = async (id, formData) => {
  try {
    const response = await api.put(
      `/api/konsultasi/ahli/update/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAhliById = async (id) => {
  try {
    const response = await api.get(`/api/konsultasi/ahli/get/${id}`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getReviewsByExpertId = async (id) => {
  try {
    const response = await api.get(`/api/konsultasi/ahli/get/${id}/ulasan`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteExpertReviewByExpertId = async (data) => {
  try {
    const { ahli_id, user_nik } = data;
    const response = await api.delete(`/api/konsultasi/ahli/${ahli_id}/ulasan`, {
      data: { user_nik },
    });
    return response;
  } catch (error) {
    throw error;
  }
};
