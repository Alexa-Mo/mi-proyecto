import axios from 'axios';
import { getCookie, deleteCookie } from '../utils/cookieHelper';

// Base URL del backend
const BASE_URL = 'https://reflexoperu-v3.marketingmedico.vip/backend/public/api';

// Instancia centralizada de Axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 15000, // 15 segundos para mejor estabilidad
  validateStatus: (status) => status < 500, // No rechazar 4xx como errores
});

// Interceptor para agregar el token a cada petición
apiClient.interceptors.request.use(
  (config) => {
    const token = getCookie('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('🔑 Token agregado a la petición:', config.url);
    } else {
      console.log('⚠️ No se encontró token para:', config.url);
    }
    return config;
  },
  (error) => {
    console.error('❌ Error en interceptor de request:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores
apiClient.interceptors.response.use(
  (response) => {
    console.log('✅ Respuesta exitosa:', response.config.url, response.status);
    return response;
  },
  (error) => {
    console.error('❌ Error en API:', error.config?.url, error.response?.status);
    
    // Si el token es inválido (401), limpiar la sesión
    if (error.response?.status === 401) {
      console.log('🚪 Token inválido, redirigiendo al login...');
      deleteCookie('auth_token');
      
      // Evitar redirección si ya estamos en login
      if (!globalThis.location.pathname.includes('/login')) {
        globalThis.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
