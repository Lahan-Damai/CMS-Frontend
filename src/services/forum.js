import api from "./api";

export const getThreads = async () => {
  try {
    const response = await api.get("/api/forum/get/all");
    return response;
  } catch (error) {
    throw error;
  }
};

export const getReplies = async (id) => {
  try {
    const response = await api.get(`/api/forum/${id}/replies/get`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteReplies = async (id) => {
  try {
    const response = await api.delete(`/api/forum/reply/${id}/delete`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteThreads = async (id) => {
    try {
      const response = await api.delete(`/api/forum/${id}/delete`);
      return response;
    } catch (error) {
      throw error;
    }
  };
