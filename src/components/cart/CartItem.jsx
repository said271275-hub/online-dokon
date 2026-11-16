import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';

/**
 * Savatdagi bitta mahsulot qatori
 * Miqdorni oshirish/kamaytirish, o'chirish
 *
 * @param {Object} item - Savatdagi mahsulot (product + quantity)
 */
const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200/80 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
      {/* Rasm */}
      <Link
        to={`/product/${item.id}`}
        className="w-full sm:w-24 h-32 sm:h-24 flex-shrink-0 rounded-xl bg-gray-50 dark:bg-slate-900/50 overflow-hidden flex items-center justify-center"
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain p-2"
          loading="lazy"
        />
      </Link>

      {/* Ma'lumotlar */}
      <div className="flex-grow min-w-0 space-y-2">
        <Link
          to={`/product/${item.id}`}
          className="block text-sm font-semibold text-gray-800 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors line-clamp-2"
        >
          {item.title}
        </Link>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Dona narxi: {formatPrice(item.price)}
        </p>
      </div>

      {/* Miqdor boshqaruvi va narx */}
      <div className="flex items-center justify-between sm:justify-end gap-4 sm:gap-6 w-full sm:w-auto flex-shrink-0">
        {/* Miqdorni o'zgartirish */}
        <div className="flex items-center rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition-colors"
            aria-label="Kamaytirish"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span className="w-10 text-center font-bold text-gray-900 dark:text-white text-sm">
            {item.quantity}
          </span>
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-2.5 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-500 dark:text-gray-400 transition-colors"
            aria-label="Oshirish"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Jami narx */}
        <p className="text-base font-bold text-gray-900 dark:text-white whitespace-nowrap min-w-[120px] text-right">
          {formatPrice(item.price * item.quantity)}
        </p>

        {/* O'chirish tugmasi */}
        <button
          onClick={() => removeFromCart(item.id)}
          className="p-2.5 rounded-xl text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all"
          aria-label="Savatdan o'chirish"
          title="O'chirish"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
