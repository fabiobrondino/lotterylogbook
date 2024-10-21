import { jwtDecode } from 'jwt-decode';
import API from './api';

// Récupère les infos spécifiques de l'utilisateur
const fetchUser = async () => {
  // Récupération du Token stocké sous la clé "token"
  const token = localStorage.getItem('token');
  // Décodage de JWT qui permet d'extraire les infos qu'il contient, ici, le champ "userId"
  const decodedToken = jwtDecode(token);
  // On extrait du token JWT décodé
  const { userId } = decodedToken;
  // On effectue une requête GET à une URL
  const response = await API.get(`/profile/${userId}`);
  // Si la requête est ok, on retourne les données
  return response.data;
};

export default fetchUser;
