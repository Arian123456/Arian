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
  Award, 
  TrendingUp,
  MessageSquare,
  Star,
  Eye,
  BarChart3,
  Users,
  Clock,
  ChevronRight,
  GraduationCap,
  Briefcase,
  FileText,
  DollarSign,
  CheckCircle
} from 'lucide-react';

export function TutorProfile() {
  const [activeTab, setActiveTab] = useState('activity');

  const tutorData = {
    name: "মোঃ করিম উদ্দিন",
    title: "গণিত ও পদার্থবিজ্ঞান শিক্ষক | বুয়েট গ্র্যাজুয়েট",
    company: "শিক্ষাবন্ধু প্ল্যাটফর্ম",
    location: "ঢাকা, বাংলাদেশ",
    connections: "৫০০+ কানেকশন",
    experience: "৮ বছর",
    profileViews: 156,
    searchAppearances: 23,
    studentsOnline: 45,
    rating: 4.9,
    totalReviews: 125
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
              <AvatarFallback className="text-2xl">করু</AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold">{tutorData.name}</h1>
                  <p className="text-muted-foreground">{tutorData.title}</p>
                  <p className="text-sm text-muted-foreground">{tutorData.company} • {tutorData.location}</p>
                  <p className="text-sm text-primary font-medium mt-1">{tutorData.connections}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{tutorData.rating}</span>
                      <span className="text-sm text-muted-foreground">({tutorData.totalReviews} রিভিউ)</span>
                    </div>
                    <Badge variant="secondary">{tutorData.experience} অভিজ্ঞতা</Badge>
                  </div>
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
                  ক্লাস বুক করুন
                </Button>
                <Button variant="outline">
                  আরো দেখুন
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Teacher Analytics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            শিক্ষক অ্যানালিটিক্স
            <span className="text-sm text-muted-foreground font-normal">• শুধুমাত্র আপনার জন্য</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <Eye className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">{tutorData.profileViews} প্রোফাইল ভিউ</p>
                <p className="text-sm text-muted-foreground">এই মাসে</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Users className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">{tutorData.studentsOnline} সক্রিয় ছাত্র</p>
                <p className="text-sm text-muted-foreground">বর্তমানে শিক্ষা নিচ্ছে</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">{tutorData.searchAppearances} সার্চে দেখা</p>
                <p className="text-sm text-muted-foreground">এই সপ্তাহে</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-muted-foreground" />
              <div>
                <p className="font-semibold">৯৮% পুনরায় বুকিং</p>
                <p className="text-sm text-muted-foreground">ছাত্র সন্তুষ্টি</p>
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
            আমি মোঃ করিম উদ্দিন, বুয়েট থেকে ইলেকট্রিক্যাল ইঞ্জিনিয়ারিং এ স্নাতক। গত ৮ বছর যাবৎ গণিত ও পদার্থবিজ্ঞান 
            শেখাচ্ছি। আমার লক্ষ্য হল প্রতিটি ছাত্রছাত্রীকে এই বিষয়গুলোতে দক্ষ করে তোলা এবং তাদের স্বপ্ন পূরণে 
            সহায়তা করা। আমি বিশ্বাস করি যে সঠিক পদ্ধতিতে শেখালে যেকোনো কঠিন বিষয়ও সহজ হয়ে যায়।
          </p>
        </CardContent>
      </Card>

      {/* Experience & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              অভিজ্ঞতা
            </CardTitle>
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">সিনিয়র গণিত শিক্ষক</p>
                <p className="text-sm text-muted-foreground">শিক্ষাবন্ধু প্ল্যাটফর্ম</p>
                <p className="text-sm text-muted-foreground">জানুয়ারি ২০২০ - বর্তমান • ৪ বছর ৮ মাস</p>
                <p className="text-sm text-muted-foreground">ঢাকা, বাংলাদেশ • রিমোট</p>
                <p className="text-sm mt-2">
                  • ৫০০+ ছাত্রছাত্রীকে গণিত ও পদার্থবিজ্ঞান শিখিয়েছি
                  <br />
                  • ৯৮% ছাত্রছাত্রী পরীক্ষায় A+ পেয়েছে
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">গণিত প্রভাষক</p>
                <p className="text-sm text-muted-foreground">আদমজী ক্যান্টনমেন্ট কলেজ</p>
                <p className="text-sm text-muted-foreground">জুন ২০১৬ - ডিসেম্বর ২০১৯ • ৩ বছর ৭ মাস</p>
                <p className="text-sm text-muted-foreground">ঢাকা, বাংলাদেশ</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              সব অভিজ্ঞতা দেখুন
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        {/* Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>কার্যকলাপ</CardTitle>
              <p className="text-sm text-primary">{tutorData.connections}</p>
            </div>
            <Button variant="outline" size="sm">
              পোস্ট তৈরি করুন
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>করু</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">মোঃ করিম উদ্দিন</span> একটি নতুন গণিতের টিপস পোস্ট করেছেন • ২ দিন
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  "গণিতে ভালো করার জন্য প্রতিদিন অন্তত ২ ঘন্টা চর্চা করুন। ছোট ছোট সমস্যা সমাধান করে শুরু করুন।"
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <Avatar className="w-8 h-8">
                <AvatarFallback>করু</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">মোঃ করিম উদ্দিন</span> একটি পোস্টে মন্তব্য করেছেন • ১ সপ্তাহ
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  চমৎকার প্রশ্ন! এভাবেই আরো জানতে চাইলে শেখা এগিয়ে যায়। 👍
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              সব পোস্ট দেখুন
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Education */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            শিক্ষাগত যোগ্যতা
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয় (বুয়েট)</p>
                <p className="text-sm text-muted-foreground">
                  স্নাতক ইঞ্জিনিয়ারিং - ইলেকট্রিক্যাল অ্যান্ড ইলেকট্রনিক ইঞ্জিনিয়ারিং (EEE)
                </p>
                <p className="text-sm text-muted-foreground">জানুয়ারি ২০১২ - ডিসেম্বর ২০১৫</p>
                <p className="text-sm text-muted-foreground mt-2">
                  কার্যক্রম ও সংগঠন: গণিত অলিম্পিয়াড প্রশিক্ষক, বুয়েট ম্যাথ ক্লাব সদস্য
                </p>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">ঢাকা কলেজ</p>
                <p className="text-sm text-muted-foreground">
                  উচ্চ মাধ্যমিক, বিজ্ঞান বিভাগ
                </p>
                <p className="text-sm text-muted-foreground">২০০৯ - ২০১১</p>
                <p className="text-sm text-muted-foreground mt-2">
                  গোল্ডেন A+ (GPA 5.00), বিজ্ঞান অলিম্পিয়াড জাতীয় পর্যায়ে অংশগ্রহণ
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Licenses & Certifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            সার্টিফিকেট ও লাইসেন্স
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">অনলাইন শিক্ষণ সার্টিফিকেট</p>
                <p className="text-sm text-muted-foreground">শিক্ষা মন্ত্রণালয়, বাংলাদেশ</p>
                <p className="text-sm text-muted-foreground">অক্টোবর ২০২১ এ অর্জিত</p>
                <Button variant="outline" size="sm" className="mt-2">
                  সার্টিফিকেট দেখুন
                </Button>
              </div>
            </div>

            <Separator />

            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <p className="font-medium">গণিত অলিম্পিয়াড প্রশিক্ষক সার্টিফিকেট</p>
                <p className="text-sm text-muted-foreground">বাংলাদেশ গাণিতিক অলিম্পিয়াড কমিটি</p>
                <p className="text-sm text-muted-foreground">মার্চ ২০২০ এ অর্জিত</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              সব সার্টিফিকেট দেখুন (৪টি)
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Teaching Skills */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            শিক্ষণ দক্ষতা
          </CardTitle>
          <Button variant="ghost" size="sm">
            <Edit className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-3">
              <h4 className="font-medium">গণিত</h4>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">উচ্চতর গণিত ও বীজগণিত</p>
                  <p className="text-sm text-muted-foreground">
                    ক্যালকুলাস, অ্যালজেব্রা, ট্রিগনোমেট্রি, জ্যামিতি - সকল স্তরে দক্ষ
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">১২৫+ ছাত্র শেখানো</Badge>
                    <Badge variant="secondary">৯৮% সাফল্যের হার</Badge>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-3">
              <h4 className="font-medium">পদার্থবিজ্ঞান</h4>
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">যান্ত্রিক পদার্থবিজ্ঞান ও তড়িৎ</p>
                  <p className="text-sm text-muted-foreground">
                    স্থিতিবিদ্যা, গতিবিদ্যা, তাপ, আলো, চৌম্বক বিষয়ে বিশেষজ্ঞ
                  </p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="secondary">৮০+ ছাত্র শেখানো</Badge>
                    <Badge variant="secondary">৯৫% সাফল্যের হার</Badge>
                  </div>
                </div>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              সব দক্ষতা দেখুন (৮টি)
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}