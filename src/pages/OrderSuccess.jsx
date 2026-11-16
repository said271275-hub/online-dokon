import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ShoppingBag, ArrowRight, PartyPopper } from 'lucide-react';

/**
 * "Rahmat" sahifasi — buyurtma muvaffaqiyatli qabul qilingandan keyin
 */
const OrderSuccess = () => {
  // Confetti effekti (ixtiyoriy)
  useEffect(() => {
    const loadConfetti = async () => {
      try {
        const confetti = (await import('canvas-confetti')).default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#6366f1', '#a78bfa', '#22c55e', '#f59e0b'],
        });
      } catch {
        // Confetti yuklanmasa, hech narsa qilinmaydi
      }
    };
    loadConfetti();
  }, []);

  return (
    <div className="py-16 sm:py-24 text-center max-w-lg mx-auto space-y-6 px-4">
      {/* Muvaffaqiyat belgisi */}
      <div className="relative w-24 h-24 mx-auto">
        <div className="absolute inset-0 rounded-full bg-emerald-100 dark:bg-emerald-950/50 animate-ping opacity-30" />
        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-xl shadow-emerald-500/30">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
      </div>

      {/* Sarlavha */}
      <div className="space-y-3">
        <div className="flex items-center justify-center gap-2">
          <PartyPopper className="w-6 h-6 text-amber-500" />
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
            Tabriklaymiz!
          </h1>
          <PartyPopper className="w-6 h-6 text-amber-500 -scale-x-100" />
        </div>
        <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-400">
          Buyurtmangiz muvaffaqiyatli qabul qilindi
        </p>
      </div>

      {/* Tushuntirish */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200/80 dark:border-slate-700 p-6 space-y-3 text-left">
        <h3 className="font-semibold text-gray-900 dark:text-white text-sm">Keyingi qadamlar:</h3>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Operatorimiz tez orada siz bilan bog'lanadi</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Yetkazib berish vaqti kelishiladi</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <span>Mahsulot qo'lingizga yetkazib beriladi</span>
          </li>
        </ul>
      </div>

      {/* Harakatlar */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-600/20"
        >
          <ShoppingBag className="w-5 h-5" />
          <span>Bosh sahifaga qaytish</span>
        </Link>
        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all"
        >
          <span>Xaridni davom ettirish</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
