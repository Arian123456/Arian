import React, { useState, useEffect, useContext, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { AuthContext, Profile, UserRole } from './auth-context-d';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProfile = useCallback(async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Profile fetch error:', error);
      setProfile(null);
    }
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        session?.user ? fetchProfile(session.user.id) : setProfile(null);
        setLoading(false);
      }
    );

    const initializeAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      session?.user && fetchProfile(session.user.id);
      setLoading(false);
    };

    initializeAuth();
    return () => subscription.unsubscribe();
  }, [fetchProfile]);

  const signUp = async (
    email: string, 
    password: string, 
    role: UserRole, 
    fullName: string, 
    phone?: string
  ) => {
    try {
      setLoading(true);
      const redirectUrl = `${window.location.origin}/auth/callback`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { role, full_name: fullName, phone_number: phone }
        }
      });

      if (error) throw error;

      if (data.user) {
        setTimeout(async () => {
          const { error: profileError } = await supabase
            .from('profiles')
            .upsert({
              user_id: data.user!.id,
              full_name: fullName,
              role,
              phone_number: phone
            });

          if (profileError) console.error('Profile creation error:', profileError);
        }, 1000);
      }

      toast({ title: "Verify Your Email", description: "Check your inbox for the confirmation link." });
      await trackEvent('signup', { role });
      
    } catch (error) {
      toast({
        title: "Signup Failed",
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      toast({ title: "Welcome Back!", description: "You're now signed in." });
      await trackEvent('login', { email });
      
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : 'Invalid credentials',
        variant: "destructive"
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      if (user) await trackEvent('logout', { user_id: user.id });
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({ title: "Signed Out", description: "You've been logged out successfully." });
      
    } catch (error) {
      toast({
        title: "Logout Error",
        description: error instanceof Error ? error.message : 'Failed to sign out',
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const trackEvent = async (eventType: string, payload: Record<string, unknown> = {}) => {
    try {
      await supabase.functions.invoke('track-user', {
        body: { eventType, userId: user?.id, ...payload }
      });
    } catch (error) {
      console.error('Tracking error:', error);
    }
  };

  const value = {
    user,
    session,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    trackEvent
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};