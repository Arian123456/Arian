import { useState } from "react";
import { 
  Home, 
  MessageSquare, 
  Bell, 
  User, 
  Search,
  Calendar,
  BookOpen,
  Settings,
  Star,
  TrendingUp,
  Users,
  CreditCard,
  HelpCircle,
  FileText,
  BarChart3,
  Wallet,
  UserPlus,
  GraduationCap,
  Brain,
  ChevronDown,
  Shield,
  Target,
  Award,
  Clock,
  HeadphonesIcon
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const teacherMenuItems = [
  { title: "হোম", url: "/", icon: Home, description: "Welcome, stats, recent requests" },
  { title: "আমার প্রোফাইল", url: "/profile", icon: User, description: "Profile, verification, reviews" },
  { title: "শিক্ষার্থী খুঁজুন", url: "/find-students", icon: Search, description: "Search filters, apply to posts" },
  { title: "ব্যাচ ম্যানেজমেন্ট", url: "/batch-management", icon: Users, description: "Create batches, attendance, fee tracking" },
  { title: "রিপোর্টস", url: "/reports", icon: BarChart3, description: "Performance reports, PDF export" },
  { title: "বার্তা", url: "/messages", icon: MessageSquare, description: "Real-time chat, file sharing" },
  { title: "আয় এবং পেমেন্ট", url: "/earnings", icon: Wallet, description: "Earnings, wallet, escrow management" },
  { title: "নোটিফিকেশনস", url: "/notifications", icon: Bell, description: "Demo requests, payments, alerts" },
  { title: "প্রোফাইল বুস্ট", url: "/boost-profile", icon: Star, description: "Premium subscription, featured listing" },
];

const guardianMenuItems = [
  { title: "হোম", url: "/", icon: Home, description: "Children overview, payments, classes" },
  { title: "শিক্ষক খুঁজুন", url: "/find-tutors", icon: Search, description: "Advanced filters, tutor comparison" },
  { title: "সন্তানের অগ্রগতি", url: "/child-progress", icon: TrendingUp, description: "Progress tracking, AI suggestions" },
  { title: "আমার শিক্ষকগণ", url: "/my-tutors", icon: GraduationCap, description: "Tutor management, reviews" },
  { title: "বার্তা", url: "/messages", icon: MessageSquare, description: "Chat with tutors, file sharing" },
  { title: "পেমেন্ট হিস্ট্রি", url: "/payment-history", icon: CreditCard, description: "Payment tracking, receipts, disputes" },
  { title: "শিডিউল", url: "/schedule", icon: Calendar, description: "Class calendar, absence marking" },
  { title: "নোটিফিকেশনস", url: "/notifications", icon: Bell, description: "Tutor replies, payment confirmations" },
  { title: "অভিভাবক সহায়তা", url: "/guardian-support", icon: HelpCircle, description: "Tips, FAQ, live chat" },
];

const studentMenuItems = [
  { title: "হোম", url: "/", icon: Home, description: "Today's classes, homework, summary" },
  { title: "ক্লাস সময়সূচি", url: "/schedule", icon: Calendar, description: "Visual calendar, reminders" },
  { title: "আমার শিক্ষক", url: "/my-tutors", icon: GraduationCap, description: "Tutor list, contact, ratings" },
  { title: "প্রগতি রিপোর্ট", url: "/progress", icon: TrendingUp, description: "Attendance, achievements, feedback" },
  { title: "বার্তা", url: "/messages", icon: MessageSquare, description: "Chat with tutors, classmates" },
  { title: "হোমওয়ার্ক এবং নোটস", url: "/homework", icon: BookOpen, description: "Materials, notes, AI summary" },
  { title: "AI সহায়তা", url: "/ai-help", icon: Brain, description: "Ask questions, voice commands" },
  { title: "নোটিফিকেশনস", url: "/notifications", icon: Bell, description: "Class reminders, updates" },
];

const roles = [
  { key: 'teacher', label: '👨‍🏫 Teacher Mode', value: 'tutor' as const },
  { key: 'guardian', label: '👨‍👩‍👧 Guardian Mode', value: 'guardian' as const },
  { key: 'student', label: '🧑‍🎓 Student Mode', value: 'student' as const },
];

type UserRole = 'student' | 'tutor' | 'guardian';

export function ShikkhaBondhuSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { profile } = useAuth();
  const { t } = useLanguage();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  // State for role switching
  const [currentRole, setCurrentRole] = useState<UserRole>(profile?.role || 'student');

  const getMenuItems = () => {
    switch (currentRole) {
      case 'tutor':
        return teacherMenuItems;
      case 'guardian':
        return guardianMenuItems;
      case 'student':
        return studentMenuItems;
      default:
        return studentMenuItems;
    }
  };

  const menuItems = getMenuItems();
  const isActive = (path: string) => currentPath === path;
  
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary text-primary-foreground font-medium border border-primary/50 shadow-sm" 
      : "text-muted-foreground hover:bg-primary/10 hover:text-primary border border-transparent bg-background";

  const getRoleDisplayName = () => {
    switch (currentRole) {
      case 'tutor':
        return 'শিক্ষক';
      case 'guardian':
        return 'অভিভাবক';
      case 'student':
        return 'শিক্ষার্থী';
      default:
        return '';
    }
  };

  const getRoleIcon = () => {
    switch (currentRole) {
      case 'tutor':
        return '👨‍🏫';
      case 'guardian':
        return '👨‍👩‍👧';
      case 'student':
        return '🧑‍🎓';
      default:
        return '🧑‍🎓';
    }
  };

  const handleRoleSwitch = (newRole: UserRole) => {
    setCurrentRole(newRole);
    // You can add navigation logic here if needed
  };

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-72"}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-6 h-6 text-primary-foreground" />
          </div>
          {!collapsed && (
            <div className="flex-1">
              <h2 className="font-bold text-xl text-primary">ShikkhaBondhu</h2>
              <p className="text-xs text-muted-foreground">শিক্ষার সেতুবন্ধন</p>
            </div>
          )}
        </div>

        {/* Role Switcher */}
        {!collapsed && (
          <div className="mt-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between h-12 bg-background/50">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getRoleIcon()}</span>
                    <div className="text-left">
                      <div className="font-medium text-sm">{getRoleDisplayName()}</div>
                      <div className="text-xs text-muted-foreground">ভূমিকা পরিবর্তন করুন</div>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full" align="start">
                {roles.map((role) => (
                  <DropdownMenuItem
                    key={role.key}
                    onClick={() => handleRoleSwitch(role.value)}
                    className={currentRole === role.value ? "bg-primary/10" : ""}
                  >
                    <span className="text-sm">{role.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent className="px-3 py-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : "text-sm font-semibold text-muted-foreground px-2 mb-2"}>
            {getRoleDisplayName()} ড্যাশবোর্ড
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="my-0.5">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavCls} p-3 rounded-lg transition-all duration-200 group relative overflow-hidden`}
                      title={collapsed ? `${item.title} - ${item.description}` : undefined}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <div className="flex-1 min-w-0">
                          <span className="font-medium text-sm block truncate">{item.title}</span>
                          <span className="text-xs text-muted-foreground/80 block truncate">
                            {item.description}
                          </span>
                        </div>
                      )}
                      {/* Active indicator */}
                      {isActive(item.url) && (
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup className="mt-auto border-t border-border pt-4">
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="my-0.5">
                    <NavLink 
                      to="/settings" 
                      className="text-muted-foreground hover:bg-primary/10 hover:text-primary border border-transparent bg-background p-3 rounded-lg transition-all duration-200"
                    >
                      <Settings className="w-5 h-5" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm">সেটিংস</span>
                        <span className="text-xs text-muted-foreground/80 block">Language, notifications, account</span>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="my-0.5">
                    <NavLink 
                      to="/help" 
                      className="text-muted-foreground hover:bg-primary/10 hover:text-primary border border-transparent bg-background p-3 rounded-lg transition-all duration-200"
                    >
                      <HelpCircle className="w-5 h-5" />
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-sm">সহায়তা</span>
                        <span className="text-xs text-muted-foreground/80 block">Support, FAQ, live chat</span>
                      </div>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>

                <SidebarMenuItem>
                  <div className="p-2">
                    <LanguageSelector />
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>
    </Sidebar>
  );
}
