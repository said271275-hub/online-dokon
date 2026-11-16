import React from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';

// Toifalar ro'yxati (FakeStoreAPI toifalari)
export const CATEGORIES = [
  { value: 'all', label: 'Barchasi' },
  { value: 'electronics', label: 'Elektronika' },
  { value: 'jewelery', label: 'Zargarlik' },
  { value: "men's clothing", label: 'Erkaklar kiyimi' },
  { value: "women's clothing", label: 'Ayollar kiyimi' },
];

/**
 * Mahsulotlar filtri: qidiruv, toifa, narx oralig'i
 *
 * @param {string} search - Qidiruv matni
 * @param {Function} onSearch - Qidiruv o'zgarganda chaqiriladi
 * @param {string} category - Tanlangan toifa
 * @param {Function} onCategory - Toifa o'zgarganda chaqiriladi
 * @param {number} minPrice - Minimal narx (USD)
 * @param {number} maxPrice - Maksimal narx (USD)
 * @param {Function} onMinPrice - Min narx o'zgarganda
 * @param {Function} onMaxPrice - Maks narx o'zgarganda
 * @param {Function} onReset - Filtrlarni tozalash
 */
const ProductFilter = ({
  search,
  onSearch,
  category,
  onCategory,
  minPrice,
  maxPrice,
  onMinPrice,
  onMaxPrice,
  onReset,
}) => {
  const hasActiveFilters =
    search || category !== 'all' || minPrice || maxPrice;

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200/80 dark:border-slate-700 p-5 space-y-5 shadow-sm">
      {/* Sarlavha */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-semibold">
          <SlidersHorizontal className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
          <span>Filtrlar</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="flex items-center gap-1.5 text-xs text-rose-500 hover:text-rose-700 dark:hover:text-rose-400 font-medium transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Tozalash</span>
          </button>
        )}
      </div>

      {/* Qidiruv */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Mahsulot nomini kiriting..."
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all"
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Toifa filtri */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Toifa
        </label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              onClick={() => onCategory(cat.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                category === cat.value
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                  : 'bg-gray-100 dark:bg-slate-700/60 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Narx oralig'i (USD) */}
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          Narx oralig'i (USD)
        </label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            placeholder="Dan"
            value={minPrice}
            onChange={(e) => onMinPrice(e.target.value)}
            min={0}
            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
          <span className="text-gray-400 dark:text-gray-500 font-medium text-sm flex-shrink-0">—</span>
          <input
            type="number"
            placeholder="Gacha"
            value={maxPrice}
            onChange={(e) => onMaxPrice(e.target.value)}
            min={0}
            className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
