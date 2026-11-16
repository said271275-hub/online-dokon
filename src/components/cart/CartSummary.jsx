import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowRight, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

/**
 * Savat xulosasi — jami summa va buyurtmaga o'tish
 */
const CartSummary = () => {
  const { cart, totalPrice, totalItems } = useCart();

  if (cart.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200/80 dark:border-slate-700 shadow-sm p-6 space-y-5 sticky top-24">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
        Buyurtma xulosasi
      </h3>

      {/* Hisob-kitob */}
      <div className="space-y-3 text-sm">
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
          <span>Mahsulotlar ({totalItems} ta)</span>
          <span className="font-medium text-gray-800 dark:text-gray-200">{formatPrice(totalPrice)}</span>
        </div>
        <div className="flex items-center justify-between text-gray-600 dark:text-gray-400">
          <span>Yetkazib berish</span>
          <span className="font-medium text-emerald-600 dark:text-emerald-400">Bepul</span>
        </div>
        <div className="h-px bg-gray-200 dark:bg-slate-700" />
        <div className="flex items-center justify-between">
          <span className="text-base font-bold text-gray-900 dark:text-white">Jami</span>
          <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">
            {formatPrice(totalPrice)}
          </span>
        </div>
      </div>

      {/* Buyurtmaga o'tish */}
      <Link
        to="/checkout"
        className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200"
      >
        <span>Buyurtma berish</span>
        <ArrowRight className="w-4 h-4" />
      </Link>

      {/* Kafolatlar */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
          <span>Xavfsiz to'lov kafolati</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Truck className="w-4 h-4 text-indigo-500 flex-shrink-0" />
          <span>1–3 kun ichida yetkazib berish</span>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
