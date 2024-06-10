import api from "./apii";

export const getAllExperts = async () => {
    try {
      const response = await api.get("/api/konsultasi/ahli/get");
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