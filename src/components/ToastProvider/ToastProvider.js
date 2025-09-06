import React, { createContext, useState, useCallback } from 'react';
import useKeyDown from '../../hooks/';

export const ToastContext = createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const dismissToasts = useCallback(() => {
    setToasts([]);
  }, []);

  useKeyDown('Escape', dismissToasts);

  function createToast(message, variant) {
    const newToast = {
      id: crypto.randomUUID(),
      message,
      variant,
    };

    setToasts([...toasts, newToast]);
  }

  function dismissToast(id) {
    if (!toasts.find((el) => el.id === id)) {
      throw 'No toast to dismiss!';
    }
    const newToastsArray = toasts.filter((toast) => toast.id !== id);
    setToasts(newToastsArray);
  }

  const value = {
    toasts,
    createToast,
    dismissToast,
  };

  return <ToastContext value={value}>{children}</ToastContext>;
}

export default ToastProvider;
