import { Link } from 'react-router-dom';

function Profile() {
  return (
    <div>
      <h1>Profile</h1>
      <Link to="/helloworld">Go to Hello World</Link>
    </div>
  );
}

export default Profile;
