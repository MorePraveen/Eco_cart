
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { Product, useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useApp();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };
  
  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'A': return 'bg-eco-green text-white';
      case 'B': return 'bg-eco-light-green text-white';
      case 'C': return 'bg-eco-leaf text-black';
      case 'D': return 'bg-amber-400 text-black';
      case 'F': return 'bg-red-500 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  return (
    <div className="group relative overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-md">
      <Link to={`/products/${product.id}`} className="block h-full">
        <div className="relative aspect-square overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-2 right-2">
            <span className={`inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${getRatingColor(product.ecoRating)}`}>
              {product.ecoRating}
            </span>
          </div>
        </div>
        
        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-medium line-clamp-1">{product.name}</h3>
            <span className="font-semibold">${product.price.toFixed(2)}</span>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.description}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-4">
            <Badge variant="outline" className="text-xs">{product.brand}</Badge>
            <Badge variant="outline" className="text-xs">{product.category}</Badge>
          </div>
          
          <Button 
            onClick={handleAddToCart}
            size="sm" 
            className="w-full"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
