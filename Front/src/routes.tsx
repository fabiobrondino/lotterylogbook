/* eslint-disable import/prefer-default-export */
import { createBrowserRouter } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Root from './routes/Root/Root';
import Home from './routes/Home/Home';
import HelloWorld from './components/HelloWorld/HelloWorld';
import Login from './routes/Login/Login';
import Profile from './routes/Profile/Profile';
import History from './routes/History/History';

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
        element: <Home />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
      {
        path: '/history',
        element: <History />,
      },
    ],
  },
]);
