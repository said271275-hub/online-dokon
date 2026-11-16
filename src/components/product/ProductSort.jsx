import React from 'react';
import { ArrowUpDown } from 'lucide-react';

// Saralash variantlari
export const SORT_OPTIONS = [
  { value: 'default', label: 'Standart' },
  { value: 'price-asc', label: 'Narx: arzondan qimmatlika' },
  { value: 'price-desc', label: 'Narx: qimmatdan arzonga' },
  { value: 'rating-desc', label: 'Reyting: yuqoridan pastga' },
  { value: 'name-asc', label: 'Nom: A — Z' },
];

/**
 * Saralash selektori
 * @param {string} value - Joriy saralash qiymati
 * @param {Function} onChange - Saralash o'zgarganda chaqiriladi
 */
const ProductSort = ({ value, onChange }) => {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm py-2 pl-3 pr-8 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 cursor-pointer appearance-none bg-no-repeat transition-all"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 12px center',
          backgroundSize: '12px',
        }}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductSort;
