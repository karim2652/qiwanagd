import { toast } from 'react-toastify';

export const toastConfig = {
  position: 'bottom-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
  rtl: true, // For Arabic support
  containerId: 'toast-container',
  style: {
    zIndex: 999999,
    fontSize: '16px',
    fontFamily: 'inherit',
    marginBottom: '80px',
  },
};

export const showToast = {
  success: (message) => {
    toast.success(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: '#4CAF50',
        color: '#fff',
        minWidth: '300px',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        position: 'relative',
      },
    });
  },
  error: (message) => {
    toast.error(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: '#f44336',
        color: '#fff',
        minWidth: '300px',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        position: 'relative',
      },
    });
  },
  info: (message) => {
    toast.info(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: '#2196F3',
        color: '#fff',
        minWidth: '300px',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        position: 'relative',
      },
    });
  },
  warning: (message) => {
    toast.warning(message, {
      ...toastConfig,
      style: {
        ...toastConfig.style,
        background: '#ff9800',
        color: '#fff',
        minWidth: '300px',
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        position: 'relative',
      },
    });
  },
};
