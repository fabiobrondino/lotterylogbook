import { jwtDecode } from 'jwt-decode';
import api from './api';

const fetchAllGames = async () => {
  // Récupération du Token stocké sous la clé "token"
  const token = localStorage.getItem('token');
  // Décodage de JWT qui permet d'extraire les infos qu'il contient, ici, le champ "userId"
  if (!token) {
    throw new Error('Token is null');
  }
  const decodedToken = jwtDecode<{ userId: string }>(token);
  const { userId } = decodedToken;
  const response = await api.get(`/home/${userId}/combinations`);
  return response.data;
};

export default fetchAllGames;
