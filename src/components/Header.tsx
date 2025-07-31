import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, Search, ShoppingCart, User, X, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { state } = useCart();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigation = [
    { name: "Keyboards", href: "/explore", category: "keyboards" },
    { name: "Guitars", href: "/explore", category: "guitars" },
    { name: "Drums", href: "/explore", category: "drums" },
    { name: "Violins", href: "/explore", category: "violins" },
    { name: "Audio Equipment", href: "/explore", category: "audio" },
    { name: "Accessories", href: "/explore", category: "accessories" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-serif font-bold text-dark">
              AURUM
              <span className="block text-sm font-normal tracking-wider">KEYS & SOUND</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate('/explore', { state: { category: item.category } })}
                className="text-foreground hover:text-gold transition-colors duration-300 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hover-lift">
              <Search className="h-5 w-5" />
            </Button>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="hover-lift">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" className="hover-lift">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="hover-lift relative">
                <ShoppingCart className="h-5 w-5" />
                {state.items.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-dark text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {state.items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="py-4 space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate('/explore', { state: { category: item.category } });
                    setIsMenuOpen(false);
                  }}
                  className="block text-foreground hover:text-gold transition-colors duration-300 font-medium"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;