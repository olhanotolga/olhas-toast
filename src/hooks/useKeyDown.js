import React, { useEffect } from 'react';

function useKeyDown(key, callbackFn) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === key) {
        callbackFn();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [callbackFn]);
}

export default useKeyDown;
