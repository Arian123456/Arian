import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Users, BookOpen } from 'lucide-react';

export type UserRole = 'student' | 'tutor' | 'guardian';

interface RoleSelectorProps {
  onRoleSelect: (role: UserRole) => void;
}

const roles = [
  {
    id: 'student' as UserRole,
    title: 'শিক্ষার্থী',
    description: 'আমি একজন ছাত্র/ছাত্রী এবং শিখতে চাই',
    icon: GraduationCap,
    color: 'text-blue-600'
  },
  {
    id: 'tutor' as UserRole,
    title: 'শিক্ষক',
    description: 'আমি একজন শিক্ষক এবং পড়াতে চাই',
    icon: BookOpen,
    color: 'text-green-600'
  },
  {
    id: 'guardian' as UserRole,
    title: 'অভিভাবক',
    description: 'আমি একজন অভিভাবক এবং সন্তানের জন্য শিক্ষক খুঁজছি',
    icon: Users,
    color: 'text-purple-600'
  }
];

export const RoleSelector = ({ onRoleSelect }: RoleSelectorProps) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleConfirm = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">শিক্ষাবন্ধুতে স্বাগতম</h1>
          <p className="text-white/80">আপনার ভূমিকা নির্বাচন করুন</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            const isSelected = selectedRole === role.id;
            
            return (
              <Card 
                key={role.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-medium ${
                  isSelected ? 'ring-2 ring-white shadow-medium scale-105' : 'hover:scale-[1.02]'
                }`}
                onClick={() => setSelectedRole(role.id)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto p-3 rounded-full bg-accent w-fit ${role.color}`}>
                    <Icon size={32} />
                  </div>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription className="text-sm">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className={`text-center transition-all ${isSelected ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="h-1 bg-primary rounded-full"></div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center">
          <Button 
            variant="hero" 
            size="lg"
            onClick={handleConfirm}
            disabled={!selectedRole}
            className="min-w-[200px]"
          >
            এগিয়ে যান
          </Button>
          
          <p className="mt-4 text-white/60 text-sm">
            ⚠️ একবার নির্বাচন করলে পরে পরিবর্তন করতে সাপোর্টের সাহায্য নিতে হবে
          </p>
        </div>
      </div>
    </div>
  );
};