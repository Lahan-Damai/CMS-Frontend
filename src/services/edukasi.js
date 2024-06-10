import api from "./apii";

export const getArtikelEdukasi = async () => {
  try {
    const response = await api.get("/api/edukasi/get");
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

export const getArtikelEdukasiById = async (id) => {
  try {
    const response = await api.get(`/api/edukasi/${id}/get`);
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

export const createArtikelEdukasi = async (data) => {
  try {
    console.log(data);
    const response = await api.post("/api/edukasi/create", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export const deleteArtikelEdukasi = async (id) => {
  try {
    const response = await api.delete(`/api/edukasi/delete/${id}`);
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

export const updateArtikelEdukasi = async (id, data) => {
  try {
    const response = await api.put(`/api/edukasi/update/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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

export const deletePostPhotos = async (id) => {
  try {
    const response = await api.delete(`/api/edukasi/photos/delete/${id}`);
    return response.data;
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

export const addPhotosToPost = async (id, formData) => {
  try {
    const response = await api.put(`/api/edukasi/photos/add/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
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
