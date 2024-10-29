import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode, JwtPayload } from 'jwt-decode';

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token du localStorage
    navigate('/'); // Rediriger l'utilisateur vers la page de login après déconnexion
  };

  // Fonction pour vérifier le rôle de l'utilisateur
  const getRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    const decodedToken = jwtDecode<JwtPayload & { role: number }>(token);
    return decodedToken.role; // Assurez-vous que le champ correspond au nom du rôle dans votre token
  };

  const role = getRole();

  return (
    <header className="bg-gray-800 p-4">
      <nav className="flex justify-end items-center space-x-4">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/home"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Accueil
            </Link>
          </li>
          <li>
            <Link
              to="/grid"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Grille
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Profil
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Historique
            </Link>
          </li>
          {/* Ajout du lien vers nextGame uniquement si le role est 1 */}
          {role === 1 && (
            <li>
              <Link
                to="/nextGame"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
              >
                Prochain Jeu
              </Link>
            </li>
          )}
        </ul>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Déconnexion
        </button>
      </nav>
    </header>
  );
}

export default Header;
