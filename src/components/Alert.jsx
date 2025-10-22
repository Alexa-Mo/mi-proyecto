const Alert = ({ type = 'error', title, message, onClose, className = '' }) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'success':
        return {
          container: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30',
          icon: 'text-green-300',
          title: 'text-green-100',
          message: 'text-green-200'
        };
      case 'warning':
        return {
          container: 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30',
          icon: 'text-yellow-300',
          title: 'text-yellow-100',
          message: 'text-yellow-200'
        };
      case 'info':
        return {
          container: 'bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30',
          icon: 'text-blue-300',
          title: 'text-blue-100',
          message: 'text-blue-200'
        };
      case 'error':
      default:
        return {
          container: 'bg-gradient-to-r from-blue-500/20 to-indigo-500/20 border-blue-400/30',
          icon: 'text-blue-300',
          title: 'text-blue-100',
          message: 'text-blue-200'
        };
    }
  };

  const styles = getAlertStyles();

  const getIcon = () => {
    switch (type) {
      case 'success':
        return (
          <svg className={`w-5 h-5 ${styles.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'warning':
        return (
          <svg className={`w-5 h-5 ${styles.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
      case 'info':
        return (
          <svg className={`w-5 h-5 ${styles.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'error':
      default:
        return (
          <svg className={`w-5 h-5 ${styles.icon}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        );
    }
  };

  return (
    <div className={`${styles.container} border backdrop-blur-sm rounded-xl p-4 shadow-lg ${className}`}>
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-semibold ${styles.title} mb-1`}>
              {title}
            </h4>
          )}
          <p className={`text-sm ${styles.message}`}>
            {message}
          </p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className={`flex-shrink-0 ${styles.icon} hover:text-white transition-colors`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
