/* eslint-disable import/prefer-default-export */
import { createBrowserRouter } from 'react-router-dom';
import NotFound from './components/NotFound/NotFound';
import Root from './routes/Root/Root';
import HelloWorld from './components/HelloWorld/HelloWorld';
import Home from './routes/Home/Home';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/helloworld',
        element: <HelloWorld />,
      },
    ],
  },
]);
