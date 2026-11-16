import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { ToastProvider } from './context/ToastContext';

import Header from './components/common/Header';
import Footer from './components/common/Footer';
import ToastContainer from './components/common/Toast';

import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Favorites from './pages/Favorites';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <FavoritesProvider>
          <ToastProvider>
            <Router>
              <div className="min-h-screen flex flex-col bg-gray-50 text-gray-900 dark:bg-slate-900 dark:text-gray-100 transition-colors duration-200">
                <Header />
                <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/product/:id" element={<ProductDetail />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/order-success" element={<OrderSuccess />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
                <Footer />
                <ToastContainer />
              </div>
            </Router>
          </ToastProvider>
        </FavoritesProvider>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;
