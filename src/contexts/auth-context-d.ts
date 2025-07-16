import { createContext } from 'react';
import { User, Session } from '@supabase/supabase-js';

type UserRole = 'student' | 'tutor' | 'guardian';

interface Profile {
  id: string;
  user_id: string;
  full_name: string | null;
  phone_number: string | null;
  role: UserRole;
  preferred_language: 'en' | 'bn';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (email: string, password: string, role: UserRole, fullName: string, phone?: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  trackEvent: (eventType: string, eventData?: Record<string, unknown>) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
