import React from 'react';
import { MOCK_EVENTS, MOCK_HUBS } from '../mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Calendar, MapPin, Search, Filter } from 'lucide-react';
import { formatDate, formatCurrency } from '../lib/utils';
import { Link } from 'react-router-dom';

export const MemberEvents = () => {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Eventos</h1>
        <p className="text-stone-500">Descubra e participe dos melhores encontros de networking.</p>
      </header>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <Input className="pl-10" placeholder="Buscar por nome ou local..." />
        </div>
        <div className="flex gap-2">
          <select className="h-11 rounded-xl border border-stone-200 bg-white px-4 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
            <option>Todos os Hub's</option>
            {MOCK_HUBS.map(h => <option key={h.id}>{h.name}</option>)}
          </select>
          <Button variant="outline" className="gap-2">
            <Filter size={18} />
            Filtros
          </Button>
        </div>
      </div>

      {/* Event Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_EVENTS.map(event => (
          <Card key={event.id} className="p-0 overflow-hidden flex flex-col">
            <div className="h-48 w-full relative">
              <img src={event.imageUrl} alt={event.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                {formatCurrency(event.price)}
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <div className="flex-1 space-y-2 mb-6">
                <h3 className="text-lg font-bold leading-tight">{event.name}</h3>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <Calendar size={14} />
                  {formatDate(event.startAt)}
                </div>
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <MapPin size={14} />
                  {event.location}
                </div>
              </div>
              <Link to={`/member/events/${event.id}`} className="w-full">
                <Button className="w-full">Ver Detalhes</Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
