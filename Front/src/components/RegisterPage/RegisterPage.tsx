import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour rediriger après l'inscription
import { UserRegister } from '../../@types/types';
import api from '../../services/api'; // Importation de l'instance Axios

function RegisterPage() {
  const [userRegister, setUserRegister] = useState<UserRegister>({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate(); // Pour rediriger après l'inscription

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRegister({
      ...userRegister,
      [event.target.name]: event.target.value,
    });
  };

  const handleRegister = async (userRegisterData: UserRegister) => {
    setIsLoading(true);
    try {
      // Envoie la requête à l'API pour l'inscription
      await api.post('/register', userRegisterData);

      // Redirection vers la page de login après inscription réussie
      navigate('/login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleRegister(userRegister); // Appelle la fonction handleRegister avec les données du formulaire
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Inscription</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="text-red-500 text-center">{error}</div>}
          <div>
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Prénom:
            </label>
            <input
              id="firstname"
              name="firstname"
              type="text"
              value={userRegister.firstname}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom:
            </label>
            <input
              id="lastname"
              name="lastname"
              type="text"
              value={userRegister.lastname}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
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
              value={userRegister.email}
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
              value={userRegister.password}
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
            {isLoading ? 'Inscription en cours...' : 'Valider'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
