import { Button } from '@/components/ui/button/button';
import { Card } from '@/components/ui/card/card';
import styles from './page.module.css';
import { ArrowRight, Star, Gift, Crown, Youtube } from 'lucide-react';

export default function Passo2() {
  return (
    <main className={styles.container}>
      <div className={styles.bgDecoration1} />
      <div className={styles.bgDecoration2} />

      <Card maxWidth="900px">
        <div className={styles.header}>
          <div className={styles.stepBadge}>Passo 2 de 4</div>
          <h1 className={styles.title}>Por que ser <span className={styles.highlight}>VIP?</span></h1>
        </div>

        <div className={styles.gridContainer}>
          <div className={styles.benefitsList}>
            <div className={styles.benefitItem}>
              <div className={`${styles.iconBox} ${styles.iconBoxYellow}`}>
                <Star size={24} color="#FFF" fill="#FFF" />
              </div>
              <div className={styles.benefitText}>
                <h3>Sorteios Exclusivos</h3>
                <p>Participe de sorteios mensais apenas para membros.</p>
              </div>
            </div>

            <div className={styles.benefitItem}>
              <div className={`${styles.iconBox} ${styles.iconBoxRed}`}>
                <Gift size={24} color="#FFF" />
              </div>
              <div className={styles.benefitText}>
                <h3>Recompensas In-game</h3>
                <p>Resgate itens e skins exclusivas nos seus jogos.</p>
              </div>
            </div>

            <div className={styles.benefitItem}>
              <div className={`${styles.iconBox} ${styles.iconBoxOrange}`}>
                <Crown size={24} color="#FFF" fill="#FFF" />
              </div>
              <div className={styles.benefitText}>
                <h3>Cargo no Discord</h3>
                <p>Destaque-se com um cargo VIP e salas privadas.</p>
              </div>
            </div>
          </div>

          <div className={styles.rightPanel}>
            <div className={styles.howToJoin}>
              <div className={styles.ytIconWrapper}>
                <Youtube size={32} color="var(--primary-red)" strokeWidth={2.5} />
              </div>
              <div>
                <h3>Como funciona?</h3>
                <p>
                  Basta ser um membro ativo do canal <strong>SkorpionGamer</strong> no YouTube! 
                  No próximo passo, vamos vincular sua conta.
                </p>
              </div>
            </div>

            <div className={styles.actions}>
              <div style={{ width: '100%' }}>
                <Button href="/passo-3" icon={<ArrowRight size={24} />}>
                  Entendi, Prosseguir!
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </main>
  );
}