import React from 'react';
import styles from './card.module.css';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: string;
}

export function Card({ children, className = '', maxWidth = '900px' }: CardProps) {
  return (
    <div 
      className={`${styles.card} ${className}`} 
      style={{ maxWidth }}
    >
      {children}
    </div>
  );
}