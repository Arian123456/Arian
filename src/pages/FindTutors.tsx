import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, 
  MapPin, 
  Star, 
  Users, 
  MessageSquare, 
  Heart,
  Video,
  BookOpen,
  CheckCircle,
  Filter,
  Phone,
  Calendar,
  DollarSign
} from "lucide-react";

export default function FindTutors() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  const tutors = [
    {
      id: 1,
      name: "মোহাম্মদ আলী",
      photo: "",
      subjects: ["গণিত", "পদার্থ বিজ্ঞান"],
      classes: ["Class 9", "Class 10", "Class 11"],
      experience: "5 বছর",
      rating: 4.8,
      reviews: 24,
      location: "ঢাকা, ধানমন্ডি",
      mode: ["অনলাইন", "অফলাইন"],
      hourlyRate: 500,
      verified: true,
      demoAvailable: true,
      tags: ["পূর্ণ সময়", "অভিজ্ঞ", "নিয়মিত"]
    },
    {
      id: 2,
      name: "সারা খান",
      photo: "",
      subjects: ["ইংরেজি", "বাংলা"],
      classes: ["Class 6", "Class 7", "Class 8"],
      experience: "3 বছর",
      rating: 4.6,
      reviews: 18,
      location: "চট্টগ্রাম, পাঁচলাইশ",
      mode: ["অনলাইন"],
      hourlyRate: 400,
      verified: true,
      demoAvailable: true,
      tags: ["মহিলা শিক্ষক", "ধৈর্যশীল"]
    },
    {
      id: 3,
      name: "আহমেদ হাসান",
      photo: "",
      subjects: ["রসায়ন", "জীববিজ্ঞান"],
      classes: ["Class 11", "Class 12"],
      experience: "7 বছর",
      rating: 4.9,
      reviews: 35,
      location: "সিলেট, বাগবাড়ী",
      mode: ["অনলাইন", "অফলাইন"],
      hourlyRate: 600,
      verified: true,
      demoAvailable: false,
      tags: ["বিশেষজ্ঞ", "বোর্ড প্রস্তুতি"]
    },
    {
      id: 4,
      name: "ফাতেমা বেগম",
      photo: "",
      subjects: ["গণিত", "পরিসংখ্যান"],
      classes: ["Class 8", "Class 9", "Class 10"],
      experience: "4 বছর",
      rating: 4.7,
      reviews: 22,
      location: "রাজশাহী, পদ্মা",
      mode: ["অনলাইন", "অফলাইন"],
      hourlyRate: 450,
      verified: true,
      demoAvailable: true,
      tags: ["মহিলা শিক্ষক", "সৃজনশীল"]
    }
  ];

  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(tutorId => tutorId !== id)
        : [...prev, id]
    );
  };

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutor.subjects.some(subject => subject.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesClass = !selectedClass || tutor.classes.includes(selectedClass);
    const matchesSubject = !selectedSubject || tutor.subjects.includes(selectedSubject);
    const matchesDistrict = !selectedDistrict || tutor.location.includes(selectedDistrict);
    const matchesMode = !selectedMode || tutor.mode.includes(selectedMode);
    
    return matchesSearch && matchesClass && matchesSubject && matchesDistrict && matchesMode;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">শিক্ষক খুঁজুন</h1>
          <p className="text-muted-foreground">আপনার পছন্দের শিক্ষক খুঁজে নিন</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-1" />
            ফিল্টার
          </Button>
          <Button variant="outline" size="sm">
            <Heart className="w-4 h-4 mr-1" />
            প্রিয় ({favorites.length})
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle>অনুসন্ধান ফিল্টার</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="শিক্ষক বা বিষয় খুঁজুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="শ্রেণি নির্বাচন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Class 6">Class 6</SelectItem>
                <SelectItem value="Class 7">Class 7</SelectItem>
                <SelectItem value="Class 8">Class 8</SelectItem>
                <SelectItem value="Class 9">Class 9</SelectItem>
                <SelectItem value="Class 10">Class 10</SelectItem>
                <SelectItem value="Class 11">Class 11</SelectItem>
                <SelectItem value="Class 12">Class 12</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="বিষয় নির্বাচন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="গণিত">গণিত</SelectItem>
                <SelectItem value="পদার্থ বিজ্ঞান">পদার্থ বিজ্ঞান</SelectItem>
                <SelectItem value="রসায়ন">রসায়ন</SelectItem>
                <SelectItem value="জীববিজ্ঞান">জীববিজ্ঞান</SelectItem>
                <SelectItem value="ইংরেজি">ইংরেজি</SelectItem>
                <SelectItem value="বাংলা">বাংলা</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDistrict} onValueChange={setSelectedDistrict}>
              <SelectTrigger>
                <SelectValue placeholder="জেলা নির্বাচন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ঢাকা">ঢাকা</SelectItem>
                <SelectItem value="চট্টগ্রাম">চট্টগ্রাম</SelectItem>
                <SelectItem value="সিলেট">সিলেট</SelectItem>
                <SelectItem value="রাজশাহী">রাজশাহী</SelectItem>
                <SelectItem value="খুলনা">খুলনা</SelectItem>
                <SelectItem value="বরিশাল">বরিশাল</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedMode} onValueChange={setSelectedMode}>
              <SelectTrigger>
                <SelectValue placeholder="পদ্ধতি নির্বাচন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="অনলাইন">অনলাইন</SelectItem>
                <SelectItem value="অফলাইন">অফলাইন</SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full">
              <Search className="w-4 h-4 mr-2" />
              খুঁজুন
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {filteredTutors.length} জন শিক্ষক পাওয়া গেছে
          </p>
          <Select defaultValue="rating">
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">রেটিং অনুযায়ী</SelectItem>
              <SelectItem value="experience">অভিজ্ঞতা অনুযায়ী</SelectItem>
              <SelectItem value="price-low">কম মূল্য</SelectItem>
              <SelectItem value="price-high">বেশি মূল্য</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTutors.map((tutor) => (
            <Card key={tutor.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{tutor.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold flex items-center gap-1">
                        {tutor.name}
                        {tutor.verified && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {tutor.experience} অভিজ্ঞতা
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleFavorite(tutor.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Heart className={`w-4 h-4 ${favorites.includes(tutor.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {tutor.subjects.map((subject) => (
                      <Badge key={subject} variant="secondary" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {tutor.classes.map((class_name) => (
                      <Badge key={class_name} variant="outline" className="text-xs">
                        {class_name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    {tutor.rating} ({tutor.reviews})
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {tutor.location.split(', ')[0]}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {tutor.mode.map((mode) => (
                    <Badge key={mode} variant="outline" className="text-xs">
                      {mode === "অনলাইন" ? (
                        <><Video className="w-3 h-3 mr-1" />অনলাইন</>
                      ) : (
                        <><BookOpen className="w-3 h-3 mr-1" />অফলাইন</>
                      )}
                    </Badge>
                  ))}
                </div>

                <div className="flex flex-wrap gap-1">
                  {tutor.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-lg font-semibold">
                    ৳{tutor.hourlyRate}/ঘন্টা
                  </div>
                  {tutor.demoAvailable && (
                    <Badge variant="default" className="text-xs">
                      ডেমো ক্লাস
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button className="flex-1" variant="outline">
                    <MessageSquare className="w-4 h-4 mr-1" />
                    চ্যাট
                  </Button>
                  <Button className="flex-1">
                    {tutor.demoAvailable ? "ডেমো বুক করুন" : "যোগাযোগ করুন"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}