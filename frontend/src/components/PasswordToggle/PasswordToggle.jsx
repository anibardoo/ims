// PasswordToggle.js
import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './PasswordToggle.module.css';

const PasswordToggle = ({ showPassword, togglePassword }) => {
  return (
    <button 
      type="button" 
      onClick={togglePassword} 
      className={styles.eyeIconButton}
    >
      {showPassword ? <FaEyeSlash /> : <FaEye />}
    </button>
  );
};

export default PasswordToggle;
