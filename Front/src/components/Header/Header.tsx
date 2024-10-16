import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token'); // Supprimer le token du localStorage
    navigate('/'); // Rediriger l'utilisateur vers la page de login après déconnexion
  };
  return (
    <header className="bg-gray-800 p-4">
      <nav className="flex justify-end items-center space-x-4">
        <ul className="flex space-x-4">
          <li>
            <Link
              to="/home"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/history"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 transition duration-300"
            >
              History
            </Link>
          </li>
        </ul>
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}

export default Header;
