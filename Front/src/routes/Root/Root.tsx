import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import NextGame from '../../components/NextGame/NextGame';

function Root() {
  const location = useLocation();
  const noHeaderRoutes = ['/', '/login', '/register'];
  return (
    <div>
      {!noHeaderRoutes.includes(location.pathname) && (
        <>
          <Header />
          <NextGame />
        </>
      )}
      <Outlet />
    </div>
  );
}

export default Root;
