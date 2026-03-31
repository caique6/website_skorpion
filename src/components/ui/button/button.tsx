'use client';

import React, { useState } from 'react';
import styles from './button.module.css';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  icon?: React.ReactNode;
  href?: string;
}

export function Button({
  children,
  variant = 'primary',
  isLoading,
  disabled,
  icon,
  href,
  onClick,
  type,
  ...props
}: ButtonProps) {
  const [isFiring, setIsFiring] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isFiring || disabled || isLoading) return;

    if (href) {
      e.preventDefault();
      setIsFiring(true);
      setTimeout(() => {
        if (href.startsWith('http')) {
          window.open(href, '_blank');
          setIsFiring(false);
        } else {
          router.push(href);
        }
      }, 700);
    } else if (type === 'submit') {
      const form = e.currentTarget.closest('form');
      if (form) {
        e.preventDefault();
        setIsFiring(true);
        setTimeout(() => {
          form.submit();
        }, 700);
      } else if (onClick) {
        onClick(e);
      }
    } else if (onClick) {
      onClick(e);
    }
  };

  const baseClass = styles.button;
  const variantClass = styles[variant];
  const disabledClass = disabled || isLoading ? styles.disabled : '';
  const firingClass = isFiring ? styles.firing : '';
  const finalClassName = `${baseClass} ${variantClass} ${disabledClass} ${firingClass}`.trim();

  return (
    <button type={type} className={finalClassName} disabled={disabled || isLoading || isFiring} onClick={handleClick} {...props}>
      {isFiring && (
        <div className={styles.fireContainer}>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
          <div className={styles.flame}></div>
        </div>
      )}
      <span className={styles.content} style={{ opacity: isFiring ? 0 : 1 }}>
        {isLoading ? <Loader2 className={styles.spinner} size={24} /> : icon}
        {children}
      </span>
    </button>
  );
}