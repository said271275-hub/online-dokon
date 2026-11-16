import { useState, useEffect } from 'react';

/**
 * localStorage bilan sinxronlashuvchi useState
 *
 * @param {string} key - localStorage kaliti
 * @param {*} initialValue - boshlang'ich qiymat
 * @returns {[value, setValue]} - holat va uni yangilash funksiyasi
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`useLocalStorage: "${key}" kalitini o'qishda xatolik`, error);
      return initialValue;
    }
  });

  // Qiymat o'zgarganda localStorage'ga yozish
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`useLocalStorage: "${key}" kalitiga yozishda xatolik`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};

export default useLocalStorage;
