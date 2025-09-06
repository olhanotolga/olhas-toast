import React, { useContext, useState } from 'react';

import { VARIANT_OPTIONS } from '../../constants';
import { ToastContext } from '../ToastProvider';
import Button from '../Button';
import ToastShelf from '../ToastShelf';

import styles from './ToastPlayground.module.css';

function ToastPlayground() {
  const { createToast } = useContext(ToastContext);
  const [currentMessage, setCurrentMessage] = useState('');
  const [currentVariant, setCurrentVariant] = useState(VARIANT_OPTIONS[0]);

  function addNewToast(e) {
    e.preventDefault();
    if (!currentMessage) {
      throw 'Toast contents are missing!';
    }

    createToast(currentMessage, currentVariant);

    setCurrentMessage('');
    setCurrentVariant(VARIANT_OPTIONS[0]);
  }

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt='Cute toast mascot' src='/toast.png' />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf />

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
