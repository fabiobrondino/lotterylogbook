import { Link } from 'react-router-dom';
import NextGame from '../../components/NextGame/NextGame';
import LuckyNumber from '../../components/LuckyNumber/LuckyNumber';

function Home() {
  return (
    <div>
      <NextGame />
      <LuckyNumber />
      <h1>Home</h1>
      <Link to="/helloworld">Go to Hello World</Link>
    </div>
  );
}

export default Home;
