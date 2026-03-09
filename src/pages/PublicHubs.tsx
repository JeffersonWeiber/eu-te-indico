import React from 'react';
import { MOCK_HUBS } from '../mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { MapPin, Instagram, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PublicHubs = () => {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20 space-y-12">
      <header className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Nossos Hub's</h1>
        <p className="text-stone-500">Encontre o Eu te Indico mais próximo de você e comece a transformar seu networking em resultados reais.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_HUBS.map(hub => (
          <Card key={hub.id} className="flex flex-col">
            <div className="flex-1 space-y-6">
              <div className="flex items-start justify-between">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin size={28} />
                </div>
                <a 
                  href={`https://instagram.com/${hub.instagramHandle.replace('@', '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-bold text-stone-400 hover:text-primary transition-colors"
                >
                  <Instagram size={14} /> {hub.instagramHandle}
                </a>
              </div>

              <div>
                <h3 className="text-2xl font-bold">{hub.name}</h3>
                <p className="text-stone-500 text-sm">{hub.region}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <p className="text-lg font-bold">150+</p>
                  <p className="text-[10px] font-bold uppercase text-stone-400">Membros</p>
                </div>
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                  <p className="text-lg font-bold">12</p>
                  <p className="text-[10px] font-bold uppercase text-stone-400">Eventos/Mês</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-stone-100">
              <Link to="/subscribe">
                <Button className="w-full gap-2">
                  Filiar-se a este Hub <ArrowRight size={16} />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      <section className="bg-secondary text-white rounded-3xl p-12 text-center space-y-6">
        <h2 className="text-3xl font-bold">Não encontrou sua cidade?</h2>
        <p className="text-stone-400 max-w-xl mx-auto">Seja um embaixador e leve o Eu te Indico para sua região. Entre em contato com nossa sede e saiba como abrir um novo hub.</p>
        <Button variant="outline" className="text-white border-white/20 hover:bg-white/10">Falar com a Sede</Button>
      </section>
    </div>
  );
};
