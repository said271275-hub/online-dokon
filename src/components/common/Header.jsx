import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ShoppingBag, Heart, Sun, Moon, Menu, X, Sparkles } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

export const Header = () => {
  const { isDark, toggleTheme } = useTheme();
  const { totalItems } = useCart();
  const { totalFavorites } = useFavorites();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // NavLink uchun faol klasslar
  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
      isActive
        ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/50'
        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800'
    }`;

  const mobileNavLinkClass = ({ isActive }) =>
    `block px-4 py-3 rounded-xl font-medium text-base transition-all duration-200 ${
      isActive
        ? 'text-indigo-600 bg-indigo-50 dark:text-indigo-400 dark:bg-indigo-950/50'
        : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-200 dark:hover:text-white dark:hover:bg-slate-800'
    }`;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-white/80 dark:bg-slate-900/80 border-b border-gray-200/80 dark:border-slate-800 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                Bozorcha
              </span>
              <span className="hidden sm:inline-block ml-1.5 text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300">
                Online
              </span>
            </div>
          </Link>

          {/* Desktop Navigatsiya */}
          <nav className="hidden md:flex items-center gap-2">
            <NavLink to="/" className={navLinkClass}>
              Bosh sahifa
            </NavLink>
            <NavLink to="/products" className={navLinkClass}>
              Mahsulotlar
            </NavLink>
          </nav>

          {/* O'ng tarafdagi harakatlar (Dark mode, Sevimlilar, Savat) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark mode tugmasi */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800 transition-all duration-200"
              aria-label="Rejimni o'zgartirish"
              title={isDark ? "Yorug' rejimga o'tish" : "Qorong'i rejimga o'tish"}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400 animate-spin-slow" />
              ) : (
                <Moon className="w-5 h-5 text-slate-700" />
              )}
            </button>

            {/* Sevimlilar tugmasi */}
            <Link
              to="/favorites"
              className="relative p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800 transition-all duration-200"
              aria-label="Sevimlilar"
              title="Sevimlilar"
            >
              <Heart className="w-5 h-5" />
              {totalFavorites > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-rose-500 text-white text-xs font-bold flex items-center justify-center shadow-sm">
                  {totalFavorites}
                </span>
              )}
            </Link>

            {/* Savat tugmasi */}
            <Link
              to="/cart"
              className="relative flex items-center gap-2 py-2 px-3 sm:px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200"
              aria-label="Savat"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Savat</span>
              {totalItems > 0 && (
                <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-white text-indigo-700 text-xs font-bold flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobil menyu tugmasi */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-slate-800 transition-all duration-200"
              aria-label="Menyu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobil menyu paneli */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200/80 dark:border-slate-800 animate-fade-in">
            <div className="flex flex-col gap-1.5">
              <NavLink
                to="/"
                className={mobileNavLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bosh sahifa
              </NavLink>
              <NavLink
                to="/products"
                className={mobileNavLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Mahsulotlar katalogi
              </NavLink>
              <NavLink
                to="/favorites"
                className={mobileNavLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sevimlilar ({totalFavorites})
              </NavLink>
              <NavLink
                to="/cart"
                className={mobileNavLinkClass}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Savat ({totalItems})
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
