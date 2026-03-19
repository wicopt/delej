import React from 'react';
import './ButtonPrimary.css'; 

const Button = ({ children, onClick, type = 'button', variant='primary', className='', ...props }) => {
    const buttonClasses=[
        'custom-button',
        `custom-button--${variant}`, 
        className
    ].filter(Boolean).join(' ');
  return (
    <button type={type} onClick={onClick} className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;