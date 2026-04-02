import styles from './VideoFeed.module.css';
import { Play, Clock, Youtube } from 'lucide-react';

interface VideoItem {
  id: string;
  title: string;
  thumbnail: string;
  views: string;
  publishedAt: string;
}

export function VideoFeed() {
  const mockVideos: VideoItem[] = [
    {
      id: '1',
      title: 'A MAIOR INVASÃO DE TODOS OS TEMPOS NO GTA RP!',
      thumbnail: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800&h=450',
      views: '125K',
      publishedAt: 'Há 2 horas'
    },
    {
      id: '2',
      title: 'GASTEI 1 MILHÃO DE REAIS NESSE CARRO (GTA 5)',
      thumbnail: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800&h=450',
      views: '340K',
      publishedAt: 'Há 1 dia'
    }
  ];

  return (
    <section className={styles.feedContainer}>
      <div className={styles.header}>
        <Youtube size={24} color="var(--primary-red)" />
        <h2 className={styles.sectionTitle}>Últimos Lançamentos</h2>
      </div>
      <div className={styles.videoGrid}>
        {mockVideos.map((video) => (
          <div key={video.id} className={styles.videoCard}>
            <div className={styles.thumbnailWrapper}>
              <img src={video.thumbnail} alt={video.title} className={styles.thumbnail} />
              <div className={styles.playOverlay}>
                <div className={styles.playButton}>
                  <Play size={24} fill="currentColor" color="var(--primary-red)" />
                </div>
              </div>
            </div>
            <div className={styles.videoInfo}>
              <h3 className={styles.videoTitle}>{video.title}</h3>
              <div className={styles.videoMeta}>
                <span className={styles.metaBadge}>
                  <Play size={14} color="var(--primary-red)" /> {video.views}
                </span>
                <span className={styles.metaBadge}>
                  <Clock size={14} color="var(--primary-red)" /> {video.publishedAt}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}