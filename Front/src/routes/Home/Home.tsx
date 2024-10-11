import { Link } from 'react-router-dom';
import App from '../../components/App/App';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <App />
      <Link to="/helloworld">Go to Hello World</Link>
    </div>
  );
}

export default Home;
