import './Auth.scss';

function Auth() {
  return (
    <div className="auth">
      <div className="auth__login">
        <div className="auth__header">
          <h1>Bonjour!</h1>
        </div>
        <div className="auth__form">
          <p>Formulaire de connexion</p>
        </div>
        <div className="auth__authentification">
          <button className="auth__connection" type="button">
            Se connecter
          </button>
          <button className="auth__inscription" type="button">
            S&rsquo;inscrire
          </button>
        </div>
      </div>
      <div className="auth__message">
        <h2>Bienvenue au Journal du Loto!</h2>
        <p>
          Le Journal du Loto est un site qui vous permet d&apos;organiser vos
          grilles de jeux de façon très personnalisée et maintenir un historique
          organisé de vos jeux.
        </p>
      </div>
    </div>
  );
}

export default Auth;
