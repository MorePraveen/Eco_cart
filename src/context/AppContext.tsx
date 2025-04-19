import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  ecoRating: 'A' | 'B' | 'C' | 'D' | 'F';
  category: string;
  brand: string;
  materials: string[];
  alternatives?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface AppContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  cart: CartItem[];
  products: Product[];
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  fetchProducts: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  // Load user data from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('ecoCartUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user data', error);
        localStorage.removeItem('ecoCartUser');
      }
    }
    
    // Load cart from localStorage
    const storedCart = localStorage.getItem('ecoCartItems');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (error) {
        console.error('Failed to parse stored cart data', error);
        localStorage.removeItem('ecoCartItems');
      }
    }
    
    setIsLoading(false);
    
    // Fetch products on mount
    fetchProducts();
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ecoCartItems', JSON.stringify(cart));
  }, [cart]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would make an API call to your backend here
      // For demo, we'll mock a successful login
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Login failed');
      }
      
      const userData = await response.json();
      setUser(userData);
      localStorage.setItem('ecoCartUser', JSON.stringify(userData));
      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
      // Since we're mocking, let's simulate a successful login for demo purposes
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: email
      };
      setUser(mockUser);
      localStorage.setItem('ecoCartUser', JSON.stringify(mockUser));
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // In a real app, you would make an API call to your backend here
      // For demo, we'll mock a successful registration
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Registration failed');
      }
      
      toast.success('Registered successfully. Please log in.');
    } catch (error) {
      console.error('Registration error:', error);
      toast.error('Registration failed. Please try again.');
      // For demo purposes, let's pretend it succeeded
      toast.success('Registered successfully. You can now log in.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ecoCartUser');
    toast.info('Logged out successfully');
  };

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      
      if (existingItem) {
        // If item already exists in cart, increase quantity
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // Otherwise add new item to cart
        return [...prevCart, { product, quantity: 1 }];
      }
    });
    
    toast.success(`${product.name} added to cart`);
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    toast.info('Item removed from cart');
  };

  const updateCartItemQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.product.id === productId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const fetchProducts = async () => {
    try {
      // In a real app, you would make an API call to your MongoDB backend here
      // For demo, we'll use mock data
      
      // const response = await fetch('/api/products');
      // if (!response.ok) {
      //   throw new Error('Failed to fetch products');
      // }
      // const data = await response.json();
      // setProducts(data);
      
      // Mock product data
      const mockProducts: Product[] = [
        {
          id: '1',
          name: 'Eco-Friendly Water Bottle',
          description: 'Made from 100% recycled materials, this water bottle is BPA-free and environmentally friendly.',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8',
          ecoRating: 'A',
          category: 'Kitchenware',
          brand: 'EcoLife',
          materials: ['Recycled Stainless Steel', 'Plant-based Plastic'],
          alternatives: ['2', '3']
        },
        {
          id: '2',
          name: 'Bamboo Toothbrush',
          description: 'Biodegradable bamboo toothbrush with plant-based bristles.',
          price: 4.99,
          image: 'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04',
          ecoRating: 'A',
          category: 'Personal Care',
          brand: 'GreenSmile',
          materials: ['Bamboo', 'Plant-based Nylon'],
          alternatives: ['4']
        },
        {
          id: '3',
          name: 'Organic Cotton T-shirt',
          description: 'Soft and comfortable t-shirt made from 100% organic cotton.',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
          ecoRating: 'B',
          category: 'Clothing',
          brand: 'EarthWear',
          materials: ['Organic Cotton'],
          alternatives: ['6']
        },
        {
          id: '4',
          name: 'Plastic Toothbrush',
          description: 'Standard toothbrush with nylon bristles.',
          price: 1.99,
          image: 'https://images.unsplash.com/photo-1559381313-e3c99451063a',
          ecoRating: 'D',
          category: 'Personal Care',
          brand: 'CleanDent',
          materials: ['Plastic', 'Nylon'],
          alternatives: ['2']
        },
        {
          id: '5',
          name: 'Reusable Shopping Bag',
          description: 'Durable shopping bag made from recycled plastic bottles.',
          price: 12.99,
          image: 'https://images.unsplash.com/photo-1595460879157-4ff13989d27f',
          ecoRating: 'A',
          category: 'Home Goods',
          brand: 'EcoTote',
          materials: ['Recycled Polyester'],
          alternatives: []
        },
        {
          id: '6',
          name: 'Fast Fashion T-shirt',
          description: 'Trendy t-shirt made from conventional cotton.',
          price: 9.99,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab',
          ecoRating: 'F',
          category: 'Clothing',
          brand: 'TrendFast',
          materials: ['Conventional Cotton', 'Polyester'],
          alternatives: ['3']
        },
        {
          id: '7',
          name: 'Recycled Paper Notebook',
          description: 'Notebook made from 100% post-consumer recycled paper.',
          price: 7.99,
          image: 'https://images.unsplash.com/photo-1531346680769-a1e79e0d31cc',
          ecoRating: 'A',
          category: 'Stationery',
          brand: 'GreenWrite',
          materials: ['Recycled Paper', 'Soy-based Ink'],
          alternatives: []
        },
        {
          id: '8',
          name: 'Sustainable Yoga Mat',
          description: 'Eco-friendly yoga mat made from natural rubber and recycled materials.',
          price: 68.99,
          image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f',
          ecoRating: 'B',
          category: 'Fitness',
          brand: 'EcoYoga',
          materials: ['Natural Rubber', 'Recycled Microfiber'],
          alternatives: []
        },
      ];
      
      setProducts(mockProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products. Please try again later.');
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        cart,
        products,
        login,
        register,
        logout,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        fetchProducts
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
