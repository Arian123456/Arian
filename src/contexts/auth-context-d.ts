import { createContext } from 'react';
import { User, Session } from '@supabase/supabase-js';

export type UserRole = 'student' | 'tutor' | 'guardian' | 'admin';

export interface Profile {
  id: string;
  user_id: string;
  full_name: string;
  phone_number: string | null;
  role: UserRole;
  preferred_language: 'en' | 'bn';
  avatar_url: string | null;
  created_at: string;
  updated_at: string;
  // Add any additional profile fields here
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  signUp: (
    email: string,
    password: string,
    role: UserRole,
    fullName: string,
    phone?: string,
    language?: 'en' | 'bn'
  ) => Promise<{ user?: User; error?: Error }>;
  signIn: (
    email: string, 
    password: string
  ) => Promise<{ session?: Session; error?: Error }>;
  signOut: () => Promise<{ error?: Error }>;
  updateProfile: (
    updates: Partial<Profile>
  ) => Promise<{ profile?: Profile; error?: Error }>;
  refreshSession: () => Promise<void>;
  trackEvent: (
    eventType: string, 
    eventData?: Record<string, unknown>
  ) => Promise<void>;
  // Add any additional auth methods here
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Optional: Default context values
export const defaultAuthContext: Partial<AuthContextType> = {
  user: null,
  session: null,
  profile: null,
  loading: false,
  error: null,
  isAuthenticated: false
};