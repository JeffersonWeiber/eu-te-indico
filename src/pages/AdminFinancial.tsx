import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  DollarSign, 
  TrendingUp, 
  CreditCard, 
  Ticket, 
  ArrowUpRight, 
  ArrowDownRight, 
  Filter, 
  Download, 
  Search,
  Calendar,
  MoreVertical,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  Cell
} from 'recharts';
import { MOCK_HUBS } from '../mockData';
import { cn } from '../lib/utils';

const REVENUE_DATA = [
  { month: 'Set', revenue: 12400, subscriptions: 8200, tickets: 4200 },
  { month: 'Out', revenue: 15600, subscriptions: 9400, tickets: 6200 },
  { month: 'Nov', revenue: 14200, subscriptions: 9800, tickets: 4400 },
  { month: 'Dez', revenue: 18900, subscriptions: 11200, tickets: 7700 },
  { month: 'Jan', revenue: 21400, subscriptions: 12500, tickets: 8900 },
  { month: 'Fev', revenue: 24800, subscriptions: 14200, tickets: 10600 },
];

const TRANSACTIONS = [
  { id: 'tx1', member: 'Welington Silva', type: 'subscription', amount: 149.90, status: 'paid', date: '2026-03-03 10:45', hub: 'Cascavel' },
  { id: 'tx2', member: 'João Empresário', type: 'ticket', amount: 45.00, status: 'paid', date: '2026-03-03 09:12', hub: 'Cascavel' },
  { id: 'tx3', member: 'Maria Consultora', type: 'subscription', amount: 149.90, status: 'pending', date: '2026-03-02 16:30', hub: 'Toledo' },
  { id: 'tx4', member: 'Pedro Vendas', type: 'ticket', amount: 89.90, status: 'failed', date: '2026-03-02 14:20', hub: 'Marechal' },
  { id: 'tx5', member: 'Ana Marketing', type: 'subscription', amount: 149.90, status: 'paid', date: '2026-03-01 11:00', hub: 'Cascavel' },
];

export const AdminFinancial = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'subscriptions'>('overview');

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="bg-emerald-50 text-emerald-600 border-emerald-100 border px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit"><CheckCircle2 size={10} /> Pago</span>;
      case 'pending':
        return <span className="bg-amber-50 text-amber-600 border-amber-100 border px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit"><Clock size={10} /> Pendente</span>;
      case 'failed':
        return <span className="bg-rose-50 text-rose-600 border-rose-100 border px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit"><AlertCircle size={10} /> Falhou</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Financeiro</h1>
          <p className="text-stone-500">Acompanhe a receita, assinaturas e vendas de ingressos.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" className="gap-2">
            <Download size={18} />
            Exportar Relatório
          </Button>
          <Button className="gap-2">
            <Filter size={18} />
            Filtros Avançados
          </Button>
        </div>
      </header>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 space-y-2">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <DollarSign size={20} />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
              <ArrowUpRight size={14} />
              +12.5%
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Receita Total (Mês)</p>
            <p className="text-2xl font-bold text-stone-900">R$ 24.800,00</p>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <CreditCard size={20} />
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
              <ArrowUpRight size={14} />
              +8.2%
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Assinaturas Ativas</p>
            <p className="text-2xl font-bold text-stone-900">165</p>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <Ticket size={20} />
            </div>
            <div className="flex items-center gap-1 text-rose-600 text-xs font-bold">
              <ArrowDownRight size={14} />
              -3.1%
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Venda de Ingressos</p>
            <p className="text-2xl font-bold text-stone-900">R$ 10.600,00</p>
          </div>
        </Card>

        <Card className="p-6 space-y-2">
          <div className="flex justify-between items-start">
            <div className="h-10 w-10 rounded-lg bg-stone-100 text-stone-500 flex items-center justify-center">
              <Clock size={20} />
            </div>
          </div>
          <div>
            <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Pagamentos Pendentes</p>
            <p className="text-2xl font-bold text-stone-900">R$ 1.450,00</p>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-200">
        <button 
          onClick={() => setActiveTab('overview')}
          className={cn(
            "px-6 py-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2",
            activeTab === 'overview' ? "border-primary text-primary" : "border-transparent text-stone-400 hover:text-stone-600"
          )}
        >
          <TrendingUp size={16} />
          Visão Geral
        </button>
        <button 
          onClick={() => setActiveTab('transactions')}
          className={cn(
            "px-6 py-3 text-sm font-bold transition-all border-b-2 flex items-center gap-2",
            activeTab === 'transactions' ? "border-primary text-primary" : "border-transparent text-stone-400 hover:text-stone-600"
          )}
        >
          <DollarSign size={16} />
          Transações
        </button>
      </div>

      {activeTab === 'overview' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-bold">Crescimento de Receita</h3>
                <p className="text-sm text-stone-500">Comparativo mensal de assinaturas e ingressos.</p>
              </div>
              <select className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-1.5 text-xs font-bold outline-none">
                <option>Últimos 6 meses</option>
                <option>Último ano</option>
              </select>
            </div>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={REVENUE_DATA}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#FF6321" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#FF6321" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#888' }} 
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fontSize: 12, fill: '#888' }}
                    tickFormatter={(value) => `R$ ${value/1000}k`}
                  />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`R$ ${value.toLocaleString()}`, 'Receita']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#FF6321" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold mb-6">Receita por Hub</h3>
            <div className="space-y-6">
              {MOCK_HUBS.map((hub, i) => (
                <div key={hub.id} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-stone-700">{hub.name}</span>
                    <span className="text-stone-500">R$ {(15000 / (i + 1)).toLocaleString()}</span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${100 / (i + 1)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 pt-6 border-t border-stone-100">
              <div className="flex items-center justify-between text-sm mb-4">
                <span className="text-stone-500">Taxa de Conversão</span>
                <span className="font-bold">64%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-stone-500">Churn Rate</span>
                <span className="font-bold text-rose-600">2.4%</span>
              </div>
            </div>
          </Card>
        </div>
      ) : (
        <Card className="overflow-hidden">
          <div className="p-4 border-b border-stone-100 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <Input placeholder="Buscar transação..." className="pl-10" />
            </div>
            <div className="flex gap-2">
              <select className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium outline-none">
                <option>Tipo: Todos</option>
                <option>Assinatura</option>
                <option>Ingresso</option>
              </select>
              <select className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-sm font-medium outline-none">
                <option>Status: Todos</option>
                <option>Pago</option>
                <option>Pendente</option>
                <option>Falhou</option>
              </select>
            </div>
          </div>
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Membro</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Hub</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Valor</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold text-stone-400 uppercase tracking-wider">Data</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-stone-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-stone-900">{tx.member}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      {tx.type === 'subscription' ? <CreditCard size={14} /> : <Ticket size={14} />}
                      {tx.type === 'subscription' ? 'Assinatura' : 'Ingresso'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-stone-600">{tx.hub}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-stone-900">R$ {tx.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(tx.status)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs text-stone-400">{tx.date}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 hover:bg-stone-100 rounded-md">
                      <MoreVertical size={16} className="text-stone-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-stone-50 border-t border-stone-100 flex items-center justify-between">
            <p className="text-xs text-stone-500">Mostrando 5 de 128 transações</p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" disabled>Anterior</Button>
              <Button variant="ghost" size="sm">Próximo</Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
