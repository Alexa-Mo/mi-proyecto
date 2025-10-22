import { useProfile } from '../hooks/useProfile';
import { useAuth } from '../../auth/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import '../../../styles/Profile.css';

const Profile = () => {
  const { profile, loading, error } = useProfile();
  const { logout, logoutLoading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="profile-loading-content">
          <div className="profile-loading-spinner"></div>
          <p className="profile-loading-text">Cargando perfil...</p>
        </div>
      </div>
    );
  }

  if (error) {
    const isAuthError = error.includes('401') || error.includes('expirado') || error.includes('inválido');
    
    return (
      <div className="profile-error">
        <div className="profile-error-content">
          <div className="profile-error-icon">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isAuthError ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              )}
            </svg>
          </div>
          
          <h2 className="profile-error-title">
            {isAuthError ? 'Sesión Expirada' : 'Error al cargar perfil'}
          </h2>
          
          <p className="profile-error-message">
            {isAuthError 
              ? 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
              : 'Ha ocurrido un error al cargar tu perfil. Por favor, intenta nuevamente.'
            }
          </p>
          
          <div className="profile-error-actions">
            <button 
              onClick={isAuthError ? logout : () => navigate('/')} 
              className="profile-error-button profile-error-primary"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              {isAuthError ? 'Ir al Login' : 'Volver al Inicio'}
            </button>
            
            {!isAuthError && (
              <button 
                onClick={() => window.location.reload()} 
                className="profile-error-button profile-error-secondary"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reintentar
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Logout button (visible on profile) */}
      <div className="profile-logout-wrapper">
        <button
          onClick={async () => {
            await logout();
            navigate('/login');
          }}
          className="profile-logout-button"
          disabled={logoutLoading}
        >
          {logoutLoading ? 'Cerrando...' : 'Cerrar Sesión'}
        </button>
      </div>

      {/* Contenido principal */}
      <main className="profile-main">
        {/* Tarjeta de perfil principal */}
        <section className="profile-hero-card">
          <div className="profile-avatar">
            {profile?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          
          <h1 className="profile-name">
            {profile?.name || 'Usuario'}
          </h1>
          
          <p className="profile-username">
            @{profile?.user_name || 'username'}
          </p>
          
          <div className="profile-badge">
            <div className="profile-badge-dot"></div>
            <span>{profile?.role?.name || 'Usuario'}</span>
          </div>
        </section>

        {/* Grid de información */}
        <div className="profile-info-grid">
          {/* Información personal */}
          <section className="profile-info-card">
            <div className="profile-card-header">
              <div className="profile-card-icon">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="profile-card-title">Información Personal</h2>
            </div>
            
            <div className="profile-info-list">
              <div className="profile-info-item">
                <span className="profile-info-label">Correo Electrónico</span>
                <span className="profile-info-value">{profile?.email}</span>
              </div>
              
              <div className="profile-info-item">
                <span className="profile-info-label">Teléfono</span>
                <span className={`profile-info-value ${!profile?.phone ? 'empty' : ''}`}>
                  {profile?.phone || 'No registrado'}
                </span>
              </div>
              
              <div className="profile-info-item">
                <span className="profile-info-label">País</span>
                <span className={`profile-info-value ${!profile?.country?.name ? 'empty' : ''}`}>
                  {profile?.country?.name || 'No especificado'}
                </span>
              </div>
            </div>
          </section>

          {/* Información de cuenta */}
          <section className="profile-info-card">
            <div className="profile-card-header">
              <div className="profile-card-icon">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="profile-card-title">Información de Cuenta</h2>
            </div>
            
            <div className="profile-info-list">
              <div className="profile-info-item">
                <span className="profile-info-label">ID de Usuario</span>
                <span className="profile-info-value">{profile?.id}</span>
              </div>
              
              <div className="profile-info-item">
                <span className="profile-info-label">Rol</span>
                <span className="profile-info-value">{profile?.role?.name || 'Usuario'}</span>
              </div>
              
              <div className="profile-info-item">
                <span className="profile-info-label">Nombre de Usuario</span>
                <span className="profile-info-value">@{profile?.user_name}</span>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Profile;