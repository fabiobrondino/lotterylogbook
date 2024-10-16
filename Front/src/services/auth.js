import api from './api';

const register = async (formData) => {
  const response = await api.post('/register', formData);
  return response.data;
};

export default register;
