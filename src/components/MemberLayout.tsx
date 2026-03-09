import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Calendar, Send, Award, User, LogOut } from 'lucide-react';
import { cn } from '../lib/utils';

export const MemberLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Início', path: '/member' },
    { icon: Calendar, label: 'Eventos', path: '/member/events' },
    { icon: Send, label: 'Postar', path: '/member/post' },
    { icon: Award, label: 'Pontos', path: '/member/points' },
    { icon: User, label: 'Perfil', path: '/member/profile' },
  ];

  return (
    <div className="min-h-screen bg-stone-50 pb-24 md:pb-0 md:pl-64">
      {/* Sidebar Desktop */}
      <aside className="fixed left-0 top-0 hidden h-full w-64 flex-col border-r border-stone-200 bg-white p-6 md:flex">
        <div className="mb-10 px-2">
          <h1 className="text-2xl font-bold text-primary">Eu te Indico</h1>
          <p className="text-xs font-medium text-stone-400 uppercase tracking-widest">Membro</p>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                location.pathname === item.path
                  ? 'bg-primary/10 text-primary'
                  : 'text-stone-500 hover:bg-stone-100 hover:text-secondary'
              )}
            >
              <item.icon size={20} />
              {item.label}
            </Link>
          ))}
        </nav>

        <button className="mt-auto flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors">
          <LogOut size={20} />
          Sair
        </button>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around border-t border-stone-200 bg-white/80 p-3 backdrop-blur-lg md:hidden">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'flex flex-col items-center gap-1 transition-colors',
              location.pathname === item.path ? 'text-primary' : 'text-stone-400'
            )}
          >
            <item.icon size={24} />
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
          </Link>
        ))}
      </nav>

      <main className="p-6 md:p-10 max-w-5xl mx-auto">
        {children}
      </main>
    </div>
  );
};
