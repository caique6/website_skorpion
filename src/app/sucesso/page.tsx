import { Button } from '@/components/ui/button/button';
import styles from './page.module.css';
import Link from 'next/link';

interface SucessoProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Sucesso({ searchParams }: SucessoProps) {
  const codigo = searchParams.codigo as string;

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Autenticação Concluída!</h1>
        <p className={styles.description}>
          Sua conta foi vinculada com sucesso. Para liberar seu acesso ao grupo VIP, envie o código abaixo para o nosso bot no WhatsApp.
        </p>

        <div className={styles.codeBox}>
          <span className={styles.code}>{codigo || 'CODIGO-NAO-ENCONTRADO'}</span>
        </div>

        <p className={styles.instruction}>
          Copie o código acima e envie exatamente como está para o número do nosso Bot.
        </p>

        <Link href="/">
          <Button variant="secondary" type="button">
            Voltar ao Início
          </Button>
        </Link>
      </div>
    </main>
  );
}