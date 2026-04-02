import styles from './Leaderboard.module.css';
import { Trophy, Crown, Flame } from 'lucide-react';

interface Member {
  id: string;
  name: string;
  tier: string;
  points: number;
}

export function Leaderboard() {
  const topMembers: Member[] = [
    { id: '1', name: 'NinjaSniper', tier: 'Ouro', points: 15420 },
    { id: '2', name: 'DarkKnight', tier: 'Ouro', points: 12350 },
    { id: '3', name: 'PandaGamer', tier: 'Prata', points: 11200 },
    { id: '4', name: 'GhostRider', tier: 'Prata', points: 9800 },
    { id: '5', name: 'CyberPunk', tier: 'Bronze', points: 8450 }
  ];

  const firstPlace = topMembers[0];
  const others = topMembers.slice(1);

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <div className={styles.iconBox}>
          <Trophy size={20} color="var(--highlight-white)" />
        </div>
        <h2 className={styles.title}>Top Membros</h2>
      </div>

      <div className={styles.content}>
        <div className={styles.championCard}>
          <div className={styles.championAvatarArea}>
            <div className={styles.championAvatar}>
              {firstPlace.name.charAt(0)}
              <Crown size={20} color="var(--secondary-yellow)" className={styles.crown} />
            </div>
          </div>
          <div className={styles.championInfo}>
            <span className={styles.championName}>{firstPlace.name}</span>
            <div className={styles.championMeta}>
              <span className={styles.championTier}>{firstPlace.tier}</span>
              <div className={styles.championPoints}>
                <Flame size={14} color="var(--highlight-white)" />
                <span>{firstPlace.points}</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.othersList}>
          {others.map((member, index) => (
            <div key={member.id} className={styles.listItem}>
              <div className={styles.rankBadge}>{index + 2}</div>
              <div className={styles.listInfo}>
                <span className={styles.listName}>{member.name}</span>
                <span className={styles.listTier}>{member.tier}</span>
              </div>
              <span className={styles.listPoints}>{member.points}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}