import React, { useState } from 'react';
import { MOCK_MEMBERS, MOCK_HUBS } from '../mockData';
import { Card } from '../components/ui/Card';
import { Users, Calendar, MessageSquare, DollarSign, TrendingUp, ArrowUpRight, Filter } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  AreaChart,
  Area
} from 'recharts';

const MOCK_CHART_DATA = [
  { month: 'Jan', members: 850, revenue: 32000 },
  { month: 'Fev', members: 920, revenue: 35000 },
  { month: 'Mar', members: 1050, revenue: 42000 },
  { month: 'Abr', members: 1120, revenue: 48000 },
  { month: 'Mai', members: 1180, revenue: 51000 },
  { month: 'Jun', members: 1240, revenue: 54200 },
];

export const AdminDashboard = () => {
  const [filters, setFilters] = useState({
    city: 'all',
    group: 'all',
    gender: 'all',
    category: 'all'
  });

  const stats = [
    { label: 'Assinantes Ativos', value: '1,240', icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Receita Mensal', value: formatCurrency(54200), icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Eventos no Mês', value: '12', icon: Calendar, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'Posts Pendentes', value: '28', icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-50' },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Geral</h1>
          <p className="text-stone-500">Visão consolidada de todos os hub's e operações.</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-1.5">
            <Filter size={14} className="text-stone-400" />
            <select 
              className="text-xs font-bold bg-transparent border-none focus:ring-0 outline-none"
              value={filters.city}
              onChange={(e) => setFilters({...filters, city: e.target.value})}
            >
              <option value="all">Todas as Cidades</option>
              {MOCK_HUBS.map(hub => <option key={hub.id} value={hub.id}>{hub.name}</option>)}
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-1.5">
            <select 
              className="text-xs font-bold bg-transparent border-none focus:ring-0 outline-none"
              value={filters.group}
              onChange={(e) => setFilters({...filters, group: e.target.value})}
            >
              <option value="all">Todos os Grupos</option>
              <option value="premium">Premium</option>
              <option value="standard">Standard</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-1.5">
            <select 
              className="text-xs font-bold bg-transparent border-none focus:ring-0 outline-none"
              value={filters.gender}
              onChange={(e) => setFilters({...filters, gender: e.target.value})}
            >
              <option value="all">Gênero</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </select>
          </div>

          <div className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3 py-1.5">
            <select 
              className="text-xs font-bold bg-transparent border-none focus:ring-0 outline-none"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="all">Categorias</option>
              <option value="tech">Tecnologia</option>
              <option value="servicos">Serviços</option>
              <option value="varejo">Varejo</option>
            </select>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-5">
            <div className="flex justify-between items-start mb-4">
              <div className={cn("p-2 rounded-xl", stat.bg, stat.color)}>
                <stat.icon size={20} />
              </div>
              <span className="flex items-center text-xs font-bold text-emerald-500">
                +12% <ArrowUpRight size={12} className="ml-0.5" />
              </span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-xs font-medium text-stone-400 uppercase tracking-wider mt-1">{stat.label}</p>
          </Card>
        ))}
      </div>

      {/* Growth Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-bold">Crescimento de Membros e Receita</h3>
            <p className="text-xs text-stone-400">Comparativo mensal consolidado</p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-xs font-bold text-stone-600">Membros</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold text-stone-600">Receita</span>
            </div>
          </div>
        </div>

        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MOCK_CHART_DATA}>
              <defs>
                <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6321" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#FF6321" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis 
                dataKey="month" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#a8a29e'}}
                dy={10}
              />
              <YAxis 
                yAxisId="left"
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#a8a29e'}}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                axisLine={false} 
                tickLine={false} 
                tick={{fontSize: 12, fill: '#a8a29e'}}
                tickFormatter={(value) => `R$ ${value/1000}k`}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any, name: string) => [
                  name === 'revenue' ? formatCurrency(value) : value,
                  name === 'revenue' ? 'Receita' : 'Membros'
                ]}
              />
              <Area 
                yAxisId="left"
                type="monotone" 
                dataKey="members" 
                stroke="#FF6321" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorMembers)" 
              />
              <Area 
                yAxisId="right"
                type="monotone" 
                dataKey="revenue" 
                stroke="#10b981" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold">Atividade Recente</h3>
            <button className="text-sm font-bold text-primary hover:underline">Ver tudo</button>
          </div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-stone-50 transition-colors">
                <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                  <Users size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold truncate">Novo membro em Cascavel</p>
                  <p className="text-xs text-stone-400">Há 15 minutos</p>
                </div>
                <div className="text-xs font-bold text-emerald-500">+ R$ 149,90</div>
              </div>
            ))}
          </div>
        </Card>

        {/* Top Hubs */}
        <Card className="space-y-6">
          <h3 className="text-lg font-bold">Performance por Hub</h3>
          <div className="space-y-6">
            {[
              { name: 'Cascavel', members: 450, growth: 85 },
              { name: 'Toledo', members: 320, growth: 65 },
              { name: 'Marechal', members: 180, growth: 45 },
            ].map((hub) => (
              <div key={hub.name} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span>{hub.name}</span>
                  <span className="text-stone-400">{hub.members} membros</span>
                </div>
                <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${hub.growth}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
