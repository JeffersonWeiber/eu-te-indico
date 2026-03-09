import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { 
  Settings, 
  Globe, 
  Lock, 
  Bell, 
  Link as LinkIcon, 
  Save, 
  Mail, 
  Shield, 
  Smartphone,
  Palette,
  Database,
  Cloud
} from 'lucide-react';
import { cn } from '../lib/utils';

export const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState<'general' | 'security' | 'notifications' | 'integrations'>('general');

  const tabs = [
    { id: 'general', label: 'Geral', icon: Globe },
    { id: 'security', label: 'Segurança', icon: Lock },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'integrations', label: 'Integrações', icon: LinkIcon },
  ];

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Configurações do Sistema</h1>
          <p className="text-stone-500">Gerencie as preferências globais e segurança da plataforma.</p>
        </div>
        <Button className="gap-2">
          <Save size={18} />
          Salvar Alterações
        </Button>
      </header>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Tabs */}
        <aside className="w-full lg:w-64 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all",
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-stone-500 hover:bg-stone-100"
              )}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 space-y-6">
          {activeTab === 'general' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Card className="p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Globe size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Informações da Plataforma</h3>
                    <p className="text-xs text-stone-500">Dados básicos de identificação da rede.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Nome da Plataforma</label>
                    <Input defaultValue="Eu te Indico" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">E-mail de Suporte</label>
                    <Input type="email" defaultValue="suporte@euteindico.com.br" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Telefone de Contato</label>
                    <Input defaultValue="(45) 99999-9999" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Fuso Horário</label>
                    <select className="w-full bg-stone-50 border border-stone-200 rounded-lg px-4 py-2 text-sm font-medium outline-none focus:ring-2 focus:ring-primary/20">
                      <option>Brasília (GMT-3)</option>
                      <option>Amazonas (GMT-4)</option>
                    </select>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                  <div className="h-10 w-10 rounded-lg bg-stone-100 text-stone-500 flex items-center justify-center">
                    <Palette size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Personalização Visual</h3>
                    <p className="text-xs text-stone-500">Cores e logotipos da marca.</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Cor Primária</label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-lg bg-[#FF6321] border border-stone-200" />
                      <Input defaultValue="#FF6321" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Cor Secundária</label>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded-lg bg-[#141414] border border-stone-200" />
                      <Input defaultValue="#141414" className="flex-1" />
                    </div>
                  </div>
                  <div className="space-y-2 flex flex-col justify-end">
                    <Button variant="ghost" className="w-full border-dashed border-2 border-stone-200">
                      Upload Logo
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Card className="p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                  <div className="h-10 w-10 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Acesso e Autenticação</h3>
                    <p className="text-xs text-stone-500">Controle quem pode acessar o painel.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
                    <div className="flex items-center gap-3">
                      <Smartphone className="text-stone-400" />
                      <div>
                        <p className="text-sm font-bold text-stone-900">Autenticação em Duas Etapas (2FA)</p>
                        <p className="text-xs text-stone-500">Exigir código via SMS ou App para todos os administradores.</p>
                      </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-stone-200 cursor-pointer">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-1" />
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl border border-stone-100">
                    <div className="flex items-center gap-3">
                      <Database className="text-stone-400" />
                      <div>
                        <p className="text-sm font-bold text-stone-900">Logs de Auditoria</p>
                        <p className="text-xs text-stone-500">Registrar todas as alterações feitas no painel administrativo.</p>
                      </div>
                    </div>
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary cursor-pointer">
                      <span className="inline-block h-4 w-4 transform rounded-full bg-white transition translate-x-6" />
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6 space-y-4">
                <h3 className="font-bold text-stone-900">Sessões Ativas</h3>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-stone-50 last:border-0">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
                          <Globe size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-stone-900">Chrome no MacOS (Cascavel, BR)</p>
                          <p className="text-xs text-stone-400">IP: 189.123.45.67 • {i === 1 ? 'Sessão Atual' : 'Há 2 horas'}</p>
                        </div>
                      </div>
                      {i !== 1 && (
                        <Button variant="ghost" size="sm" className="text-rose-500 hover:text-rose-600 hover:bg-rose-50">
                          Encerrar
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <Card className="p-6 space-y-6">
                <div className="flex items-center gap-3 pb-4 border-b border-stone-100">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Bell size={20} />
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">Alertas do Sistema</h3>
                    <p className="text-xs text-stone-500">Defina quais eventos disparam notificações.</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">Notificações por E-mail</h4>
                    {[
                      { label: 'Novas Assinaturas', desc: 'Receber alerta quando um novo membro assinar.' },
                      { label: 'Falhas de Pagamento', desc: 'Alertar quando uma transação for recusada.' },
                      { label: 'Novas Postagens', desc: 'Notificar moderadores sobre novos conteúdos.' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-bold text-stone-900">{item.label}</p>
                          <p className="text-xs text-stone-500">{item.desc}</p>
                        </div>
                        <div className={cn(
                          "relative inline-flex h-6 w-11 items-center rounded-full cursor-pointer",
                          i === 2 ? "bg-stone-200" : "bg-primary"
                        )}>
                          <span className={cn(
                            "inline-block h-4 w-4 transform rounded-full bg-white transition",
                            i === 2 ? "translate-x-1" : "translate-x-6"
                          )} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'integrations' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-stone-900 text-white flex items-center justify-center">
                      <Cloud size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900">Gateway de Pagamento</h3>
                      <p className="text-xs text-stone-500">Configuração do Stripe/Pagar.me.</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">API Key (Live)</label>
                      <Input type="password" value="sk_live_************************" readOnly />
                    </div>
                    <Button variant="ghost" className="w-full text-primary border-primary/20">
                      Testar Conexão
                    </Button>
                  </div>
                </Card>

                <Card className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-blue-500 text-white flex items-center justify-center">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-stone-900">Serviço de E-mail</h3>
                      <p className="text-xs text-stone-500">Configuração do SendGrid/AWS SES.</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">SMTP Host</label>
                      <Input defaultValue="smtp.sendgrid.net" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-emerald-600 font-bold">
                      <CheckCircle2 size={14} />
                      Conectado com sucesso
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const CheckCircle2 = ({ size, className }: { size?: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size || 24} 
    height={size || 24} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
);
