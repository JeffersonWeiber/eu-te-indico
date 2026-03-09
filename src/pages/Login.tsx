import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { LogIn, Shield, User, Lock, ArrowRight, Info } from 'lucide-react';
import { cn } from '../lib/utils';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulated login logic
    setTimeout(() => {
      if (email === 'admin@euteindico.com' && password === 'admin123') {
        navigate('/admin');
      } else if (email === 'membro@exemplo.com' && password === 'membro123') {
        navigate('/member');
      } else {
        setError('Credenciais inválidas. Tente os dados de demonstração abaixo.');
        setIsLoading(false);
      }
    }, 1000);
  };

  const fillDemo = (type: 'admin' | 'member') => {
    if (type === 'admin') {
      setEmail('admin@euteindico.com');
      setPassword('admin123');
    } else {
      setEmail('membro@exemplo.com');
      setPassword('membro123');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
            <LogIn size={28} />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Acesse sua Conta</h1>
          <p className="text-stone-500">Bem-vindo de volta ao Eu te Indico.</p>
        </div>

        <Card className="p-8 shadow-xl border-stone-100">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="p-3 rounded-lg bg-red-50 border border-red-100 text-red-600 text-sm flex items-center gap-2">
                <Info size={16} />
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-400">E-mail</label>
              <div className="relative">
                <Input 
                  type="email" 
                  placeholder="seu@email.com" 
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-stone-400">Senha</label>
                <button type="button" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider">Esqueceu a senha?</button>
              </div>
              <div className="relative">
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  className="pl-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              </div>
            </div>

            <Button type="submit" className="w-full h-12 text-lg gap-2" disabled={isLoading}>
              {isLoading ? 'Entrando...' : 'Entrar'}
              {!isLoading && <ArrowRight size={18} />}
            </Button>
          </form>

          <div className="mt-8 pt-8 border-t border-stone-100">
            <p className="text-center text-xs font-bold text-stone-400 uppercase tracking-widest mb-4">Acesso de Demonstração</p>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => fillDemo('admin')}
                className="flex flex-col items-center gap-1 p-3 rounded-xl border border-stone-100 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Shield size={20} className="text-stone-400 group-hover:text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Admin</span>
              </button>
              <button 
                onClick={() => fillDemo('member')}
                className="flex flex-col items-center gap-1 p-3 rounded-xl border border-stone-100 hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <User size={20} className="text-stone-400 group-hover:text-primary" />
                <span className="text-[10px] font-bold uppercase tracking-wider">Membro</span>
              </button>
            </div>
          </div>
        </Card>

        <p className="text-center text-sm text-stone-500">
          Ainda não é membro?{' '}
          <Link to="/subscribe" className="font-bold text-primary hover:underline">
            Assine agora
          </Link>
        </p>
      </div>
    </div>
  );
};
