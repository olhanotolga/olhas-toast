import React from 'react';

import styles from './Button.module.css';

function Button({ className = '', handleClick, ...delegated }) {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={handleClick}
      {...delegated}
    />
  );
}

export default Button;
