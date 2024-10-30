/* eslint-disable import/prefer-default-export */
import { createBrowserRouter } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Root from './routes/Root/Root';
import Home from './routes/Home/Home';
import HelloWorld from './components/HelloWorld/HelloWorld';
import Login from './routes/Login/Login';
import Profile from './routes/Profile/Profile';
import History from './routes/History/History';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import PrivateRoute from './services/securePath';
import Grid from './routes/Grid/Grid';
import CreateNextGame from './components/CreateNextGame/CreateNextGame';
import PrivateRouteRole from './services/securePathRole';
import Results from './routes/Results/Results';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Login />,
      },
      {
        path: '/helloworld',
        element: <HelloWorld />,
      },
      {
        path: '/home',
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: '/profile',
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: '/results',
        element: (
          <PrivateRoute>
            <Results />
          </PrivateRoute>
        ),
      },
      {
        path: '/history',
        element: (
          <PrivateRoute>
            <History />
          </PrivateRoute>
        ),
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/grid',
        element: (
          <PrivateRoute>
            <Grid />
          </PrivateRoute>
        ),
      },
      {
        path: '/nextGame',
        element: (
          <PrivateRoute>
            <PrivateRouteRole>
              <CreateNextGame />
            </PrivateRouteRole>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
