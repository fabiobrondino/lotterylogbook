import { Navigate } from 'react-router-dom';

interface PrivateRouteProps {
  children: React.ReactNode;
}

function PrivateRoute({ children }: PrivateRouteProps) {
  const token = localStorage.getItem('token'); // Vérification de l'existence du token

  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
