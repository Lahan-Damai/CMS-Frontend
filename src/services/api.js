import axios from 'axios';

const API_BASE_URL = 'https://lahandamaiapi-production.up.railway.app';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
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
    const response = await api.post('/api/users/login', {
      email,
      password,
    });

    if (response.data.role !== "admin") {
      throw new Error('Forbidden: Only admins can login.');
    } 

    console.log(response.data.token);
    localStorage.setItem('token', response.data.token);

    return response;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with error status:', error.response.status);
      console.error('Error message from server:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server:', error.request);
    } else {
      // Something else happened in making the request that triggered an error
      console.error('Error during request setup:', error.message);
    }
    throw error; // Rethrow the error to be caught by the caller
  }
};


