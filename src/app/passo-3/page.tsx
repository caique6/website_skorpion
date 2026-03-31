import { Button } from '@/components/ui/button/button';
import { Card } from '@/components/ui/card/card';
import styles from './page.module.css';
import { Youtube, ShieldCheck, AlertCircle } from 'lucide-react';

export default function Passo3() {
  return (
    <main className={styles.container}>
      <div className={styles.bgDecoration1} />
      <div className={styles.bgDecoration2} />

      <Card maxWidth="550px">
        <div className={styles.header}>
          <div className={styles.stepBadge}>Passo 3 de 4</div>
          <h1 className={styles.title}>Vincular <span className={styles.highlight}>Conta</span></h1>
        </div>

        <div className={styles.iconShowcase}>
          <div className={styles.shieldIcon}>
            <ShieldCheck size={48} color="var(--highlight-white)" strokeWidth={2.5} />
          </div>
        </div>

        <p className={styles.description}>
          Para liberar seu acesso VIP, precisamos confirmar sua assinatura ativa no canal. A conexão é 100% segura.
        </p>

        <div className={styles.warningBox}>
          <AlertCircle size={28} color="var(--secondary-orange)" />
          <div className={styles.warningText}>
            <h4>Atenção Importante</h4>
            <p>
              Certifique-se de fazer login com a <strong>mesma conta do Google</strong> que você usou para assinar o canal.
            </p>
          </div>
        </div>

        <form action="/api/auth/google" method="GET" className={styles.form}>
          <Button type="submit" icon={<Youtube size={24} fill="currentColor" />}>
            Conectar com YouTube
          </Button>
        </form>
      </Card>
    </main>
  );
}