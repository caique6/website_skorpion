import styles from './LiveStats.module.css';
import { Users, Eye, Youtube, TrendingUp } from 'lucide-react';

export function LiveStats() {
  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <Youtube size={24} color="var(--primary-red)" />
        <h2 className={styles.title}>Dados do Canal</h2>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statBox}>
          <div className={styles.iconArea}>
            <Users size={28} />
          </div>
          <div className={styles.content}>
            <span className={styles.label}>Inscritos</span>
            <div className={styles.valueRow}>
              <span className={styles.value}>1.248.632</span>
              <span className={styles.trend}><TrendingUp size={14} /> +2.4k</span>
            </div>
          </div>
        </div>

        <div className={styles.statBox}>
          <div className={styles.iconArea}>
            <Eye size={28} />
          </div>
          <div className={styles.content}>
            <span className={styles.label}>Total de Views</span>
            <div className={styles.valueRow}>
              <span className={styles.value}>45.892.105</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}