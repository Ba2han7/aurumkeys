import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useSearch } from "@/hooks/useSearch";
import { useCart } from "@/contexts/CartContext";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const [query, setQuery] = useState('');
  const { searchResults, isLoading, startSearch } = useSearch();
  const { addItem } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      startSearch(query.trim());
    }
  };

  const handleAddToCart = (product: any) => {
    addItem({
      id: product.id,
      name: product.name,
      brand: product.categories?.name || "Premium Brand",
      price: product.price,
      image: product.image_url || '/src/assets/premium-keyboard.jpg',
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Products
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <Input
            type="text"
            placeholder="Search for instruments, brands, models..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
            autoFocus
          />
          <Button type="submit" variant="premium">
            Search
          </Button>
        </form>

        <div className="overflow-y-auto max-h-96">
          {isLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Searching...
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <img
                    src={product.image_url || '/src/assets/premium-keyboard.jpg'}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-dark">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.categories?.name}
                    </p>
                    <p className="font-bold text-gold">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    variant="premium"
                    size="sm"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </div>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-8 text-muted-foreground">
              No products found for "{query}"
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              Enter a search term to find products
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;