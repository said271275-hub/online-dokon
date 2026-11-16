import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Mail, Phone, MapPin, Github, Send } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800 transition-colors duration-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Kompaniya tavsifi */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400 bg-clip-text text-transparent">
                Bozorcha
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              O'zbekistondagi eng qulay va zamonaviy online xarid platformasi. Sifatli mahsulotlar va tezkor yetkazib berish xizmati.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tezkor havolalar */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Tezkor havolalar
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Barcha mahsulotlar
                </Link>
              </li>
              <li>
                <Link to="/favorites" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Sevimlilar
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Xarid savati
                </Link>
              </li>
            </ul>
          </div>

          {/* Toifalar */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Toifalar
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/products?category=electronics" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Elektronika
                </Link>
              </li>
              <li>
                <Link to="/products?category=jewelery" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Zargarlik buyumlari
                </Link>
              </li>
              <li>
                <Link to="/products?category=men's clothing" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Erkaklar kiyimi
                </Link>
              </li>
              <li>
                <Link to="/products?category=women's clothing" className="text-gray-600 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 transition-colors">
                  Ayollar kiyimi
                </Link>
              </li>
            </ul>
          </div>

          {/* Bog'lanish */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Bog'lanish
            </h3>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5" />
                <span>Toshkent shahar, Chilonzor tumani, Bunyodkor shoh ko'chasi</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span>+998 (71) 200-00-00</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                <span>info@bozorcha.uz</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Pastki chiziq va copyright */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} Bozorcha. Barcha huquqlar himoyalangan.</p>
          <p className="flex items-center gap-1">
            <span>Portfolio uchun mehr bilan yaratildi</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
