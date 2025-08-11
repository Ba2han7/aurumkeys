import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLanguage } from "@/contexts/LanguageContext";
import chatbotLogo from "@/assets/chatbot-logo.jpg";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const ChatbotAdvisor = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: t("hello"),
      isUser: false,
      timestamp: new Date(),
    },
  ]);

  const suggestedSentences = [
    { text: "Show me pianos and keyboards", action: () => scrollToSection("pianos") },
    { text: "I'm looking for guitars", action: () => scrollToSection("guitars") },
    { text: "What drums do you have?", action: () => scrollToSection("drums") },
    { text: "Show me all instruments", action: () => scrollToSection("categories") },
    { text: "I'm a beginner, what should I start with?", action: () => showBeginnerAdvice() },
    { text: "What are your featured products?", action: () => scrollToSection("featured") },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId) || 
                   document.querySelector(`[data-category="${sectionId}"]`) ||
                   document.querySelector('.featured-products') ||
                   document.querySelector('.product-categories');
    
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false); // Close chatbot after navigation
    } else {
      // If element not found, navigate to explore page
      window.location.href = '/explore';
    }
  };

  const showBeginnerAdvice = () => {
    const botResponse: Message = {
      id: Date.now().toString(),
      text: "For beginners, I recommend starting with: 🎹 Keyboard/Piano (great for music theory), 🎸 Acoustic Guitar (versatile and portable), or 🥁 Electronic Drums (volume control for practice). Each offers a solid foundation for musical learning!",
      isUser: false,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, botResponse]);
  };

  const handleSuggestedSentenceClick = (suggestion: { text: string; action: () => void }) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: suggestion.text,
      isUser: true,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    
    // Execute the action
    setTimeout(() => {
      suggestion.action();
    }, 500);
  };


  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Window */}
      {isOpen && (
        <Card className="w-80 h-[500px] mb-4 shadow-xl border-primary/20 animate-in slide-in-from-bottom-4 duration-300">
          <CardHeader className="bg-gradient-to-r from-gold to-gold/80 text-white p-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-white/30">
                  <img 
                    src={chatbotLogo} 
                    alt="Melody AI" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-base font-semibold">Melody AI</div>
                  <div className="text-xs opacity-90">Your Musical Guide</div>
                </div>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 h-8 w-8 p-0"
              >
                <X size={16} />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-[400px]">
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-lg ${
                        message.isUser
                          ? "bg-gold text-white"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t bg-muted/30">
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground text-center">Choose an option:</p>
                <div className="grid grid-cols-1 gap-2">
                  {suggestedSentences.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestedSentenceClick(suggestion)}
                      className="text-xs h-8 justify-start hover:bg-gold/10 hover:border-gold/30"
                    >
                      {suggestion.text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="h-16 w-16 rounded-full shadow-lg bg-gradient-to-r from-gold to-gold/80 hover:from-gold/90 hover:to-gold/70 border-4 border-white relative overflow-hidden group"
      >
        <div className="absolute inset-2 rounded-full overflow-hidden">
          <img 
            src={chatbotLogo} 
            alt="Melody AI" 
            className="w-full h-full object-cover transition-transform group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-tr from-gold/20 to-transparent rounded-full"></div>
      </Button>
    </div>
  );
};

export default ChatbotAdvisor;