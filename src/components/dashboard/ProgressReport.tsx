import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Brain,
  BookOpen,
  Clock,
  Award,
  ArrowRight,
  Calendar
} from 'lucide-react';

interface WeeklyData {
  week: string;
  subjects: {
    name: string;
    score: number;
    previousScore: number;
    improvement: number;
    status: 'improved' | 'declined' | 'stable';
  }[];
  aiTips: string[];
  totalHours: number;
  attendance: number;
}

export function ProgressReport() {
  const [selectedWeek, setSelectedWeek] = useState('current');

  const weeklyData: Record<string, WeeklyData> = {
    current: {
      week: 'এই সপ্তাহ',
      subjects: [
        { name: 'গণিত', score: 85, previousScore: 78, improvement: 7, status: 'improved' },
        { name: 'পদার্থবিদ্যা', score: 72, previousScore: 75, improvement: -3, status: 'declined' },
        { name: 'রসায়ন', score: 68, previousScore: 65, improvement: 3, status: 'improved' },
        { name: 'ইংরেজি', score: 90, previousScore: 88, improvement: 2, status: 'improved' },
        { name: 'বাংলা', score: 82, previousScore: 82, improvement: 0, status: 'stable' }
      ],
      aiTips: [
        'পদার্থবিদ্যায় গতি অধ্যায়ে আরও মনোযোগ দিন। দৈনিক ৩০ মিনিট প্র্যাকটিস করুন।',
        'গণিতে চমৎকার উন্নতি! এভাবে জ্যামিতি চর্চা চালিয়ে যান।',
        'রসায়নে অ্যাসিড-বেস নিয়ে আরও পড়ুন। ল্যাব ওয়ার্ক বাড়ান।'
      ],
      totalHours: 28.5,
      attendance: 95
    },
    previous: {
      week: 'গত সপ্তাহ',
      subjects: [
        { name: 'গণিত', score: 78, previousScore: 75, improvement: 3, status: 'improved' },
        { name: 'পদার্থবিদ্যা', score: 75, previousScore: 70, improvement: 5, status: 'improved' },
        { name: 'রসায়ন', score: 65, previousScore: 68, improvement: -3, status: 'declined' },
        { name: 'ইংরেজি', score: 88, previousScore: 85, improvement: 3, status: 'improved' },
        { name: 'বাংলা', score: 82, previousScore: 80, improvement: 2, status: 'improved' }
      ],
      aiTips: [
        'রসায়নে ইলেক্ট্রন কনফিগারেশন নিয়ে আরও পড়ুন।',
        'গণিতে ত্রিকোণমিতি প্র্যাকটিস বাড়ান।',
        'পদার্থবিদ্যায় সূত্র মুখস্থ করার চেয়ে বুঝে পড়ুন।'
      ],
      totalHours: 25.0,
      attendance: 90
    }
  };

  const currentData = weeklyData[selectedWeek];
  const overallImprovement = currentData.subjects.reduce((acc, subject) => acc + subject.improvement, 0) / currentData.subjects.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">প্রগ্রেস রিপোর্ট</h2>
          <p className="text-muted-foreground">আপনার সাপ্তাহিক পারফরমেন্স বিশ্লেষণ</p>
        </div>
        <Badge variant={overallImprovement > 0 ? 'default' : 'destructive'} className="text-sm">
          {overallImprovement > 0 ? `+${overallImprovement.toFixed(1)}% উন্নতি` : `${overallImprovement.toFixed(1)}% হ্রাস`}
        </Badge>
      </div>

      <Tabs value={selectedWeek} onValueChange={setSelectedWeek}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="current">এই সপ্তাহ</TabsTrigger>
          <TabsTrigger value="previous">গত সপ্তাহ</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedWeek} className="space-y-6 mt-6">
          {/* Overall Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">মোট পড়ার সময়</p>
                    <p className="text-2xl font-bold">{currentData.totalHours}h</p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">উপস্থিতি</p>
                    <p className="text-2xl font-bold">{currentData.attendance}%</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">গড় স্কোর</p>
                    <p className="text-2xl font-bold">
                      {Math.round(currentData.subjects.reduce((acc, s) => acc + s.score, 0) / currentData.subjects.length)}%
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Subject-wise Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BookOpen className="w-5 h-5" />
                <span>বিষয়ভিত্তিক পারফরমেন্স</span>
              </CardTitle>
              <CardDescription>প্রতিটি বিষয়ে আপনার অগ্রগতি এবং তুলনা</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentData.subjects.map((subject, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{subject.name}</h4>
                    <div className="flex items-center space-x-2">
                      <Badge variant={subject.status === 'improved' ? 'default' : subject.status === 'declined' ? 'destructive' : 'secondary'}>
                        {subject.status === 'improved' ? 'উন্নতি' : subject.status === 'declined' ? 'হ্রাস' : 'স্থিতিশীল'}
                      </Badge>
                      <div className="flex items-center space-x-1 text-sm">
                        {subject.improvement !== 0 && (
                          subject.improvement > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-500" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500" />
                          )
                        )}
                        <span className={subject.improvement > 0 ? 'text-green-500' : subject.improvement < 0 ? 'text-red-500' : 'text-gray-500'}>
                          {subject.improvement > 0 ? '+' : ''}{subject.improvement}%
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>বর্তমান স্কোর</span>
                      <span className="font-medium">{subject.score}%</span>
                    </div>
                    <Progress value={subject.score} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>পূর্বের স্কোর: {subject.previousScore}%</span>
                      <span>লক্ষ্য: {Math.min(100, subject.score + 10)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>AI সুপারিশ</span>
              </CardTitle>
              <CardDescription>আপনার উন্নতির জন্য ব্যক্তিগত পরামর্শ</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentData.aiTips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Target className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{tip}</p>
                </div>
              ))}
              
              <Button className="w-full mt-4" variant="outline">
                <ArrowRight className="w-4 h-4 mr-2" />
                আরও বিস্তারিত বিশ্লেষণ দেখুন
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}