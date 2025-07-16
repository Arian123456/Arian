import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Clock, 
  BookOpen, 
  TrendingUp, 
  Calendar,
  Star,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  BarChart3,
  MessageSquare,
  Bell,
  Users
} from 'lucide-react';
import { ProgressReport } from './ProgressReport';
import { ClassSchedule } from './ClassSchedule';
import { Notifications } from './Notifications';
import { Messages } from './Messages';

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const upcomingClasses = [
    {
      subject: "গণিত",
      tutor: "করিম স্যার",
      time: "২:৩০ PM",
      duration: "৬০ মিনিট",
      status: "confirmed"
    },
    {
      subject: "পদার্থবিদ্যা",
      tutor: "রহিম উদ্দিন",
      time: "৪:০০ PM",
      duration: "৯০ মিনিট",
      status: "pending"
    }
  ];

  const progressData = [
    { subject: "গণিত", progress: 75, color: "bg-blue-500" },
    { subject: "পদার্থবিদ্যা", progress: 60, color: "bg-green-500" },
    { subject: "রসায়ন", progress: 45, color: "bg-purple-500" },
    { subject: "ইংরেজি", progress: 80, color: "bg-orange-500" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">স্বাগতম, সারা!</h1>
        <p className="text-white/80">আজ আপনার ২টি ক্লাস আছে। চলুন দেখি কি পড়ার আছে।</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">আজকের ক্লাস</p>
                <p className="text-2xl font-bold">২</p>
              </div>
              <Clock className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">সম্পন্ন ক্লাস</p>
                <p className="text-2xl font-bold">১৮</p>
              </div>
              <CheckCircle className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">সক্রিয় শিক্ষক</p>
                <p className="text-2xl font-bold">৩</p>
              </div>
              <BookOpen className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">গড় রেটিং</p>
                <p className="text-2xl font-bold">৪.৮</p>
              </div>
              <Star className="w-8 h-8 text-warning fill-current" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two column layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>আজকের ক্লাস</span>
            </CardTitle>
            <CardDescription>আপনার আসন্ন ক্লাসের তালিকা</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingClasses.map((cls, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-semibold">{cls.subject}</h4>
                  <p className="text-sm text-muted-foreground">{cls.tutor}</p>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>{cls.time}</span>
                    <span>•</span>
                    <span>{cls.duration}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <Badge 
                    variant={cls.status === 'confirmed' ? 'default' : 'secondary'}
                  >
                    {cls.status === 'confirmed' ? 'নিশ্চিত' : 'অপেক্ষমাণ'}
                  </Badge>
                  <Button variant="outline" size="sm">
                    <PlayCircle className="w-4 h-4 mr-2" />
                    জয়েন করুন
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Progress Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>এই সপ্তাহের অগ্রগতি</span>
            </CardTitle>
            <CardDescription>বিষয়ভিত্তিক আপনার পারফরমেন্স</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {progressData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{item.subject}</span>
                  <span className="text-muted-foreground">{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-2" />
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-success/10 rounded-lg">
              <div className="flex items-center space-x-2 text-success">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">গত সপ্তাহের চেয়ে ১৫% উন্নতি!</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
          <CardDescription>আপনার সাম্প্রতিক শিক্ষা সংক্রান্ত কার্যকলাপ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success" />
              <div className="flex-1">
                <p className="font-medium">গণিতের বীজগণিত অধ্যায় সম্পন্ন</p>
                <p className="text-sm text-muted-foreground">২ ঘন্টা আগে</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <Star className="w-5 h-5 text-warning fill-current" />
              <div className="flex-1">
                <p className="font-medium">করিম স্যারকে ৫ স্টার রেটিং দিয়েছেন</p>
                <p className="text-sm text-muted-foreground">৫ ঘন্টা আগে</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <AlertCircle className="w-5 h-5 text-info" />
              <div className="flex-1">
                <p className="font-medium">নতুন অ্যাসাইনমেন্ট পেয়েছেন - পদার্থবিদ্যা</p>
                <p className="text-sm text-muted-foreground">১ দিন আগে</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}