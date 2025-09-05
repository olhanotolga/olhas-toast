import React, { useState } from 'react';

import Button from '../Button';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

const VARIANT_OPTIONS = ['notice', 'warning', 'success', 'error'];

function ToastPlayground() {
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentVariant, setCurrentVariant] = useState(VARIANT_OPTIONS[0]);
  const [toasts, setToasts] = useState([]);

  function addNewToast(e) {
    e.preventDefault();
    if (!currentMessage) {
      throw 'Toast contents are missing!';
    }

    const newToast = {
      id: crypto.randomUUID(),
      message: currentMessage,
      variant: currentVariant,
    };

    setToasts([...toasts, newToast]);
    setCurrentMessage('');
    setCurrentVariant(VARIANT_OPTIONS[0]);
  }

  function dismissToast(id) {
    if (!toasts.find((el) => el.id === id)) {
      throw 'No toast to dismiss!';
    }
    const newToastsArray = toasts.filter((toast) => toast.id !== id);
    setToasts(newToastsArray);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} dismissToast={dismissToast} />

      <form className={styles.controlsWrapper} onSubmit={(e) => addNewToast(e)}>
        <div className={styles.row}>
          <label
            htmlFor='message'
            className={styles.label}
            style={{ alignSelf: 'baseline' }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id='message'
              className={styles.messageInput}
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => (
              <label htmlFor={`variant-${variant}`} key={variant}>
                <input
                  id={`variant-${variant}`}
                  type='radio'
                  name='variant'
                  value={variant}
                  checked={currentVariant === variant}
                  onChange={() => setCurrentVariant(variant)}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button>Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
