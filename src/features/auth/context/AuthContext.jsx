import { createContext, useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { setCookie, getCookie, deleteCookie } from '../../../utils/cookieHelper';
import { logoutUser } from '../services/authService';
import { useAsyncOperation, OPERATION_DELAYS } from '../../../hooks/useAsyncOperation';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Hook para manejar el logout con delay
  const logoutOperation = useAsyncOperation(OPERATION_DELAYS.LOGOUT);

  // Verificar si hay un token al cargar la app (sin hacer peticiones adicionales)
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = getCookie('auth_token');
        if (token) {
          // Solo verificar si existe el token, no hacer petición adicional
          // La validación real se hará cuando el usuario intente acceder a recursos protegidos
          setIsAuthenticated(true);
          console.log('Token encontrado, usuario autenticado');
        } else {
          setIsAuthenticated(false);
          console.log('No se encontró token, usuario no autenticado');
        }
      } catch (error) {
        console.error('Error al inicializar autenticación:', error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Guardar token y datos del usuario
   */
  const login = (token, userData) => {
    setCookie('auth_token', token, 7); // 7 días de expiración
    setUser(userData);
    setIsAuthenticated(true);
  };

  /**
   * Cerrar sesión y limpiar datos con loading state
   */
  const logout = async () => {
    try {
      await logoutOperation.execute(async () => {
        await logoutUser(); // Llamar al backend
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      // Limpiar datos independientemente del resultado
      deleteCookie('auth_token');
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  /**
   * Actualizar datos del usuario
   */
  const updateUser = (userData) => {
    setUser(userData);
  };

  const value = useMemo(() => ({
    user,
    isAuthenticated,
    loading,
    login,
    logout,
    updateUser,
    // Estados de loading específicos
    logoutLoading: logoutOperation.loading,
    logoutError: logoutOperation.error,
  }), [user, isAuthenticated, loading, login, logout, updateUser, logoutOperation.loading, logoutOperation.error]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};