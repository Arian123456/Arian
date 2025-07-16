import { StudentProfile } from '@/components/profile/StudentProfile';
import { TutorProfile } from '@/components/profile/TutorProfile';
import { GuardianProfile } from '@/components/profile/GuardianProfile';
import { useAuth } from '@/contexts/AuthContext';
import { Loader2 } from 'lucide-react';

export function Profile() {
  const { profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const renderProfile = () => {
    switch (profile?.role) {
      case 'student':
        return <StudentProfile />;
      case 'tutor':
        return <TutorProfile />;
      case 'guardian':
        return <GuardianProfile />;
      default:
        return <StudentProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderProfile()}
    </div>
  );
}

export default Profile;