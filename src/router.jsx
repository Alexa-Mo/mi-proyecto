import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Profile from './features/profile/pages/profile';
import ProtectedRoute from './components/ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />, // Ruta principal (home) redirige al login
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

export default router;