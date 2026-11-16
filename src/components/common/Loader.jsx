import React from 'react';

/**
 * Aylanuvchi yuklanish animatsiyasi
 * @param {string} size - 'sm' | 'md' | 'lg'
 * @param {string} className - Qo'shimcha CSS klasslar
 */
export const Loader = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`${sizeClasses[size]} rounded-full border-indigo-200 border-t-indigo-600 dark:border-slate-700 dark:border-t-indigo-400 animate-spin`}
      />
    </div>
  );
};

/**
 * To'liq sahifa yuklanish ekrani
 */
export const FullPageLoader = () => (
  <div className="min-h-[400px] flex flex-col items-center justify-center gap-4">
    <Loader size="lg" />
    <p className="text-sm text-gray-500 dark:text-gray-400 animate-pulse">
      Yuklanmoqda...
    </p>
  </div>
);

export default Loader;
