import { useState, useEffect, useCallback } from 'react';

// Asosiy va zaxira API manzillari
const PRIMARY_API = 'https://fakestoreapi.com';
const FALLBACK_API = 'https://dummyjson.com';

/**
 * FakeStore API mahsulotlarini DummyJSON formatiga o'giradi
 */
const normalizeFakeStore = (data) => {
  if (Array.isArray(data)) {
    return data.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.image,
      rating: item.rating,
    }));
  }
  return {
    id: data.id,
    title: data.title,
    price: data.price,
    description: data.description,
    category: data.category,
    image: data.image,
    rating: data.rating,
  };
};

/**
 * DummyJSON mahsulotlarini umumiy formatga o'giradi
 */
const normalizeDummyJson = (data) => {
  if (data.products) {
    // Ro'yxat holati
    return data.products.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      description: item.description,
      category: item.category,
      image: item.thumbnail,
      rating: { rate: item.rating, count: item.stock },
    }));
  }
  // Alohida mahsulot holati
  return {
    id: data.id,
    title: data.title,
    price: data.price,
    description: data.description,
    category: data.category,
    image: data.thumbnail,
    rating: { rate: data.rating, count: data.stock },
  };
};

/**
 * API'dan ma'lumot olish uchun custom hook.
 * Avval FakeStoreAPI'ga murojaat qiladi, ishlamasa DummyJSON'ga o'tadi.
 *
 * @param {string} endpoint - API so'rovi yo'li (masalan: '/products' yoki '/products/1')
 * @returns {{ data, loading, error, refetch }}
 */
const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    if (!endpoint) return;

    setLoading(true);
    setError(null);

    try {
      // 1-urinish: FakeStoreAPI
      const primaryUrl = `${PRIMARY_API}${endpoint}`;
      const primaryRes = await fetch(primaryUrl, { signal: AbortSignal.timeout(5000) });

      if (primaryRes.ok) {
        const json = await primaryRes.json();
        setData(normalizeFakeStore(json));
        setLoading(false);
        return;
      }
      throw new Error('Primary API failed');
    } catch {
      // 2-urinish: DummyJSON (zaxira)
      try {
        // Marshrutni DummyJSON formatiga moslashtirish
        const fallbackEndpoint = endpoint.replace('/products', '/products');
        const fallbackUrl = `${FALLBACK_API}${fallbackEndpoint}?limit=100`;
        const fallbackRes = await fetch(fallbackUrl, { signal: AbortSignal.timeout(8000) });

        if (!fallbackRes.ok) throw new Error('Fallback API ham ishlamadi');

        const json = await fallbackRes.json();
        setData(normalizeDummyJson(json));
      } catch (fallbackErr) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi. Internetingizni tekshiring.");
      }
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
