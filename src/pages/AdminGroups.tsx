import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Plus, 
  Layers, 
  Tag, 
  Users, 
  MoreVertical, 
  Search,
  Edit2,
  Trash2,
  ChevronRight,
  Hash,
  X,
  Save,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Group, Segment } from '../types';

const MOCK_GROUPS: Group[] = [
  { id: '1', name: 'Grupo Premium Alpha', type: 'Premium', memberCount: 120, hubCount: 3, status: 'active' },
  { id: '2', name: 'Grupo Networking Beta', type: 'Standard', memberCount: 85, hubCount: 2, status: 'active' },
  { id: '3', name: 'Grupo Novos Negócios', type: 'Experimental', memberCount: 45, hubCount: 1, status: 'active' },
];

const MOCK_SEGMENTS: Segment[] = [
  { id: 's1', name: 'Construção Civil', category: 'Indústria', usageCount: 45 },
  { id: 's2', name: 'Estratégia Digital', category: 'Serviços', usageCount: 32 },
  { id: 's3', name: 'Consultoria Jurídica', category: 'Serviços', usageCount: 28 },
  { id: 's4', name: 'Varejo Alimentar', category: 'Comércio', usageCount: 15 },
];

export const AdminGroups = () => {
  const [activeTab, setActiveTab] = useState<'groups' | 'segments'>('groups');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modals State
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isSegmentModalOpen, setIsSegmentModalOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState<Group | null>(null);
  const [editingSegment, setEditingSegment] = useState<Segment | null>(null);

  const handleOpenGroupModal = (group?: Group) => {
    setEditingGroup(group || {
      id: '',
      name: '',
      type: 'Standard',
      memberCount: 0,
      hubCount: 0,
      status: 'active'
    });
    setIsGroupModalOpen(true);
  };

  const handleOpenSegmentModal = (segment?: Segment) => {
    setEditingSegment(segment || {
      id: '',
      name: '',
      category: '',
      usageCount: 0
    });
    setIsSegmentModalOpen(true);
  };

  const handleSaveGroup = () => {
    // Mock save logic
    console.log('Saving group:', editingGroup);
    setIsGroupModalOpen(false);
  };

  const handleSaveSegment = () => {
    // Mock save logic
    console.log('Saving segment:', editingSegment);
    setIsSegmentModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Grupos e Segmentos</h1>
          <p className="text-stone-500">Gerencie a estrutura organizacional e categorias de atuação.</p>
        </div>
        <Button 
          onClick={() => activeTab === 'groups' ? handleOpenGroupModal() : handleOpenSegmentModal()}
          className="gap-2"
        >
          <Plus size={18} />
          {activeTab === 'groups' ? 'Novo Grupo' : 'Novo Segmento'}
        </Button>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-stone-200">
        <button 
          onClick={() => setActiveTab('groups')}
          className={cn(
            "px-6 py-3 text-sm font-bold transition-all border-b-2",
            activeTab === 'groups' ? "border-primary text-primary" : "border-transparent text-stone-400 hover:text-stone-600"
          )}
        >
          Grupos de Networking
        </button>
        <button 
          onClick={() => setActiveTab('segments')}
          className={cn(
            "px-6 py-3 text-sm font-bold transition-all border-b-2",
            activeTab === 'segments' ? "border-primary text-primary" : "border-transparent text-stone-400 hover:text-stone-600"
          )}
        >
          Segmentos e Categorias
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
          <Input 
            placeholder={activeTab === 'groups' ? "Buscar grupos..." : "Buscar segmentos..."}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {activeTab === 'groups' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_GROUPS.map((group) => (
            <Card key={group.id} className="p-6 space-y-4 hover:border-primary/30 transition-colors group">
              <div className="flex justify-between items-start">
                <div className="h-10 w-10 rounded-lg bg-stone-100 flex items-center justify-center text-stone-500 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <Layers size={20} />
                </div>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full",
                    group.type === 'Premium' ? "bg-amber-50 text-amber-600" : "bg-stone-100 text-stone-500"
                  )}>
                    {group.type}
                  </span>
                  <div className="relative group/menu">
                    <button className="p-1 hover:bg-stone-100 rounded-md">
                      <MoreVertical size={16} className="text-stone-400" />
                    </button>
                    <div className="absolute right-0 top-full mt-1 w-32 bg-white rounded-lg shadow-xl border border-stone-100 py-1 hidden group-hover/menu:block z-20">
                      <button 
                        onClick={() => handleOpenGroupModal(group)}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-stone-600 hover:bg-stone-50 flex items-center gap-2"
                      >
                        <Edit2 size={12} />
                        Editar
                      </button>
                      <button className="w-full text-left px-4 py-2 text-xs font-bold text-rose-500 hover:bg-rose-50 flex items-center gap-2">
                        <Trash2 size={12} />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold">{group.name}</h3>
                <p className="text-sm text-stone-500">Presente em {group.hubCount} Hub's</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-stone-400" />
                  <span className="text-sm font-bold">{group.memberCount} membros</span>
                </div>
                <Button variant="ghost" size="sm" className="text-primary gap-1">
                  Ver Detalhes
                  <ChevronRight size={14} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Segmento</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Categoria</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Utilização</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {MOCK_SEGMENTS.map((segment) => (
                <tr key={segment.id} className="hover:bg-stone-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-stone-100 flex items-center justify-center text-stone-400">
                        <Tag size={16} />
                      </div>
                      <span className="text-sm font-bold text-stone-900">{segment.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-stone-500">{segment.category}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 bg-stone-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full" 
                          style={{ width: `${(segment.usageCount / 50) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-bold text-stone-600">{segment.usageCount} empresas</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        onClick={() => handleOpenSegmentModal(segment)}
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                      >
                        <Edit2 size={14} className="text-stone-400" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Trash2 size={14} className="text-rose-400" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <Hash size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total de Grupos</p>
            <p className="text-2xl font-bold">12</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
            <Tag size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total de Segmentos</p>
            <p className="text-2xl font-bold">48</p>
          </div>
        </Card>
        <Card className="p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Membros Alocados</p>
            <p className="text-2xl font-bold">94%</p>
          </div>
        </Card>
      </div>

      {/* Group Modal */}
      {isGroupModalOpen && editingGroup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsGroupModalOpen(false)} />
          <Card className="relative w-full max-w-lg animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingGroup.id ? 'Editar Grupo' : 'Novo Grupo'}</h2>
              <button onClick={() => setIsGroupModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X size={20} className="text-stone-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Nome do Grupo</label>
                  <Input 
                    value={editingGroup.name}
                    onChange={(e) => setEditingGroup({...editingGroup, name: e.target.value})}
                    placeholder="Ex: Grupo Premium Alpha"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Tipo de Grupo</label>
                    <select 
                      value={editingGroup.type}
                      onChange={(e) => setEditingGroup({...editingGroup, type: e.target.value as any})}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="Premium">Premium</option>
                      <option value="Standard">Standard</option>
                      <option value="Experimental">Experimental</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Status</label>
                    <select 
                      value={editingGroup.status}
                      onChange={(e) => setEditingGroup({...editingGroup, status: e.target.value as any})}
                      className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="active">Ativo</option>
                      <option value="inactive">Inativo</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex gap-3">
                <AlertCircle className="text-blue-500 shrink-0" size={20} />
                <p className="text-xs text-blue-700 leading-relaxed">
                  Grupos categorizam membros para benefícios específicos e acesso a Hub's. 
                  O tipo <strong>Premium</strong> dá destaque automático no diretório.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-stone-100 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsGroupModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleSaveGroup} className="gap-2">
                <Save size={18} />
                Salvar Grupo
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Segment Modal */}
      {isSegmentModalOpen && editingSegment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsSegmentModalOpen(false)} />
          <Card className="relative w-full max-w-lg animate-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between">
              <h2 className="text-xl font-bold">{editingSegment.id ? 'Editar Segmento' : 'Novo Segmento'}</h2>
              <button onClick={() => setIsSegmentModalOpen(false)} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X size={20} className="text-stone-400" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Nome do Segmento</label>
                  <Input 
                    value={editingSegment.name}
                    onChange={(e) => setEditingSegment({...editingSegment, name: e.target.value})}
                    placeholder="Ex: Construção Civil"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Categoria</label>
                  <select 
                    value={editingSegment.category}
                    onChange={(e) => setEditingSegment({...editingSegment, category: e.target.value})}
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="">Selecione uma categoria</option>
                    <option value="Indústria">Indústria</option>
                    <option value="Serviços">Serviços</option>
                    <option value="Comércio">Comércio</option>
                    <option value="Tecnologia">Tecnologia</option>
                    <option value="Saúde">Saúde</option>
                  </select>
                </div>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3">
                <Tag className="text-amber-500 shrink-0" size={20} />
                <p className="text-xs text-amber-700 leading-relaxed">
                  Segmentos ajudam na filtragem de membros e na organização do ecossistema de networking. 
                  Certifique-se de usar nomes claros e objetivos.
                </p>
              </div>
            </div>

            <div className="p-6 border-t border-stone-100 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setIsSegmentModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleSaveSegment} className="gap-2">
                <Save size={18} />
                Salvar Segmento
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
