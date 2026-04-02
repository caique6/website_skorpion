import styles from './CommunityMural.module.css';
import { MessageCircleHeart, Star } from 'lucide-react';

interface Testimonial {
  id: string;
  user: string;
  content: string;
  tier: string;
}

export function CommunityMural() {
  const messages: Testimonial[] = [
    {
      id: '1',
      user: 'Carlos_BR',
      tier: 'Membro Ouro',
      content: 'Melhor clube de membros disparado! Já ganhei skin no sorteio passado. As lives exclusivas são absurdamente boas.'
    },
    {
      id: '2',
      user: 'AnaGamer',
      tier: 'Membro Prata',
      content: 'A comunidade no Discord é muito acolhedora. Recomendo dms! Fiz muitos amigos para jogar GTA RP.'
    },
    {
      id: '3',
      user: 'Zezinho123',
      tier: 'Membro Bronze',
      content: 'As lives exclusivas são muito boas, vale cada centavo. O Skorpion sempre dá atenção pro chat VIP.'
    },
    {
      id: '4',
      user: 'BiaSniper',
      tier: 'Membro Ouro',
      content: 'Assinei ontem e já consegui entrar na sala personalizada. Experiência incrível!'
    }
  ];

  return (
    <section className={styles.muralContainer}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <MessageCircleHeart size={20} color="var(--highlight-white)" />
        </div>
        <h2 className={styles.title}>Mural VIP</h2>
      </div>

      <div className={styles.feed}>
        {messages.map((msg) => (
          <div key={msg.id} className={styles.messageCard}>
            <Star size={16} color="var(--secondary-yellow)" className={styles.starIcon} />
            <p className={styles.content}>"{msg.content}"</p>
            <div className={styles.authorArea}>
              <div className={styles.avatar}>{msg.user.charAt(0)}</div>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{msg.user}</span>
                <span className={styles.authorTier}>{msg.tier}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}