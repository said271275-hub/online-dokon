import React from 'react';
import { PackageOpen } from 'lucide-react';
import ProductCard from './ProductCard';

/**
 * Mahsulotlar to'ri (grid)
 * @param {Array} products - Mahsulotlar ro'yxati
 */
const ProductGrid = ({ products }) => {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400">
          <PackageOpen className="w-8 h-8" />
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            Mahsulotlar topilmadi
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            Qidiruv yoki filtr shartlarini o'zgartirib ko'ring
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
