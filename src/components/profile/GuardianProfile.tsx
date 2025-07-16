import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { 
  Edit, 
  MapPin, 
  Calendar, 
  BookOpen, 
  Target, 
  Award, 
  TrendingUp,
  MessageSquare,
  Star,
  Eye,
  BarChart3,
  Users,
  Clock,
  ChevronRight,
  UserPlus,
  Search,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Phone,
  Mail
} from 'lucide-react';

export function GuardianProfile() {
  const [activeTab, setActiveTab] = useState('children');

  const guardianData = {
    name: "মিসেস নাসরিন রহমান",
    title: "অভিভাবক | দুই সন্তানের মা",
    profession: "ব্যাংক ম্যানেজার, ইসলামী ব্যাংক",
    location: "গুলশান, ঢাকা",
    connections: "৮৫+ অভিভাবক নেটওয়ার্ক",
    profileViews: 67,
    searchAppearances: 12,
    children: 2,
    activeTutors: 4
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <Card className="relative overflow-hidden">
        <div className="h-32 bg-gradient-primary"></div>
        <CardContent className="pt-0 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 relative z-10">
            <Avatar className="w-32 h-32 border-4 border-background">
              <AvatarImage src="/placeholder.svg" />
              <AvatarFallback className="text-2xl">নর</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{guardianData.name}</h1>
                  <p className="text-muted-foreground">{guardianData.title}</p>
                  <p className="text-sm text-muted-foreground">{guardianData.profession}</p>
                  <p className="text-sm text-muted-foreground">{guardianData.location}</p>
                  <p className="text-sm text-primary font-medium mt-1">{guardianData.connections}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{guardianData.children} সন্তান</Badge>
                    <Badge variant="outline">{guardianData.activeTutors} সক্রিয় শিক্ষক</Badge>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  প্রোফাইল এডিট করুন
                </Button>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="default">
                  <Search className="w-4 h-4 mr-2" />
                  শিক্ষক খুঁজুন
                </Button>
                <Button variant="outline">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  বার্তা
                </Button>
                <Button variant="outline">
                  আরো দেখুন
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guardian Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            অভিভাবক অ্যানালিটিক্স
            <span className="text-sm text-muted-foreground font-normal">• শুধুমাত্র আপনার জন্য</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Eye className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">{guardianData.profileViews} প্রোফাইল ভিউ</p>
                <p className="text-sm text-muted-foreground">এই মাসে</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">{guardianData.children} সন্তান</p>
                <p className="text-sm text-muted-foreground">শিক্ষা নিচ্ছে</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">{guardianData.activeTutors} সক্রিয় শিক্ষক</p>
                <p className="text-sm text-muted-foreground">বর্তমানে</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">৯৫% সন্তুষ্টি</p>
                <p className="text-sm text-muted-foreground">শিক্ষকদের সাথে</p>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">
            বিস্তারিত অ্যানালিটিক্স দেখুন
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </CardContent>
      </Card>

      {/* About Section */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>আমার সম্পর্কে</CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            আমি নাসরিন রহমান, দুই সন্তানের মা এবং একজন ব্যাংক ম্যানেজার। আমার সন্তানদের শিক্ষার মান নিশ্চিত করতে 
            আমি শিক্ষাবন্ধু প্ল্যাটফর্মের সাথে যুক্ত। আমি বিশ্বাস করি যে সঠিক শিক্ষক পেলে যেকোনো শিশু তার সম্ভাবনা 
            পূর্ণভাবে বিকশিত করতে পারে। আমার লক্ষ্য হল আমার সন্তানদের ভবিষ্যৎ উজ্জ্বল করা।
          </p>
        </CardContent>
      </Card>

      {/* Children Information & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Children Information */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              সন্তানদের তথ্য
            </CardTitle>
            <Button variant="ghost" size="sm">
              <UserPlus className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback>আর</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">আরিফা রহমান</p>
                <p className="text-sm text-muted-foreground">একাদশ শ্রেণী • বিজ্ঞান বিভাগ</p>
                <p className="text-sm text-muted-foreground">ঢাকা কলেজ</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">গণিত - ৮৫%</Badge>
                  <Badge variant="secondary">পদার্থ - ৯০%</Badge>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm">
                    প্রগ্রেস দেখুন
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <Avatar className="w-12 h-12">
                <AvatarFallback>তা</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">তাহমিদ রহমান</p>
                <p className="text-sm text-muted-foreground">অষ্টম শ্রেণী</p>
                <p className="text-sm text-muted-foreground">আইডিয়াল স্কুল</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary">ইংরেজি - ৭৮%</Badge>
                  <Badge variant="secondary">গণিত - ৮২%</Badge>
                </div>
                <div className="flex gap-2 mt-2">
                  <Button variant="outline" size="sm">
                    প্রগ্রেস দেখুন
                  </Button>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              সব সন্তানের তথ্য দেখুন
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>সাম্প্রতিক কার্যকলাপ</CardTitle>
              <p className="text-sm text-primary">{guardianData.connections}</p>
            </div>
            <Button variant="outline" size="sm">
              পোস্ট তৈরি করুন
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>নর</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">নাসরিন রহমান</span> করিম স্যারকে ৫ স্টার রিভিউ দিয়েছেন • ২ দিন
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  "অসাধারণ শিক্ষক! আমার মেয়ের গণিতে দুর্দান্ত উন্নতি হয়েছে।"
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>নর</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">নাসরিন রহমান</span> একটি পোস্টে মন্তব্য করেছেন • ১ সপ্তাহ
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  অভিভাবকদের জন্য খুবই গুরুত্বপূর্ণ টিপস। ধন্যবাদ শেয়ার করার জন্য।
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              সব কার্যকলাপ দেখুন
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Current Tutors */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            বর্তমান শিক্ষকগণ
          </CardTitle>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            নতুন শিক্ষক খুঁজুন
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>করস</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">মোঃ করিম উদ্দিন</p>
                  <p className="text-sm text-muted-foreground">গণিত ও পদার্থবিজ্ঞান • আরিফার জন্য</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">৪.৯ (১২৫ রিভিউ)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  বার্তা
                </Button>
                <Button variant="outline" size="sm">
                  রিভিউ দিন
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>রহম</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">রহিমা খাতুন</p>
                  <p className="text-sm text-muted-foreground">পদার্থবিজ্ঞান ও রসায়ন • আরিফার জন্য</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">৪.৮ (৮৯ রিভিউ)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  বার্তা
                </Button>
                <Button variant="outline" size="sm">
                  রিভিউ দিন
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>শা</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">শাহিনুর রহমান</p>
                  <p className="text-sm text-muted-foreground">ইংরেজি ও গণিত • তাহমিদের জন্য</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">৪.৭ (৬৭ রিভিউ)</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  বার্তা
                </Button>
                <Button variant="outline" size="sm">
                  রিভিউ দিন
                </Button>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              সব শিক্ষক দেখুন
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Payment History & Educational Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment History */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              পেমেন্ট হিস্ট্রি
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Eye className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">করিম স্যার - গণিত ক্লাস</p>
                <p className="text-sm text-muted-foreground">আরিফার জন্য • ১৫ ডিসেম্বর</p>
              </div>
              <div className="text-right">
                <p className="font-medium">৳৫,০০০</p>
                <Badge variant="secondary">পেইড</Badge>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">রহিমা ম্যাডাম - পদার্থবিজ্ঞান</p>
                <p className="text-sm text-muted-foreground">আরিফার জন্য • ১০ ডিসেম্বর</p>
              </div>
              <div className="text-right">
                <p className="font-medium">৳৪,৫০০</p>
                <Badge variant="secondary">পেইড</Badge>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">শাহিনুর স্যার - ইংরেজি</p>
                <p className="text-sm text-muted-foreground">তাহমিদের জন্য • ৮ ডিসেম্বর</p>
              </div>
              <div className="text-right">
                <p className="font-medium">৳৩,০০০</p>
                <Badge variant="secondary">পেইড</Badge>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              সব পেমেন্ট দেখুন
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Educational Goals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              শিক্ষার লক্ষ্য
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>আর</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">আরিফার লক্ষ্য</p>
                <p className="text-sm text-muted-foreground">
                  মেডিকেল কলেজে ভর্তি - ঢাকা মেডিকেল কলেজ লক্ষ্য
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">টার্গেট: ডিসেম্বর ২০২৪</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">৭৫% প্রস্তুতি সম্পন্ন</p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>তা</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="font-medium">তাহমিদের লক্ষ্য</p>
                <p className="text-sm text-muted-foreground">
                  বৃত্তি পরীক্ষায় ভালো ফলাফল এবং ভালো স্কুলে ভর্তি
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">টার্গেট: মার্চ ২০২৫</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 mt-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">৬০% প্রস্তুতি সম্পন্ন</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Phone className="w-5 h-5" />
            যোগাযোগের তথ্য
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">মোবাইল</p>
                <p className="text-sm text-muted-foreground">+৮৮০ ১৭১২-৩৪৫৬৭৮</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">ইমেইল</p>
                <p className="text-sm text-muted-foreground">nasrin.rahman@email.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">ঠিকানা</p>
                <p className="text-sm text-muted-foreground">হাউস ২৩, রোড ১২, গুলশান-১, ঢাকা</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="font-medium">জরুরি যোগাযোগ</p>
                <p className="text-sm text-muted-foreground">+৮৮০ ১৯১২-৩৪৫৬৭৮</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}