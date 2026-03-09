import React from 'react';
import { MOCK_MEMBERS, MOCK_EVENTS } from '../mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar, Award, TrendingUp, ArrowRight, Send } from 'lucide-react';
import { formatDate, formatCurrency } from '../lib/utils';
import { Link } from 'react-router-dom';

export const MemberDashboard = () => {
  const member = MOCK_MEMBERS[1]; // João Empresário
  const nextEvents = MOCK_EVENTS.slice(0, 2);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Olá, {member.name.split(' ')[0]}!</h1>
          <p className="text-stone-500">Bem-vindo de volta ao seu painel.</p>
        </div>
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl card-shadow border border-stone-100">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
            {member.level[0]}
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-stone-400">Nível Atual</p>
            <p className="text-sm font-bold">{member.level}</p>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-white border-none">
          <div className="flex justify-between items-start mb-4">
            <Award size={24} />
            <span className="text-xs font-bold uppercase tracking-widest opacity-80">Saldo</span>
          </div>
          <p className="text-4xl font-bold mb-1">{member.points}</p>
          <p className="text-sm opacity-80">Pontos acumulados</p>
        </Card>

        <Card>
          <div className="flex justify-between items-start mb-4 text-primary">
            <Calendar size={24} />
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Presença</span>
          </div>
          <p className="text-4xl font-bold mb-1">12</p>
          <p className="text-sm text-stone-500">Eventos participados</p>
        </Card>

        <Card>
          <div className="flex justify-between items-start mb-4 text-emerald-500">
            <TrendingUp size={24} />
            <span className="text-xs font-bold uppercase tracking-widest text-stone-400">Status</span>
          </div>
          <p className="text-xl font-bold mb-1 uppercase tracking-tight">{member.status}</p>
          <p className="text-sm text-stone-500">Sua assinatura está em dia</p>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Next Events */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Próximos Eventos</h2>
            <Link to="/member/events" className="text-sm font-bold text-primary hover:underline">Ver todos</Link>
          </div>
          <div className="space-y-4">
            {nextEvents.map(event => (
              <Card key={event.id} className="p-4 flex gap-4 items-center">
                <div className="h-16 w-16 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={event.imageUrl} alt={event.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold truncate">{event.name}</h4>
                  <p className="text-xs text-stone-500">{formatDate(event.startAt)}</p>
                </div>
                <Link to={`/member/events/${event.id}`}>
                  <Button size="sm" variant="outline">Garantir Vaga</Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="space-y-4">
          <h2 className="text-xl font-bold">Ações Rápidas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link to="/member/post">
              <Card hoverable className="h-full flex flex-col justify-center items-center text-center p-8 space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Send size={24} />
                </div>
                <h4 className="font-bold">Novo Post</h4>
                <p className="text-xs text-stone-500">Envie o link do seu post para ganhar pontos.</p>
              </Card>
            </Link>
            <Link to="/member/points">
              <Card hoverable className="h-full flex flex-col justify-center items-center text-center p-8 space-y-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Award size={24} />
                </div>
                <h4 className="font-bold">Benefícios</h4>
                <p className="text-xs text-stone-500">Veja o que você pode resgatar com seus pontos.</p>
              </Card>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
