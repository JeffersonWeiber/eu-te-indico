import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { CheckCircle2, Users, Calendar, TrendingUp, MapPin, ArrowRight } from 'lucide-react';
import { MOCK_EVENTS, MOCK_HUBS } from '../mockData';
import { formatDate, formatCurrency } from '../lib/utils';

export const LandingPage = () => {
  const upcomingEvents = MOCK_EVENTS.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-48 flex items-center justify-center min-h-[80vh] bg-stone-900">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <video 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="h-full w-full object-cover opacity-60"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-business-people-shaking-hands-in-a-meeting-4835-large.mp4" type="video/mp4" />
          </video>
        </div>
        
        {/* Overlays */}
        <div className="absolute inset-0 bg-secondary/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/20 via-transparent to-secondary/60 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#FF632110_0%,transparent_100%)] z-10" />

        <div className="mx-auto max-w-7xl px-6 text-center relative z-20">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8 text-white">
            Onde o <span className="text-primary">Networking</span> <br /> vira Negócio.
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-stone-200 mb-12 leading-relaxed">
            A plataforma definitiva para empresários que buscam visibilidade, conexões estratégicas e crescimento em eventos de networking regionais.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/subscribe">
              <Button size="lg" className="w-full sm:w-auto h-14 px-10 text-lg shadow-2xl shadow-primary/20">Quero ser Membro</Button>
            </Link>
            <Link to="/hubs">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-10 text-lg border-white text-white hover:bg-white hover:text-secondary">Ver Hub's</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats/Benefits */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Users size={24} />
            </div>
            <h3 className="text-xl font-bold">Comunidade Forte</h3>
            <p className="text-sm text-stone-500">Conecte-se com empresários decididos a crescer e indicar uns aos outros.</p>
          </Card>
          <Card className="text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Calendar size={24} />
            </div>
            <h3 className="text-xl font-bold">Eventos Exclusivos</h3>
            <p className="text-sm text-stone-500">Acesso a cafés, workshops e rodadas de negócios focadas em ROI.</p>
          </Card>
          <Card className="text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold">Visibilidade Real</h3>
            <p className="text-sm text-stone-500">Sua marca em destaque nos perfis oficiais e na rede de membros.</p>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-secondary -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#FF632115_0%,transparent_50%)] -z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,#FF632110_0%,transparent_40%)] -z-10" />
        
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">Como funciona?</h2>
            <p className="text-stone-400 max-w-2xl mx-auto text-lg">
              O caminho para o sucesso no Eu te Indico é simples e direto. Siga os passos e transforme seu networking em faturamento.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            {[
              { step: '01', title: 'Assine', desc: 'Escolha seu hub e torne-se um membro ativo da nossa rede exclusiva.' },
              { step: '02', title: 'Participe', desc: 'Garanta seu lugar nos eventos presenciais e faça check-in para pontuar.' },
              { step: '03', title: 'Compartilhe', desc: 'Poste sua participação, marque o hub e ganhe visibilidade imediata.' },
              { step: '04', title: 'Cresça', desc: 'Suba de nível no ranking, ganhe benefícios e feche novos negócios.' },
            ].map((item, idx) => (
              <div key={item.step} className="relative group">
                {/* Connector line for desktop */}
                {idx < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-[1px] bg-gradient-to-r from-primary/30 to-transparent -z-0" />
                )}
                
                <div className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary group-hover:scale-110 transition-all duration-500 shadow-xl">
                    <span className="text-2xl font-bold text-primary group-hover:text-white transition-colors">{item.step}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">{item.title}</h4>
                  <p className="text-sm text-stone-400 leading-relaxed px-4">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">Próximos Eventos</h2>
            <p className="text-stone-500 max-w-xl">Confira os próximos encontros e garanta sua participação para expandir sua rede.</p>
          </div>
          <Link to="/events">
            <Button variant="outline" className="gap-2">
              Ver todos os eventos <ArrowRight size={16} />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingEvents.map((event) => {
            const hub = MOCK_HUBS.find(h => h.id === event.hubId);
            return (
              <Card key={event.id} className="p-0 overflow-hidden flex flex-col group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.imageUrl} 
                    alt={event.name} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4">
                    <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg shadow-sm">
                      <p className="text-xs font-bold text-primary uppercase tracking-wider">{hub?.name}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors line-clamp-1">{event.name}</h3>
                    <p className="text-sm text-stone-500 line-clamp-2">{event.description}</p>
                  </div>
                  
                  <div className="space-y-2 pt-4 border-t border-stone-100 mt-auto">
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <Calendar size={16} className="text-primary" />
                      {formatDate(event.startAt)}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-stone-600">
                      <MapPin size={16} className="text-primary" />
                      {event.location}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-secondary">{formatCurrency(event.price)}</p>
                    <Link to={`/events/${event.id}`}>
                      <Button size="sm">Garantir Vaga</Button>
                    </Link>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </section>
      {/* Featured Image Section */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-3xl">
          <img 
            src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=1920" 
            alt="Empresários em reunião de networking" 
            className="h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent flex items-end p-8 md:p-16">
            <div className="max-w-2xl text-white">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Conexões que geram valor real.</h2>
              <p className="text-lg opacity-90">Não é apenas sobre trocar cartões, é sobre construir relacionamentos sólidos que impulsionam o seu negócio.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">O que dizem nossos membros</h2>
          <p className="text-stone-500">Histórias reais de quem transformou sua rede de contatos.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: 'Ricardo Santos', role: 'CEO na TechFlow', quote: 'O Eu te Indico mudou a forma como prospectamos. Em 3 meses, fechamos 4 contratos vindos de indicações diretas do hub.' },
            { name: 'Ana Oliveira', role: 'Fundadora da Bloom Design', quote: 'A visibilidade que o perfil oficial do hub nos deu no Instagram foi o diferencial para nossa última campanha.' },
            { name: 'Marcos Lima', role: 'Diretor na Construtora ML', quote: 'Os workshops são de altíssimo nível. Além do networking, saímos com ferramentas práticas para aplicar na empresa.' },
          ].map((t, i) => (
            <Card key={i} className="flex flex-col justify-between italic text-stone-600">
              <p className="mb-6">"{t.quote}"</p>
              <div className="not-italic">
                <p className="font-bold text-secondary">{t.name}</p>
                <p className="text-xs text-stone-400">{t.role}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing / Plans */}
      <section id="subscribe" className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Escolha seu Plano</h2>
            <p className="text-stone-500">Invista no seu crescimento e na sua rede de contatos.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="flex flex-col border-stone-200">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Mensal</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">R$ 149</span>
                  <span className="text-stone-400 text-sm">/mês</span>
                </div>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Acesso a 1 hub</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Eventos com desconto</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Perfil no diretório</li>
              </ul>
              <Link to="/subscribe">
                <Button variant="outline" className="w-full">Começar Agora</Button>
              </Link>
            </Card>

            <Card className="flex flex-col border-primary ring-2 ring-primary relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Mais Popular
              </div>
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Anual</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">R$ 1.490</span>
                  <span className="text-stone-400 text-sm">/ano</span>
                </div>
                <p className="text-xs text-emerald-500 font-bold mt-1">Economize R$ 298</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Tudo do Mensal</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> 2 meses grátis</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Prioridade em eventos</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Selo de Membro Ouro</li>
              </ul>
              <Link to="/subscribe">
                <Button className="w-full">Assinar Agora</Button>
              </Link>
            </Card>

            <Card className="flex flex-col border-stone-200">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">Corporate</h3>
                <p className="text-stone-400 text-sm">Sob consulta</p>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Até 5 membros</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Acesso multi-hub</li>
                <li className="flex items-center gap-2 text-sm"><CheckCircle2 size={16} className="text-primary" /> Eventos corporativos</li>
              </ul>
              <Button variant="outline" className="w-full">Falar com Consultor</Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="bg-primary rounded-[2rem] p-12 md:p-24 text-center text-white space-y-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#ffffff20_0%,transparent_60%)]" />
          <h2 className="text-4xl md:text-6xl font-bold relative z-10">Pronto para elevar o seu <br /> networking?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto relative z-10">Junte-se a centenas de empresários que já estão colhendo os frutos de uma rede de contatos estratégica e engajada.</p>
          <div className="flex justify-center relative z-10">
            <Link to="/subscribe">
              <Button size="lg" className="bg-white text-primary hover:bg-stone-100">Quero me tornar Membro</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
