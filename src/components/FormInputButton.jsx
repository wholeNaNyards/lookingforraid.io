import React from 'react';

import './FormInputButton.css';

const FormInputButton = ({ action, checked, icon, name, onChange, text, type, value }) => {
  return (
    <div className="form-button">
      <label className={`form-button__content ${checked ? 'active' : ''}`}>
        <input
          data-action={action}
          checked={checked}
          name={name}
          onChange={onChange}
          type={type}
          value={value}
        />
        {icon && <img className="form-button__icon" src={icon} alt={`${value} icon.`} />}
        {text}
      </label>
    </div>
  );
};

export default FormInputButton;
