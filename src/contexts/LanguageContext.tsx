import React, { useState, useEffect } from 'react';
import { LanguageContext, Language } from './language-context-d';

const translations = {
  en: {
    // App Name
    app_name: 'MindSpark',
    
    // Authentication
    sign_in: 'Sign In',
    sign_up: 'Sign Up',
    sign_out: 'Sign Out',
    email: 'Email',
    password: 'Password',
    phone: 'Phone Number',
    full_name: 'Full Name',
    confirm_password: 'Confirm Password',
    
    // Roles
    select_role: 'Select Your Role',
    student: 'Student',
    tutor: 'Tutor',
    guardian: 'Guardian',
    
    // Navigation
    dashboard: 'Dashboard',
    profile: 'Profile',
    search: 'Search',
    settings: 'Settings',
    help: 'Help',
    
    // Messages
    welcome: 'Welcome to MindSpark',
    loading: 'Loading...',
    error: 'An error occurred',
    success: 'Success',
    
    // Settings
    language: 'Language',
    english: 'English',
    bangla: 'বাংলা',
    
    // Google Drive
    storage: 'Storage',
    google_drive: 'Google Drive Storage',
    main_storage: 'Main Storage',
    secondary_storage: 'Secondary Storage',
    shared_storage: 'Shared Storage',
    
    // JotForm
    get_help: 'Get Study Help',
    study_assistant: 'Study Assistant',
    
    // Common
    user: 'User',
  },
  bn: {
    // App Name
    app_name: 'মাইন্ডস্পার্ক',
    
    // Authentication
    sign_in: 'সাইন ইন',
    sign_up: 'সাইন আপ',
    sign_out: 'সাইন আউট',
    email: 'ইমেইল',
    password: 'পাসওয়ার্ড',
    phone: 'ফোন নম্বর',
    full_name: 'পূর্ণ নাম',
    confirm_password: 'পাসওয়ার্ড নিশ্চিত করুন',
    
    // Roles
    select_role: 'আপনার ভূমিকা নির্বাচন করুন',
    student: 'শিক্ষার্থী',
    tutor: 'শিক্ষক',
    guardian: 'অভিভাবক',
    
    // Navigation
    dashboard: 'ড্যাশবোর্ড',
    profile: 'প্রোফাইল',
    search: 'খুঁজুন',
    settings: 'সেটিংস',
    help: 'সাহায্য',
    
    // Messages
    welcome: 'মাইন্ডস্পার্কে স্বাগতম',
    loading: 'লোড হচ্ছে...',
    error: 'একটি ত্রুটি ঘটেছে',
    success: 'সফল',
    
    // Settings
    language: 'ভাষা',
    english: 'English',
    bangla: 'বাংলা',
    
    // Google Drive
    storage: 'সংরক্ষণ',
    google_drive: 'গুগল ড্রাইভ সংরক্ষণ',
    main_storage: 'মূল সংরক্ষণ',
    secondary_storage: 'দ্বিতীয় সংরক্ষণ',
    shared_storage: 'ভাগাভাগি সংরক্ষণ',
    
    // JotForm
    get_help: 'পড়াশোনার সাহায্য নিন',
    study_assistant: 'অধ্যয়ন সহায়ক',
    
    // Common
    user: 'ব্যবহারকারী',
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}