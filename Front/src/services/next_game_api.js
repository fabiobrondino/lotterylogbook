import api from './api';

const fetchNextGame = async () => {
  const response = await api.get('/home');
  return response.data;
};

export default fetchNextGame;
