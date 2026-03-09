export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN_HUB = 'ADMIN_HUB',
  MODERADOR = 'MODERADOR',
  ORGANIZADOR = 'ORGANIZADOR',
  FINANCEIRO = 'FINANCEIRO',
  MEMBRO = 'MEMBRO',
}

export enum SubscriptionStatus {
  ATIVA = 'ATIVA',
  INADIMPLENTE = 'INADIMPLENTE',
  CANCELADA = 'CANCELADA',
}

export enum PostStatus {
  ENVIADO = 'ENVIADO',
  APROVADO = 'APROVADO',
  REPROVADO = 'REPROVADO',
  REPOSTADO = 'REPOSTADO',
}

export interface Hub {
  id: string;
  name: string;
  region: string;
  instagramHandle: string;
  status: 'active' | 'inactive';
}

export interface Member {
  id: string;
  hubId: string;
  name: string;
  phone: string;
  email: string;
  companyName: string;
  segments: string[];
  status: SubscriptionStatus;
  role: UserRole;
  points: number;
  level: string;
}

export interface Event {
  id: string;
  hubId: string;
  name: string;
  description: string;
  startAt: string;
  location: string;
  capacity: number;
  requiresSubscription: boolean;
  price: number;
  status: 'published' | 'draft' | 'cancelled';
  imageUrl?: string;
}

export interface TicketOrder {
  id: string;
  eventId: string;
  memberId: string;
  status: 'paid' | 'pending' | 'failed';
  amount: number;
  createdAt: string;
}

export interface PostSubmission {
  id: string;
  hubId: string;
  memberId: string;
  caption: string;
  mediaUrl?: string;
  category: string;
  instagramPostUrl: string;
  status: PostStatus;
  rejectionReason?: string;
  createdAt: string;
}

export interface PointsLedger {
  id: string;
  memberId: string;
  hubId: string;
  sourceType: 'event_checkin' | 'post_repost' | 'other';
  sourceId: string;
  pointsDelta: number;
  createdAt: string;
}

export interface Group {
  id: string;
  name: string;
  type: 'Premium' | 'Standard' | 'Experimental';
  memberCount: number;
  hubCount: number;
  status: 'active' | 'inactive';
}

export interface Segment {
  id: string;
  name: string;
  category: string;
  usageCount: number;
}
