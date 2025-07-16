import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { 
  Search as SearchIcon, 
  Filter, 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  BookOpen, 
  MessageSquare,
  Heart,
  Share2,
  Play,
  CheckCircle,
  Shield,
  Mic,
  X,
  SlidersHorizontal,
  TrendingUp,
  Calendar,
  DollarSign,
  UserCheck,
  Target
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export function Search() {
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('tutors');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    subject: '',
    class: '',
    medium: '',
    gender: '',
    mode: '',
    experience: '',
    rating: '',
    location: '',
    feeRange: [1000, 10000],
    timeSlot: '',
    verified: false,
    demoAvailable: false
  });

  const subjects = [
    'গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 'ইংরেজি', 
    'বাংলা', 'ইতিহাস', 'ভূগোল', 'অর্থনীতি', 'পরিসংখ্যান'
  ];

  const classes = [
    'ষষ্ঠ শ্রেণী', 'সপ্তম শ্রেণী', 'অষ্টম শ্রেণী', 'নবম শ্রেণী', 'দশম শ্রেণী',
    'একাদশ শ্রেণী', 'দ্বাদশ শ্রেণী', 'ভর্তি প্রস্তুতি', 'বিশ্ববিদ্যালয়'
  ];

  const areas = [
    'ধানমন্ডি', 'গুলশান', 'বনানী', 'উত্তরা', 'মিরপুর', 'মোহাম্মদপুর',
    'রমনা', 'ওয়ারী', 'পুরান ঢাকা', 'নিউ মার্কেট', 'ফার্মগেট'
  ];

  const mockTutors = [
    {
      id: 1,
      name: 'মোঃ করিম উদ্দিন',
      subjects: ['গণিত', 'পদার্থবিজ্ঞান'],
      classes: ['নবম-দ্বাদশ শ্রেণী'],
      area: 'ধানমন্ডি',
      experience: '৮ বছর',
      rating: 4.9,
      reviews: 125,
      rebookingRate: 98,
      successRate: 97,
      demoAvailable: true,
      verified: true,
      policeVerified: true,
      fee: '৫,০০০-৮,০০০',
      specializations: ['ভর্তি প্রস্তুতি', 'দুর্বল ছাত্রদের জন্য']
    },
    {
      id: 2,
      name: 'রহিমা খাতুন',
      subjects: ['রসায়ন', 'জীববিজ্ঞান'],
      classes: ['একাদশ-দ্বাদশ শ্রেণী'],
      area: 'গুলশান',
      experience: '৬ বছর',
      rating: 4.8,
      reviews: 89,
      rebookingRate: 95,
      successRate: 96,
      demoAvailable: true,
      verified: true,
      policeVerified: false,
      fee: '৪,৫০০-৭,০০০',
      specializations: ['মেডিকেল ভর্তি']
    },
    {
      id: 3,
      name: 'শাহিনুর রহমান',
      subjects: ['ইংরেজি', 'গণিত'],
      classes: ['ষষ্ঠ-অষ্টম শ্রেণী'],
      area: 'উত্তরা',
      experience: '৪ বছর',
      rating: 4.7,
      reviews: 67,
      rebookingRate: 92,
      successRate: 94,
      demoAvailable: false,
      verified: true,
      policeVerified: true,
      fee: '৩,০০০-৫,০০০',
      specializations: ['প্রাথমিক শিক্ষা']
    }
  ];

  const mockTuitionPosts = [
    {
      id: 1,
      guardianName: 'গার্ডিয়ান ১২৩৪',
      subject: 'গণিত',
      class: 'দশম শ্রেণী',
      area: 'ধানমন্ডি',
      preferredTime: 'সন্ধ্যা ৬-৮টা',
      expectedFee: '৫,০০০',
      verified: true,
      mode: 'অনলাইন/অফলাইন উভয়',
      duration: '৩ মাস'
    },
    {
      id: 2,
      guardianName: 'ভেরিফাইড গার্ডিয়ান',
      subject: 'পদার্থবিজ্ঞান ও রসায়ন',
      class: 'একাদশ শ্রেণী',
      area: 'গুলশান',
      preferredTime: 'বিকাল ৪-৬টা',
      expectedFee: '৬,০০০',
      verified: true,
      mode: 'ইন-পার্সন',
      duration: '৬ মাস'
    }
  ];

  const recentSearches = [
    'গণিত শিক্ষক ধানমন্ডি',
    'পদার্থবিজ্ঞান দশম শ্রেণী',
    'ইংরেজি টিউটর গুলশান'
  ];

  const suggestedSearches = [
    'মেডিকেল ভর্তি প্রস্তুতি',
    'ইঞ্জিনিয়ারিং ভর্তি কোচিং',
    'দুর্বল ছাত্রদের জন্য বিশেষ ক্লাস',
    'অনলাইন গণিত টিউটর'
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Search Header */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              placeholder="শিক্ষক, বিষয়, এলাকা বা যেকোনো কিছু খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-12 h-12 text-lg"
            />
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Mic className="w-5 h-5" />
            </Button>
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="h-12 px-6 bg-black text-white hover:bg-gray-800"
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            ফিল্টার
          </Button>
        </div>

        {/* AI Suggestions */}
        {searchQuery && (
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <h4 className="font-medium mb-2">AI সাজেশন:</h4>
              <div className="flex flex-wrap gap-2">
                {suggestedSearches.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(suggestion)}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Searches */}
        {!searchQuery && (
          <Card>
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">সাম্প্রতিক খোঁজ:</h4>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setSearchQuery(search)}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    {search}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>উন্নত ফিল্টার</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFilters(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Subject Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">বিষয়</label>
                <Select value={selectedFilters.subject} onValueChange={(value) => 
                  setSelectedFilters(prev => ({ ...prev, subject: value }))
                }>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {subjects.map(subject => (
                      <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Class Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">শ্রেণী</label>
                <Select value={selectedFilters.class} onValueChange={(value) => 
                  setSelectedFilters(prev => ({ ...prev, class: value }))
                }>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="শ্রেণী নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Location Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">এলাকা</label>
                <Select value={selectedFilters.location} onValueChange={(value) => 
                  setSelectedFilters(prev => ({ ...prev, location: value }))
                }>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="এলাকা নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    {areas.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Medium Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">মাধ্যম</label>
                <Select value={selectedFilters.medium} onValueChange={(value) => 
                  setSelectedFilters(prev => ({ ...prev, medium: value }))
                }>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="মাধ্যম নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="bangla">বাংলা</SelectItem>
                    <SelectItem value="english">ইংরেজি</SelectItem>
                    <SelectItem value="both">উভয়</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Gender Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">লিঙ্গ</label>
                <Select value={selectedFilters.gender} onValueChange={(value) => 
                  setSelectedFilters(prev => ({ ...prev, gender: value }))
                }>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="লিঙ্গ নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="male">পুরুষ</SelectItem>
                    <SelectItem value="female">মহিলা</SelectItem>
                    <SelectItem value="any">যেকোনো</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mode Filter */}
              <div className="space-y-2">
                <label className="text-sm font-medium">পদ্ধতি</label>
                <Select value={selectedFilters.mode} onValueChange={(value) => 
                  setSelectedFilters(prev => ({ ...prev, mode: value }))
                }>
                  <SelectTrigger className="bg-background">
                    <SelectValue placeholder="পদ্ধতি নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border shadow-lg z-50">
                    <SelectItem value="online">অনলাইন</SelectItem>
                    <SelectItem value="offline">ইন-পার্সন</SelectItem>
                    <SelectItem value="both">উভয়</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fee Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium">ফি রেঞ্জ: ৳{selectedFilters.feeRange[0]} - ৳{selectedFilters.feeRange[1]}</label>
              <Slider
                value={selectedFilters.feeRange}
                onValueChange={(value) => setSelectedFilters(prev => ({ ...prev, feeRange: value }))}
                max={15000}
                min={1000}
                step={500}
                className="w-full"
              />
            </div>

            {/* Checkboxes */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="verified"
                  checked={selectedFilters.verified}
                  onCheckedChange={(checked) => 
                    setSelectedFilters(prev => ({ ...prev, verified: checked as boolean }))
                  }
                />
                <label htmlFor="verified" className="text-sm">শুধু ভেরিফাইড শিক্ষক</label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="demo"
                  checked={selectedFilters.demoAvailable}
                  onCheckedChange={(checked) => 
                    setSelectedFilters(prev => ({ ...prev, demoAvailable: checked as boolean }))
                  }
                />
                <label htmlFor="demo" className="text-sm">ডেমো ক্লাস আছে</label>
              </div>
            </div>

            <div className="flex gap-2">
              <Button className="bg-black text-white hover:bg-gray-800">
                ফিল্টার প্রয়োগ করুন
              </Button>
              <Button variant="outline" className="bg-black text-white hover:bg-gray-800">
                রিসেট করুন
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search Results Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          {profile?.role === 'tutor' ? (
            <>
              <TabsTrigger value="tuitions" className="flex-1">টিউশন পোস্ট</TabsTrigger>
              <TabsTrigger value="tutors" className="flex-1">অন্যান্য শিক্ষক</TabsTrigger>
            </>
          ) : (
            <>
              <TabsTrigger value="tutors" className="flex-1">শিক্ষকগণ</TabsTrigger>
              <TabsTrigger value="subjects" className="flex-1">বিষয়</TabsTrigger>
              <TabsTrigger value="locations" className="flex-1">এলাকা</TabsTrigger>
            </>
          )}
        </TabsList>

        {/* Tutors Results */}
        <TabsContent value="tutors" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">{mockTutors.length}টি শিক্ষক পাওয়া গেছে</p>
            <Select defaultValue="rating">
              <SelectTrigger className="w-48 bg-background">
                <SelectValue placeholder="সাজান" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="rating">রেটিং অনুযায়ী</SelectItem>
                <SelectItem value="experience">অভিজ্ঞতা অনুযায়ী</SelectItem>
                <SelectItem value="fee">ফি অনুযায়ী</SelectItem>
                <SelectItem value="success">সাফল্যের হার অনুযায়ী</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockTutors.map((tutor) => (
              <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarFallback className="text-lg">{tutor.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 space-y-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-lg">{tutor.name}</h3>
                          {tutor.verified && (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          )}
                          {tutor.policeVerified && (
                            <Shield className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mt-2">
                          {tutor.subjects.map(subject => (
                            <Badge key={subject} variant="secondary">{subject}</Badge>
                          ))}
                        </div>
                        
                        <p className="text-sm text-muted-foreground mt-1">
                          {tutor.classes.join(', ')} • {tutor.area}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{tutor.rating}</span>
                          <span className="text-muted-foreground">({tutor.reviews})</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-primary" />
                          <span>{tutor.rebookingRate}% পুনরায় বুকিং</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Target className="w-4 h-4 text-green-600" />
                          <span>{tutor.successRate}% সাফল্যের হার</span>
                        </div>
                        
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4 text-blue-600" />
                          <span>{tutor.experience} অভিজ্ঞতা</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {tutor.specializations.map(spec => (
                          <Badge key={spec} variant="outline" className="text-xs">{spec}</Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <p className="font-medium">৳{tutor.fee}</p>
                          <p className="text-xs text-muted-foreground">মাসিক ফি</p>
                        </div>
                        
                        <div className="flex gap-2">
                          {tutor.demoAvailable && (
                            <Button size="sm" className="bg-black text-white hover:bg-gray-800">
                              <Play className="w-4 h-4 mr-1" />
                              ডেমো বুক করুন
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="bg-black text-white hover:bg-gray-800">
                            <MessageSquare className="w-4 h-4 mr-1" />
                            বার্তা
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Heart className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Tuition Posts Results (For Tutors) */}
        <TabsContent value="tuitions" className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">{mockTuitionPosts.length}টি টিউশন পোস্ট পাওয়া গেছে</p>
            <Select defaultValue="recent">
              <SelectTrigger className="w-48 bg-background">
                <SelectValue placeholder="সাজান" />
              </SelectTrigger>
              <SelectContent className="bg-background border shadow-lg z-50">
                <SelectItem value="recent">সাম্প্রতিক</SelectItem>
                <SelectItem value="fee">ফি অনুযায়ী</SelectItem>
                <SelectItem value="location">এলাকা অনুযায়ী</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            {mockTuitionPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{post.guardianName}</h3>
                        {post.verified && (
                          <CheckCircle className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">বিষয় ও শ্রেণী</p>
                          <p className="font-medium">{post.subject} - {post.class}</p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">এলাকা</p>
                          <p className="font-medium flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {post.area}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">সময়</p>
                          <p className="font-medium flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.preferredTime}
                          </p>
                        </div>
                        
                        <div>
                          <p className="text-sm text-muted-foreground">প্রত্যাশিত ফি</p>
                          <p className="font-medium flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            ৳{post.expectedFee}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{post.mode}</Badge>
                        <Badge variant="outline">{post.duration}</Badge>
                        {post.verified && (
                          <Badge variant="default">ভেরিফাইড গার্ডিয়ান</Badge>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button className="bg-black text-white hover:bg-gray-800">
                        আবেদন করুন
                      </Button>
                      <Button variant="outline" size="sm" className="bg-black text-white hover:bg-gray-800">
                        <MessageSquare className="w-4 h-4 mr-1" />
                        বার্তা
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Subjects Tab */}
        <TabsContent value="subjects" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {subjects.map((subject) => (
              <Card key={subject} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <BookOpen className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-medium">{subject}</h3>
                  <p className="text-sm text-muted-foreground">৫০+ শিক্ষক</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Locations Tab */}
        <TabsContent value="locations" className="space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {areas.map((area) => (
              <Card key={area} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-4 text-center">
                  <MapPin className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <h3 className="font-medium">{area}</h3>
                  <p className="text-sm text-muted-foreground">২০+ শিক্ষক</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Floating Help Button */}
      <Button
        className="fixed bottom-6 right-6 rounded-full w-14 h-14 bg-black text-white hover:bg-gray-800 shadow-lg"
        size="lg"
      >
        <MessageSquare className="w-6 h-6" />
      </Button>
    </div>
  );
}

export default Search;