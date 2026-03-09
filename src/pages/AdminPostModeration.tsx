import React, { useState } from 'react';
import { MOCK_POSTS, MOCK_MEMBERS, MOCK_HUBS } from '../mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PostStatus } from '../types';
import { MessageSquare, Check, X, ExternalLink, Instagram, User } from 'lucide-react';
import { formatDate, cn } from '../lib/utils';

export const AdminPostModeration = () => {
  const [posts, setPosts] = useState(MOCK_POSTS);

  const handleAction = (id: string, status: PostStatus) => {
    setPosts(prev => prev.map(p => p.id === id ? { ...p, status } : p));
  };

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Moderação de Postagens</h1>
          <p className="text-stone-500">Aprove ou reprove as submissões dos membros.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="bg-white">Pendentes (8)</Button>
          <Button variant="ghost" size="sm">Aprovados</Button>
          <Button variant="ghost" size="sm">Reprovados</Button>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-6">
        {posts.map(post => {
          const member = MOCK_MEMBERS.find(m => m.id === post.memberId);
          const hub = MOCK_HUBS.find(c => c.id === post.hubId);

          return (
            <Card key={post.id} className="p-0 overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Media Preview (Placeholder) */}
                <div className="w-full md:w-64 h-64 bg-stone-100 flex items-center justify-center text-stone-300">
                  <Instagram size={48} />
                </div>
                
                <div className="flex-1 p-6 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="font-bold">{member?.name}</p>
                        <p className="text-xs text-stone-400">{hub?.name} • {formatDate(post.createdAt)}</p>
                      </div>
                    </div>
                    <div className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      post.status === PostStatus.ENVIADO ? "bg-amber-100 text-amber-700" :
                      post.status === PostStatus.APROVADO ? "bg-emerald-100 text-emerald-700" :
                      "bg-red-100 text-red-700"
                    )}>
                      {post.status}
                    </div>
                  </div>

                  <div className="flex-1 bg-stone-50 p-4 rounded-xl border border-stone-100 mb-6">
                    <p className="text-sm text-stone-600 italic">"{post.caption}"</p>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <a 
                      href={post.instagramPostUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm font-bold text-primary hover:underline"
                    >
                      <ExternalLink size={16} /> Ver no Instagram
                    </a>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-500 border-red-100 hover:bg-red-50"
                        onClick={() => handleAction(post.id, PostStatus.REPROVADO)}
                      >
                        <X size={16} className="mr-1" /> Reprovar
                      </Button>
                      <Button 
                        size="sm" 
                        className="bg-emerald-500 hover:bg-emerald-600"
                        onClick={() => handleAction(post.id, PostStatus.APROVADO)}
                      >
                        <Check size={16} className="mr-1" /> Aprovar
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
