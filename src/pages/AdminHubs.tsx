import React, { useState } from 'react';
import { MOCK_HUBS } from '../mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Plus, 
  MapPin, 
  Instagram, 
  MoreVertical, 
  Users, 
  Calendar, 
  Search,
  CheckCircle2,
  XCircle,
  Edit2
} from 'lucide-react';
import { cn } from '../lib/utils';

export const AdminHubs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [hubs, setHubs] = useState(MOCK_HUBS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingHub, setEditingHub] = useState<any>(null);

  const filteredHubs = hubs.filter(hub => 
    hub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hub.region.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenModal = (hub?: any) => {
    setEditingHub(hub || { name: '', region: '', instagramHandle: '', status: 'active' });
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to save/update would go here
    setIsModalOpen(false);
    setEditingHub(null);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Hub's</h1>
          <p className="text-stone-500">Gerencie as unidades regionais e suas operações.</p>
        </div>
        <Button className="gap-2" onClick={() => handleOpenModal()}>
          <Plus size={18} />
          Novo Hub
        </Button>
      </header>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <Input 
            placeholder="Buscar por cidade ou região..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20">
            <option>Status: Todos</option>
            <option>Ativos</option>
            <option>Inativos</option>
          </select>
          <select className="bg-white border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20">
            <option>Região: Todas</option>
            <option>Oeste PR</option>
            <option>Norte PR</option>
          </select>
        </div>
      </div>

      {/* Hubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredHubs.map((hub) => (
          <Card key={hub.id} className="p-0 overflow-hidden group">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={24} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                    hub.status === 'active' ? "bg-emerald-50 text-emerald-600" : "bg-stone-100 text-stone-500"
                  )}>
                    {hub.status === 'active' ? 'Ativo' : 'Inativo'}
                  </span>
                  <button className="p-1 hover:bg-stone-100 rounded-md transition-colors">
                    <MoreVertical size={16} className="text-stone-400" />
                  </button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold">{hub.name}</h3>
                <p className="text-sm text-stone-500">{hub.region}</p>
              </div>

              <div className="flex items-center gap-2 text-sm text-stone-600">
                <Instagram size={16} className="text-stone-400" />
                <span className="font-medium">{hub.instagramHandle}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-stone-100">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Membros</p>
                  <div className="flex items-center gap-2">
                    <Users size={14} className="text-stone-400" />
                    <span className="text-sm font-bold">450</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Eventos/Mês</p>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-stone-400" />
                    <span className="text-sm font-bold">4</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-stone-50 p-4 border-t border-stone-100 flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex-1 gap-2 text-stone-600"
                onClick={() => handleOpenModal(hub)}
              >
                <Edit2 size={14} />
                Editar
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 gap-2 text-stone-600">
                <Users size={14} />
                Membros
              </Button>
            </div>
          </Card>
        ))}

        {/* Add New Hub Card */}
        <button 
          onClick={() => handleOpenModal()}
          className="border-2 border-dashed border-stone-200 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 hover:border-primary hover:bg-primary/5 transition-all group min-h-[300px]"
        >
          <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center text-stone-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <Plus size={24} />
          </div>
          <div className="text-center">
            <p className="font-bold text-stone-600 group-hover:text-primary transition-colors">Adicionar Nova Cidade</p>
            <p className="text-sm text-stone-400">Expanda a rede Eu te Indico</p>
          </div>
        </button>
      </div>

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-lg p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">{editingHub?.id ? 'Editar Hub' : 'Novo Hub'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <XCircle size={24} />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Cidade</label>
                  <Input 
                    value={editingHub?.name} 
                    onChange={(e) => setEditingHub({...editingHub, name: e.target.value})}
                    placeholder="Ex: Cascavel" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Região</label>
                  <Input 
                    value={editingHub?.region} 
                    onChange={(e) => setEditingHub({...editingHub, region: e.target.value})}
                    placeholder="Ex: Oeste PR" 
                    required 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Instagram (@)</label>
                <Input 
                  value={editingHub?.instagramHandle} 
                  onChange={(e) => setEditingHub({...editingHub, instagramHandle: e.target.value})}
                  placeholder="@euteindicocvel" 
                  required 
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Status</label>
                <select 
                  className="w-full bg-white border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                  value={editingHub?.status}
                  onChange={(e) => setEditingHub({...editingHub, status: e.target.value})}
                >
                  <option value="active">Ativo</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="submit" className="flex-1">
                  Salvar Alterações
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}
    </div>
  );
};
