import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useLanguage } from '@/contexts/LanguageContext';
import { Languages } from 'lucide-react';

export function LanguageSelector() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex items-center space-x-2">
      <Languages className="h-4 w-4 text-black" />
      <Select value={language} onValueChange={(value: 'en' | 'bn') => setLanguage(value)}>
        <SelectTrigger className="w-[100px] border-black bg-white hover:bg-black hover:text-white text-black">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-white border-black">
          <SelectItem value="en" className="text-black hover:bg-black hover:text-white">{t('english')}</SelectItem>
          <SelectItem value="bn" className="text-black hover:bg-black hover:text-white">{t('bangla')}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}