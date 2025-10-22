import { createBrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'
import Login from '../features/auth/pages/Login'
import Register from '../features/auth/pages/Register'
import Profile from '../features/profile/pages/profile'
import ProtectedRoute from '../features/auth/components/ProtectedRoute'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
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
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
    ],
  },
])
