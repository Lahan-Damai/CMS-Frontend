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
