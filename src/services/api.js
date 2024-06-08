import axios from "axios";

const API_BASE_URL = "https://lahandamaiapi-production.up.railway.app/";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    throw error;
  }
);

export const login = async (email, password) => {
  console.log(email);
  console.log(password);
  try {
    const response = await api.post("/api/users/login", {
      email,
      password,
    });

    if (response.data.role !== "admin") {
      throw new Error("Forbidden: Only admins can login.");
    }

    console.log(response.data.token);
    localStorage.setItem("isLoggedIn", "true");

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

export const logout = async () => {
  try {
    const response = await api.delete("/api/users/logout");

    console.log(response);
    console.log("-------------------------------");
    console.log("Logout successful:", response.data);

    localStorage.removeItem("isLoggedIn");
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

// ======================== EDUKASI ========================

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
    const token = localStorage.getItem("token");

    const response = await api.post("/api/edukasi/create", data);

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
    const response = await api.put(`/api/edukasi/update/${id}`, data);
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

export const getLaporanSengketa = async () => {
  try {
    console.log("masuk");
    const response = await api.get("/api/laporan/get/all");
    console.log("response");
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
