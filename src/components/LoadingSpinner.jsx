/**
 * Componente de spinner de carga reutilizable con diferentes tamaños y mensajes
 */
const LoadingSpinner = ({ 
  size = 'md', 
  message = 'Cargando...', 
  fullScreen = false,
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50'
    : 'flex flex-col items-center justify-center p-4';

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className={`animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 ${sizeClasses[size]}`}></div>
      {message && (
        <p className="mt-3 text-sm font-medium text-gray-600 animate-pulse">
          {message}
        </p>
      )}
    </div>
  );
};

export default LoadingSpinner;
