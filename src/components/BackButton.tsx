import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

interface BackButtonProps {
  label?: string;
  variant?: "default" | "outline" | "ghost";
  onClick?: () => void;
  className?: string;
}

const BackButton = ({ label, variant = "outline", onClick, className }: BackButtonProps) => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const defaultLabel = label || t("goBack");

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      className={`inline-flex items-center gap-2 ${className || ''}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {defaultLabel}
    </Button>
  );
};

export default BackButton;