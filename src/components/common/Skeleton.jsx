import React from 'react';

/**
 * Mahsulot kartochkasi uchun yuklanish skeleti
 * API javob kutilayotganda ko'rsatiladi
 */
export const ProductCardSkeleton = () => (
  <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200/80 dark:border-slate-700 overflow-hidden animate-pulse">
    {/* Rasm joyi */}
    <div className="bg-gray-200 dark:bg-slate-700 h-56 w-full" />
    <div className="p-4 space-y-3">
      {/* Kategoriya */}
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full w-1/3" />
      {/* Sarlavha */}
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-full w-full" />
      <div className="h-4 bg-gray-200 dark:bg-slate-700 rounded-full w-4/5" />
      {/* Reyting */}
      <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full w-1/2" />
      {/* Narx va tugma */}
      <div className="flex items-center justify-between pt-2">
        <div className="h-5 bg-gray-200 dark:bg-slate-700 rounded-full w-1/3" />
        <div className="h-9 bg-gray-200 dark:bg-slate-700 rounded-xl w-28" />
      </div>
    </div>
  </div>
);

/**
 * Ko'p skepaletni render qilish uchun yordamchi
 * @param {number} count - Ko'rsatiladigan skelet soni
 */
export const ProductGridSkeleton = ({ count = 8 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
    {Array.from({ length: count }).map((_, i) => (
      <ProductCardSkeleton key={i} />
    ))}
  </div>
);

export default ProductCardSkeleton;
