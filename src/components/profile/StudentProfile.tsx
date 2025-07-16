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
  ChevronRight
} from 'lucide-react';

export function StudentProfile() {
  const [activeTab, setActiveTab] = useState('activity');

  const studentData = {
    name: "সারা খাতুন",
    title: "শিক্ষার্থী | একাদশ শ্রেণী | বিজ্ঞান",
    school: "ঢাকা কলেজ",
    location: "ঢাকা, বাংলাদেশ",
    connections: "১২+ সহপাঠী",
    profileViews: 45,
    searchAppearances: 8,
    postImpressions: 0
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
              <AvatarFallback className="text-2xl">সখ</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{studentData.name}</h1>
                  <p className="text-muted-foreground">{studentData.title}</p>
                  <p className="text-sm text-muted-foreground">{studentData.school} • {studentData.location}</p>
                  <p className="text-sm text-primary font-medium mt-1">{studentData.connections}</p>
                </div>
                <Button variant="outline" size="sm">
                  <Edit className="w-4 h-4 mr-2" />
                  প্রোফাইল এডিট করুন
                </Button>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button variant="default">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  বার্তা পাঠান
                </Button>
                <Button variant="outline">
                  আরো দেখুন
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            অ্যানালিটিক্স
            <span className="text-sm text-muted-foreground font-normal">• শুধুমাত্র আপনার জন্য</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <Eye className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">{studentData.profileViews} প্রোফাইল ভিউ</p>
                <p className="text-sm text-muted-foreground">কে আপনার প্রোফাইল দেখেছে তা জানুন।</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">{studentData.postImpressions} পোস্ট ইমপ্রেশন</p>
                <p className="text-sm text-muted-foreground">ইংগেজমেন্ট বাড়ানোর জন্য পোস্ট করুন।</p>
                <p className="text-xs text-muted-foreground">গত ৭ দিন</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">{studentData.searchAppearances} সার্চে দেখা গেছে</p>
                <p className="text-sm text-muted-foreground">কতবার সার্চে আপনি এসেছেন তা দেখুন।</p>
              </div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full">
            সব অ্যানালিটিক্স দেখুন
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
            আমি সারা খাতুন, একাদশ শ্রেণীর একজন বিজ্ঞানের ছাত্রী। আমি গণিত এবং পদার্থবিজ্ঞানে অধিক দক্ষতা অর্জনের জন্য 
            শিক্ষাবন্ধু প্ল্যাটফর্মে যুক্ত হয়েছি। আমার লক্ষ্য হল মেডিকেল ভর্তি পরীক্ষায় ভালো ফলাফল করা।
          </p>
        </CardContent>
      </Card>

      {/* Activity & Academic Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>কার্যকলাপ</CardTitle>
              <p className="text-sm text-primary">{studentData.connections}</p>
            </div>
            <Button variant="outline" size="sm">
              পোস্ট তৈরি করুন
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>সখ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">সারা খাতুন</span> একটি পোস্টে মন্তব্য করেছেন • ১ মাস
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  অসাধারণ! এই গণিতের সমাধানটি খুবই সহজ করে বুঝিয়েছেন। ধন্যবাদ স্যার! 🙏
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>সখ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">সারা খাতুন</span> একটি পোস্টে মন্তব্য করেছেন • ১ মাস
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  পদার্থবিজ্ঞানের এই অধ্যায়টি অনেক কঠিন লাগছিল, এখন অনেক সহজ মনে হচ্ছে।
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              সব মন্তব্য দেখুন
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Academic Progress */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              একাডেমিক অগ্রগতি
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">গণিত</span>
                <Badge variant="secondary">৮৫%</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">পদার্থবিজ্ঞান</span>
                <Badge variant="secondary">৭৮%</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">রসায়ন</span>
                <Badge variant="secondary">৯২%</Badge>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              বিস্তারিত রিপোর্ট দেখুন
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Current Subjects & Skills */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            বর্তমান বিষয়সমূহ
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">বিজ্ঞান বিভাগ</h4>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">উচ্চতর গণিত ও পদার্থবিজ্ঞান</p>
                  <p className="text-sm text-muted-foreground">
                    ক্যালকুলাস, ভেক্টর, স্থিতিবিদ্যা এবং গতিবিদ্যার উপর বিশেষ ফোকাস
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">রসায়ন</h4>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">জৈব ও অজৈব রসায়ন</p>
                  <p className="text-sm text-muted-foreground">
                    রাসায়নিক বন্ধন, জৈব যৌগ এবং তাদের বিক্রিয়া
                  </p>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              সব বিষয় দেখুন (৬টি)
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Learning Goals */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            লার্নিং গোল
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">মেডিকেল ভর্তি প্রস্তুতি</p>
                <p className="text-sm text-muted-foreground">
                  ঢাকা মেডিকেল কলেজে ভর্তির জন্য প্রস্তুতি নিচ্ছি। লক্ষ্য: টপ ১০০ এ থাকা
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">টার্গেট: ডিসেম্বর ২০২৪</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Tutors */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            বর্তমান শিক্ষকগণ
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
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
                  <p className="font-medium">করিম স্যার</p>
                  <p className="text-sm text-muted-foreground">গণিত শিক্ষক • ৫ বছরের অভিজ্ঞতা</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">৪.৮ (১২৫ রিভিউ)</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                বার্তা
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>রহস</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">রহিমা ম্যাডাম</p>
                  <p className="text-sm text-muted-foreground">পদার্থবিজ্ঞান শিক্ষক • ৮ বছরের অভিজ্ঞতা</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">৪.৯ (৮৯ রিভিউ)</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                বার্তা
              </Button>
            </div>

            <Button variant="outline" className="w-full">
              সব শিক্ষক দেখুন
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}