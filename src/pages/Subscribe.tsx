import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, CreditCard, Building2, User } from 'lucide-react';
import { MOCK_HUBS } from '../mockData';
import { formatCurrency, cn } from '../lib/utils';
import { Link } from 'react-router-dom';

enum SubscribeStep {
  PLAN_SELECTION = 1,
  HUB_SELECTION = 2,
  PERSONAL_INFO = 3,
  PAYMENT = 4,
  SUCCESS = 5
}

export const Subscribe = () => {
  const [step, setStep] = useState<SubscribeStep>(SubscribeStep.PLAN_SELECTION);
  const [selectedPlan, setSelectedPlan] = useState<'mensal' | 'anual' | null>(null);
  const [selectedHub, setSelectedHub] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    segment: ''
  });

  const plans = [
    {
      id: 'mensal',
      name: 'Mensal',
      price: 149,
      period: 'mês',
      features: ['Acesso a 1 hub', 'Eventos com desconto', 'Perfil no diretório'],
      recommended: false
    },
    {
      id: 'anual',
      name: 'Anual',
      price: 1490,
      period: 'ano',
      features: ['Tudo do Mensal', '2 meses grátis', 'Prioridade em eventos', 'Selo de Membro Ouro'],
      recommended: true,
      savings: 'Economize R$ 298'
    }
  ];

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => prev - 1);

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-4 mb-12">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center">
          <div className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
            step === i ? "bg-primary text-white" : 
            step > i ? "bg-emerald-500 text-white" : "bg-stone-200 text-stone-500"
          )}>
            {step > i ? <CheckCircle2 size={16} /> : i}
          </div>
          {i < 4 && (
            <div className={cn(
              "h-px w-8 mx-2",
              step > i ? "bg-emerald-500" : "bg-stone-200"
            )} />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Torne-se um Membro</h1>
        <p className="text-stone-500">Junte-se à maior rede de networking empresarial da região.</p>
      </div>

      {step !== SubscribeStep.SUCCESS && renderStepIndicator()}

      {step === SubscribeStep.PLAN_SELECTION && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={cn(
                  "relative cursor-pointer transition-all border-2",
                  selectedPlan === plan.id ? "border-primary ring-1 ring-primary" : "border-stone-100 hover:border-stone-200"
                )}
                onClick={() => setSelectedPlan(plan.id as any)}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                    Melhor Valor
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold">{plan.name}</h3>
                  <div className="flex items-baseline gap-1 mt-2">
                    <span className="text-3xl font-bold">{formatCurrency(plan.price)}</span>
                    <span className="text-stone-400 text-sm">/{plan.period}</span>
                  </div>
                  {plan.savings && <p className="text-xs text-emerald-500 font-bold mt-1">{plan.savings}</p>}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-stone-600">
                      <CheckCircle2 size={16} className="text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <div className={cn(
                  "h-6 w-6 rounded-full border-2 flex items-center justify-center ml-auto",
                  selectedPlan === plan.id ? "border-primary bg-primary text-white" : "border-stone-200"
                )}>
                  {selectedPlan === plan.id && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-end">
            <Button size="lg" disabled={!selectedPlan} onClick={handleNext} className="gap-2">
              Próximo Passo <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      )}

      {step === SubscribeStep.HUB_SELECTION && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_HUBS.map((hub) => (
              <Card 
                key={hub.id} 
                className={cn(
                  "cursor-pointer transition-all border-2 text-center",
                  selectedHub === hub.id ? "border-primary ring-1 ring-primary" : "border-stone-100 hover:border-stone-200"
                )}
                onClick={() => setSelectedHub(hub.id)}
              >
                <div className="h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-4 text-stone-500">
                  <Building2 size={24} />
                </div>
                <h3 className="font-bold">{hub.name}</h3>
                <p className="text-xs text-stone-400 mt-1">{hub.region}</p>
                <div className={cn(
                  "h-5 w-5 rounded-full border-2 flex items-center justify-center mx-auto mt-4",
                  selectedHub === hub.id ? "border-primary bg-primary text-white" : "border-stone-200"
                )}>
                  {selectedHub === hub.id && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
                </div>
              </Card>
            ))}
          </div>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft size={18} /> Voltar
            </Button>
            <Button size="lg" disabled={!selectedHub} onClick={handleNext} className="gap-2">
              Próximo Passo <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      )}

      {step === SubscribeStep.PERSONAL_INFO && (
        <div className="space-y-8">
          <Card className="p-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Nome Completo</label>
                <Input 
                  placeholder="Seu nome" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">E-mail Profissional</label>
                <Input 
                  type="email" 
                  placeholder="seu@email.com" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">WhatsApp</label>
                <Input 
                  placeholder="(00) 00000-0000" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Nome da Empresa</label>
                <Input 
                  placeholder="Sua Empresa LTDA" 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Segmento de Atuação</label>
                <Input 
                  placeholder="Ex: Tecnologia, Construção, Saúde..." 
                  value={formData.segment}
                  onChange={(e) => setFormData({...formData, segment: e.target.value})}
                />
              </div>
            </div>
          </Card>
          <div className="flex justify-between">
            <Button variant="ghost" onClick={handleBack} className="gap-2">
              <ArrowLeft size={18} /> Voltar
            </Button>
            <Button 
              size="lg" 
              disabled={!formData.name || !formData.email || !formData.phone} 
              onClick={handleNext} 
              className="gap-2"
            >
              Ir para Pagamento <ArrowRight size={18} />
            </Button>
          </div>
        </div>
      )}

      {step === SubscribeStep.PAYMENT && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <Card className="p-8 space-y-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold">Método de Pagamento</h3>
                  <div className="flex gap-2">
                    <div className="h-6 w-10 bg-stone-100 rounded border border-stone-200" />
                    <div className="h-6 w-10 bg-stone-100 rounded border border-stone-200" />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Número do Cartão</label>
                    <div className="relative">
                      <Input placeholder="0000 0000 0000 0000" className="pl-10" />
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Validade</label>
                      <Input placeholder="MM/AA" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-stone-400">CVV</label>
                      <Input placeholder="123" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Nome no Cartão</label>
                    <Input placeholder="Como impresso no cartão" />
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-3 text-xs text-stone-400">
                  <ShieldCheck size={16} className="text-emerald-500" />
                  Pagamento processado de forma segura e criptografada.
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6 bg-stone-50 border-stone-200">
                <h3 className="font-bold mb-4">Resumo da Assinatura</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-stone-500">Plano {selectedPlan === 'mensal' ? 'Mensal' : 'Anual'}</span>
                    <span className="font-bold">{formatCurrency(plans.find(p => p.id === selectedPlan)?.price || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-500">Hub Selecionado</span>
                    <span className="font-bold">{MOCK_HUBS.find(h => h.id === selectedHub)?.name}</span>
                  </div>
                  <div className="h-px bg-stone-200 my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatCurrency(plans.find(p => p.id === selectedPlan)?.price || 0)}</span>
                  </div>
                </div>
              </Card>
              <Button size="lg" className="w-full h-14 text-lg" onClick={handleNext}>
                Finalizar Assinatura
              </Button>
            </div>
          </div>
          <Button variant="ghost" onClick={handleBack} className="gap-2">
            <ArrowLeft size={18} /> Voltar
          </Button>
        </div>
      )}

      {step === SubscribeStep.SUCCESS && (
        <Card className="p-12 text-center space-y-8">
          <div className="mx-auto h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 size={48} />
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Bem-vindo ao Eu te Indico!</h2>
            <p className="text-stone-500 max-w-md mx-auto">
              Sua assinatura foi confirmada com sucesso. Você já pode acessar sua área de membro e começar a expandir sua rede.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/member">
              <Button size="lg" className="w-full sm:w-auto">Acessar Área do Membro</Button>
            </Link>
            <Link to="/">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">Voltar para Home</Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
};
