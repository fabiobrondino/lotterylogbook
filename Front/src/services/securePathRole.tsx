import { Navigate } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';

interface PrivateRouteProps {
  children: React.ReactNode;
}
interface DecodedToken extends JwtPayload {
  role: number;
}

function PrivateRouteRole({ children }: PrivateRouteProps) {
  const token = localStorage.getItem('token'); // Vérification de l'existence du token

  if (!token) {
    // Si le token n'existe pas, rediriger vers la page de login
    return <Navigate to="/login" />;
  }

  const decodedToken: DecodedToken = jwtDecode(token);
  const { role } = decodedToken;

  if (role !== 1) {
    // Si le role n'est pas égal à 1, rediriger vers la page d'accueil
    return <Navigate to="/home" />;
  }

  // Si toutes les vérifications passent, afficher les enfants
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

export default PrivateRouteRole;
