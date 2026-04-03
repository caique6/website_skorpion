import styles from './page.module.css';
import { MembershipGuide } from '@/components/dashboard/MembershipGuide/MembershipGuide';
import { StoreFront } from '@/components/dashboard/StoreFront/StoreFront';
import { LiveStats } from '@/components/dashboard/LiveStats/LiveStats';
import { VideoFeed } from '@/components/dashboard/VideoFeed/VideoFeed';
import { Leaderboard } from '@/components/dashboard/Leaderboard/Leaderboard';
import { CommunityMural } from '@/components/dashboard/CommunityMural/CommunityMural';

export default function Dashboard() {
  return (
    <main className={styles.container}>
      <div className={styles.bgDecoration1} />
      <div className={styles.bgDecoration2} />

      <div className={styles.bentoGrid}>
        <div className={styles.guideCell}>
          <MembershipGuide />
        </div>

        <div className={styles.statsCell}>
          <LiveStats />
        </div>

        <div className={styles.rankingCell}>
          <Leaderboard />
        </div>

        <div className={styles.muralCell}>
          <CommunityMural />
        </div>

        <div className={styles.storeCell}>
          <StoreFront />
        </div>

        <div className={styles.videoCell}>
          <VideoFeed />
        </div>
      </div>
    </main>
  );
}