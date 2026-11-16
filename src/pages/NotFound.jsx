import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="py-20 text-center max-w-lg mx-auto space-y-6">
      <div className="w-20 h-20 mx-auto rounded-3xl bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
        <AlertTriangle className="w-10 h-10" />
      </div>
      <div className="space-y-2">
        <h1 className="text-6xl font-black text-indigo-600 dark:text-indigo-400">404</h1>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Sahifa topilmadi</h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Kechirasiz, siz qidirayotgan sahifa mavjud emas yoki boshqa manzilga ko'chirilgan bo'lishi mumkin.
        </p>
      </div>
      <div className="pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors shadow-md"
        >
          <Home className="w-4 h-4" />
          <span>Bosh sahifaga qaytish</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
