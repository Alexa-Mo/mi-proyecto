import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import Alert from '../../../components/Alert';
import { useAsyncOperation, OPERATION_DELAYS } from '../../../hooks/useAsyncOperation';
import '../../../styles/Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isHovered, setIsHovered] = useState(false);
  const loginOperation = useAsyncOperation(OPERATION_DELAYS.LOGIN);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    loginOperation.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    loginOperation.reset();

    try {
      const response = await loginUser(formData);

      if (!response.token) {
        throw new Error('No se recibió el token de autenticación');
      }

      const userData = response.user || { email: formData.email };
      login(response.token, userData);
      navigate('/profile');
    } catch (err) {
      loginOperation.setError(err.message || 'Error al iniciar sesión');
      console.error('Error en login:', err);
    }
  };

  return (
    <div className="login-container">
      {/* Fondos animados sofisticados */}
      <div className="login-background">
        <div className="login-gradient-bg"></div>
        <div className="login-grid-pattern"></div>
        
        <div className="login-particles">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="login-particle"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                top: `${20 + i * 25}%`,
                left: `${10 + i * 30}%`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="login-connection-lines">
          <div className="login-line-vertical"></div>
          <div className="login-line-horizontal"></div>
        </div>
      </div>

      {/* Tarjeta de login */}
      <div 
        className="login-card-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Efecto de borde animado */}
        <div className={`login-card-glow ${isHovered ? 'login-card-glow-hover' : ''}`}></div>
        
        <div className="login-card">
          {/* Header removed per user request */}

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="login-form">
            {/* Campo Email */}
            <div className="login-form-group">
              <label htmlFor="email" className="login-form-label">
                Correo Electrónico
              </label>
              <div className="login-input-container">
                <div className="login-form-icon">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="login-form-input"
                  placeholder="tu@empresa.com"
                  required
                />
              </div>
            </div>

            {/* Campo Contraseña */}
            <div className="login-form-group">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="login-form-label">
                  Contraseña
                </label>
                <button type="button" className="text-xs text-neutral-500 hover:text-blue-400 transition-colors">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="login-input-container">
                <div className="login-form-icon">
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="login-form-input"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* Recordar sesión */}
            <div className="login-checkbox-container">
              <input
                type="checkbox"
                id="remember"
                className="login-checkbox"
              />
              <label htmlFor="remember" className="login-checkbox-label">
                Mantener sesión iniciada
              </label>
            </div>

            {/* Mensaje de error */}
            {loginOperation.error && (
              <Alert 
                type="error" 
                message={loginOperation.error}
                className="login-animate-slide-in"
              />
            )}

            {/* Botón de submit */}
            <button
              type="submit"
              disabled={loginOperation.loading}
              className="login-submit-button"
            >
              {/* Efecto de brillo al hover */}
              <div className="login-submit-glow"></div>
              
              {loginOperation.loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="login-loading-spinner"></div>
                  <span className="text-white/90">Verificando credenciales...</span>
                </div>
              ) : (
                <div className="login-submit-content">
                  <svg className="login-submit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  <span>Acceder a la plataforma</span>
                </div>
              )}
            </button>
          </form>

          {/* Footer simplificado */}
          <div className="login-footer">
            <p className="login-footer-text">
              ¿Primera vez aquí?{' '}
              <Link 
                to="/register" 
                className="login-footer-link"
              >
                Crear una cuenta
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;