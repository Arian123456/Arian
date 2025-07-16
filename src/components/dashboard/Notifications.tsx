import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { 
  Bell,
  Clock,
  MessageSquare,
  BookOpen,
  Calendar,
  AlertTriangle,
  CheckCircle,
  X,
  Settings,
  Trash2,
  BellRing,
  BellOff
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'class' | 'assignment' | 'message' | 'system' | 'reminder';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionUrl?: string;
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'class',
      title: 'আগামীকাল গণিত ক্লাস',
      message: 'করিম স্যারের সাথে বীজগণিত ক্লাস সকাল ৯টায়',
      time: '২ ঘন্টা আগে',
      read: false,
      priority: 'high'
    },
    {
      id: '2',
      type: 'assignment',
      title: 'পদার্থবিদ্যা অ্যাসাইনমেন্ট',
      message: 'গতি অধ্যায়ের অ্যাসাইনমেন্ট জমা দেওয়ার শেষ সময় আগামীকাল',
      time: '৫ ঘন্টা আগে',
      read: false,
      priority: 'high'
    },
    {
      id: '3',
      type: 'message',
      title: 'নতুন বার্তা',
      message: 'রহিম স্যার আপনাকে একটি বার্তা পাঠিয়েছেন',
      time: '১ দিন আগে',
      read: true,
      priority: 'medium'
    },
    {
      id: '4',
      type: 'system',
      title: 'প্রগ্রেস রিপোর্ট প্রস্তুত',
      message: 'এই সপ্তাহের পারফরমেন্স রিপোর্ট দেখুন',
      time: '২ দিন আগে',
      read: true,
      priority: 'low'
    },
    {
      id: '5',
      type: 'reminder',
      title: 'পরীক্ষার প্রস্তুতি',
      message: 'আগামী সপ্তাহে রসায়ন পরীক্ষা - প্রস্তুতি নিন',
      time: '৩ দিন আগে',
      read: false,
      priority: 'high'
    }
  ]);

  const [notificationSettings, setNotificationSettings] = useState({
    classReminders: true,
    assignmentDeadlines: true,
    messageAlerts: true,
    systemUpdates: false,
    studyReminders: true,
    emailNotifications: true,
    pushNotifications: true
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'class': return <Calendar className="w-5 h-5 text-blue-500" />;
      case 'assignment': return <BookOpen className="w-5 h-5 text-orange-500" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-green-500" />;
      case 'system': return <Settings className="w-5 h-5 text-gray-500" />;
      case 'reminder': return <Clock className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-red-500 bg-red-50';
      case 'medium': return 'border-l-orange-500 bg-orange-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const todayNotifications = notifications.filter(n => n.time.includes('ঘন্টা'));
  const earlierNotifications = notifications.filter(n => !n.time.includes('ঘন্টা'));

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Bell className="w-8 h-8" />
            {unreadCount > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-bold">নোটিফিকেশন</h2>
            <p className="text-muted-foreground">
              {unreadCount > 0 ? `${unreadCount}টি নতুন বিজ্ঞপ্তি` : 'সকল বিজ্ঞপ্তি পড়া হয়েছে'}
            </p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {unreadCount > 0 && (
            <Button variant="outline" onClick={markAllAsRead}>
              <CheckCircle className="w-4 h-4 mr-2" />
              সব পড়া হয়েছে
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">সব ({notifications.length})</TabsTrigger>
          <TabsTrigger value="unread">অপঠিত ({unreadCount})</TabsTrigger>
          <TabsTrigger value="important">গুরুত্বপূর্ণ</TabsTrigger>
          <TabsTrigger value="settings">সেটিংস</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4 mt-6">
          {/* Today's Notifications */}
          {todayNotifications.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">আজকের বিজ্ঞপ্তি</h3>
              {todayNotifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${getPriorityColor(notification.priority)} ${!notification.read ? 'ring-2 ring-blue-100' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            <Badge variant="outline" className="text-xs">
                              {notification.type === 'class' ? 'ক্লাস' : 
                               notification.type === 'assignment' ? 'অ্যাসাইনমেন্ট' :
                               notification.type === 'message' ? 'বার্তা' :
                               notification.type === 'system' ? 'সিস্টেম' : 'রিমাইন্ডার'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1 ml-4">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 h-8 w-8"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Earlier Notifications */}
          {earlierNotifications.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground">পূর্বের বিজ্ঞপ্তি</h3>
              {earlierNotifications.map((notification) => (
                <Card key={notification.id} className={`border-l-4 ${getPriorityColor(notification.priority)} ${!notification.read ? 'ring-2 ring-blue-100' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        {getIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                              {notification.title}
                            </h4>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center space-x-4">
                            <span className="text-xs text-muted-foreground">{notification.time}</span>
                            <Badge variant="outline" className="text-xs">
                              {notification.type === 'class' ? 'ক্লাস' : 
                               notification.type === 'assignment' ? 'অ্যাসাইনমেন্ট' :
                               notification.type === 'message' ? 'বার্তা' :
                               notification.type === 'system' ? 'সিস্টেম' : 'রিমাইন্ডার'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-1 ml-4">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 h-8 w-8"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 h-8 w-8"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="unread" className="space-y-4 mt-6">
          {notifications.filter(n => !n.read).map((notification) => (
            <Card key={notification.id} className={`border-l-4 ${getPriorityColor(notification.priority)} ring-2 ring-blue-100`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    {getIcon(notification.type)}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold">{notification.title}</h4>
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                      <span className="text-xs text-muted-foreground">{notification.time}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 h-8 w-8"
                  >
                    <CheckCircle className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="important" className="space-y-4 mt-6">
          {notifications.filter(n => n.priority === 'high').map((notification) => (
            <Card key={notification.id} className="border-l-4 border-l-red-500 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-red-900">{notification.title}</h4>
                    <p className="text-sm text-red-700 mb-2">{notification.message}</p>
                    <span className="text-xs text-red-600">{notification.time}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>নোটিফিকেশন সেটিংস</span>
              </CardTitle>
              <CardDescription>আপনার পছন্দ অনুযায়ী বিজ্ঞপ্তি কাস্টমাইজ করুন</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">ক্লাস রিমাইন্ডার</Label>
                    <p className="text-xs text-muted-foreground">আসন্ন ক্লাসের জন্য বিজ্ঞপ্তি</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.classReminders}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, classReminders: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">অ্যাসাইনমেন্ট ডেডলাইন</Label>
                    <p className="text-xs text-muted-foreground">কাজ জমা দেওয়ার সময়সীমা</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.assignmentDeadlines}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, assignmentDeadlines: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">বার্তা অ্যালার্ট</Label>
                    <p className="text-xs text-muted-foreground">নতুন বার্তার জন্য বিজ্ঞপ্তি</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.messageAlerts}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, messageAlerts: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">সিস্টেম আপডেট</Label>
                    <p className="text-xs text-muted-foreground">অ্যাপের নতুন ফিচার ও আপডেট</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.systemUpdates}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, systemUpdates: checked }))
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">পড়াশোনার রিমাইন্ডার</Label>
                    <p className="text-xs text-muted-foreground">নিয়মিত পড়াশোনার জন্য অনুস্মারক</p>
                  </div>
                  <Switch 
                    checked={notificationSettings.studyReminders}
                    onCheckedChange={(checked) => 
                      setNotificationSettings(prev => ({ ...prev, studyReminders: checked }))
                    }
                  />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">বিজ্ঞপ্তি পদ্ধতি</h4>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">ইমেইল নোটিফিকেশন</Label>
                      <p className="text-xs text-muted-foreground">ইমেইলে বিজ্ঞপ্তি পেতে চান</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, emailNotifications: checked }))
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-sm font-medium">পুশ নোটিফিকেশন</Label>
                      <p className="text-xs text-muted-foreground">ব্রাউজারে তাৎক্ষণিক বিজ্ঞপ্তি</p>
                    </div>
                    <Switch 
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => 
                        setNotificationSettings(prev => ({ ...prev, pushNotifications: checked }))
                      }
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}