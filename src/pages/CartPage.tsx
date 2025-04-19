
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Trash2, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import EcoRatingBadge from '@/components/products/EcoRatingBadge';

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity, isAuthenticated } = useApp();
  
  const subtotal = cart.reduce((total, item) => 
    total + (item.product.price * item.quantity), 0
  );
  
  const shipping = subtotal > 0 ? 5.99 : 0;
  const tax = subtotal * 0.07; // 7% tax rate
  const total = subtotal + shipping + tax;
  
  // Calculate the average eco rating of cart items
  const calculateAverageRating = () => {
    if (cart.length === 0) return null;
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const ratingValues = {
      'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1
    };
    
    const ratingSum = cart.reduce((sum, item) => {
      return sum + (ratingValues[item.product.ecoRating as keyof typeof ratingValues] * item.quantity);
    }, 0);
    
    const averageValue = ratingSum / totalItems;
    
    // Convert back to letter grade
    if (averageValue >= 4.5) return 'A';
    if (averageValue >= 3.5) return 'B';
    if (averageValue >= 2.5) return 'C';
    if (averageValue >= 1.5) return 'D';
    return 'F';
  };
  
  const cartRating = calculateAverageRating();

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center text-sm text-primary hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Continue shopping
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border border-border overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Cart Items ({cart.reduce((total, item) => total + item.quantity, 0)})</h2>
                  
                  {cart.map((item) => (
                    <div key={item.product.id} className="mb-6">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-24 sm:h-24 aspect-square rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <div>
                              <Link 
                                to={`/products/${item.product.id}`}
                                className="font-medium hover:text-primary"
                              >
                                {item.product.name}
                              </Link>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="text-muted-foreground text-sm">
                                  ${item.product.price.toFixed(2)}
                                </span>
                                <EcoRatingBadge rating={item.product.ecoRating} size="sm" />
                              </div>
                            </div>
                            
                            <div className="text-right">
                              <span className="font-medium">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center border border-input rounded-md">
                              <button
                                onClick={() => updateCartItemQuantity(
                                  item.product.id, 
                                  Math.max(0, item.quantity - 1)
                                )}
                                className="px-2 py-1 text-sm border-r border-input"
                              >
                                -
                              </button>
                              <span className="px-3 py-1 text-sm">{item.quantity}</span>
                              <button
                                onClick={() => updateCartItemQuantity(
                                  item.product.id, 
                                  item.quantity + 1
                                )}
                                className="px-2 py-1 text-sm border-l border-input"
                              >
                                +
                              </button>
                            </div>
                            
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              className="text-muted-foreground hover:text-destructive transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <Separator className="mt-6" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  
                  {cartRating && (
                    <div className="bg-muted p-4 rounded-lg mb-6">
                      <div className="flex items-center gap-3">
                        <div>
                          <span className="block text-sm font-medium mb-1">Cart Eco Rating</span>
                          <EcoRatingBadge rating={cartRating} size="md" />
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {cartRating === 'A' && "Excellent! Your cart is very eco-friendly."}
                          {cartRating === 'B' && "Great! Your cart has good sustainability."}
                          {cartRating === 'C' && "Your cart has average eco-friendliness."}
                          {cartRating === 'D' && "Your cart could be more sustainable."}
                          {cartRating === 'F' && "Consider adding more eco-friendly products."}
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full mt-6" 
                    size="lg"
                    disabled={!isAuthenticated}
                    asChild={!isAuthenticated}
                  >
                    {!isAuthenticated ? (
                      <Link to="/login">Login to Checkout</Link>
                    ) : (
                      <>Proceed to Checkout</>
                    )}
                  </Button>
                  
                  {!isAuthenticated && (
                    <p className="text-sm text-muted-foreground mt-2 text-center">
                      Please log in to complete your purchase
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-card rounded-lg border border-border">
            <div className="max-w-md mx-auto">
              <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild>
                <Link to="/products">Start Shopping</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CartPage;
