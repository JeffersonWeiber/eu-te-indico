import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Trophy, 
  Settings2, 
  History, 
  Plus, 
  Save, 
  ArrowUpRight, 
  ArrowDownRight,
  CheckCircle2,
  Star,
  Zap,
  Target,
  Users,
  Calendar,
  Instagram,
  Edit2
} from 'lucide-react';
import { cn } from '../lib/utils';

interface Rule {
  id: string;
  name: string;
  points: number;
  icon: React.ReactNode;
  description: string;
}

interface Level {
  id: string;
  name: string;
  minPoints: number;
  color: string;
  benefits: string[];
}

const MOCK_RULES: Rule[] = [
  { id: '1', name: 'Check-in em Evento', points: 50, icon: <Calendar size={18} />, description: 'Pontos atribuídos ao realizar check-in via QR Code em eventos oficiais.' },
  { id: '2', name: 'Postagem Aprovada', points: 20, icon: <Instagram size={18} />, description: 'Pontos por postagem no Instagram aprovada pela moderação.' },
  { id: '3', name: 'Indicação de Membro', points: 100, icon: <Users size={18} />, description: 'Pontos por cada novo membro que se associar através de sua indicação.' },
  { id: '4', name: 'Presença em Reunião', points: 30, icon: <Target size={18} />, description: 'Pontos por presença confirmada em reuniões de grupo semanais.' },
];

const MOCK_LEVELS: Level[] = [
  { id: 'l1', name: 'Bronze', minPoints: 0, color: 'text-orange-600 bg-orange-50 border-orange-100', benefits: ['Acesso básico ao Hub', 'Participação em eventos'] },
  { id: 'l2', name: 'Prata', minPoints: 500, color: 'text-stone-500 bg-stone-50 border-stone-200', benefits: ['Desconto de 10% em eventos', 'Prioridade em postagens'] },
  { id: 'l3', name: 'Ouro', minPoints: 1000, color: 'text-amber-500 bg-amber-50 border-amber-200', benefits: ['Desconto de 20% em eventos', 'Destaque no diretório', 'Acesso a área VIP'] },
  { id: 'l4', name: 'Diamante', minPoints: 2500, color: 'text-blue-600 bg-blue-50 border-blue-200', benefits: ['Isenção em eventos locais', 'Mentoria exclusiva', 'Selo de autoridade'] },
];

export const AdminGamification = () => {
  const [activeTab, setActiveTab] = useState<'rules' | 'levels' | 'history'>('rules');
  const [rules, setRules] = useState(MOCK_RULES);

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Regras de Gamificação</h1>
          <p className="text-stone-500">Configure como os membros ganham pontos e sobem de nível.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="gap-2">
            <History size={18} />
            Ver Log Completo
          </Button>
          <Button className="gap-2">
            <Save size={18} />
            Salvar Alterações
          </Button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-stone-200">
        <button 
          onClick={() => setActiveTab('rules')}
          className={cn(
            "px-6 py-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2",
            activeTab === 'rules' ? "border-primary text-primary" : "border-transparent text-stone-400 hover:text-stone-600"
          )}
        >
          <Zap size={16} />
          Regras de Pontuação
        </button>
        <button 
          onClick={() => setActiveTab('levels')}
          className={cn(
            "px-6 py-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2",
            activeTab === 'levels' ? "border-primary text-primary" : "border-transparent text-stone-400 hover:text-stone-600"
          )}
        >
          <Trophy size={16} />
          Níveis e Benefícios
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={cn(
            "px-6 py-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2",
            activeTab === 'history' ? "border-primary text-primary" : "border-transparent text-stone-400 hover:text-stone-600"
          )}
        >
          <History size={16} />
          Histórico de Pontos
        </button>
      </div>

      {activeTab === 'rules' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {rules.map((rule) => (
            <Card key={rule.id} className="p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  {rule.icon}
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Valor Atual</p>
                    <p className="text-xl font-bold text-primary">+{rule.points} pts</p>
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Edit2 size={14} />
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-bold">{rule.name}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{rule.description}</p>
              </div>
              <div className="pt-4 flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Ajustar Pontos</label>
                  <Input 
                    type="number" 
                    value={rule.points}
                    onChange={(e) => {
                      const newRules = rules.map(r => r.id === rule.id ? {...r, points: parseInt(e.target.value)} : r);
                      setRules(newRules);
                    }}
                    className="h-9"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Status</label>
                  <div className="flex items-center gap-2 h-9 px-3 bg-emerald-50 text-emerald-600 rounded-lg border border-emerald-100 text-xs font-bold">
                    <CheckCircle2 size={14} />
                    Ativo
                  </div>
                </div>
              </div>
            </Card>
          ))}
          <Card className="p-6 border-dashed border-2 flex flex-col items-center justify-center text-center space-y-4 hover:bg-stone-50 transition-colors cursor-pointer">
            <div className="h-12 w-12 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center">
              <Plus size={24} />
            </div>
            <div>
              <h3 className="font-bold">Criar Nova Regra</h3>
              <p className="text-sm text-stone-500">Adicione uma nova forma de premiar seus membros.</p>
            </div>
          </Card>
        </div>
      ) : activeTab === 'levels' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_LEVELS.map((level) => (
              <Card key={level.id} className="p-6 space-y-4 relative overflow-hidden group">
                <div className={cn("absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 transition-transform group-hover:scale-110", level.color.split(' ')[1])} />
                
                <div className="flex justify-between items-start relative z-10">
                  <div className={cn("px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border", level.color)}>
                    {level.name}
                  </div>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <Settings2 size={14} className="text-stone-400" />
                  </Button>
                </div>

                <div className="space-y-1 relative z-10">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Mínimo de Pontos</p>
                  <p className="text-3xl font-bold">{level.minPoints}</p>
                </div>

                <div className="space-y-2 relative z-10">
                  <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Benefícios Principais</p>
                  <ul className="space-y-1.5">
                    {level.benefits.map((benefit, i) => (
                      <li key={i} className="text-xs text-stone-600 flex items-center gap-2">
                        <Star size={10} className="text-primary" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            ))}
          </div>

          <Card className="p-8">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold">Configurações Globais</h3>
                <p className="text-sm text-stone-500">Parâmetros gerais do sistema de gamificação.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Ciclo de Pontuação</label>
                <select className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Semestral (Reset em Julho/Janeiro)</option>
                  <option>Anual (Reset em Janeiro)</option>
                  <option>Vitalício (Sem Reset)</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Multiplicador de Eventos</label>
                <Input type="number" defaultValue={1} step={0.1} />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Limite Diário de Pontos</label>
                <Input type="number" defaultValue={500} />
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Membro</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Ação</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Pontos</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Data</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-500">
                        M{i}
                      </div>
                      <span className="text-sm font-bold text-stone-900">Membro Exemplo {i}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-stone-600">Check-in em Evento</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-emerald-600">+50 pts</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-stone-400">03/03/2026 14:30</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <ArrowUpRight size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Média de Pontos/Mês</p>
            <p className="text-lg font-bold">145 pts</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Membros em Ouro+</p>
            <p className="text-lg font-bold">28%</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Trophy size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Total Distribuído</p>
            <p className="text-lg font-bold">45.2k</p>
          </div>
        </Card>
        <Card className="p-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
            <ArrowDownRight size={20} />
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Taxa de Engajamento</p>
            <p className="text-lg font-bold">72%</p>
          </div>
        </Card>
      </div>
    </div>
  );
};
