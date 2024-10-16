import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // On réactive useNavigate pour rediriger après login
import { UserLogin } from '../../@types/types';
import api from '../../services/api'; // Importation de l'instance Axios personnalisée

function LoginPage() {
  const [userLogin, setUserLogin] = useState<UserLogin>({
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate(); // Utilisé pour rediriger après un login réussi

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserLogin({
      ...userLogin,
      [event.target.name]: event.target.value,
    });
  };

  const handleLogin = async (userLoginData: UserLogin) => {
    setIsLoading(true);
    try {
      // Envoie la requête à l'API pour tenter la connexion
      const response = await api.post('/login', userLoginData);
      const { token } = response.data;

      // Sauvegarde le token dans le localStorage
      localStorage.setItem('token', token);

      // Redirection vers la page d'accueil ou une page protégée
      navigate('/home');
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin(userLogin); // Appelle la fonction handleLogin avec les données du formulaire
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Connexion</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={userLogin.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mot de passe:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={userLogin.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-700 transition duration-300"
            disabled={isLoading} // Désactive le bouton quand la requête est en cours
          >
            {isLoading ? 'Connection en cours...' : 'Valider'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
