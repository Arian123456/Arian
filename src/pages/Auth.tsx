import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Loader2, UserCircle, GraduationCap, Users, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

type UserRole = 'student' | 'tutor' | 'guardian';

export function Auth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signUpData, setSignUpData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    phone: '',
    role: '' as UserRole,
  });
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  const { signUp, signIn } = useAuth();
  const { t } = useLanguage();

  const validateSignUpForm = () => {
    if (!signUpData.role) {
      return 'Please select a role';
    }

    if (!signUpData.fullName.trim()) {
      return 'Full name is required';
    }

    if (!signUpData.password || signUpData.password.length < 6) {
      return 'Password must be at least 6 characters';
    }

    if (signUpData.password !== signUpData.confirmPassword) {
      return 'Passwords do not match';
    }

    // Role-specific validation
    if (signUpData.role === 'tutor') {
      // Tutors need both email AND phone
      if (!signUpData.email.trim()) {
        return 'Email is required for tutors';
      }
      if (!signUpData.phone.trim()) {
        return 'Phone number is required for tutors';
      }
    } else {
      // Students and Guardians need either email OR phone
      if (!signUpData.email.trim() && !signUpData.phone.trim()) {
        return signUpData.role === 'student' 
          ? 'Either email or phone number is required for students'
          : 'Either email or phone number is required for guardians';
      }
    }

    // Email validation if provided
    if (signUpData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signUpData.email)) {
        return 'Please enter a valid email address';
      }
    }

    // Phone validation if provided
    if (signUpData.phone.trim()) {
      const phoneRegex = /^[+]?[0-9\s()-]{10,}$/;
      if (!phoneRegex.test(signUpData.phone)) {
        return 'Please enter a valid phone number';
      }
    }

    return null;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const validationError = validateSignUpForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      // Use email or a generated email from phone if no email provided
      const email = signUpData.email.trim() || `${signUpData.phone.replace(/[^0-9]/g, '')}@mindspark.app`;
      
      await signUp(
        email,
        signUpData.password,
        signUpData.role,
        signUpData.fullName.trim(),
        signUpData.phone.trim()
      );
    } catch (error: unknown) {
      console.error('Sign up error:', error);
      const errorMessage = error instanceof Error ? error.message : 'An error occurred during sign up';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!signInData.email.trim() || !signInData.password) {
      setError('Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await signIn(signInData.email, signInData.password);
    } catch (error: unknown) {
      console.error('Sign in error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Invalid login credentials';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = [
    { value: 'student', label: t('student'), icon: GraduationCap, description: 'Learn with expert tutors' },
    { value: 'tutor', label: t('tutor'), icon: UserCircle, description: 'Teach and share knowledge' },
    { value: 'guardian', label: t('guardian'), icon: Users, description: 'Monitor child\'s progress' },
  ];

  const getRequirementText = () => {
    switch (signUpData.role) {
      case 'tutor':
        return 'Tutors need both email and phone number';
      case 'student':
        return 'Students need either email or phone number';
      case 'guardian':
        return 'Guardians need either email or phone number';
      default:
        return 'Select your role to see requirements';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">{t('app_name')}</CardTitle>
          <CardDescription>{t('welcome')}</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="signin" className="space-y-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">{t('sign_in')}</TabsTrigger>
              <TabsTrigger value="signup">{t('sign_up')}</TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">{t('email')}</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    value={signInData.email}
                    onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signin-password">{t('password')}</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    value={signInData.password}
                    onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t('sign_in')}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role">{t('select_role')}</Label>
                  <Select value={signUpData.role} onValueChange={(value) => setSignUpData(prev => ({ ...prev, role: value as UserRole }))}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('select_role')} />
                    </SelectTrigger>
                    <SelectContent>
                      {roleOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center space-x-2">
                            <option.icon className="h-4 w-4" />
                            <div>
                              <div className="font-medium">{option.label}</div>
                              <div className="text-xs text-muted-foreground">{option.description}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {signUpData.role && (
                    <p className="text-xs text-muted-foreground mt-1">
                      {getRequirementText()}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fullName">{t('full_name')} *</Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={signUpData.fullName}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, fullName: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">
                    {t('email')} {signUpData.role === 'tutor' ? '*' : '(optional if phone provided)'}
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    value={signUpData.email}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
                    required={signUpData.role === 'tutor'}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    {t('phone')} {signUpData.role === 'tutor' ? '*' : '(optional if email provided)'}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={signUpData.phone}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+880..."
                    required={signUpData.role === 'tutor'}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t('password')} (min 6 characters) *</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    value={signUpData.password}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
                    minLength={6}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password">{t('confirm_password')} *</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={signUpData.confirmPassword}
                    onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading || !signUpData.role}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t('sign_up')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}