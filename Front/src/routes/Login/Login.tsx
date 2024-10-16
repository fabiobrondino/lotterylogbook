import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
