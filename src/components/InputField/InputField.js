import React from 'react';

function InputField({ label, type = 'text', options = [], name, error, ...props }) {
  return (
    <div className="input-field">
      <label>{label}</label>
      {type === 'select' ? (
        <select name={name} {...props}>
          {options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
        </select>
      ) : (
        <input type={type} name={name} {...props} />
      )}
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default InputField;
