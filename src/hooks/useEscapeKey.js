import React, { useEffect } from 'react';

function useEscapeKey(callbackFn) {
  useEffect(() => {
    function handleEscapeKeyDown(event) {
      if (event.key === 'Escape') {
        callbackFn();
      }
    }
    window.addEventListener('keydown', handleEscapeKeyDown);

    return () => {
      window.removeEventListener('keydown', handleEscapeKeyDown);
    };
  }, []);
}

export default useEscapeKey;
