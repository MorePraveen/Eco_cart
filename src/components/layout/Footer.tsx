
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">EcoCart</h3>
            <p className="text-sm">
              Helping you make more sustainable shopping choices, one product at a time.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/products" className="hover:underline">All Products</Link></li>
              <li><Link to="/products?rating=A" className="hover:underline">Top Rated Products</Link></li>
              <li><Link to="/products?category=kitchenware" className="hover:underline">Kitchen & Home</Link></li>
              <li><Link to="/products?category=personal-care" className="hover:underline">Personal Care</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Learn</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/eco-guide" className="hover:underline">Eco Guide</Link></li>
              <li><Link to="/ratings-explained" className="hover:underline">Our Rating System</Link></li>
              <li><Link to="/sustainable-materials" className="hover:underline">Sustainable Materials</Link></li>
              <li><Link to="/blog" className="hover:underline">Blog</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:underline">Our Mission</Link></li>
              <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
              <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-secondary-foreground/20 mt-8 pt-6 text-center">
          <p className="text-xs">
            &copy; {new Date().getFullYear()} EcoCart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
