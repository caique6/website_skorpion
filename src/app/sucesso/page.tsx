import { Button } from '@/components/ui/button/button';
import { Card } from '@/components/ui/card/card';
import styles from './page.module.css';
import { PartyPopper, MessageCircle } from 'lucide-react';

interface SucessoProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Sucesso({ searchParams }: SucessoProps) {
  const codigo = searchParams.codigo as string || 'CODIGO-NAO-ENCONTRADO';

  return (
    <main className={styles.container}>
      <div className={styles.bgDecoration1} />
      <div className={styles.bgDecoration2} />

      <Card maxWidth="550px">
        <div className={styles.header}>
          <div className={styles.stepBadge}>Passo 4 de 4</div>
          <h1 className={styles.title}>Tudo <span className={styles.highlight}>Pronto!</span></h1>
        </div>

        <div className={styles.iconShowcase}>
          <div className={styles.successIcon}>
            <PartyPopper size={48} color="var(--highlight-white)" strokeWidth={2.5} />
          </div>
        </div>

        <p className={styles.description}>
          Sua conta foi vinculada com sucesso. Copie seu código de acesso abaixo e envie para o nosso Bot no WhatsApp para entrar no grupo VIP.
        </p>

        <div className={styles.codeBox}>
          <span className={styles.codeLabel}>SEU CÓDIGO VIP</span>
          <div className={styles.codeWrapper}>
            <span className={styles.code}>{codigo}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <div style={{ width: '100%', maxWidth: '300px' }}>
            <Button 
              href={`https://wa.me/5511999999999?text=Ol%C3%A1%2C+quero+resgatar+meu+VIP%21+Meu+c%C3%B3digo+%C3%A9%3A+${codigo}`} 
              variant="primary" 
              icon={<MessageCircle size={24} fill="currentColor" />}
            >
              Enviar para o WhatsApp
            </Button>
          </div>
        </div>
      </Card>
    </main>
  );
}