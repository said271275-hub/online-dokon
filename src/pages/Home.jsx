import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, ShoppingBag, ShieldCheck,
  Truck, Headphones, Sparkles, Cpu,
  Gem, Shirt, ArrowUpRight, AlertTriangle, RefreshCw
} from 'lucide-react';
import useFetch from '../hooks/useFetch';
import ProductCard from '../components/product/ProductCard';
import { ProductCardSkeleton } from '../components/common/Skeleton';

/** Toifalar ma'lumotlari */
const CATEGORIES = [
  {
    value: 'electronics',
    label: 'Elektronika',
    desc: 'Smartfonlar, noutbuklar, gadjetlar',
    icon: Cpu,
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
    textColor: 'text-blue-700 dark:text-blue-300',
  },
  {
    value: 'jewelery',
    label: 'Zargarlik',
    desc: 'Uzuklar, marjonlar, bilakuzuklar',
    icon: Gem,
    color: 'from-amber-400 to-orange-500',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
    textColor: 'text-amber-700 dark:text-amber-300',
  },
  {
    value: "men's clothing",
    label: 'Erkaklar kiyimi',
    desc: 'Ko\'ylaklar, shimlar, sportki',
    icon: Shirt,
    color: 'from-slate-500 to-gray-700',
    bg: 'bg-slate-50 dark:bg-slate-800/50',
    textColor: 'text-slate-700 dark:text-slate-300',
  },
  {
    value: "women's clothing",
    label: 'Ayollar kiyimi',
    desc: 'Ko\'ylaklar, yubkalar, bluzalar',
    icon: Shirt,
    color: 'from-rose-400 to-pink-600',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
    textColor: 'text-rose-700 dark:text-rose-300',
  },
];

/** Afzalliklar ro'yxati */
const FEATURES = [
  {
    icon: Truck,
    title: 'Tezkor yetkazish',
    desc: "O'zbekiston bo'ylab 24 soat ichida yetkazib beriladi",
    color: 'text-indigo-600 dark:text-indigo-400',
    bg: 'bg-indigo-50 dark:bg-indigo-950/60',
  },
  {
    icon: ShieldCheck,
    title: '100% Kafolat',
    desc: 'Faqat original va sertifikatlangan tovarlar',
    color: 'text-emerald-600 dark:text-emerald-400',
    bg: 'bg-emerald-50 dark:bg-emerald-950/60',
  },
  {
    icon: Headphones,
    title: "24/7 Qo'llab-quvvatlash",
    desc: 'Mijozlarimiz uchun tunu-kun yordam markazi',
    color: 'text-violet-600 dark:text-violet-400',
    bg: 'bg-violet-50 dark:bg-violet-950/60',
  },
  {
    icon: Sparkles,
    title: 'Qulay narxlar',
    desc: 'Har doim eng maqbul takliflar va aksiyalar',
    color: 'text-amber-600 dark:text-amber-400',
    bg: 'bg-amber-50 dark:bg-amber-950/60',
  },
];

/**
 * Bosh sahifa
 * Hero banner, afzalliklar, toifalar va Top 8 mahsulot
 */
const Home = () => {
  const { data: products, loading, error, refetch } = useFetch('/products');

  // Top 8 mahsulot: reyting bo'yicha
  const topProducts = products
    ? [...products]
        .sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0))
        .slice(0, 8)
    : [];

  return (
    <div className="space-y-16 py-8">
      {/* ===== HERO BANNER ===== */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 text-white p-8 sm:p-14 lg:p-20 shadow-2xl shadow-indigo-500/20">
        {/* Orqa fon dekoratsiyasi */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 to-transparent" />
        </div>

        <div className="relative z-10 max-w-2xl space-y-7">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md text-sm font-semibold border border-white/20">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Yangi mavsum chegirmalari — 50% gacha</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Eng sara<br />
            <span className="text-indigo-200">mahsulotlar</span><br />
            bir joyda!
          </h1>

          <p className="text-indigo-100/90 text-base sm:text-lg leading-relaxed max-w-lg">
            Zamonaviy elektronika, kiyim-kechak va zargarlik buyumlari eng arzon narxlarda va{' '}
            <strong className="text-white">bepul yetkazib berish</strong> bilan.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to="/products"
              className="inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl bg-white text-indigo-600 font-bold hover:bg-indigo-50 shadow-xl shadow-black/10 hover:shadow-black/20 transition-all duration-200 text-sm sm:text-base"
            >
              <ShoppingBag className="w-5 h-5" />
              <span>Xaridni boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 font-semibold transition-all duration-200 text-sm sm:text-base"
            >
              <span>Toifalarni ko'rish</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Statistika */}
          <div className="flex items-center gap-8 pt-4 border-t border-white/15">
            <div>
              <p className="text-2xl font-black">500+</p>
              <p className="text-xs text-indigo-200">Mahsulot</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-black">24/7</p>
              <p className="text-xs text-indigo-200">Yordam markazi</p>
            </div>
            <div className="w-px h-10 bg-white/20" />
            <div>
              <p className="text-2xl font-black">100%</p>
              <p className="text-xs text-indigo-200">Kafolat</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== AFZALLIKLAR ===== */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-gray-200/80 dark:border-slate-700 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
            >
              <div className={`p-3 rounded-xl ${bg} flex-shrink-0`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white text-sm">{title}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TOIFALAR ===== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Toifalar
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              O'zingizga kerakli bo'limni tanlang
            </p>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>Barchasini ko'rish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {CATEGORIES.map(({ value, label, desc, icon: Icon, color, bg, textColor }) => (
            <Link
              key={value}
              to={`/products?category=${encodeURIComponent(value)}`}
              className="group p-5 rounded-2xl bg-white dark:bg-slate-800 border border-gray-200/80 dark:border-slate-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden relative"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-white mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-sm leading-tight">
                {label}
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-snug">
                {desc}
              </p>
              <div className={`absolute top-4 right-4 p-1.5 rounded-lg ${bg} opacity-0 group-hover:opacity-100 transition-opacity`}>
                <ArrowUpRight className={`w-4 h-4 ${textColor}`} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== TOP 8 MAHSULOT ===== */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
              Eng ommabop mahsulotlar
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              Eng yuqori reytingga ega 8 ta mahsulot
            </p>
          </div>
          <Link
            to="/products"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
          >
            <span>Hammasini ko'rish</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Yuklanish skeleti */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Xato holati */}
        {error && (
          <div className="flex flex-col items-center justify-center py-12 gap-4 text-center rounded-2xl bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700">
            <AlertTriangle className="w-10 h-10 text-amber-500" />
            <p className="text-gray-600 dark:text-gray-400 text-sm">{error}</p>
            <button
              onClick={refetch}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Qayta urinish</span>
            </button>
          </div>
        )}

        {/* Mahsulotlar to'ri */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {topProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center pt-4">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-bold hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-200"
              >
                <span>Barcha mahsulotlarni ko'rish</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Home;
