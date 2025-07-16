import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  MessageCircle,
  Send,
  Search,
  Plus,
  Paperclip,
  Smile,
  Phone,
  Video,
  MoreVertical,
  Check,
  CheckCheck,
  Clock,
  Users,
  UserCheck
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  role: 'teacher' | 'student' | 'group';
  avatar?: string;
  online: boolean;
  lastSeen?: string;
  unreadCount: number;
}

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'file' | 'image';
  status: 'sent' | 'delivered' | 'read';
  fileUrl?: string;
}

interface Chat {
  id: string;
  contactId: string;
  messages: Message[];
}

export function Messages() {
  const [selectedChat, setSelectedChat] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const contacts: Contact[] = [
    {
      id: '1',
      name: 'করিম স্যার',
      role: 'teacher',
      avatar: '/placeholder.svg',
      online: true,
      unreadCount: 2
    },
    {
      id: '2',
      name: 'রহিম উদ্দিন স্যার',
      role: 'teacher',
      avatar: '/placeholder.svg',
      online: false,
      lastSeen: '২ ঘন্টা আগে',
      unreadCount: 0
    },
    {
      id: '3',
      name: 'সারা খান',
      role: 'student',
      avatar: '/placeholder.svg',
      online: true,
      unreadCount: 1
    },
    {
      id: '4',
      name: 'গণিত গ্রুপ',
      role: 'group',
      avatar: '/placeholder.svg',
      online: true,
      unreadCount: 5
    },
    {
      id: '5',
      name: 'পদার্থবিদ্যা স্টাডি গ্রুপ',
      role: 'group',
      avatar: '/placeholder.svg',
      online: true,
      unreadCount: 0
    }
  ];

  const chats: Chat[] = [
    {
      id: '1',
      contactId: '1',
      messages: [
        {
          id: '1',
          senderId: '1',
          senderName: 'করিম স্যার',
          content: 'আগামীকাল ক্লাসে বীজগণিত নিয়ে আলোচনা করব। প্রস্তুতি নিয়ে আসবেন।',
          timestamp: '১০:৩০ AM',
          type: 'text',
          status: 'read'
        },
        {
          id: '2',
          senderId: 'me',
          senderName: 'আমি',
          content: 'জ্বী স্যার, আমি প্রস্তুতি নিয়ে রাখব।',
          timestamp: '১০:৩২ AM',
          type: 'text',
          status: 'read'
        },
        {
          id: '3',
          senderId: '1',
          senderName: 'করিম স্যার',
          content: 'চতুর্থ অধ্যায়ের সব সমস্যা সমাধান করে আনবেন।',
          timestamp: '১১:১৫ AM',
          type: 'text',
          status: 'delivered'
        }
      ]
    },
    {
      id: '2',
      contactId: '3',
      messages: [
        {
          id: '4',
          senderId: '3',
          senderName: 'সারা খান',
          content: 'রসায়নের নোটস শেয়ার করতে পারবে?',
          timestamp: '৯:২০ AM',
          type: 'text',
          status: 'read'
        }
      ]
    }
  ];

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedContact = contacts.find(contact => contact.id === selectedChat);
  const selectedChatData = chats.find(chat => chat.contactId === selectedChat);

  const sendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const getContactIcon = (role: string) => {
    switch (role) {
      case 'teacher': return <UserCheck className="w-3 h-3 text-blue-500" />;
      case 'group': return <Users className="w-3 h-3 text-green-500" />;
      default: return null;
    }
  };

  const getMessageStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <Check className="w-3 h-3 text-gray-400" />;
      case 'delivered': return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case 'read': return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default: return <Clock className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">বার্তা</h2>
          <p className="text-muted-foreground">শিক্ষক ও সহপাঠীদের সাথে যোগাযোগ করুন</p>
        </div>
        <Button className="bg-black hover:bg-gray-800 text-white">
          <Plus className="w-4 h-4 mr-2" />
          নতুন চ্যাট
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Contacts List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-3">
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-5 h-5" />
              <CardTitle className="text-lg">চ্যাট তালিকা</CardTitle>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="শিক্ষক বা বন্ধু খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="space-y-1">
              {filteredContacts.map((contact) => (
                <div
                  key={contact.id}
                  onClick={() => setSelectedChat(contact.id)}
                  className={`p-3 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedChat === contact.id ? 'bg-blue-50 border-r-2 border-blue-500' : ''
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="w-10 h-10">
                        <AvatarImage src={contact.avatar} />
                        <AvatarFallback>
                          {contact.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {contact.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1">
                          <h4 className="font-medium text-sm truncate">{contact.name}</h4>
                          {getContactIcon(contact.role)}
                        </div>
                        {contact.unreadCount > 0 && (
                          <Badge variant="destructive" className="text-xs h-5 w-5 rounded-full p-0 flex items-center justify-center">
                            {contact.unreadCount}
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {contact.online ? 'অনলাইন' : contact.lastSeen || 'অফলাইন'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Chat Window */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-3 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedContact.avatar} />
                      <AvatarFallback>
                        {selectedContact.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{selectedContact.name}</h4>
                        {getContactIcon(selectedContact.role)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {selectedContact.online ? 'অনলাইন' : selectedContact.lastSeen || 'অফলাইন'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-4 overflow-y-auto space-y-4">
                {selectedChatData?.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderId === 'me'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className={`flex items-center justify-end space-x-1 mt-1 ${
                        message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        <span className="text-xs">{message.timestamp}</span>
                        {message.senderId === 'me' && getMessageStatusIcon(message.status)}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <div className="flex-1 relative">
                    <Input
                      placeholder="একটি বার্তা লিখুন..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                      className="pr-20"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                      <Button variant="ghost" size="sm" className="p-1 h-6 w-6">
                        <Smile className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <Button 
                    onClick={sendMessage}
                    disabled={!messageInput.trim()}
                    className="bg-black hover:bg-gray-800 text-white"
                    size="sm"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">একটি চ্যাট নির্বাচন করুন</h3>
                <p className="text-sm text-gray-400">আপনার শিক্ষক বা বন্ধুদের সাথে কথা বলা শুরু করুন</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-lg">
              <UserCheck className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium">শিক্ষকদের সাথে</h4>
              <p className="text-sm text-muted-foreground">
                {contacts.filter(c => c.role === 'teacher').length} জন শিক্ষক
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium">গ্রুপ চ্যাট</h4>
              <p className="text-sm text-muted-foreground">
                {contacts.filter(c => c.role === 'group').length}টি সক্রিয় গ্রুপ
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-orange-100 rounded-lg">
              <MessageCircle className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h4 className="font-medium">অপঠিত বার্তা</h4>
              <p className="text-sm text-muted-foreground">
                {contacts.reduce((sum, c) => sum + c.unreadCount, 0)}টি নতুন বার্তা
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}