import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          // Defer profile fetching to avoid blocking
          setTimeout(() => {
            fetchProfile(session.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }

      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const signUp = async (email: string, password: string, role: UserRole, fullName: string, phone?: string) => {
    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            role,
            full_name: fullName,
            phone_number: phone || null,
          }
        }
      });

      if (error) throw error;

      // If sign up is successful but no profile was created by trigger, create it manually
      if (data.user && !error) {
        // Wait a moment for the trigger to potentially create the profile
        setTimeout(async () => {
          try {
            const { data: existingProfile } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', data.user!.id)
              .single();

            if (!existingProfile) {
              // Create profile manually if trigger failed
              await supabase
                .from('profiles')
                .insert({
                  user_id: data.user!.id,
                  full_name: fullName,
                  role,
                  phone_number: phone || null,
                });
            }
          } catch (profileError) {
            console.error('Error creating profile manually:', profileError);
          }
        }, 1000);
      }

      toast({
        title: "Account Created",
        description: "Please check your email to verify your account.",
      });

      // Track sign up event
      await trackEvent('user_signup', { role, email });

    } catch (error: unknown) {
      console.error('Sign up error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Sign Up Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });

      // Track sign in event
      await trackEvent('user_signin', { email });

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Sign In Error",
        description: errorMessage,
        variant: "destructive",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      // Track sign out event before signing out
      if (user) {
        await trackEvent('user_signout', { user_id: user.id });
      }

      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      toast({
        title: "Sign Out Error",
        description: errorMessage,
        variant: "destructive",
      });
    }
  };

  const trackEvent = async (eventType: string, eventData: Record<string, unknown> = {}) => {
    try {
      await supabase.functions.invoke('track-user', {
        body: {
          eventType,
          eventData,
          userId: user?.id || profile?.user_id,
        }
      });
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      profile,
      loading,
      signUp,
      signIn,
      signOut,
      trackEvent,
    }}>
      {children}
    </AuthContext.Provider>
  );
}