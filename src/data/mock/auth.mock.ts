import { Benefit, AuthUser, RedemptionCode } from '@/app/auth/types/auth.types';

export const benefitsMock: Benefit[] = [
  {
    id: 'ben_1',
    title: 'Acesso ao Grupo VIP no WhatsApp',
    description: 'Interaja diretamente com a comunidade e receba novidades em primeira mão.',
    iconName: 'WhatsApp',
    minimumLevel: 'RP 50'
  },
  {
    id: 'ben_2',
    title: 'Cargo Exclusivo no Discord',
    description: 'Destaque-se no servidor com cores e permissões especiais.',
    iconName: 'Discord',
    minimumLevel: 'RP 50'
  },
  {
    id: 'ben_3',
    title: 'Sorteios Mensais',
    description: 'Participe de sorteios de gift cards e itens in-game.',
    iconName: 'CardGiftcard',
    minimumLevel: 'RP 300'
  },
  {
    id: 'ben_4',
    title: 'Jogatina com o Skorpion',
    description: 'Prioridade para participar das lives jogando junto.',
    iconName: 'SportsEsports',
    minimumLevel: 'RP 9999'
  }
];

export const authUserMock: AuthUser = {
  id: 'usr_123456',
  googleId: 'g_0987654321',
  youtubeChannelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
  name: 'David Felicio',
  email: 'davidfelicio2402@gmail.com',
  avatarUrl: 'https://ui-avatars.com/api/?name=David+Felicio&background=D9043D&color=fff',
  membershipLevel: 'RP 9999',
  isActive: true,
  joinedAt: '2025-10-15T10:00:00Z'
};

export const redemptionCodeMock: RedemptionCode = {
  id: 'code_987',
  userId: 'usr_123456',
  code: 'SKP-9999-ABCD-EFGH',
  status: 'active',
  generatedAt: '2026-04-09T10:00:00Z',
  expiresAt: '2026-04-10T10:00:00Z'
};