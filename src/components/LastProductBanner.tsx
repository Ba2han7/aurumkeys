import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface LastProductBannerProps {
  productName: string;
}

const LastProductBanner = ({ productName }: LastProductBannerProps) => {
  return (
    <Alert className="bg-gradient-to-r from-red-500 to-red-600 border-red-600 text-white mb-6 animate-pulse">
      <AlertTriangle className="h-4 w-4 text-white" />
      <AlertDescription className="text-white font-semibold">
        <div className="flex items-center justify-center gap-2">
          <span className="inline-block w-2 h-2 bg-white rounded-full animate-bounce"></span>
          <span>⚡ Last "{productName}" Available! ⚡</span>
          <span className="inline-block w-2 h-2 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
        </div>
        <p className="text-center text-sm mt-1 opacity-90">Don't miss out! Only 1 left in stock</p>
      </AlertDescription>
    </Alert>
  );
};

export default LastProductBanner;