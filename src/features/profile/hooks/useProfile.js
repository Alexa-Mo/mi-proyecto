import { useState, useEffect } from 'react';
import { getProfile } from '../services/profileService';
import { useAuth } from '../../auth/hooks/useAuth';
import { useAsyncOperation, OPERATION_DELAYS } from '../../../hooks/useAsyncOperation';

/**
 * Hook personalizado para manejar el perfil del usuario con loading states
 * @returns {Object} - Estado del perfil, loading y error
 */
export const useProfile = () => {
  const { updateUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const profileOperation = useAsyncOperation(OPERATION_DELAYS.PROFILE);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Consumo directo sin delays artificiales
        const data = await getProfile();
        
        setProfile(data);
        updateUser(data); // Actualizar el contexto con los datos del perfil
      } catch (err) {
        console.error('Error al obtener perfil:', err);
        profileOperation.setError(err.message || 'Error al cargar perfil');
      }
    };

    fetchProfile();
  }, [updateUser, profileOperation.setError]);

  return { 
    profile, 
    loading: profileOperation.loading, 
    error: profileOperation.error,
    refetch: async () => {
      try {
        const data = await profileOperation.execute(async () => {
          return await getProfile();
        });
        setProfile(data);
        updateUser(data);
      } catch (err) {
        console.error('Error al refrescar perfil:', err);
      }
    }
  };
};