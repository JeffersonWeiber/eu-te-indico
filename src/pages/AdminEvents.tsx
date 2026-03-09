import React, { useState } from 'react';
import { MOCK_EVENTS, MOCK_HUBS } from '../mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Plus, 
  Calendar, 
  MapPin, 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit2, 
  Eye, 
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  DollarSign
} from 'lucide-react';
import { cn, formatDate } from '../lib/utils';

export const AdminEvents = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    hub: 'all',
    status: 'all'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any>(null);

  const filteredEvents = MOCK_EVENTS.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesHub = filters.hub === 'all' || event.hubId === filters.hub;
    const matchesStatus = filters.status === 'all' || event.status === filters.status;
    return matchesSearch && matchesHub && matchesStatus;
  });

  const handleOpenModal = (event?: any) => {
    setEditingEvent(event || { 
      name: '', 
      hubId: MOCK_HUBS[0].id, 
      description: '', 
      startAt: new Date().toISOString().slice(0, 16), 
      location: '', 
      capacity: 50, 
      price: 0, 
      status: 'draft',
      requiresSubscription: true,
      imageUrl: ''
    });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save/update would go here
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <span className="bg-emerald-50 text-emerald-600 border-emerald-100 border px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Publicado</span>;
      case 'draft':
        return <span className="bg-amber-50 text-amber-600 border-amber-100 border px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Rascunho</span>;
      case 'cancelled':
        return <span className="bg-rose-50 text-rose-600 border-rose-100 border px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Cancelado</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Eventos</h1>
          <p className="text-stone-500">Crie e gerencie os encontros de networking da rede.</p>
        </div>
        <Button className="gap-2" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          Novo Evento
        </Button>
      </header>

      {/* Filters & Search */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <Input 
              placeholder="Buscar por nome do evento..." 
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <select 
              className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
              value={filters.hub}
              onChange={(e) => setFilters({...filters, hub: e.target.value})}
            >
              <option value="all">Todos os Hub's</option>
              {MOCK_HUBS.map(hub => <option key={hub.id} value={hub.id}>{hub.name}</option>)}
            </select>
            <select 
              className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
              value={filters.status}
              onChange={(e) => setFilters({...filters, status: e.target.value})}
            >
              <option value="all">Status: Todos</option>
              <option value="published">Publicados</option>
              <option value="draft">Rascunhos</option>
              <option value="cancelled">Cancelados</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {filteredEvents.map((event) => (
          <Card key={event.id} className="p-0 overflow-hidden flex flex-col md:flex-row group">
            <div className="w-full md:w-48 h-48 md:h-auto relative bg-stone-100">
              {event.imageUrl ? (
                <img 
                  src={event.imageUrl} 
                  alt={event.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-stone-300">
                  <Calendar size={48} />
                </div>
              )}
              <div className="absolute top-3 left-3">
                {getStatusBadge(event.status)}
              </div>
            </div>

            <div className="flex-1 p-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">
                      {MOCK_HUBS.find(h => h.id === event.hubId)?.name}
                    </p>
                    <h3 className="text-xl font-bold text-stone-900 group-hover:text-primary transition-colors">
                      {event.name}
                    </h3>
                  </div>
                  <button className="p-1 hover:bg-stone-100 rounded-md">
                    <MoreVertical size={18} className="text-stone-400" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-y-3">
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <Clock size={16} className="text-stone-400" />
                    {formatDate(event.startAt)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-600">
                    <Users size={16} className="text-stone-400" />
                    {event.capacity} vagas
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-600 col-span-2">
                    <MapPin size={16} className="text-stone-400" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-stone-900 font-bold">
                  <DollarSign size={16} className="text-emerald-500" />
                  {event.price === 0 ? 'Gratuito' : `R$ ${event.price}`}
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="h-9 px-3 gap-2 text-stone-600">
                    <Eye size={14} />
                    Check-ins
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-9 px-3 gap-2 text-stone-600"
                    onClick={() => handleOpenModal(event)}
                  >
                    <Edit2 size={14} />
                    Editar
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto">
          <Card className="w-full max-w-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200 my-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingEvent?.id ? 'Editar Evento' : 'Novo Evento'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <XCircle size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Nome do Evento</label>
                  <Input 
                    value={editingEvent?.name} 
                    onChange={(e) => setEditingEvent({...editingEvent, name: e.target.value})}
                    placeholder="Ex: Café de Networking" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Hub Responsável</label>
                  <select 
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                    value={editingEvent?.hubId}
                    onChange={(e) => setEditingEvent({...editingEvent, hubId: e.target.value})}
                  >
                    {MOCK_HUBS.map(hub => <option key={hub.id} value={hub.id}>{hub.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Descrição</label>
                <textarea 
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px]"
                  value={editingEvent?.description}
                  onChange={(e) => setEditingEvent({...editingEvent, description: e.target.value})}
                  placeholder="Detalhes do evento..."
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Data e Hora</label>
                  <Input 
                    type="datetime-local"
                    value={editingEvent?.startAt?.slice(0, 16)} 
                    onChange={(e) => setEditingEvent({...editingEvent, startAt: e.target.value})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Local</label>
                  <Input 
                    value={editingEvent?.location} 
                    onChange={(e) => setEditingEvent({...editingEvent, location: e.target.value})}
                    placeholder="Ex: ACIC Cascavel" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Capacidade</label>
                  <Input 
                    type="number"
                    value={editingEvent?.capacity} 
                    onChange={(e) => setEditingEvent({...editingEvent, capacity: parseInt(e.target.value)})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Preço (R$)</label>
                  <Input 
                    type="number"
                    step="0.01"
                    value={editingEvent?.price} 
                    onChange={(e) => setEditingEvent({...editingEvent, price: parseFloat(e.target.value)})}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Status</label>
                  <select 
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                    value={editingEvent?.status}
                    onChange={(e) => setEditingEvent({...editingEvent, status: e.target.value})}
                  >
                    <option value="draft">Rascunho</option>
                    <option value="published">Publicado</option>
                    <option value="cancelled">Cancelado</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">URL da Imagem</label>
                <Input 
                  value={editingEvent?.imageUrl} 
                  onChange={(e) => setEditingEvent({...editingEvent, imageUrl: e.target.value})}
                  placeholder="https://exemplo.com/imagem.jpg" 
                />
              </div>

              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="requiresSubscription"
                  checked={editingEvent?.requiresSubscription}
                  onChange={(e) => setEditingEvent({...editingEvent, requiresSubscription: e.target.checked})}
                  className="rounded border-stone-300 text-primary focus:ring-primary"
                />
                <label htmlFor="requiresSubscription" className="text-sm font-medium text-stone-700">
                  Exclusivo para membros assinantes
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  {editingEvent?.id ? 'Salvar Alterações' : 'Criar Evento'}
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {filteredEvents.length === 0 && (
        <div className="py-20 text-center">
          <div className="h-16 w-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-4 text-stone-300">
            <Calendar size={32} />
          </div>
          <h3 className="text-lg font-bold text-stone-900">Nenhum evento encontrado</h3>
          <p className="text-stone-500">Tente ajustar seus filtros ou crie um novo evento.</p>
        </div>
      )}
    </div>
  );
};
