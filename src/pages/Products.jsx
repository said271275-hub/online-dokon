import React, { useMemo, useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, AlertTriangle, RefreshCw, Filter } from 'lucide-react';
import useFetch from '../hooks/useFetch';
import ProductGrid from '../components/product/ProductGrid';
import ProductFilter from '../components/product/ProductFilter';
import ProductSort from '../components/product/ProductSort';
import { ProductGridSkeleton } from '../components/common/Skeleton';

/**
 * Barcha mahsulotlar sahifasi
 * Qidiruv, filtr, saralash va skeleton loader bilan
 */
const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const { data: products, loading, error, refetch } = useFetch('/products');

  // Filtr holatlari
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [showMobileFilter, setShowMobileFilter] = useState(false);

  // URL query o'zgarsa kategoriyani yangilash
  useEffect(() => {
    const cat = searchParams.get('category') || 'all';
    setCategory(cat);
  }, [searchParams]);

  // Kategoriya o'zgarganda URL'ni ham yangilash
  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    if (newCat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', newCat);
    }
    setSearchParams(searchParams);
  };

  // Filtr va saralash natijasi
  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let result = [...products];

    // Qidiruv bo'yicha filtr
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Toifa bo'yicha filtr
    if (category !== 'all') {
      result = result.filter((p) => p.category === category);
    }

    // Narx oralig'i bo'yicha filtr
    if (minPrice !== '') {
      result = result.filter((p) => p.price >= Number(minPrice));
    }
    if (maxPrice !== '') {
      result = result.filter((p) => p.price <= Number(maxPrice));
    }

    // Saralash
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return result;
  }, [products, search, category, minPrice, maxPrice, sortBy]);

  // Filtrlarni tozalash
  const handleReset = () => {
    setSearch('');
    handleCategoryChange('all');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('default');
  };

  return (
    <div className="py-8 space-y-6">
      {/* Sarlavha */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            Mahsulotlar katalogi
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm">
            {loading
              ? 'Yuklanmoqda...'
              : error
              ? ''
              : `${filteredProducts.length} ta mahsulot topildi`}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Saralash */}
          <ProductSort value={sortBy} onChange={setSortBy} />

          {/* Mobil filtr tugmasi */}
          <button
            onClick={() => setShowMobileFilter(!showMobileFilter)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filtr</span>
          </button>
        </div>
      </div>

      {/* Asosiy kontent */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filtr paneli */}
        <aside
          className={`lg:block lg:w-72 flex-shrink-0 ${
            showMobileFilter ? 'block' : 'hidden'
          }`}
        >
          <ProductFilter
            search={search}
            onSearch={setSearch}
            category={category}
            onCategory={handleCategoryChange}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPrice={setMinPrice}
            onMaxPrice={setMaxPrice}
            onReset={handleReset}
          />
        </aside>

        {/* Mahsulotlar to'ri */}
        <div className="flex-grow min-w-0">
          {loading && <ProductGridSkeleton count={8} />}

          {error && (
            <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
              <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-950/40 flex items-center justify-center text-rose-500">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  Ma'lumotlarni yuklab bo'lmadi
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                  {error}
                </p>
              </div>
              <button
                onClick={refetch}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Qayta urinish</span>
              </button>
            </div>
          )}

          {!loading && !error && (
            <ProductGrid products={filteredProducts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
