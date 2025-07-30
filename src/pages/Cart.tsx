import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <h1 className="text-4xl font-serif font-bold text-dark mb-4">Your Cart</h1>
            <p className="text-xl text-muted-foreground mb-8">Your cart is empty</p>
            <Link to="/explore">
              <Button variant="premium" size="lg">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-gold transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-serif font-bold text-dark mb-8">Shopping Cart</h1>
            
            <div className="space-y-6">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-6 bg-card rounded-xl shadow-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-dark">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.brand}</p>
                    <p className="text-lg font-semibold text-dark">${item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-card p-6 rounded-xl shadow-lg sticky top-24">
              <h2 className="text-2xl font-bold text-dark mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="font-semibold">${state.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-dark">${state.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
              
              <Button variant="premium" className="w-full mb-4" size="lg">
                Proceed to Checkout
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full" 
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;