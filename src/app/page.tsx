import { Button } from '@/components/ui/button/button';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Área de Resgate VIP</h1>
        <p className={styles.description}>
          Faça login com a sua conta do Google associada ao YouTube para verificar sua assinatura e resgatar seu acesso.
        </p>
        <form action="/api/auth/google" method="GET" className={styles.buttonContainer}>
          <Button type="submit" variant="primary">
            Logar com Google
          </Button>
        </form>
      </div>
    </main>
  );
}