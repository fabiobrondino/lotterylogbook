import { jwtDecode, JwtPayload } from 'jwt-decode';
import api from './api';

interface DecodedToken extends JwtPayload {
  role: number;
}

const createNextGame = async (referenceDate: Date, jackpot: number) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('Token is null');
  }
  const decodedToken: DecodedToken = jwtDecode(token);
  console.log(decodedToken);
  const { role } = decodedToken;
  console.log(role);
  const response = await api.post(`/home/${role}`, {
    reference_date: referenceDate,
    jackpot,
  });

  return response.data;
};

export default createNextGame;
