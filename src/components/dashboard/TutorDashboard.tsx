import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar,
  DollarSign,
  Star,
  Clock,
  BookOpen,
  TrendingUp,
  MessageSquare,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

export function TutorDashboard() {
  const todayClasses = [
    {
      time: "২:৩০ PM",
      subject: "গণিত - বীজগণিত",
      student: "সারা খাতুন",
      duration: "৬০ মিনিট",
      type: "ব্যক্তিগত",
      status: "confirmed"
    },
    {
      time: "৪:০০ PM", 
      subject: "পদার্থবিদ্যা - গতিবিদ্যা",
      student: "রহিম উদ্দিন",
      duration: "৯০ মিনিট",
      type: "অনলাইন",
      status: "pending"
    },
    {
      time: "৬:৩০ PM",
      subject: "গণিত - জ্যামিতি",
      student: "ফাতিমা আক্তার",
      duration: "৬০ মিনিট", 
      type: "গ্রুপ",
      status: "confirmed"
    }
  ];

  const students = [
    { name: "সারা খাতুন", class: "ক্লাস ১০", subject: "গণিত", performance: 85, status: "active" },
    { name: "রহিম উদ্দিন", class: "ক্লাস ৯", subject: "পদার্থবিদ্যা", performance: 78, status: "active" },
    { name: "ফাতিমা আক্তার", class: "HSC", subject: "গণিত", performance: 92, status: "excellent" },
    { name: "করিম মিয়া", class: "ক্লাস ৮", subject: "ইংরেজি", performance: 65, status: "needs_attention" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">স্বাগতম, করিম স্যার!</h1>
        <p className="text-white/80">আজ আপনার ৩টি ক্লাস আছে। ২৪ জন ছাত্র-ছাত্রী আপনার অধীনে অধ্যয়নরত।</p>
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-300 fill-current" />
            <span className="font-semibold">৪.৮ রেটিং</span>
          </div>
          <div className="text-white/60">•</div>
          <div>
            <span className="font-semibold">৯৫% রিবুকিং রেট</span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">মোট ছাত্র-ছাত্রী</p>
                <p className="text-2xl font-bold">২৪</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">আজকের ক্লাস</p>
                <p className="text-2xl font-bold">৩</p>
              </div>
              <Calendar className="w-8 h-8 text-info" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">এ মাসের আয়</p>
                <p className="text-2xl font-bold">৩৫,০০০৳</p>
              </div>
              <DollarSign className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">নতুন রিভিউ</p>
                <p className="text-2xl font-bold">৮</p>
              </div>
              <MessageSquare className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>আজকের ক্লাসের সময়সূচী</span>
            </CardTitle>
            <CardDescription>আপনার আজকের ক্লাসের তালিকা</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todayClasses.map((cls, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{cls.time}</span>
                    <Badge variant="outline">{cls.type}</Badge>
                  </div>
                  <Badge 
                    variant={cls.status === 'confirmed' ? 'default' : 'secondary'}
                  >
                    {cls.status === 'confirmed' ? 'নিশ্চিত' : 'অপেক্ষমাণ'}
                  </Badge>
                </div>
                <h4 className="font-medium">{cls.subject}</h4>
                <p className="text-sm text-muted-foreground">ছাত্র: {cls.student}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">সময়কাল: {cls.duration}</span>
                  <Button variant="outline" size="sm">
                    ক্লাস শুরু করুন
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Student Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>ছাত্র-ছাত্রীদের পারফরমেন্স</span>
            </CardTitle>
            <CardDescription>আপনার ছাত্র-ছাত্রীদের সাম্প্রতিক অগ্রগতি</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {students.map((student, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {student.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium">{student.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {student.class} • {student.subject}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold">{student.performance}%</span>
                  {student.status === 'excellent' && <CheckCircle className="w-4 h-4 text-success" />}
                  {student.status === 'needs_attention' && <AlertTriangle className="w-4 h-4 text-warning" />}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Tools */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>সাম্প্রতিক কার্যক্রম</CardTitle>
            <CardDescription>আপনার সাম্প্রতিক শিক্ষকতা সংক্রান্ত কার্যকলাপ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <Star className="w-5 h-5 text-warning fill-current" />
              <div className="flex-1">
                <p className="font-medium">সারা খাতুন আপনাকে ৫ স্টার রেটিং দিয়েছে</p>
                <p className="text-sm text-muted-foreground">২ ঘন্টা আগে</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <CheckCircle className="w-5 h-5 text-success" />
              <div className="flex-1">
                <p className="font-medium">গণিত ক্লাস সফলভাবে সম্পন্ন</p>
                <p className="text-sm text-muted-foreground">৫ ঘন্টা আগে</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <BookOpen className="w-5 h-5 text-info" />
              <div className="flex-1">
                <p className="font-medium">নতুন অ্যাসাইনমেন্ট তৈরি করেছেন</p>
                <p className="text-sm text-muted-foreground">১ দিন আগে</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>শিক্ষকতার টুলস</CardTitle>
            <CardDescription>আপনার শিক্ষকতার কাজে সহায়ক টুলসমূহ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <BookOpen className="w-4 h-4 mr-2" />
              ক্লাস জেনারেটর
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <CheckCircle className="w-4 h-4 mr-2" />
              অ্যাসাইনমেন্ট অটো-চেক
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              পারফরমেন্স অ্যানালিটিক্স
            </Button>
            
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              ছাত্রদের সমস্যা AI বিশ্লেষণ
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}