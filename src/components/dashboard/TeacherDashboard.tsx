import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DollarSign, 
  Users, 
  Clock, 
  TrendingUp, 
  MessageSquare, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Star,
  BookOpen,
  Phone,
  Video,
  FileText,
  Bell
} from "lucide-react";

export function TeacherDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const stats = {
    monthlyEarnings: 25000,
    activeStudents: 12,
    upcomingClasses: 3,
    completedClasses: 45,
    rating: 4.8,
    totalReviews: 24
  };

  const upcomingClasses = [
    { id: 1, subject: "গণিত", student: "রহিম আহমেদ", time: "10:00 AM", type: "online" },
    { id: 2, subject: "পদার্থ বিজ্ঞান", student: "সারা খান", time: "2:00 PM", type: "offline" },
    { id: 3, subject: "রসায়ন", student: "আলী হাসান", time: "4:00 PM", type: "online" }
  ];

  const recentRequests = [
    { id: 1, student: "করিম উদ্দিন", subject: "গণিত", class: "Class 10", type: "demo", time: "2 ঘন্টা আগে" },
    { id: 2, student: "ফাতেমা বেগম", subject: "ইংরেজি", class: "Class 9", type: "regular", time: "5 ঘন্টা আগে" },
    { id: 3, student: "মোহাম্মদ রফিক", subject: "পদার্থ বিজ্ঞান", class: "Class 11", type: "demo", time: "১ দিন আগে" }
  ];

  const notifications = [
    { id: 1, title: "নতুন ডেমো ক্লাস রিকোয়েস্ট", message: "করিম উদ্দিন গণিতের জন্য ডেমো ক্লাস চেয়েছেন", time: "10 মিনিট আগে", type: "request" },
    { id: 2, title: "পেমেন্ট গ্রহণ", message: "সারা খান ৳2000 পেমেন্ট করেছেন", time: "1 ঘন্টা আগে", type: "payment" },
    { id: 3, title: "নতুন রিভিউ", message: "আলী হাসান ৫ স্টার রিভিউ দিয়েছেন", time: "3 ঘন্টা আগে", type: "review" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-primary to-primary-foreground rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">স্বাগতম, মোহাম্মদ আলী!</h1>
            <p className="text-primary-foreground/80 mt-1">আপনার শিক্ষক ড্যাশবোর্ডে</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="bg-white/20 text-white">
                <CheckCircle className="w-4 h-4 mr-1" />
                ভেরিফাইড
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white">
                <Star className="w-4 h-4 mr-1" />
                {stats.rating} ({stats.totalReviews} রিভিউ)
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-primary-foreground/80">প্রোফাইল সম্পূর্ণতা</div>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={85} className="w-20" />
              <span className="text-sm font-medium">৮৫%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">এই মাসের আয়</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{stats.monthlyEarnings.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> গত মাস থেকে
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">সক্রিয় শিক্ষার্থী</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeStudents}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> নতুন এই সপ্তাহে
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">আজকের ক্লাস</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.upcomingClasses}</div>
            <p className="text-xs text-muted-foreground">
              পরবর্তী ক্লাস <span className="text-blue-600">10:00 AM</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">সম্পূর্ণ ক্লাস</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedClasses}</div>
            <p className="text-xs text-muted-foreground">
              এই মাসে <span className="text-green-600">15</span> টি ক্লাস
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              আজকের ক্লাসগুলো
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((class_item) => (
                <div key={class_item.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{class_item.student.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{class_item.subject}</div>
                      <div className="text-sm text-muted-foreground">{class_item.student}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{class_item.time}</div>
                    <Badge variant={class_item.type === "online" ? "default" : "secondary"}>
                      {class_item.type === "online" ? (
                        <><Video className="w-3 h-3 mr-1" />অনলাইন</>
                      ) : (
                        <><BookOpen className="w-3 h-3 mr-1" />অফলাইন</>
                      )}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              সব ক্লাস দেখুন
            </Button>
          </CardContent>
        </Card>

        {/* Recent Requests */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              সাম্প্রতিক অনুরোধ
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>{request.student.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{request.student}</div>
                      <div className="text-sm text-muted-foreground">
                        {request.subject} - {request.class}
                      </div>
                      <div className="text-xs text-muted-foreground">{request.time}</div>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <Button size="sm" variant="default">
                      {request.type === "demo" ? "ডেমো দিন" : "গ্রহণ করুন"}
                    </Button>
                    <Button size="sm" variant="outline">
                      <MessageSquare className="w-3 h-3 mr-1" />
                      চ্যাট
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            সাম্প্রতিক নোটিফিকেশন
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  notification.type === 'request' ? 'bg-blue-500' :
                  notification.type === 'payment' ? 'bg-green-500' : 'bg-yellow-500'
                }`} />
                <div className="flex-1">
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-sm text-muted-foreground">{notification.message}</div>
                  <div className="text-xs text-muted-foreground mt-1">{notification.time}</div>
                </div>
              </div>
            ))}
          </div>
          <Button className="w-full mt-4" variant="outline">
            সব নোটিফিকেশন দেখুন
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}