
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from '@/components/ui/checkbox';

const ProductsPage = () => {
  const { products } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  const categoryParam = searchParams.get('category')?.toLowerCase();
  const ratingParam = searchParams.get('rating')?.toUpperCase();
  
  // Get unique categories and brands
  const categories = [...new Set(products.map(p => p.category))];
  const brands = [...new Set(products.map(p => p.brand))];
  
  // Filter states
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<string[]>(
    ratingParam ? [ratingParam] : []
  );
  const [sortBy, setSortBy] = useState('featured');
  
  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Filter by category
    if (selectedCategories.length > 0) {
      result = result.filter(product => 
        selectedCategories.some(category => 
          product.category.toLowerCase() === category.toLowerCase()
        )
      );
    }
    
    // Filter by brand
    if (selectedBrands.length > 0) {
      result = result.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }
    
    // Filter by eco rating
    if (selectedRatings.length > 0) {
      result = result.filter(product => 
        selectedRatings.includes(product.ecoRating)
      );
    }
    
    // Sort products
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => {
          const ratingOrder = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1 };
          return (ratingOrder[b.ecoRating as keyof typeof ratingOrder] || 0) - 
                 (ratingOrder[a.ecoRating as keyof typeof ratingOrder] || 0);
        });
        break;
      case 'rating-asc':
        result.sort((a, b) => {
          const ratingOrder = { 'A': 5, 'B': 4, 'C': 3, 'D': 2, 'F': 1 };
          return (ratingOrder[a.ecoRating as keyof typeof ratingOrder] || 0) - 
                 (ratingOrder[b.ecoRating as keyof typeof ratingOrder] || 0);
        });
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // 'featured' - no specific sort
        break;
    }
    
    setFilteredProducts(result);
    
    // Update URL params for category and rating
    const params = new URLSearchParams();
    if (selectedCategories.length === 1) {
      params.set('category', selectedCategories[0]);
    }
    if (selectedRatings.length === 1) {
      params.set('rating', selectedRatings[0]);
    }
    setSearchParams(params);
  }, [products, selectedCategories, selectedBrands, selectedRatings, sortBy, setSearchParams]);
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };
  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand) 
        : [...prev, brand]
    );
  };
  
  const handleRatingChange = (rating: string) => {
    setSelectedRatings(prev => 
      prev.includes(rating) 
        ? prev.filter(r => r !== rating) 
        : [...prev, rating]
    );
  };
  
  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setSortBy('featured');
    setSearchParams({});
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="md:w-1/4 lg:w-1/5">
            <div className="bg-card rounded-lg border border-border p-4 sticky top-20">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Filters</h2>
                <button 
                  onClick={clearFilters}
                  className="text-sm text-primary hover:underline"
                >
                  Clear all
                </button>
              </div>
              
              {/* Active filters */}
              {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedRatings.length > 0) && (
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-2">Active filters:</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedCategories.map(category => (
                      <Badge 
                        key={category} 
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {category}
                        <button 
                          onClick={() => handleCategoryChange(category)}
                          className="ml-1 hover:bg-secondary-foreground/10 rounded-full w-4 h-4 inline-flex items-center justify-center"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedBrands.map(brand => (
                      <Badge 
                        key={brand} 
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {brand}
                        <button 
                          onClick={() => handleBrandChange(brand)}
                          className="ml-1 hover:bg-secondary-foreground/10 rounded-full w-4 h-4 inline-flex items-center justify-center"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                    {selectedRatings.map(rating => (
                      <Badge 
                        key={rating} 
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        Rating {rating}
                        <button 
                          onClick={() => handleRatingChange(rating)}
                          className="ml-1 hover:bg-secondary-foreground/10 rounded-full w-4 h-4 inline-flex items-center justify-center"
                        >
                          ×
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Category Filter */}
              <Accordion type="single" collapsible defaultValue="category" className="w-full">
                <AccordionItem value="category" className="border-b">
                  <AccordionTrigger className="text-sm font-medium">
                    Categories
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`category-${category}`} 
                            checked={selectedCategories.includes(category.toLowerCase())}
                            onCheckedChange={() => handleCategoryChange(category.toLowerCase())}
                          />
                          <label 
                            htmlFor={`category-${category}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Brand Filter */}
                <AccordionItem value="brand" className="border-b">
                  <AccordionTrigger className="text-sm font-medium">
                    Brands
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {brands.map(brand => (
                        <div key={brand} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`brand-${brand}`} 
                            checked={selectedBrands.includes(brand)}
                            onCheckedChange={() => handleBrandChange(brand)}
                          />
                          <label 
                            htmlFor={`brand-${brand}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {brand}
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                
                {/* Eco Rating Filter */}
                <AccordionItem value="rating" className="border-b">
                  <AccordionTrigger className="text-sm font-medium">
                    Eco Rating
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-2">
                      {['A', 'B', 'C', 'D', 'F'].map(rating => (
                        <div key={rating} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`rating-${rating}`} 
                            checked={selectedRatings.includes(rating)}
                            onCheckedChange={() => handleRatingChange(rating)}
                          />
                          <label 
                            htmlFor={`rating-${rating}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {rating} Rating
                          </label>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="md:w-3/4 lg:w-4/5">
            {/* Sorting and Results Count */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-muted-foreground">
                Showing {filteredProducts.length} results
              </p>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="rating-desc">Eco Rating: Best First</SelectItem>
                  <SelectItem value="rating-asc">Eco Rating: Worst First</SelectItem>
                  <SelectItem value="name-asc">Name: A to Z</SelectItem>
                  <SelectItem value="name-desc">Name: Z to A</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your filters or search criteria.
                </p>
                <button 
                  onClick={clearFilters}
                  className="text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
