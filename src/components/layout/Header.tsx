import { Bell, Search, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSelector } from '@/components/LanguageSelector';

export function Header() {
  const { profile, signOut } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  return (
    <header className="h-16 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 sticky top-0 z-50">
      <div className="flex h-full items-center justify-between px-4">
        {/* Left section */}
        <div className="flex items-center space-x-4">
          <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
          
          {/* Search bar */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="টিউটর, বিষয়, বা এলাকা খুঁজুন..."
              className="pl-10 w-80 bg-muted/50 cursor-pointer"
              onClick={() => navigate('/search')}
              readOnly
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center space-x-3">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              3
            </Badge>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 h-auto p-2">
                 <Avatar className="h-8 w-8">
                   <AvatarImage src={profile?.avatar_url || ""} alt={profile?.full_name || ""} />
                   <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                     {profile?.full_name?.charAt(0) || "U"}
                   </AvatarFallback>
                 </Avatar>
                 <div className="hidden md:block text-left">
                   <p className="text-sm font-medium">{profile?.full_name || t('user')}</p>
                   <p className="text-xs text-muted-foreground">{t(profile?.role || 'student')}</p>
                 </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>আমার অ্যাকাউন্ট</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate('/profile')}>
                <User className="mr-2 h-4 w-4" />
                {t('profile')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/settings')}>
                {t('settings')}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/help')}>
                {t('help')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <div className="px-2 py-1">
                <LanguageSelector />
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive" onClick={signOut}>
                {t('sign_out')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}