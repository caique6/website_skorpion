'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './PageLoader.module.css';

interface PageLoaderProps {
  onFinish: () => void;
}

export const PageLoader = ({ onFinish }: PageLoaderProps) => {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const minLoadingTime = setTimeout(() => {
      setIsFading(true);
      const exitAnimationTime = setTimeout(() => {
        onFinish();
      }, 800); 
      
      return () => clearTimeout(exitAnimationTime);
    }, 5500);

    return () => clearTimeout(minLoadingTime);
  }, [onFinish]);

  return (
    <div className={`${styles.container} ${isFading ? styles.fadeOut : ''}`}>
      <div className={styles.ambientBackdrop} />
      
      <div className={styles.centerStage}>
        <div className={`${styles.glowOrb} ${styles.glowRed}`} />
        <div className={`${styles.glowOrb} ${styles.glowOrange}`} />
        <div className={`${styles.glowOrb} ${styles.glowYellow}`} />
        
        <div className={styles.imageContainer}>
          <Image 
            src="/skorp.png" 
            alt="Skorpion Gamer" 
            width={180} 
            height={180} 
            priority
            className={styles.rawImage}
          />
        </div>
      </div>
      
      <div className={styles.glassCard}>
        <h1 className={styles.title}>Skorpion Gamer</h1>
        <p className={styles.subtitle}>
          Bem-vindo ao portal oficial do canal. Acompanhe todas as novidades e tenha acesso direto aos seus <span className={styles.highlight}>benefícios exclusivos</span> de membro.
        </p>
      </div>
    </div>
  );
};