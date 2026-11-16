import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Star, ShoppingBag, Heart, Minus, Plus,
  Truck, ShieldCheck, RefreshCw, AlertTriangle, Share2
} from 'lucide-react';
import useFetch from '../hooks/useFetch';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { formatPrice } from '../utils/formatPrice';
import { FullPageLoader } from '../components/common/Loader';

/** Toifa nomini o'zbek tiliga o'giradi */
const categoryLabels = {
  "electronics": "Elektronika",
  "jewelery": "Zargarlik",
  "men's clothing": "Erkaklar kiyimi",
  "women's clothing": "Ayollar kiyimi",
};

/**
 * Mahsulot batafsil sahifasi
 * Katta rasm, tavsif, narx, reyting, miqdor tanlash va harakatlar
 */
const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: product, loading, error, refetch } = useFetch(`/products/${id}`);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [imgError, setImgError] = useState(false);

  const favorite = product ? isFavorite(product.id) : false;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    showToast(`${quantity} ta mahsulot savatga qo'shildi! 🛒`, 'success');
  };

  const handleBuyNow = () => {
    if (!product) return;
    addToCart(product, quantity);
    navigate('/cart');
  };

  const handleToggleFavorite = () => {
    if (!product) return;
    toggleFavorite(product);
    showToast(
      favorite ? 'Sevimlilardan olib tashlandi' : 'Sevimlilarga qo\'shildi ❤️',
      'success'
    );
  };

  const changeQuantity = (delta) => {
    setQuantity((prev) => Math.max(1, Math.min(99, prev + delta)));
  };

  if (loading) return <FullPageLoader />;

  if (error || !product) {
    return (
      <div className="py-16 flex flex-col items-center justify-center gap-5 text-center max-w-md mx-auto">
        <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500">
          <AlertTriangle className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Mahsulot topilmadi
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {error || "Bunday mahsulot mavjud emas yoki o'chirilgan."}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={refetch}
            className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Qayta urinish</span>
          </button>
          <Link
            to="/products"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-md"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Katalogga qaytish</span>
          </Link>
        </div>
      </div>
    );
  }

  const categoryLabel = categoryLabels[product.category] || product.category;
  const ratingStars = [1, 2, 3, 4, 5];

  return (
    <div className="py-8 space-y-8">
      {/* Navigatsiya */}
      <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Bosh sahifa
        </Link>
        <span>/</span>
        <Link to="/products" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
          Mahsulotlar
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-white font-medium line-clamp-1 max-w-xs">
          {product.title}
        </span>
      </nav>

      {/* Asosiy blok */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl border border-gray-200/80 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
          {/* Rasm qismi */}
          <div className="relative bg-gray-50 dark:bg-slate-900/50 p-8 sm:p-12 flex items-center justify-center min-h-80 lg:min-h-[500px]">
            {!imgError ? (
              <img
                src={product.image}
                alt={product.title}
                className="max-h-96 w-full object-contain"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="flex items-center justify-center text-gray-300 dark:text-slate-600">
                <ShoppingBag className="w-24 h-24" />
              </div>
            )}

            {/* Sevimlilar tugmasi */}
            <button
              onClick={handleToggleFavorite}
              className={`absolute top-5 right-5 p-3 rounded-2xl shadow-md transition-all duration-200 ${favorite
                  ? 'bg-rose-500 text-white'
                  : 'bg-white dark:bg-slate-800 text-gray-400 hover:text-rose-500'
                }`}
              aria-label={favorite ? 'Sevimlilardan olib tashlash' : 'Sevimlilarga qo\'shish'}
            >
              <Heart className={`w-5 h-5 ${favorite ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Ma'lumotlar qismi */}
          <div className="p-7 sm:p-10 space-y-6 flex flex-col justify-center">
            {/* Toifa */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
                {categoryLabel}
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500">#{product.id}</span>
            </div>

            {/* Sarlavha */}
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white leading-snug">
              {product.title}
            </h1>

            {/* Reyting */}
            {product.rating && (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {ratingStars.map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(product.rating.rate)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-200 dark:text-slate-600'
                        }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                  {product.rating.rate?.toFixed(1)}
                </span>
                <span className="text-sm text-gray-400 dark:text-gray-500">
                  ({product.rating.count} ta sharh)
                </span>
              </div>
            )}

            {/* Narx */}
            <div className="space-y-1">
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {formatPrice(product.price)}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ${product.price?.toFixed(2)} · Yetkazib berish bepul
              </p>
            </div>

            {/* Miqdor tanlash */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                Miqdor
              </label>
              <div className="flex items-center gap-4">
                <div className="flex items-center rounded-xl border border-gray-200 dark:border-slate-700 overflow-hidden">
                  <button
                    onClick={() => changeQuantity(-1)}
                    disabled={quantity <= 1}
                    className="p-3 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Miqdorni kamaytirish"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-bold text-gray-900 dark:text-white text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => changeQuantity(1)}
                    disabled={quantity >= 99}
                    className="p-3 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-600 dark:text-gray-300 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    aria-label="Miqdorni oshirish"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Jami: <strong className="text-gray-900 dark:text-white">
                    {formatPrice(product.price * quantity)}
                  </strong>
                </span>
              </div>
            </div>

            {/* Harakatlar tugmalari */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Savatga qo'shish</span>
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 rounded-xl border-2 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all duration-200"
              >
                Hozir sotib olish
              </button>
            </div>

            {/* Kafolatlar */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 dark:bg-slate-900/40 text-center">
                <Truck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-tight">
                  Bepul yetkazish
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 dark:bg-slate-900/40 text-center">
                <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-tight">
                  2 yil kafolat
                </span>
              </div>
              <div className="flex flex-col items-center gap-1.5 p-3 rounded-xl bg-gray-50 dark:bg-slate-900/40 text-center">
                <RefreshCw className="w-5 h-5 text-violet-600 dark:text-violet-400" />
                <span className="text-xs text-gray-600 dark:text-gray-400 font-medium leading-tight">
                  30 kun qaytarish
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tavsif */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-gray-200/80 dark:border-slate-700 p-7 sm:p-10 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Mahsulot tavsifi
        </h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default ProductDetail;
