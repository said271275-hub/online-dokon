import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Sevimlilar Context'i
const FavoritesContext = createContext();

// Boshlang'ich holatni localStorage'dan yuklash
const getInitialState = () => {
  try {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : { items: [] };
  } catch (error) {
    console.error("Sevimlilarni localStorage'dan o'qishda xatolik:", error);
    return { items: [] };
  }
};

// Reducer funksiyasi
const favoritesReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_FAVORITE': {
      const product = action.payload;
      const exists = state.items.some((item) => item.id === product.id);

      let updatedItems;
      if (exists) {
        // Bor bo'lsa o'chirish
        updatedItems = state.items.filter((item) => item.id !== product.id);
      } else {
        // Yo'q bo'lsa qo'shish
        updatedItems = [...state.items, product];
      }
      return { ...state, items: updatedItems };
    }

    case 'REMOVE_FAVORITE': {
      const id = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
      };
    }

    case 'CLEAR_FAVORITES':
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, null, getInitialState);

  // localStorage'ga saqlash
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(state));
    } catch (error) {
      console.error("Sevimlilarni localStorage'ga yozishda xatolik:", error);
    }
  }, [state]);

  const toggleFavorite = (product) => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: product });
  };

  const removeFavorite = (id) => {
    dispatch({ type: 'REMOVE_FAVORITE', payload: id });
  };

  const clearFavorites = () => {
    dispatch({ type: 'CLEAR_FAVORITES' });
  };

  const isFavorite = (id) => {
    return state.items.some((item) => item.id === id);
  };

  const totalFavorites = state.items.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites: state.items,
        totalFavorites,
        toggleFavorite,
        removeFavorite,
        clearFavorites,
        isFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites FavoritesProvider ichida ishlatilishi shart");
  }
  return context;
};
