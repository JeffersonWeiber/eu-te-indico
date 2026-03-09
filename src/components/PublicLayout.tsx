import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';

export const PublicLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-50 w-full border-b border-stone-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="text-2xl font-bold text-primary">
            Eu te Indico
          </Link>
          
          <nav className="hidden items-center gap-8 md:flex">
            <Link to="/hubs" className="text-sm font-medium text-stone-600 hover:text-primary">Hub's</Link>
            <Link to="/about" className="text-sm font-medium text-stone-600 hover:text-primary">Sobre</Link>
            <Link to="/events" className="text-sm font-medium text-stone-600 hover:text-primary">Eventos</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">Entrar</Button>
            </Link>
            <Link to="/subscribe">
              <Button size="sm">Assinar</Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {children}
      </main>

      <footer className="border-t border-stone-100 bg-stone-50 py-12">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-2xl font-bold text-primary mb-4">Eu te Indico</p>
          <p className="text-sm text-stone-500 max-w-md mx-auto mb-8">
            Conectando empresários, gerando visibilidade e fortalecendo o networking regional através de hub's locais.
          </p>
          <div className="flex justify-center gap-6 mb-8">
            <Link to="#" className="text-stone-400 hover:text-primary">Instagram</Link>
            <Link to="#" className="text-stone-400 hover:text-primary">LinkedIn</Link>
            <Link to="#" className="text-stone-400 hover:text-primary">WhatsApp</Link>
          </div>
          <p className="text-xs text-stone-400">© 2026 Eu te Indico. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};
