import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PublicLayout } from './components/PublicLayout';
import { MemberLayout } from './components/MemberLayout';
import { AdminLayout } from './components/AdminLayout';

// Pages
import { LandingPage } from './pages/LandingPage';
import { PublicHubs } from './pages/PublicHubs';
import { Subscribe } from './pages/Subscribe';
import { Login } from './pages/Login';
import { MemberDashboard } from './pages/MemberDashboard';
import { MemberEvents } from './pages/MemberEvents';
import { MemberPostContent } from './pages/MemberPostContent';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminHubs } from './pages/AdminHubs';
import { AdminMembers } from './pages/AdminMembers';
import { AdminGroups } from './pages/AdminGroups';
import { AdminEvents } from './pages/AdminEvents';
import { AdminGamification } from './pages/AdminGamification';
import { AdminFinancial } from './pages/AdminFinancial';
import { AdminPostModeration } from './pages/AdminPostModeration';
import { AdminSettings } from './pages/AdminSettings';
import { AdminCheckin } from './pages/AdminCheckin';

// Placeholder components for missing pages
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
    <h2 className="text-2xl font-bold text-stone-400">{title}</h2>
    <p className="text-stone-500">Esta página está em desenvolvimento.</p>
  </div>
);

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout><LandingPage /></PublicLayout>} />
        <Route path="/hubs" element={<PublicLayout><PublicHubs /></PublicLayout>} />
        <Route path="/subscribe" element={<PublicLayout><Subscribe /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/events" element={<PublicLayout><Placeholder title="Eventos Públicos" /></PublicLayout>} />

        {/* Member Routes */}
        <Route path="/member" element={<MemberLayout><MemberDashboard /></MemberLayout>} />
        <Route path="/member/events" element={<MemberLayout><MemberEvents /></MemberLayout>} />
        <Route path="/member/events/:id" element={<MemberLayout><Placeholder title="Detalhes do Evento" /></MemberLayout>} />
        <Route path="/member/post" element={<MemberLayout><MemberPostContent /></MemberLayout>} />
        <Route path="/member/points" element={<MemberLayout><Placeholder title="Meus Pontos" /></MemberLayout>} />
        <Route path="/member/profile" element={<MemberLayout><Placeholder title="Meu Perfil" /></MemberLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/hubs" element={<AdminLayout><AdminHubs /></AdminLayout>} />
        <Route path="/admin/members" element={<AdminLayout><AdminMembers /></AdminLayout>} />
        <Route path="/admin/groups" element={<AdminLayout><AdminGroups /></AdminLayout>} />
        <Route path="/admin/events" element={<AdminLayout><AdminEvents /></AdminLayout>} />
        <Route path="/admin/checkin" element={<AdminLayout><AdminCheckin /></AdminLayout>} />
        <Route path="/admin/posts" element={<AdminLayout><AdminPostModeration /></AdminLayout>} />
        <Route path="/admin/gamification" element={<AdminLayout><AdminGamification /></AdminLayout>} />
        <Route path="/admin/financial" element={<AdminLayout><AdminFinancial /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><AdminSettings /></AdminLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
