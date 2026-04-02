import styles from './ClubBenefits.module.css';
import { Crown, Zap, Gift, ShieldCheck } from 'lucide-react';

export function ClubBenefits() {
  return (
    <section className={styles.benefitsContainer}>
      <div className={styles.content}>
        <div className={styles.badge}>
          <Crown size={16} /> VIP Exclusivo
        </div>
        <h1 className={styles.title}>Domine o Servidor com o Clube Skorpion</h1>
        <p className={styles.description}>
          Desbloqueie acesso imediato a sorteios, cargos únicos no Discord, recompensas in-game e muito mais. A elite do canal está te esperando.
        </p>
        
        <div className={styles.perksGrid}>
          <div className={styles.perkItem}>
            <div className={styles.perkIcon}><Gift size={20} /></div>
            <span>Sorteios Mensais</span>
          </div>
          <div className={styles.perkItem}>
            <div className={styles.perkIcon}><ShieldCheck size={20} /></div>
            <span>Cargo no Discord</span>
          </div>
          <div className={styles.perkItem}>
            <div className={styles.perkIcon}><Zap size={20} /></div>
            <span>Itens In-game</span>
          </div>
        </div>

        <button className={styles.ctaButton}>
          Resgatar Acesso VIP Agora
        </button>
      </div>
      
      <div className={styles.visualArea}>
        <div className={styles.glow} />
        <Crown size={160} className={styles.heroIcon} />
      </div>
    </section>
  );
}