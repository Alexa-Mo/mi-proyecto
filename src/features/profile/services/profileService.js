import apiClient from '../../../services/apiClient';

/**
 * Obtener datos del perfil del usuario autenticado con manejo mejorado
 * @returns {Promise} - Datos del perfil
 */
export const getProfile = async () => {
  try {
    const response = await apiClient.get('/profile');

    // Validar respuesta exitosa
    if (response.status !== 200) {
      throw new Error(`Error del servidor: ${response.status} - ${response.statusText}`);
    }

    // Validar que la respuesta contenga datos
    if (!response.data) {
      throw new Error('El servidor no devolvió datos del perfil');
    }

    return response.data;
    
  } catch (error) {
    console.error('❌ Error obteniendo perfil:', error);
    
    // Manejo específico de errores
    if (error.code === 'ECONNABORTED') {
      throw new Error('Tiempo de espera agotado al cargar el perfil.');
    }
    
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      if (status === 401) {
        throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.');
      } else if (status === 403) {
        throw new Error('No tienes permisos para acceder a este perfil.');
      } else if (status >= 500) {
        throw new Error('Error interno del servidor. Intenta más tarde.');
      } else {
        throw new Error(data?.message || `Error del servidor: ${status}`);
      }
    } else if (error.request) {
      throw new Error('No se pudo conectar con el servidor para obtener el perfil.');
    } else {
      throw new Error(error.message || 'Error inesperado al obtener el perfil');
    }
  }
};