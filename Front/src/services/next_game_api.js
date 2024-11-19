import api from './api';

const fetchNextGame = async () => {
  const response = await api.get('/home');
  console.log('fetchNextGame', response.data);
  return response.data;
};

export default fetchNextGame;
