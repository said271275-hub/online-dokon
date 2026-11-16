import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';

/**
 * Savat sahifasi
 * Mahsulotlar ro'yxati, miqdor boshqaruvi va jami hisob
 */
const Cart = () => {
  const { cart, totalItems, clearCart } = useCart();

  return (
    <div className="py-8 space-y-6">
      {/* Sarlavha */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Xarid savati
          </h1>
          {cart.length > 0 && (
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {totalItems} ta mahsulot
            </p>
          )}
        </div>
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Savatni tozalash</span>
          </button>
        )}
      </div>

      {/* Bo'sh savat */}
      {cart.length === 0 ? (
        <div className="text-center py-20 px-4 rounded-3xl bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-slate-700 space-y-5">
          <div className="w-20 h-20 mx-auto rounded-full bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <ShoppingBag className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Savatingiz hozircha bo'sh
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto text-sm leading-relaxed">
            Xaridni boshlash uchun mahsulotlar katalogiga o'ting va o'zingizga yoqqan mahsulotlarni tanlang.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
          >
            <span>Mahsulotlarni ko'rish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        /* Savat kontent */
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Mahsulotlar ro'yxati */}
          <div className="flex-grow space-y-4">
            {cart.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Xulosa paneli */}
          <div className="lg:w-80 flex-shrink-0">
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
