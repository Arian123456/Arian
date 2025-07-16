import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Search,
  CreditCard,
  TrendingUp,
  Clock,
  Star,
  BookOpen,
  Calendar,
  Bell,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react';

export function GuardianDashboard() {
  const children = [
    {
      name: "সারা খাতুন",
      class: "ক্লাস ১০",
      activeTutors: 2,
      nextClass: "আজ ২:ৃ০ PM",
      progress: 78,
      performance: "ভালো"
    },
    {
      name: "রহিম উদ্দিন", 
      class: "ক্লাস ৮",
      activeTutors: 1,
      nextClass: "কাল ৪:০০ PM",
      progress: 65,
      performance: "উন্নতি প্রয়োজন"
    }
  ];

  const suggestedTutors = [
    {
      name: "করিম স্যার",
      subject: "গণিত",
      rating: 4.8,
      experience: "৫ বছর",
      price: "৮০০৳/ঘন্টা",
      area: "ধানমন্ডি",
      rebookRate: 95,
      badge: "সেরা পছন্দ"
    },
    {
      name: "ফাতিমা ম্যাডাম",
      subject: "ইংরেজি", 
      rating: 4.9,
      experience: "৭ বছর",
      price: "১০০০৳/ঘন্টা",
      area: "গুলশান",
      rebookRate: 92,
      badge: "AI সুপারিশ"
    }
  ];

  const recentPayments = [
    { tutor: "করিম স্যার", amount: "৬,৪০০৳", date: "১৫ ডিসেম্বর", status: "সম্পন্ন" },
    { tutor: "সালমা ম্যাডাম", amount: "৪,৮০০৳", date: "১০ ডিসেম্বর", status: "সম্পন্ন" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">স্বাগতম, মিসেস রহমান!</h1>
        <p className="text-white/80">আপনার ২ সন্তানের জন্য ৩ জন শিক্ষক সক্রিয়ভাবে কাজ করছেন।</p>
        <div className="mt-4">
          <Button variant="secondary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            নতুন শিক্ষক খুঁজুন
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">সন্তানের সংখ্যা</p>
                <p className="text-2xl font-bold">২</p>
              </div>
              <Users className="w-8 h-8 text-primary" />
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
                <p className="text-muted-foreground text-sm">এ মাসের খরচ</p>
                <p className="text-2xl font-bold">১৮,৫০০৳</p>
              </div>
              <CreditCard className="w-8 h-8 text-success" />
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

      {/* Children Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="w-5 h-5" />
            <span>সন্তানদের অগ্রগতি</span>
          </CardTitle>
          <CardDescription>আপনার সন্তানদের শিক্ষাগত অগ্রগতির সামগ্রিক চিত্র</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            {children.map((child, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {child.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{child.name}</h3>
                      <p className="text-sm text-muted-foreground">{child.class}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={child.performance === "ভালো" ? "default" : "secondary"}
                  >
                    {child.performance}
                  </Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>সামগ্রিক অগ্রগতি</span>
                    <span>{child.progress}%</span>
                  </div>
                  <Progress value={child.progress} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">সক্রিয় শিক্ষক</p>
                    <p className="font-semibold">{child.activeTutors} জন</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">পরবর্তী ক্লাস</p>
                    <p className="font-semibold">{child.nextClass}</p>
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full">
                  বিস্তারিত দেখুন
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* AI Suggested Tutors */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Search className="w-5 h-5" />
              <span>AI সুপারিশকৃত শিক্ষক</span>
            </CardTitle>
            <CardDescription>আপনার সন্তানদের জন্য সবচেয়ে উপযুক্ত শিক্ষকগণ</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {suggestedTutors.map((tutor, index) => (
              <div key={index} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {tutor.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{tutor.name}</h4>
                      <p className="text-sm text-muted-foreground">{tutor.subject}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{tutor.badge}</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-1">
                      <Star className="w-3 h-3 text-warning fill-current" />
                      <span>{tutor.rating}</span>
                    </div>
                    <p className="text-muted-foreground">{tutor.experience} অভিজ্ঞতা</p>
                  </div>
                  <div className="space-y-1">
                    <p className="font-semibold">{tutor.price}</p>
                    <p className="text-muted-foreground">{tutor.area}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-success">
                    {tutor.rebookRate}% রিবুকিং রেট
                  </span>
                  <Button variant="outline" size="sm">
                    যোগাযোগ করুন
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Payment History & Alerts */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>সাম্প্রতিক পেমেন্ট</span>
              </CardTitle>
              <CardDescription>আপনার সাম্প্রতিক শিক্ষক ফি পরিশোধের ইতিহাস</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentPayments.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium">{payment.tutor}</p>
                    <p className="text-sm text-muted-foreground">{payment.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{payment.amount}</p>
                    <Badge variant="outline" className="text-xs">
                      {payment.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" size="sm" className="w-full">
                সব পেমেন্ট দেখুন
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Bell className="w-5 h-5" />
                <span>গুরুত্বপূর্ণ সতর্কতা</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-warning" />
                <div className="flex-1">
                  <p className="font-medium">রহিম উদ্দিন গতকাল ক্লাস মিস করেছে</p>
                  <p className="text-sm text-muted-foreground">শিক্ষকের সাথে যোগাযোগ করুন</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success" />
                <div className="flex-1">
                  <p className="font-medium">সারার গণিতে ভালো উন্নতি হয়েছে</p>
                  <p className="text-sm text-muted-foreground">করিম স্যারকে ধন্যবাদ জানান</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}