import { jwtDecode } from 'jwt-decode';
import api from './api';

const sendGame = async (
  games: {
    numbers: number[];
    stars: number[];
  }[]
) => {
  // Récupération du Token stocké sous la clé "token
  const token = localStorage.getItem('token');
  // Décodage de JWT qui permet d'extraire les infos qu'il contient, ici, le champ "userId"
  if (!token) {
    throw new Error('Token is null');
  }
  const decodedToken = jwtDecode<{ userId: string }>(token);
  const { userId } = decodedToken;
  const response = await api.post(`/home/${userId}/combinations`, { games });
  return response.data;
};

export default sendGame;
