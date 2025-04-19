
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { useApp, Product } from '@/context/AppContext';
import EcoRatingBadge from '@/components/products/EcoRatingBadge';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from '@/components/products/ProductCard';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { products, addToCart } = useApp();
  const [product, setProduct] = useState<Product | null>(null);
  const [alternatives, setAlternatives] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  
  useEffect(() => {
    if (id && products.length > 0) {
      const foundProduct = products.find(p => p.id === id);
      if (foundProduct) {
        setProduct(foundProduct);
        
        // Get alternative products
        if (foundProduct.alternatives && foundProduct.alternatives.length > 0) {
          const alternativeProducts = products.filter(p => 
            foundProduct.alternatives?.includes(p.id)
          );
          setAlternatives(alternativeProducts);
        } else {
          // If no alternatives specified, suggest products with better ratings in same category
          const betterRatedAlternatives = products.filter(p => 
            p.id !== foundProduct.id && 
            p.category === foundProduct.category &&
            getRatingValue(p.ecoRating) > getRatingValue(foundProduct.ecoRating)
          );
          setAlternatives(betterRatedAlternatives.slice(0, 3));
        }
      }
    }
  }, [id, products]);
  
  const getRatingValue = (rating: string) => {
    const ratingValues: Record<string, number> = {
      'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1
    };
    return ratingValues[rating] || 0;
  };
  
  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
    }
  };
  
  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <h1 className="text-2xl font-bold mb-4">Product not found</h1>
            <p className="mb-4">The product you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/products">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to products
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/products" className="inline-flex items-center text-sm text-primary hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to products
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="aspect-square overflow-hidden rounded-lg border border-border bg-white">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute top-4 right-4">
                <EcoRatingBadge rating={product.ecoRating} size="lg" />
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
                <Badge variant="outline">{product.brand}</Badge>
                <Badge variant="outline">{product.category}</Badge>
              </div>
              <p className="text-lg text-muted-foreground mb-6">
                {product.description}
              </p>
              
              {/* Rating Explanation */}
              <div className="bg-muted p-4 rounded-lg mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <EcoRatingBadge rating={product.ecoRating} showLabel />
                  <div>
                    <h3 className="font-semibold">Eco Rating Explained</h3>
                    <p className="text-sm text-muted-foreground">
                      {product.ecoRating === 'A' && "Excellent sustainability score - made from eco-friendly materials with ethical manufacturing"}
                      {product.ecoRating === 'B' && "Good sustainability score - mostly eco-friendly with some sustainable practices"}
                      {product.ecoRating === 'C' && "Average sustainability score - some eco-friendly aspects but room for improvement"}
                      {product.ecoRating === 'D' && "Below average sustainability score - few eco-friendly aspects"}
                      {product.ecoRating === 'F' && "Poor sustainability score - not eco-friendly, consider alternatives"}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Materials */}
              <div className="mb-6">
                <h3 className="font-semibold mb-2">Materials</h3>
                <div className="flex flex-wrap gap-2">
                  {product.materials.map((material, index) => (
                    <Badge key={index} variant="secondary">{material}</Badge>
                  ))}
                </div>
              </div>
              
              {/* Add to Cart */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center border border-input rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-lg border-r border-input"
                  >
                    -
                  </button>
                  <span className="px-4 py-2">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-lg border-l border-input"
                  >
                    +
                  </button>
                </div>
                
                <Button onClick={handleAddToCart} size="lg" className="flex-1">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
              
              <Separator className="my-8" />
              
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
                  <TabsTrigger value="care">Care Instructions</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="p-4">
                  <h3 className="font-semibold mb-2">Product Details</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    <li>Brand: {product.brand}</li>
                    <li>Category: {product.category}</li>
                    <li>Materials: {product.materials.join(', ')}</li>
                  </ul>
                </TabsContent>
                <TabsContent value="sustainability" className="p-4">
                  <h3 className="font-semibold mb-2">Sustainability Information</h3>
                  <p className="text-muted-foreground mb-4">
                    {product.ecoRating === 'A' && "This product is made with sustainable materials and ethical manufacturing processes. The brand is committed to reducing environmental impact."}
                    {product.ecoRating === 'B' && "This product uses mostly sustainable materials. The brand makes efforts to reduce environmental impact."}
                    {product.ecoRating === 'C' && "This product has some sustainable aspects but also uses conventional materials and production methods."}
                    {product.ecoRating === 'D' && "This product uses few sustainable materials and conventional production methods with limited environmental considerations."}
                    {product.ecoRating === 'F' && "This product uses materials and production methods that have significant environmental impact. Consider the greener alternatives below."}
                  </p>
                </TabsContent>
                <TabsContent value="care" className="p-4">
                  <h3 className="font-semibold mb-2">Care Instructions</h3>
                  <p className="text-muted-foreground">
                    {product.category === 'Clothing' && "Machine wash cold with like colors. Tumble dry low. Do not bleach."}
                    {product.category === 'Kitchenware' && "Hand wash recommended. Dishwasher safe on top rack."}
                    {product.category === 'Personal Care' && "Store in a cool, dry place. Replace as recommended for optimal use."}
                    {product.category === 'Home Goods' && "Spot clean as needed with mild soap and water."}
                    {product.category === 'Stationery' && "Keep away from moisture and direct sunlight."}
                    {product.category === 'Fitness' && "Wipe clean with damp cloth. Allow to air dry completely before storing."}
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        {/* Alternative Products */}
        {alternatives.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">
              {product.ecoRating === 'A' || product.ecoRating === 'B' 
                ? "Similar Sustainable Products" 
                : "Greener Alternatives"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {alternatives.map(altProduct => (
                <ProductCard key={altProduct.id} product={altProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
