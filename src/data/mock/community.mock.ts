import { ChannelStats, Testimonial, RankedMember, YouTubeVideo, StoreProduct } from '@/app/community/types/community.types';

export const channelStatsMock: ChannelStats = {
  subscriberCount: 1542000,
  memberCount: 8432,
  activeRescues: 7105,
  totalViews: 85000000
};

export const testimonialsMock: Testimonial[] = [
  {
    id: 'test_1',
    authorName: 'Carlos Silva',
    authorAvatarUrl: 'https://ui-avatars.com/api/?name=Carlos+Silva',
    membershipLevel: 'RP 300',
    message: 'O grupo do WhatsApp é insano, todo dia tem call e o pessoal ajuda muito nas raids!',
    createdAt: '2026-04-08T14:30:00Z'
  },
  {
    id: 'test_2',
    authorName: 'Ana Souza',
    authorAvatarUrl: 'https://ui-avatars.com/api/?name=Ana+Souza',
    membershipLevel: 'RP 9999',
    message: 'Jogar na live foi a melhor experiência. Vale cada centavo do clube de membros.',
    createdAt: '2026-04-07T09:15:00Z'
  }
];

export const rankedMembersMock: RankedMember[] = [
  {
    id: 'rnk_1',
    name: 'David Felicio',
    avatarUrl: 'https://ui-avatars.com/api/?name=David+Felicio&background=D9043D&color=fff',
    membershipLevel: 'RP 9999',
    monthsActive: 24,
    points: 15400
  },
  {
    id: 'rnk_2',
    name: 'Pedro Henrique',
    avatarUrl: 'https://ui-avatars.com/api/?name=Pedro+Henrique',
    membershipLevel: 'RP 9999',
    monthsActive: 18,
    points: 12200
  },
  {
    id: 'rnk_3',
    name: 'Lucas Gamer',
    avatarUrl: 'https://ui-avatars.com/api/?name=Lucas+Gamer',
    membershipLevel: 'RP 300',
    monthsActive: 12,
    points: 8500
  }
];

export const youtubeVideosMock: YouTubeVideo[] = [
  {
    id: 'vid_1',
    title: 'NOVA ATUALIZAÇÃO MUDOU TUDO! (Review Completa)',
    thumbnailUrl: 'https://picsum.photos/seed/skp1/640/360',
    videoUrl: 'https://youtube.com/watch?v=123',
    publishedAt: '2026-04-08T18:00:00Z',
    durationInSeconds: 845
  },
  {
    id: 'vid_2',
    title: 'COMO FARMAR MAIS RÁPIDO NO NOVO EVENTO',
    thumbnailUrl: 'https://picsum.photos/seed/skp2/640/360',
    videoUrl: 'https://youtube.com/watch?v=456',
    publishedAt: '2026-04-06T18:00:00Z',
    durationInSeconds: 620
  }
];

export const storeProductsMock: StoreProduct[] = [
  {
    id: 'prod_1',
    name: 'Camiseta Oficial Skorpion',
    description: 'Camiseta 100% algodão com estampa exclusiva do canal.',
    price: 89.90,
    discountPercentage: 15,
    imageUrl: 'https://picsum.photos/seed/prod1/400/400',
    externalUrl: 'https://store.skorpion.com.br/camiseta'
  },
  {
    id: 'prod_2',
    name: 'Mousepad Gamer GG',
    description: 'Mousepad speed 90x40cm com bordas costuradas.',
    price: 120.00,
    discountPercentage: 20,
    imageUrl: 'https://picsum.photos/seed/prod2/400/400',
    externalUrl: 'https://store.skorpion.com.br/mousepad'
  }
];