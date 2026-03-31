import React from 'react';
import styles from './button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  isLoading,
  disabled,
  ...props
}: ButtonProps) {
  const baseClass = styles.button;
  const variantClass = styles[variant];
  const disabledClass = disabled || isLoading ? styles.disabled : '';
  const finalClassName = `${baseClass} ${variantClass} ${disabledClass}`.trim();

  return (
    <button className={finalClassName} disabled={disabled || isLoading} {...props}>
      {isLoading ? 'Carregando...' : children}
    </button>
  );
}