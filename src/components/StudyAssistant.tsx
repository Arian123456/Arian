import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Maximize2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

export function StudyAssistant() {
  const { t } = useLanguage();
  const { trackEvent } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenAssistant = () => {
    trackEvent('study_assistant_opened', { 
      platform: 'embedded',
      timestamp: new Date().toISOString() 
    });
    setIsOpen(true);
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageCircle className="h-5 w-5" />
            <span>{t('study_assistant')}</span>
          </CardTitle>
          <CardDescription>
            {t('get_help')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            onClick={handleOpenAssistant}
            className="w-full bg-black hover:bg-gray-800 text-white"
            variant="default"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {t('get_help')}
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            Get instant help with your studies, ask questions, and receive personalized assistance for any subject.
          </p>
        </CardContent>
      </Card>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
          <div className="fixed inset-4 md:inset-8 bg-background border rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Study Assistant</h2>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <iframe
              src="https://eu.jotform.com/app/251946613956367"
              className="w-full h-full border-0"
              title="Study Assistant"
            />
          </div>
        </div>
      )}
    </>
  );
}