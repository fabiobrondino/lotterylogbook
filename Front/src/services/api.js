import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3004',
});

api.interceptors.request.use(async (config) => {
  const storedToken = localStorage.getItem('token');
  if (storedToken) {
    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: `Bearer ${storedToken}`,
      },
    };
  }
  return config;
});

export default api;
