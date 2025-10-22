import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import ErrorBoundary from './components/ErrorBoundary';
import { router } from './router/AppRouter';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;