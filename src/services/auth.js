import api from "./api";

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

    localStorage.setItem("token", response.data.token);

    api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;

    console.log(localStorage.getItem("token"));
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
    localStorage.removeItem("token");
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
