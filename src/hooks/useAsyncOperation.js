import { useState, useCallback } from 'react';

/**
 * Hook personalizado para manejar operaciones asíncronas con delays mínimos
 * @param {number} minDelay - Delay mínimo en milisegundos
 * @returns {Object} - Estado y función para ejecutar operaciones
 */
export const useAsyncOperation = (minDelay = 800) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (asyncFunction, loadingMessage = 'Procesando...') => {
    setLoading(true);
    setError(null);

    try {
      // Ejecutar la operación y el delay en paralelo
      const [result] = await Promise.all([
        asyncFunction(),
        new Promise(resolve => setTimeout(resolve, minDelay))
      ]);

      return result;
    } catch (err) {
      console.error('Error en useAsyncOperation:', err);
      let errorMessage = 'Ha ocurrido un error';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.error) {
        errorMessage = err.error;
      }
      
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [minDelay]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
  }, []);

  return {
    loading,
    error,
    execute,
    reset,
    setError
  };
};

// Delays predefinidos para diferentes operaciones (optimizados)
export const OPERATION_DELAYS = {
  LOGIN: 500,     // Reducido para mejor UX
  REGISTER: 800,  // Reducido
  PROFILE: 100,   // Mínimo para mejor rendimiento
  LOGOUT: 300,    // Reducido
  DEFAULT: 200    // Reducido significativamente
};
