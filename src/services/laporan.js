import api from "./api";

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

export const updateLaporan = async (data) => {
  try {
    const response = await api.put("/api/laporan/update", data);
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

export const getLaporanByNoSertifikat = async (noSertifikat) => {
  try {
    const response = await api.get(`/api/laporan/${noSertifikat}/get`);
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
