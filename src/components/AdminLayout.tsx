import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Map, Users, Layers, Calendar, QrCode, MessageSquare, Trophy, DollarSign, Settings, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Map, label: "Hub's", path: '/admin/hubs' },
    { icon: Users, label: 'Membros', path: '/admin/members' },
    { icon: Layers, label: 'Grupos', path: '/admin/groups' },
    { icon: Calendar, label: 'Eventos', path: '/admin/events' },
    { icon: QrCode, label: 'Check-in', path: '/admin/checkin' },
    { icon: MessageSquare, label: 'Postagens', path: '/admin/posts' },
    { icon: Trophy, label: 'Gamificação', path: '/admin/gamification' },
    { icon: DollarSign, label: 'Financeiro', path: '/admin/financial' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 md:pl-64">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-stone-200 bg-white p-6 md:flex">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold text-primary">Eu te Indico</h1>
          <p className="text-xs font-medium text-stone-400 uppercase tracking-widest">Painel Admin</p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto pr-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors',
                location.pathname === item.path
                  ? 'bg-secondary text-white'
                  : 'text-stone-500 hover:bg-stone-100 hover:text-secondary'
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto space-y-1 pt-6">
          <Link
            to="/admin/settings"
            className="flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-stone-500 hover:bg-stone-100 hover:text-secondary transition-colors"
          >
            <Settings size={18} />
            Configurações
          </Link>
          <button className="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
            <LogOut size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="flex items-center justify-between border-b border-stone-200 bg-white p-4 md:hidden">
        <h1 className="text-xl font-bold text-primary">Eu te Indico</h1>
        <button className="p-2 text-stone-500">
          <LayoutDashboard size={24} />
        </button>
      </header>

      <main className="p-6 md:p-10">
        {children}
      </main>
    </div>
  );
};
