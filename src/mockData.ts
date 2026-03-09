import { Hub, Member, Event, UserRole, SubscriptionStatus, PostStatus, PostSubmission, TicketOrder } from './types';

export const MOCK_HUBS: Hub[] = [
  { id: '1', name: 'Cascavel', region: 'Oeste PR', instagramHandle: '@euteindicocvel', status: 'active' },
  { id: '2', name: 'Toledo', region: 'Oeste PR', instagramHandle: '@euteindicotoledo', status: 'active' },
  { id: '3', name: 'Marechal', region: 'Oeste PR', instagramHandle: '@euteindicomarechal', status: 'active' },
];

export const MOCK_MEMBERS: Member[] = [
  {
    id: 'm1',
    hubId: '1',
    name: 'Welington Silva',
    phone: '45999999999',
    email: 'welington@exemplo.com',
    companyName: 'Sede Eu te Indico',
    segments: ['Estratégia', 'Consultoria'],
    status: SubscriptionStatus.ATIVA,
    role: UserRole.SUPER_ADMIN,
    points: 1250,
    level: 'Ouro',
  },
  {
    id: 'm2',
    hubId: '1',
    name: 'João Empresário',
    phone: '45888888888',
    email: 'joao@empresa.com',
    companyName: 'João Construções',
    segments: ['Construção Civil'],
    status: SubscriptionStatus.ATIVA,
    role: UserRole.MEMBRO,
    points: 450,
    level: 'Prata',
  },
];

export const MOCK_EVENTS: Event[] = [
  {
    id: 'e1',
    hubId: '1',
    name: 'Café de Networking Cascavel',
    description: 'Um encontro matinal para troca de experiências e conexões estratégicas.',
    startAt: '2026-03-15T08:00:00Z',
    location: 'ACIC Cascavel',
    capacity: 50,
    requiresSubscription: true,
    price: 45.00,
    status: 'published',
    imageUrl: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=800',
  },
  {
    id: 'e2',
    hubId: '2',
    name: 'Workshop de Vendas Toledo',
    description: 'Aprenda técnicas avançadas de fechamento e prospecção.',
    startAt: '2026-03-20T19:00:00Z',
    location: 'Auditório Municipal',
    capacity: 100,
    requiresSubscription: false,
    price: 89.90,
    status: 'published',
    imageUrl: 'https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800',
  },
];

export const MOCK_POSTS: PostSubmission[] = [
  {
    id: 'p1',
    hubId: '1',
    memberId: 'm2',
    caption: 'Grande evento hoje na ACIC! #networking',
    category: 'Evento',
    instagramPostUrl: 'https://instagram.com/p/abc123',
    status: PostStatus.ENVIADO,
    createdAt: '2026-03-01T10:00:00Z',
  },
];

export const MOCK_TICKETS: TicketOrder[] = [
  {
    id: 't1',
    eventId: 'e1',
    memberId: 'm2',
    status: 'paid',
    amount: 45.00,
    createdAt: '2026-03-05T14:00:00Z',
  },
];
