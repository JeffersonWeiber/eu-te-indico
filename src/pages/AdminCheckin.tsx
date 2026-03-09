import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { QrCode, Search, CheckCircle2, User, Calendar, AlertCircle } from 'lucide-react';
import { MOCK_MEMBERS, MOCK_EVENTS } from '../mockData';

export const AdminCheckin = () => {
  const [search, setSearch] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(MOCK_EVENTS[0]);
  const [checkedIn, setCheckedIn] = useState<string[]>([]);
  const [showScanner, setShowScanner] = useState(false);

  const handleCheckin = (memberId: string) => {
    if (!checkedIn.includes(memberId)) {
      setCheckedIn([...checkedIn, memberId]);
    }
  };

  const filteredMembers = MOCK_MEMBERS.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Check-in de Evento</h1>
          <p className="text-stone-500">Valide a presença dos membros via QR Code ou busca manual.</p>
        </div>
        <Button onClick={() => setShowScanner(!showScanner)} className="gap-2">
          <QrCode size={20} />
          {showScanner ? 'Fechar Scanner' : 'Abrir Scanner'}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Event Selection & Stats */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-lg font-bold">Evento Selecionado</h3>
            <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
              <p className="font-bold text-primary">{selectedEvent.name}</p>
              <p className="text-xs text-stone-500 mt-1">{selectedEvent.location}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="text-center p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold">{checkedIn.length}</p>
                <p className="text-[10px] font-bold uppercase text-stone-400">Presentes</p>
              </div>
              <div className="text-center p-3 bg-stone-50 rounded-xl">
                <p className="text-2xl font-bold">{selectedEvent.capacity}</p>
                <p className="text-[10px] font-bold uppercase text-stone-400">Total</p>
              </div>
            </div>
          </Card>

          {showScanner && (
            <Card className="aspect-square bg-black rounded-2xl flex flex-col items-center justify-center text-white p-8 text-center space-y-4">
              <div className="w-48 h-48 border-2 border-primary border-dashed rounded-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/20 animate-pulse" />
                <QrCode size={64} className="text-primary opacity-50" />
              </div>
              <p className="text-sm font-medium">Aponte a câmera para o QR Code do membro</p>
            </Card>
          )}
        </div>

        {/* Manual Search & List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <Input 
                className="pl-10" 
                placeholder="Buscar membro por nome ou empresa..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              {filteredMembers.map(member => (
                <div key={member.id} className="flex items-center justify-between p-4 rounded-xl border border-stone-100 hover:bg-stone-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-stone-100 flex items-center justify-center text-stone-500">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-sm">{member.name}</p>
                      <p className="text-xs text-stone-400">{member.companyName}</p>
                    </div>
                  </div>
                  
                  {checkedIn.includes(member.id) ? (
                    <div className="flex items-center gap-1 text-emerald-500 font-bold text-xs">
                      <CheckCircle2 size={16} /> Confirmado
                    </div>
                  ) : (
                    <Button size="sm" variant="outline" onClick={() => handleCheckin(member.id)}>
                      Confirmar
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
