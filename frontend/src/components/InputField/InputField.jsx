import React from 'react';
import styles from './InputField.module.css';
import InputIcon from '../../utils/InputIcon';

const InputField = ({ type, id, name, value, onChange, icon, label, helperText }) => {
  return (
    <div className={styles.inputField}>
      <label htmlFor={id} className="form-label d-flex align-items-center fw-bold">
        {icon && <span className="me-2"><InputIcon icon={icon} /></span>}
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className="form-control"
      />
      {helperText && <small className="form-text text-muted">{helperText}</small>}
    </div>
  );
};

export default InputField;
