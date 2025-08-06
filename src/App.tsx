import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Cart from "./pages/Cart";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";
import ProductDetail from "./pages/ProductDetail";
import Demo from "./pages/Demo";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <CartProvider>
          <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/demo" element={<Demo />} />
              <Route path="/favorites" element={<Favorites />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
          </TooltipProvider>
        </CartProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
