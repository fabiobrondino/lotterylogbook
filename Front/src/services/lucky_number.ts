import { jwtDecode } from 'jwt-decode';
import api from './api';

const sendLuckyNumber = async (
  selectedNumbers: number[],
  selectedStars: number[]
) => {
  // Récupération du Token stocké sous la clé "token"
  const token = localStorage.getItem('token');
  // Décodage de JWT qui permet d'extraire les infos qu'il contient, ici, le champ "userId"
  if (!token) {
    throw new Error('Token is null');
  }
  const decodedToken = jwtDecode<{ userId: string }>(token);
  // On extrait du token JWT décodé
  const { userId } = decodedToken;
  const response = await api.post(`/home/${userId}/lucky-number`, {
    selectedNumbers,
    selectedStars,
  });
  return response.data;
};

export default sendLuckyNumber;
