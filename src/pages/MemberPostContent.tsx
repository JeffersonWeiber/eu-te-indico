import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Send, Instagram, Copy, CheckCircle2, AlertCircle } from 'lucide-react';
import { MOCK_HUBS } from '../mockData';
import { cn } from '../lib/utils';

export const MemberPostContent = () => {
  const [step, setStep] = useState(1);
  const [postUrl, setPostUrl] = useState('');
  const hub = MOCK_HUBS[0]; // Cascavel

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    // Show toast or feedback
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <header>
        <h1 className="text-3xl font-bold">Nova Postagem</h1>
        <p className="text-stone-500">Compartilhe sua experiência e ganhe pontos de engajamento.</p>
      </header>

      {/* Progress Steps */}
      <div className="flex items-center justify-between px-4">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div className={cn(
              "h-8 w-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
              step >= s ? "bg-primary text-white" : "bg-stone-200 text-stone-500"
            )}>
              {s}
            </div>
            {s < 3 && <div className={cn("h-1 w-12 sm:w-24 mx-2 rounded-full", step > s ? "bg-primary" : "bg-stone-200")} />}
          </div>
        ))}
      </div>

      {step === 1 && (
        <Card className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">1. Prepare sua publicação</h3>
            <p className="text-sm text-stone-500">Crie um post ou story no Instagram sobre o Eu te Indico.</p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Marque o Hub</span>
              <Button variant="ghost" size="sm" onClick={() => handleCopy(hub.instagramHandle)} className="h-auto p-0 text-primary">
                <Copy size={14} className="mr-1" /> Copiar
              </Button>
            </div>
            <p className="font-mono text-lg font-bold">{hub.instagramHandle}</p>
          </div>

          <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-400">Sugestão de Legenda</span>
              <Button variant="ghost" size="sm" onClick={() => handleCopy(`Participando de mais um evento incrível do ${hub.instagramHandle}! Networking de verdade gera resultados. #euteindico #networking`)} className="h-auto p-0 text-primary">
                <Copy size={14} className="mr-1" /> Copiar
              </Button>
            </div>
            <p className="text-sm text-stone-600 italic">"Participando de mais um evento incrível do {hub.instagramHandle}! Networking de verdade gera resultados. #euteindico #networking"</p>
          </div>

          <Button className="w-full" onClick={() => setStep(2)}>Já publiquei, próximo passo</Button>
        </Card>
      )}

      {step === 2 && (
        <Card className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold">2. Envie o link do post</h3>
            <p className="text-sm text-stone-500">Cole o link da sua publicação no Instagram para validação.</p>
          </div>

          <Input 
            label="Link do Instagram" 
            placeholder="https://www.instagram.com/p/..." 
            value={postUrl}
            onChange={(e) => setPostUrl(e.target.value)}
          />

          <div className="flex items-center gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100 text-amber-800">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p className="text-xs">Certifique-se de que seu perfil é público para que possamos validar sua postagem.</p>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Voltar</Button>
            <Button className="flex-1" onClick={() => setStep(3)} disabled={!postUrl}>Enviar para Moderação</Button>
          </div>
        </Card>
      )}

      {step === 3 && (
        <Card className="text-center py-12 space-y-6">
          <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={40} />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Enviado com sucesso!</h3>
            <p className="text-stone-500 max-w-sm mx-auto">Sua postagem foi enviada para o moderador do hub. Você receberá uma notificação assim que for aprovada.</p>
          </div>
          <Button variant="outline" onClick={() => { setStep(1); setPostUrl(''); }}>Fazer outra postagem</Button>
        </Card>
      )}
    </div>
  );
};
