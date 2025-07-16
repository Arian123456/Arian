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
  HelpCircle
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
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "@/components/LanguageSelector";

const studentMenuItems = [
  { title: "হোম", url: "/", icon: Home },
  { title: "ক্লাস সময়সূচি", url: "/schedule", icon: Calendar },
  { title: "আমার শিক্ষক", url: "/my-tutors", icon: Users },
  { title: "প্রগতি রিপোর্ট", url: "/progress", icon: TrendingUp },
  { title: "বার্তা", url: "/messages", icon: MessageSquare },
  { title: "হোমওয়ার্ক এবং নোটস", url: "/homework", icon: BookOpen },
  { title: "AI সহায়তা", url: "/ai-help", icon: HelpCircle },
  { title: "নোটিফিকেশন", url: "/notifications", icon: Bell },
  { title: "প্রোফাইল", url: "/profile", icon: User },
];

const tutorMenuItems = [
  { title: "হোম", url: "/", icon: Home },
  { title: "আমার প্রোফাইল", url: "/profile", icon: User },
  { title: "শিক্ষার্থী খুঁজুন", url: "/find-students", icon: Search },
  { title: "ব্যাচ ম্যানেজমেন্ট", url: "/batch-management", icon: Users },
  { title: "রিপোর্টস", url: "/reports", icon: TrendingUp },
  { title: "বার্তা", url: "/messages", icon: MessageSquare },
  { title: "আয় এবং পেমেন্ট", url: "/earnings", icon: CreditCard },
  { title: "নোটিফিকেশন", url: "/notifications", icon: Bell },
  { title: "প্রোফাইল বুস্ট", url: "/boost-profile", icon: Star },
];

const guardianMenuItems = [
  { title: "হোম", url: "/", icon: Home },
  { title: "শিক্ষক খুঁজুন", url: "/find-tutors", icon: Search },
  { title: "সন্তানের অগ্রগতি", url: "/child-progress", icon: TrendingUp },
  { title: "আমার শিক্ষকগণ", url: "/my-tutors", icon: Users },
  { title: "বার্তা", url: "/messages", icon: MessageSquare },
  { title: "পেমেন্ট হিস্ট্রি", url: "/payment-history", icon: CreditCard },
  { title: "শিডিউল", url: "/schedule", icon: Calendar },
  { title: "নোটিফিকেশন", url: "/notifications", icon: Bell },
  { title: "প্রোফাইল", url: "/profile", icon: User },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const { profile } = useAuth();
  const { t } = useLanguage();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const getMenuItems = () => {
    switch (profile?.role) {
      case 'student':
        return studentMenuItems;
      case 'tutor':
        return tutorMenuItems;
      case 'guardian':
        return guardianMenuItems;
      default:
        return studentMenuItems;
    }
  };

  const menuItems = getMenuItems();
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-red-600 text-white font-medium border border-red-700" 
      : "text-red-600 hover:bg-red-600 hover:text-white border border-red-300 bg-white";

  const getRoleDisplayName = () => {
    switch (profile?.role) {
      case 'student':
        return t('student');
      case 'tutor':
        return t('tutor');
      case 'guardian':
        return t('guardian');
      default:
        return '';
    }
  };

  return (
    <Sidebar
      className={collapsed ? "w-16" : "w-60"}
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg text-primary">{t('app_name')}</h2>
              <p className="text-xs text-muted-foreground">{getRoleDisplayName()}</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            মেনু
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="my-1">
                    <NavLink 
                      to={item.url} 
                      end 
                      className={`${getNavCls} p-3 rounded-lg transition-all duration-200`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!collapsed && <span className="ml-3 font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {!collapsed && (
          <SidebarGroup className="mt-auto">
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="my-1">
                    <NavLink to="/settings" className="text-red-600 hover:bg-red-600 hover:text-white border border-red-300 bg-white p-3 rounded-lg transition-all duration-200">
                      <Settings className="w-5 h-5" />
                      <span className="ml-3 font-medium">{t('settings')}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton asChild className="my-1">
                    <NavLink to="/help" className="text-red-600 hover:bg-red-600 hover:text-white border border-red-300 bg-white p-3 rounded-lg transition-all duration-200">
                      <HelpCircle className="w-5 h-5" />
                      <span className="ml-3 font-medium">{t('help')}</span>
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