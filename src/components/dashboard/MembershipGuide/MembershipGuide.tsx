import styles from './MembershipGuide.module.css';
import { Crown, Youtube, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button/button';

export function MembershipGuide() {
  return (
    <section className={styles.guideContainer}>
      <div className={styles.headerArea}>
        <div className={styles.badge}>
          <Crown size={16} fill="currentColor" /> Clube de Membros do Skorpion
        </div>
        <h1 className={styles.title}>
          Desbloqueie o <span className={styles.highlight}>Acesso ao Clube de Membros!</span>
        </h1>
        <p className={styles.description}>
          Torne-se membro oficial do canal e tenha acesso a benefícios exclusivos, sorteios épicos e prioridade em todas as nossas jogatinas.
        </p>
      </div>

      <div className={styles.benefitsList}>
        <div className={styles.benefitItem}>
          <CheckCircle2 size={24} className={styles.checkIcon} />
          <div>
            <h3>Acesso ao grupo exclusivo de Membros do Whatsapp</h3>
            <p>Destaque-se na multidão com cor e tag únicas.</p>
          </div>
        </div>
        <div className={styles.benefitItem}>
          <CheckCircle2 size={24} className={styles.checkIcon} />
          <div>
            <h3>Sorteios mensais exclusivos para Membros!</h3>
            <p>Apenas para membros ativos do canal.</p>
          </div>
        </div>
        <div className={styles.benefitItem}>
          <CheckCircle2 size={24} className={styles.checkIcon} />
          <div>
            <h3>Gravar com o Skorpion</h3>
            <p>Você ganha acesso ao servidor de gravações!</p>
          </div>
        </div>
      </div>

      <div className={styles.stepsArea}>
        <h3 className={styles.stepsTitle}>Como se tornar VIP?</h3>
        <div className={styles.stepCards}>
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>1</div>
            <p>Clique em <strong>Seja Membro</strong> no nosso canal do YouTube.</p>
          </div>
          <ArrowRight className={styles.stepArrow} size={24} />
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>2</div>
            <p>Escolha seu nível (Bronze, Prata ou Ouro) e assine.</p>
          </div>
          <ArrowRight className={styles.stepArrow} size={24} />
          <div className={styles.stepCard}>
            <div className={styles.stepNumber}>3</div>
            <p>Volte aqui para vincular sua conta e resgatar o VIP!</p>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button href="/passo-1" icon={<Youtube size={24} />}>
          Já sou membro, resgatar Acesso!
        </Button>
        <a 
          href="https://youtube.com/skorpiongamer/join" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.secondaryButton}
        >
          Quero me tornar membro
        </a>
      </div>
    </section>
  );
}