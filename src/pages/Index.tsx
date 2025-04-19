
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { useApp } from '@/context/AppContext';

const Index = () => {
  const { products } = useApp();
  
  // Get top-rated products (A and B ratings)
  const topRatedProducts = products
    .filter(product => ['A', 'B'].includes(product.ecoRating))
    .slice(0, 4);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-eco-green to-eco-light-green">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Shop Smarter, Shop Greener
              </h1>
              <p className="text-lg mb-6">
                Discover eco-friendly products and sustainable alternatives to your favorite items.
                Our rating system helps you make informed choices for a healthier planet.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button 
                  asChild
                  size="lg" 
                  className="bg-white text-primary hover:bg-white/90"
                >
                  <Link to="/products">Explore Products</Link>
                </Button>
                <Button 
                  asChild
                  variant="outline" 
                  size="lg" 
                  className="bg-transparent border-white text-white hover:bg-white/10"
                >
                  <Link to="/eco-guide">Learn About Our Ratings</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                alt="Sustainable shopping" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How EcoCart Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Browse Products</h3>
              <p className="text-muted-foreground">
                Explore our catalog of products with transparent eco-friendly ratings.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Check Ratings</h3>
              <p className="text-muted-foreground">
                Each product is rated from A to F based on materials, manufacturing, and brand ethics.
              </p>
            </div>
            
            <div className="bg-card p-6 rounded-lg shadow-sm text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-primary">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Make Better Choices</h3>
              <p className="text-muted-foreground">
                Discover greener alternatives and make informed sustainable purchases.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Top Rated Products</h2>
            <Link to="/products" className="text-primary hover:underline">
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {topRatedProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      
      {/* Eco-categories */}
      <section className="py-16 bg-gradient-to-r from-eco-leaf/20 to-eco-sand/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop By Category</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link to="/products?category=kitchenware" className="group relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1556911073-38141963c9e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                alt="Kitchen & Home" 
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-xl font-semibold text-white">Kitchen & Home</h3>
              </div>
            </Link>
            
            <Link to="/products?category=personal-care" className="group relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1576426863848-c21f53c60b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                alt="Personal Care" 
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-xl font-semibold text-white">Personal Care</h3>
              </div>
            </Link>
            
            <Link to="/products?category=clothing" className="group relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                alt="Clothing" 
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-xl font-semibold text-white">Clothing</h3>
              </div>
            </Link>
            
            <Link to="/products?category=stationery" className="group relative overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60"
                alt="Stationery" 
                className="w-full h-64 object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <h3 className="text-xl font-semibold text-white">Stationery</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="py-16 bg-accent">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">
              Stay Updated on Sustainable Shopping
            </h2>
            <p className="text-accent-foreground mb-6">
              Join our newsletter to receive eco-friendly product recommendations,
              sustainability tips, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow rounded-md border border-input px-4 py-2"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
