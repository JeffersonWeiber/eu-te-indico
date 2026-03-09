import React, { useState } from 'react';
import { MOCK_MEMBERS, MOCK_HUBS } from '../mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  UserPlus, 
  Mail, 
  Phone, 
  Building2, 
  MapPin,
  Trophy,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
  Edit2,
  Eye
} from 'lucide-react';
import { cn } from '../lib/utils';
import { SubscriptionStatus, UserRole } from '../types';

export const AdminMembers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    hub: 'all',
    status: 'all',
    level: 'all'
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<any>(null);

  const filteredMembers = MOCK_MEMBERS.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesHub = filters.hub === 'all' || member.hubId === filters.hub;
    const matchesStatus = filters.status === 'all' || member.status === filters.status;
    const matchesLevel = filters.level === 'all' || member.level === filters.level;

    return matchesSearch && matchesHub && matchesStatus && matchesLevel;
  });

  const getStatusColor = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ATIVA: return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case SubscriptionStatus.CANCELADA: return 'bg-rose-50 text-rose-600 border-rose-100';
      case SubscriptionStatus.INADIMPLENTE: return 'bg-stone-100 text-stone-600 border-stone-200';
      default: return 'bg-stone-50 text-stone-500 border-stone-100';
    }
  };

  const handleEdit = (member: any) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Gestão de Membros</h1>
          <p className="text-stone-500">Administre os membros, suas assinaturas e pontuações.</p>
        </div>
        <Button className="gap-2">
          <UserPlus size={18} />
          Convidar Membro
        </Button>
      </header>

      {/* Filters & Search */}
      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
            <Input 
              placeholder="Buscar por nome, empresa ou e-mail..." 
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
              <option value={SubscriptionStatus.ATIVA}>Ativa</option>
              <option value={SubscriptionStatus.INADIMPLENTE}>Inadimplente</option>
              <option value={SubscriptionStatus.CANCELADA}>Cancelada</option>
            </select>
            <select 
              className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
              value={filters.level}
              onChange={(e) => setFilters({...filters, level: e.target.value})}
            >
              <option value="all">Nível: Todos</option>
              <option value="Bronze">Bronze</option>
              <option value="Prata">Prata</option>
              <option value="Ouro">Ouro</option>
              <option value="Diamante">Diamante</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Members Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-bottom border-stone-100">
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Membro</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Empresa / Hub</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Gamificação</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-stone-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500 font-bold">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-stone-900">{member.name}</p>
                        <p className="text-xs text-stone-500">{member.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm font-medium text-stone-700">
                        <Building2 size={14} className="text-stone-400" />
                        {member.companyName}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-stone-400">
                        <MapPin size={12} />
                        {MOCK_HUBS.find(h => h.id === member.hubId)?.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border",
                      getStatusColor(member.status)
                    )}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5">
                        <Trophy size={14} className="text-amber-500" />
                        <span className="text-sm font-bold">{member.points} pts</span>
                      </div>
                      <span className="text-[10px] font-bold text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded uppercase">
                        {member.level}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleEdit(member)}>
                        <Edit2 size={14} className="text-stone-400" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Eye size={14} className="text-stone-400" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal size={14} className="text-stone-400" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredMembers.length === 0 && (
          <div className="p-12 text-center">
            <p className="text-stone-400 font-medium">Nenhum membro encontrado com estes filtros.</p>
          </div>
        )}
      </Card>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <Card className="w-full max-w-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-2xl font-bold">Editar Membro</h2>
                <p className="text-sm text-stone-500">Atualize as informações de {editingMember?.name}</p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-600">
                <XCircle size={24} />
              </button>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Status da Assinatura</label>
                  <select 
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                    value={editingMember?.status}
                    onChange={(e) => setEditingMember({...editingMember, status: e.target.value})}
                  >
                    <option value={SubscriptionStatus.ATIVA}>Ativa</option>
                    <option value={SubscriptionStatus.INADIMPLENTE}>Inadimplente</option>
                    <option value={SubscriptionStatus.CANCELADA}>Cancelada</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Hub Vinculado</label>
                  <select 
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                    value={editingMember?.hubId}
                    onChange={(e) => setEditingMember({...editingMember, hubId: e.target.value})}
                  >
                    {MOCK_HUBS.map(hub => <option key={hub.id} value={hub.id}>{hub.name}</option>)}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Cargo / Permissão</label>
                  <select 
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20"
                    value={editingMember?.role}
                    onChange={(e) => setEditingMember({...editingMember, role: e.target.value})}
                  >
                    <option value={UserRole.MEMBRO}>Membro</option>
                    <option value={UserRole.ADMIN_HUB}>Admin de Hub</option>
                    <option value={UserRole.MODERADOR}>Moderador</option>
                    <option value={UserRole.ORGANIZADOR}>Organizador</option>
                    <option value={UserRole.FINANCEIRO}>Financeiro</option>
                    <option value={UserRole.SUPER_ADMIN}>Super Admin</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Pontuação Atual</label>
                  <Input 
                    type="number"
                    value={editingMember?.points}
                    onChange={(e) => setEditingMember({...editingMember, points: parseInt(e.target.value)})}
                  />
                </div>
              </div>

              <div className="p-4 bg-stone-50 rounded-xl border border-stone-100 space-y-3">
                <h4 className="text-sm font-bold text-stone-700 flex items-center gap-2">
                  <Shield size={16} className="text-primary" />
                  Informações de Contato
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-stone-500">
                    <Mail size={14} />
                    {editingMember?.email}
                  </div>
                  <div className="flex items-center gap-2 text-stone-500">
                    <Phone size={14} />
                    {editingMember?.phone}
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="button" variant="ghost" className="flex-1" onClick={() => setIsModalOpen(false)}>
                  Cancelar
                </Button>
                <Button type="button" className="flex-1" onClick={() => setIsModalOpen(false)}>
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
