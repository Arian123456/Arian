
import { Routes, Route } from 'react-router-dom';
import { SidebarProvider } from '@/components/ui/sidebar';
import { ShikkhaBondhuSidebar } from '@/components/layout/ShikkhaBondhuSidebar';
import { Header } from '@/components/layout/Header';
import { StudentDashboard } from '@/components/dashboard/StudentDashboard';
import { TutorDashboard } from '@/components/dashboard/TutorDashboard';
import { GuardianDashboard } from '@/components/dashboard/GuardianDashboard';
import { ProgressReport } from '@/components/dashboard/ProgressReport';
import { ClassSchedule } from '@/components/dashboard/ClassSchedule';
import { Notifications } from '@/components/dashboard/Notifications';
import { Messages } from '@/components/dashboard/Messages';
import { Profile } from '@/pages/Profile';
import { Search } from '@/pages/Search';
import FindTutors from '@/pages/FindTutors';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { StudyAssistant } from '@/components/StudyAssistant';
import { FloatingEmojis } from '@/components/effects/FloatingEmojis';
import { Loader2 } from 'lucide-react';

export function AppLayout() {
  const { profile, loading } = useAuth();
  const { t } = useLanguage();

  if (loading || !profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const renderDashboard = () => {
    const commonComponents = (
      <div className="space-y-6">
        <StudyAssistant />
      </div>
    );

    switch (profile.role) {
      case 'student':
        return (
          <div className="space-y-6">
            <StudentDashboard />
            {commonComponents}
          </div>
        );
      case 'tutor':
        return (
          <div className="space-y-6">
            <TutorDashboard />
            {commonComponents}
          </div>
        );
      case 'guardian':
        return (
          <div className="space-y-6">
            <GuardianDashboard />
            {commonComponents}
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <StudentDashboard />
            {commonComponents}
          </div>
        );
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative">
        <FloatingEmojis />
        <ShikkhaBondhuSidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-auto p-6 relative">
            <Routes>
              <Route path="/" element={renderDashboard()} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/search" element={<Search />} />
              <Route path="/find-tutors" element={<FindTutors />} />
              <Route path="/find-students" element={<div className="p-6"><h1 className="text-2xl font-bold">🧑‍🎓 শিক্ষার্থী খুঁজুন</h1><p>Teachers can search for students here</p></div>} />
              <Route path="/batch-management" element={<div className="p-6"><h1 className="text-2xl font-bold">🗂️ ব্যাচ ম্যানেজমেন্ট</h1><p>Batch management for teachers</p></div>} />
              <Route path="/reports" element={<div className="p-6"><h1 className="text-2xl font-bold">📊 রিপোর্টস</h1><p>Performance reports</p></div>} />
              <Route path="/earnings" element={<div className="p-6"><h1 className="text-2xl font-bold">💵 আয় এবং পেমেন্ট</h1><p>Earnings and payment management</p></div>} />
              <Route path="/boost-profile" element={<div className="p-6"><h1 className="text-2xl font-bold">🚀 প্রোফাইল বুস্ট</h1><p>Premium features for teachers</p></div>} />
              <Route path="/child-progress" element={<div className="p-6"><h1 className="text-2xl font-bold">📈 সন্তানের অগ্রগতি</h1><p>Child progress tracking</p></div>} />
              <Route path="/my-tutors" element={<div className="p-6"><h1 className="text-2xl font-bold">👨‍🏫 আমার শিক্ষকগণ</h1><p>Manage your tutors</p></div>} />
              <Route path="/payment-history" element={<div className="p-6"><h1 className="text-2xl font-bold">💳 পেমেন্ট হিস্ট্রি</h1><p>Payment history and receipts</p></div>} />
              <Route path="/guardian-support" element={<div className="p-6"><h1 className="text-2xl font-bold">👥 অভিভাবক সহায়তা</h1><p>Guardian support and tips</p></div>} />
              <Route path="/homework" element={<div className="p-6"><h1 className="text-2xl font-bold">📁 হোমওয়ার্ক এবং নোটস</h1><p>Homework and study materials</p></div>} />
              <Route path="/ai-help" element={<div className="p-6"><h1 className="text-2xl font-bold">🧠 AI সহায়তা</h1><p>AI-powered study assistance</p></div>} />
              <Route path="/progress" element={<ProgressReport />} />
              <Route path="/schedule" element={<ClassSchedule />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/settings" element={<div className="p-6"><h1 className="text-2xl font-bold">⚙️ সেটিংস</h1><p>App settings and preferences</p></div>} />
              <Route path="/help" element={<div className="p-6"><h1 className="text-2xl font-bold">🆘 সহায়তা</h1><p>Help and support</p></div>} />
              <Route path="*" element={renderDashboard()} />
            </Routes>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
