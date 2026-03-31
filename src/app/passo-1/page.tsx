import { Button } from '@/components/ui/button/button';
import { Card } from '@/components/ui/card/card';
import styles from './page.module.css';
import { Flame, Zap, Gamepad2 } from 'lucide-react';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.bgDecoration1} />
      <div className={styles.bgDecoration2} />

      <Card maxWidth="550px">
        <div className={styles.iconWrapper}>
          <Gamepad2 size={48} color="var(--highlight-white)" strokeWidth={2.5} />
          <div className={styles.sparkle1}>
            <Zap fill="var(--secondary-yellow)" color="var(--secondary-yellow)" size={24} />
          </div>
          <div className={styles.sparkle2}>
            <Flame fill="var(--secondary-orange)" color="var(--secondary-orange)" size={28} />
          </div>
        </div>

        <h1 className={styles.title}>
          Clube de Membros <br />
          <span className={styles.highlight}>Skorpion Gamer</span>
        </h1>
        
        <p className={styles.description}>
          Prepare-se para resgatar seus benefícios exclusivos. Você está a apenas alguns passos de desbloquear o acesso total!
        </p>

        <div className={styles.actions}>
          <div style={{ width: '100%', maxWidth: '300px' }}>
            <Button href="/passo-2" icon={<Zap size={24} fill="currentColor" />}>
              Começar Resgate
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}