import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import NextGame from '../../components/NextGame/NextGame';
import { NextGameProvider } from '../../services/NextGameContext';

function Root() {
  const location = useLocation();
  const noHeaderRoutes = ['/', '/login', '/register'];
  return (
    <NextGameProvider>
      <div className="bg-blue-200">
        {!noHeaderRoutes.includes(location.pathname) && (
          <>
            <Header />
            <NextGame />
          </>
        )}
        <Outlet />
      </div>
    </NextGameProvider>
  );
}

export default Root;
