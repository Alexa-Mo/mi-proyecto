import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import { useAuth } from '../hooks/useAuth';
import { useAsyncOperation, OPERATION_DELAYS } from '../../../hooks/useAsyncOperation';
import Alert from '../../../components/Alert';
import '../../../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    document_number: '',
    name: '',
    paternal_lastname: '',
    maternal_lastname: '',
    email: '',
    phone: '',
    user_name: '',
    password: '',
    document_type_id: 1,
    country_id: 179,
  });

  const [success, setSuccess] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const registerOperation = useAsyncOperation(OPERATION_DELAYS.REGISTER);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    registerOperation.reset();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const dataToSend = {
        ...formData,
        last_session: new Date().toISOString().split('T')[0],
        account_statement: true,
      };

      await registerOperation.execute(async () => {
        return await registerUser(dataToSend);
      });

      setSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      console.error('Error en registro:', err);
    }
  };

  if (success) {
    return (
      <div className="register-success-container">
        <div className="register-success-card">
          <div className="register-success-icon">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="register-success-title">
            ¡Registro exitoso!
          </h2>
          <p className="register-success-message">
            Redirigiendo al inicio de sesión...
          </p>
          <div className="register-success-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="register-container">
      {/* Fondos animados sofisticados */}
      <div className="register-background">
        <div className="register-gradient-bg"></div>
        <div className="register-grid-pattern"></div>
        
        <div className="register-particles">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="register-particle"
              style={{
                width: `${120 + i * 40}px`,
                height: `${120 + i * 40}px`,
                top: `${15 + i * 20}%`,
                left: `${15 + i * 25}%`,
                animationDelay: `${i * 2}s`,
              }}
            />
          ))}
        </div>

        <div className="register-connection-lines">
          <div className="register-line-vertical"></div>
          <div className="register-line-horizontal"></div>
        </div>
      </div>

      {/* Tarjeta de registro */}
      <div 
        className="register-card-container"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Efecto de borde animado */}
        <div className={`register-card-glow ${isHovered ? 'register-card-glow-hover' : ''}`}></div>
        
        <div className="register-card">
          {/* Header removed per user request */}

          {/* Formulario moderno */}
          <form onSubmit={handleSubmit} className="register-form">
            {/* Grid de 2 columnas */}
            <div className="register-form-grid">
              {/* Documento */}
              <div className="register-form-group">
                <label htmlFor="document_number" className="register-form-label">
                  N° Documento
                </label>
                <div className="register-input-container">
                  <input
                    type="text"
                    id="document_number"
                    name="document_number"
                    value={formData.document_number}
                    onChange={handleChange}
                    className="register-form-input"
                    placeholder="12345678"
                    required
                  />
                </div>
              </div>

              {/* Nombre */}
              <div className="register-form-group">
                <label htmlFor="name" className="register-form-label">
                  Nombre
                </label>
                <div className="register-input-container">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="register-form-input"
                    placeholder="Juan"
                    required
                  />
                </div>
              </div>

              {/* Apellido Paterno */}
              <div className="register-form-group">
                <label htmlFor="paternal_lastname" className="register-form-label">
                  Apellido Paterno
                </label>
                <div className="register-input-container">
                  <input
                    type="text"
                    id="paternal_lastname"
                    name="paternal_lastname"
                    value={formData.paternal_lastname}
                    onChange={handleChange}
                    className="register-form-input"
                    placeholder="Pérez"
                    required
                  />
                </div>
              </div>

              {/* Apellido Materno */}
              <div className="register-form-group">
                <label htmlFor="maternal_lastname" className="register-form-label">
                  Apellido Materno
                </label>
                <div className="register-input-container">
                  <input
                    type="text"
                    id="maternal_lastname"
                    name="maternal_lastname"
                    value={formData.maternal_lastname}
                    onChange={handleChange}
                    className="register-form-input"
                    placeholder="García"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div className="register-form-group">
                <label htmlFor="email" className="register-form-label">
                  Correo Electrónico
                </label>
                <div className="register-input-container">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="register-form-input"
                    placeholder="tu@email.com"
                    required
                  />
                </div>
              </div>

              {/* Teléfono */}
              <div className="register-form-group">
                <label htmlFor="phone" className="register-form-label">
                  Teléfono
                </label>
                <div className="register-input-container">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="register-form-input"
                    placeholder="999888777"
                    required
                  />
                </div>
              </div>

              {/* Nombre de Usuario */}
              <div className="register-form-group">
                <label htmlFor="user_name" className="register-form-label">
                  Nombre de Usuario
                </label>
                <div className="register-input-container">
                  <input
                    type="text"
                    id="user_name"
                    name="user_name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className="register-form-input"
                    placeholder="juanperez"
                    required
                  />
                </div>
              </div>

              {/* Contraseña */}
              <div className="register-form-group">
                <label htmlFor="password" className="register-form-label">
                  Contraseña
                </label>
                <div className="register-input-container">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="register-form-input"
                    placeholder="Mínimo 8 caracteres"
                    minLength={8}
                    required
                  />
                </div>
              </div>
            </div>

            {/* Mensaje de error */}
            {registerOperation.error && (
              <Alert 
                type="error" 
                message={registerOperation.error}
                className="register-animate-slide-in"
              />
            )}

            {/* Botón Submit */}
            <button
              type="submit"
              disabled={registerOperation.loading}
              className="register-submit-button"
            >
              {/* Efecto de brillo al hover */}
              <div className="register-submit-glow"></div>
              
              {registerOperation.loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="register-loading-spinner"></div>
                  <span className="text-white/90">Registrando...</span>
                </div>
              ) : (
                <div className="register-submit-content">
                  <svg className="register-submit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Crear Cuenta</span>
                </div>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="register-footer">
            <p className="register-footer-text">
              ¿Ya tienes cuenta?{' '}
              <Link
                to="/login"
                className="register-footer-link"
              >
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;