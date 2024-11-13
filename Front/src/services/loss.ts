import { jwtDecode } from 'jwt-decode';
import api from './api';

const sendLoss = async (loss: number[]) => {
  // Récupération du Token stocké sous la clé "token
  const token = localStorage.getItem('token');
  // Décodage de JWT qui permet d'extraire les infos qu'il contient, ici, le champ "userId"
  if (!token) {
    throw new Error('Token is null');
  }
  const decodedToken = jwtDecode<{ userId: string }>(token);
  const { userId } = decodedToken;
  console.log('userId:', userId);
  // Récupération de la valeur actuelle de "loss"
  const firstResponse = await api.get(`/history/${userId}/loss`);
  const currentLoss = parseFloat(firstResponse.data.result[0].loss);
  console.log('Current loss:', currentLoss);

  // Calcul de la nouvelle perte
  const newLoss = currentLoss + loss.reduce((acc, val) => acc + val, 0);
  console.log('New loss:', newLoss);

  // Mise à jour de la perte en BDD
  try {
    const response = await api.put(`/history/${userId}/loss`, {
      loss: newLoss,
    });
    return response.data;
  } catch (error) {
    console.error('Error updating loss:', error);
    throw error;
  }
};

export default sendLoss;
