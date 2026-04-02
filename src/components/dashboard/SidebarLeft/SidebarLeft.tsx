import Link from 'next/link';
import styles from './SidebarLeft.module.css';
import { Home, ShoppingBag, Trophy, Users, LogOut, Settings } from 'lucide-react';

export function SidebarLeft() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
        <div className={styles.logoIcon}>SG</div>
        <span className={styles.logoText}>Skorpion Gamer</span>
      </div>

      <nav className={styles.navigation}>
        <Link href="/" className={`${styles.navItem} ${styles.active}`}>
          <Home size={20} />
          <span>Início</span>
        </Link>
        <Link href="/loja" className={styles.navItem}>
          <ShoppingBag size={20} />
          <span>Loja VIP</span>
        </Link>
        <Link href="/ranking" className={styles.navItem}>
          <Trophy size={20} />
          <span>Ranking</span>
        </Link>
        <Link href="/comunidade" className={styles.navItem}>
          <Users size={20} />
          <span>Comunidade</span>
        </Link>
      </nav>

      <div className={styles.spacer} />

      <div className={styles.userSection}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>D</div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>David Felicio</span>
            <span className={styles.userTier}>Membro Ouro</span>
          </div>
        </div>
        <div className={styles.userActions}>
          <button className={styles.iconButton} aria-label="Configurações">
            <Settings size={18} />
          </button>
          <button className={styles.iconButton} aria-label="Sair">
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </aside>
  );
}