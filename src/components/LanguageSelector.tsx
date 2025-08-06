import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const languages = [
  {
    code: "en",
    name: "English",
    flag: "🇺🇸",
  },
  {
    code: "tr", 
    name: "Türkçe",
    flag: "🇹🇷",
  },
];

const LanguageSelector = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageChange = (language: typeof languages[0]) => {
    setSelectedLanguage(language);
    // Here you would implement actual language switching logic
    console.log(`Language changed to: ${language.name}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm" 
          className="h-9 px-3 hover-lift bg-card border border-border"
        >
          <span className="text-lg mr-2">{selectedLanguage.flag}</span>
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
            <span className="text-lg mr-3">{language.flag}</span>
            <span className="text-sm font-medium">{language.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSelector;