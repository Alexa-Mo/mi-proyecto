import apiClient from '../../../services/apiClient';

/**
 * Registrar nuevo usuario
 * @param {Object} userData - Datos del usuario
 * @returns {Promise} - Respuesta del servidor
 */
export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al registrar usuario' };
  }
};

/**
 * Iniciar sesión con manejo mejorado de errores
 * @param {Object} credentials - Email y password
 * @returns {Promise} - Respuesta con token y datos del usuario
 */
export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/login', credentials);

    // Validar respuesta exitosa
    if (response.status !== 200) {
      throw new Error(`Error del servidor: ${response.status} - ${response.statusText}`);
    }

    // Validar que la respuesta contenga datos
    if (!response.data) {
      throw new Error('El servidor no devolvió datos');
    }

    // Validar que contenga token
    if (!response.data.token) {
      throw new Error('El servidor no devolvió un token de autenticación');
    }

    return response.data;
    
  } catch (error) {
    console.error('❌ Error en login:', error);
    
    // Manejo específico de errores
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tiempo de espera agotado. Verifica tu conexión a internet.');
    }
    
    if (error.response) {
      // Error del servidor con respuesta
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        throw new Error('Credenciales incorrectas. Verifica tu email y contraseña.');
      } else if (status === 422) {
        throw new Error(data?.message || 'Datos de entrada inválidos.');
      } else if (status >= 500) {
        throw new Error('Error interno del servidor. Intenta más tarde.');
      } else {
        throw new Error(data?.message || `Error del servidor: ${status}`);
      }
    } else if (error.request) {
      // Error de red
      throw new Error('No se pudo conectar con el servidor. Verifica tu conexión.');
    } else {
      // Error de configuración u otro
      throw new Error(error.message || 'Error inesperado al iniciar sesión');
    }
  }
};

/**
 * Cerrar sesión
 * @returns {Promise} - Respuesta del servidor
 */
export const logoutUser = async () => {
  try {
    const response = await apiClient.delete('/logout');
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Error al cerrar sesión' };
  }
};