import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useToast } from '../../context/ToastContext';
import { formatPrice } from '../../utils/formatPrice';

/**
 * Yulduzcha reytingini ko'rsatuvchi komponent
 */
const StarRating = ({ rate, count }) => {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-3.5 h-3.5 ${
              star <= Math.round(rate)
                ? 'text-amber-400 fill-amber-400'
                : 'text-gray-300 dark:text-slate-600'
            }`}
          />
        ))}
      </div>
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {rate?.toFixed(1)} ({count})
      </span>
    </div>
  );
};

/**
 * Toifa nomini o'zbek tiliga o'giradi
 */
const categoryLabels = {
  "electronics": "Elektronika",
  "jewelery": "Zargarlik",
  "men's clothing": "Erkaklar kiyimi",
  "women's clothing": "Ayollar kiyimi",
};

/**
 * Mahsulot kartochkasi
 * @param {Object} product - Mahsulot obyekti
 */
const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();
  const [imgError, setImgError] = useState(false);

  const favorite = isFavorite(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    showToast(`"${product.title.substring(0, 30)}..." savatga qo'shildi`, 'success');
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(product);
    showToast(
      favorite
        ? 'Sevimlilardan olib tashlandi'
        : 'Sevimlilarga qo\'shildi ❤️',
      'success'
    );
  };

  const categoryLabel = categoryLabels[product.category] || product.category;

  return (
    <div className="group relative bg-white dark:bg-slate-800 rounded-2xl border border-gray-200/80 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300">
      {/* Rasm qismi */}
      <Link to={`/product/${product.id}`} className="block relative overflow-hidden bg-gray-50 dark:bg-slate-900/50 h-56">
        {!imgError ? (
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgError(true)}
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 dark:text-slate-600">
            <ShoppingBag className="w-16 h-16" />
          </div>
        )}

        {/* Hover tugmalari overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <Link
            to={`/product/${product.id}`}
            className="p-2.5 rounded-xl bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 shadow-lg hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 transition-colors duration-200"
            title="Batafsil ko'rish"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Sevimlilar tugmasi */}
        <button
          onClick={handleToggleFavorite}
          className={`absolute top-3 right-3 p-2 rounded-xl shadow-md transition-all duration-200 z-10 ${
            favorite
              ? 'bg-rose-500 text-white scale-110'
              : 'bg-white dark:bg-slate-800 text-gray-400 hover:text-rose-500 hover:scale-110 opacity-0 group-hover:opacity-100'
          }`}
          aria-label={favorite ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-white' : ''}`} />
        </button>
      </Link>

      {/* Ma'lumotlar qismi */}
      <div className="p-4 space-y-2.5">
        {/* Kategoriya belgisi */}
        <span className="inline-block text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300">
          {categoryLabel}
        </span>

        {/* Sarlavha */}
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 line-clamp-2 leading-snug hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            {product.title}
          </h3>
        </Link>

        {/* Reyting */}
        {product.rating && (
          <StarRating rate={product.rating.rate} count={product.rating.count} />
        )}

        {/* Narx va savatga qo'shish */}
        <div className="flex items-center justify-between gap-3 pt-1">
          <div>
            <p className="text-base font-bold text-gray-900 dark:text-white">
              {formatPrice(product.price)}
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/30 transition-all duration-200 whitespace-nowrap"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Savatga</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
