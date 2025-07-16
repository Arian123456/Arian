import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Calendar,
  Clock,
  Plus,
  Brain,
  Target,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Edit,
  Trash2
} from 'lucide-react';

interface ScheduleItem {
  id: string;
  subject: string;
  time: string;
  duration: number;
  type: 'study' | 'class' | 'exam' | 'break';
  day: string;
  tutor?: string;
}

interface Subject {
  name: string;
  currentHours: number;
  targetHours: number;
  priority: 'high' | 'medium' | 'low';
}

export function ClassSchedule() {
  const [activeTab, setActiveTab] = useState('weekly');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDuration, setSelectedDuration] = useState('');

  const subjects: Subject[] = [
    { name: 'গণিত', currentHours: 8, targetHours: 12, priority: 'high' },
    { name: 'পদার্থবিদ্যা', currentHours: 6, targetHours: 10, priority: 'high' },
    { name: 'রসায়ন', currentHours: 5, targetHours: 8, priority: 'medium' },
    { name: 'ইংরেজি', currentHours: 4, targetHours: 6, priority: 'medium' },
    { name: 'বাংলা', currentHours: 3, targetHours: 5, priority: 'low' }
  ];

  const weeklySchedule: Record<string, ScheduleItem[]> = {
    'রবিবার': [
      { id: '1', subject: 'গণিত', time: '09:00', duration: 90, type: 'class', day: 'রবিবার', tutor: 'করিম স্যার' },
      { id: '2', subject: 'পদার্থবিদ্যা', time: '14:00', duration: 60, type: 'study', day: 'রবিবার' }
    ],
    'সোমবার': [
      { id: '3', subject: 'রসায়ন', time: '10:00', duration: 90, type: 'class', day: 'সোমবার', tutor: 'রহিম স্যার' },
      { id: '4', subject: 'ইংরেজি', time: '16:00', duration: 45, type: 'study', day: 'সোমবার' }
    ],
    'মঙ্গলবার': [
      { id: '5', subject: 'গণিত', time: '11:00', duration: 60, type: 'study', day: 'মঙ্গলবার' },
      { id: '6', subject: 'পদার্থবিদ্যা', time: '15:00', duration: 90, type: 'class', day: 'মঙ্গলবার', tutor: 'সালাম স্যার' }
    ]
  };

  const aiSuggestions = [
    'গণিতে আরও ২ ঘন্টা যোগ করলে পরীক্ষায় ১৫% বেশি নম্বর পাবেন।',
    'পদার্থবিদ্যার জন্য সকালের সময় বেশি কার্যকর।',
    'রসায়ন ও পদার্থবিদ্যা একসাথে পড়লে ভালো ফলাফল পাবেন।',
    'সপ্তাহে ১ দিন সম্পূর্ণ বিশ্রাম নিন - এতে মনোযোগ বাড়বে।'
  ];

  const getDaySchedule = (day: string) => weeklySchedule[day] || [];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'class': return 'bg-blue-500';
      case 'study': return 'bg-green-500';
      case 'exam': return 'bg-red-500';
      case 'break': return 'bg-gray-500';
      default: return 'bg-blue-500';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-orange-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">ক্লাস শিডিউল</h2>
          <p className="text-muted-foreground">আপনার সাপ্তাহিক পাঠ পরিকল্পনা ও AI পরামর্শ</p>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white">
          <Plus className="w-4 h-4 mr-2" />
          নতুন ক্লাস যোগ করুন
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="weekly">সাপ্তাহিক</TabsTrigger>
          <TabsTrigger value="monthly">মাসিক</TabsTrigger>
          <TabsTrigger value="planner">পরিকল্পনাকারী</TabsTrigger>
        </TabsList>

        <TabsContent value="weekly" className="space-y-6 mt-6">
          {/* Subject Progress Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>বিষয়ভিত্তিক লক্ষ্য অগ্রগতি</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {subjects.map((subject, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">{subject.name}</span>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getPriorityColor(subject.priority)}>
                        {subject.priority === 'high' ? 'উচ্চ' : subject.priority === 'medium' ? 'মধ্যম' : 'নিম্ন'} অগ্রাধিকার
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {subject.currentHours}/{subject.targetHours}h
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min(100, (subject.currentHours / subject.targetHours) * 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="w-5 h-5" />
                <span>সাপ্তাহিক ক্যালেন্ডার</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'].map((day) => (
                  <div key={day} className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-3 text-center">{day}</h4>
                    <div className="space-y-2">
                      {getDaySchedule(day).map((item) => (
                        <div key={item.id} className="p-2 rounded border-l-4" style={{ borderLeftColor: getTypeColor(item.type).replace('bg-', '') }}>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium text-sm">{item.subject}</p>
                              <p className="text-xs text-muted-foreground">{item.time} ({item.duration} মিনিট)</p>
                              {item.tutor && <p className="text-xs text-blue-600">{item.tutor}</p>}
                            </div>
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                      {getDaySchedule(day).length === 0 && (
                        <p className="text-center text-muted-foreground text-sm py-4">কোন ক্লাস নেই</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>মাসিক পরিকল্পনা</CardTitle>
              <CardDescription>পুরো মাসের জন্য আপনার লক্ষ্য ও পরিকল্পনা</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহঃ', 'শুক্র', 'শনি'].map((day) => (
                  <div key={day} className="p-2 text-center font-medium bg-gray-100 rounded">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 31 }, (_, i) => i + 1).map((date) => (
                  <div key={date} className="p-2 border rounded text-center hover:bg-gray-50 cursor-pointer">
                    <div className="font-medium">{date}</div>
                    {date % 7 === 0 && <div className="w-2 h-2 bg-blue-500 rounded-full mx-auto mt-1"></div>}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="planner" className="space-y-6 mt-6">
          {/* AI Suggestions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Brain className="w-5 h-5" />
                <span>AI পরামর্শ ও পূর্বাভাস</span>
              </CardTitle>
              <CardDescription>আপনার পরিকল্পনা অনুযায়ী প্রত্যাশিত ফলাফল</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiSuggestions.map((suggestion, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                  <p className="text-sm">{suggestion}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Schedule Creator */}
          <Card>
            <CardHeader>
              <CardTitle>নতুন সময়সূচি তৈরি করুন</CardTitle>
              <CardDescription>AI আপনার জন্য সর্বোত্তম সময়সূচি তৈরি করবে</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label>বিষয় নির্বাচন করুন</Label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="বিষয় বেছে নিন" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subject) => (
                        <SelectItem key={subject.name} value={subject.name}>
                          {subject.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>সময়</Label>
                  <Select value={selectedTime} onValueChange={setSelectedTime}>
                    <SelectTrigger>
                      <SelectValue placeholder="সময় বেছে নিন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="09:00">৯:০০ AM</SelectItem>
                      <SelectItem value="10:00">১০:০০ AM</SelectItem>
                      <SelectItem value="11:00">১১:০০ AM</SelectItem>
                      <SelectItem value="14:00">২:০০ PM</SelectItem>
                      <SelectItem value="15:00">৩:০০ PM</SelectItem>
                      <SelectItem value="16:00">৪:০০ PM</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>সময়কাল (মিনিট)</Label>
                  <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                    <SelectTrigger>
                      <SelectValue placeholder="সময়কাল বেছে নিন" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">৩০ মিনিট</SelectItem>
                      <SelectItem value="45">৪৫ মিনিট</SelectItem>
                      <SelectItem value="60">৬০ মিনিট</SelectItem>
                      <SelectItem value="90">৯০ মিনিট</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                <Plus className="w-4 h-4 mr-2" />
                AI এর সাহায্যে সময়সূচি তৈরি করুন
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}