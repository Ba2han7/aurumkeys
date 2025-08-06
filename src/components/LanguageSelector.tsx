import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Flag components
const USFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#B22234" rx="2"/>
    <rect width="24" height="1.23" fill="#FFFFFF"/>
    <rect width="24" height="1.23" y="2.46" fill="#FFFFFF"/>
    <rect width="24" height="1.23" y="4.92" fill="#FFFFFF"/>
    <rect width="24" height="1.23" y="7.38" fill="#FFFFFF"/>
    <rect width="24" height="1.23" y="9.85" fill="#FFFFFF"/>
    <rect width="24" height="1.23" y="12.31" fill="#FFFFFF"/>
    <rect width="24" height="1.23" y="14.77" fill="#FFFFFF"/>
    <rect width="9.6" height="8.61" fill="#3C3B6E"/>
  </svg>
);

const TurkeyFlag = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 16" fill="none">
    <rect width="24" height="16" fill="#E30A17" rx="2"/>
    <circle cx="9" cy="8" r="3" fill="none" stroke="#FFFFFF" strokeWidth="0.5"/>
    <circle cx="10.2" cy="8" r="2.4" fill="#E30A17"/>
    <path d="m13.5 6.5 1.2 0.8-0.3 1.3 1.2-0.8 1.2 0.8-0.3-1.3 1.2-0.8h-1.5l-0.3-1.3-0.3 1.3z" fill="#FFFFFF"/>
  </svg>
);

const languages = [
  {
    code: "en",
    name: "English",
    flag: USFlag,
  },
  {
    code: "tr", 
    name: "Türkçe",
    flag: TurkeyFlag,
  },
];

const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [selectedLanguage, setSelectedLanguage] = useState(
    languages.find(lang => lang.code === language) || languages[0]
  );

  const handleLanguageChange = (newLanguage: typeof languages[0]) => {
    setSelectedLanguage(newLanguage);
    setLanguage(newLanguage.code as 'en' | 'tr');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-3 hover-lift bg-card border border-border"
        >
          <selectedLanguage.flag className="w-5 h-3 mr-2 rounded-sm" />
          <span className="text-sm font-medium">{selectedLanguage.code.toUpperCase()}</span>
          <ChevronDown className="h-3 w-3 ml-1" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="start" 
        className="w-40 bg-popover border border-border z-50"
      >
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => handleLanguageChange(language)}
            className="flex items-center cursor-pointer hover:bg-accent hover:text-accent-foreground"
          >
            <language.flag className="w-5 h-3 mr-3 rounded-sm" />
            <span className="text-sm font-medium">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;