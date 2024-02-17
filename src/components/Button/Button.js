import React from 'react';

function Button({ label, ...props }) {
  return (
    <button {...props}>{label}</button>
  );
}

export default Button;
