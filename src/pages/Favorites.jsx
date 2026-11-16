import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';
import ProductCard from '../components/product/ProductCard';

/**
 * Sevimlilar sahifasi
 * Saqlangan mahsulotlar ro'yxati va ularni boshqarish
 */
const Favorites = () => {
  const { favorites, totalFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddAllToCart = () => {
    favorites.forEach((product) => {
      addToCart(product, 1);
    });
    showToast(`Barcha sevimlilar (${totalFavorites} ta) savatga qo'shildi! 🛒`, 'success');
  };

  return (
    <div className="py-8 space-y-6">
      {/* Sarlavha va amallar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-200 dark:border-slate-800">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <span>Sevimlilar</span>
            {totalFavorites > 0 && (
              <span className="text-sm font-semibold px-2.5 py-1 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300">
                {totalFavorites} ta
              </span>
            )}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Sizga yoqqan va keyinroq xarid qilish uchun saqlangan tovarlar
          </p>
        </div>

        {totalFavorites > 0 && (
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <button
              onClick={handleAddAllToCart}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-600/20 transition-all duration-200"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Hammasini savatga qo'shish</span>
            </button>
            <button
              onClick={clearFavorites}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-rose-600 hover:text-rose-700 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 text-sm font-semibold transition-all duration-200"
            >
              <Trash2 className="w-4 h-4" />
              <span>Tozalash</span>
            </button>
          </div>
        )}
      </div>

      {/* Bo'sh ro'yxat holati */}
      {totalFavorites === 0 ? (
        <div className="text-center py-20 px-4 rounded-3xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 space-y-5">
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-500">
            <Heart className="w-10 h-10" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Sevimlilar ro'yxatingiz bo'sh
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
              Mahsulot kartochkalaridagi yurakcha belgisini bosib, o'zingizga ma'qul bo'lgan tovarlarni shu yerga to'plashingiz mumkin.
            </p>
          </div>
          <div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
            >
              <span>Mahsulotlar katalogiga o'tish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Mahsulotlar to'ri */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
