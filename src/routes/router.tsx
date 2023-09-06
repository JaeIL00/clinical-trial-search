import { createBrowserRouter } from 'react-router-dom';

import App from '../App';
import MainPage from '../pages/MainPage';
import NotFoundPage from '../pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
]);

export default router;
