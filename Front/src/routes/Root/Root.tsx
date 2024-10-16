import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';

function Root() {
  const location = useLocation();
  const noHeaderRoutes = ['/', '/login', '/register'];
  return (
    <div>
      {!noHeaderRoutes.includes(location.pathname) && <Header />}
      <Outlet />
    </div>
  );
}

export default Root;
