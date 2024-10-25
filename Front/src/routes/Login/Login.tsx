import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Header */}
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Bienvenue sur le Journal du Loto
      </h1>
      <p className="text-gray-600 text-center mb-8 max-w-lg">
        Le Journal du Loto est un journal de bord conçu pour les joueurs de
        loterie, vous permettant d’organiser vos jeux et de gérer vos dépenses
        de manière efficace.
      </p>

      {/* Login/Register Container */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-2xl flex">
        {/* Register Section */}
        <div className="w-1/2 p-8 bg-blue-50 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            Nouveau ici ?
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Créez un compte pour commencer à gérer vos jeux de loterie.
          </p>
          <Link
            to="/register"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            S&apos;inscrire
          </Link>
        </div>

        {/* Login Section */}
        <div className="w-1/2 p-8 bg-gray-50 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Déjà inscrit ?
          </h2>
          <p className="text-gray-700 mb-6 text-center">
            Connectez-vous pour accéder à votre journal de bord.
          </p>
          <Link
            to="/login"
            className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded"
          >
            Se connecter
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
