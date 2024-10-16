import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/helloworld">Go to Hello World</Link>
    </div>
  );
}

export default Home;
