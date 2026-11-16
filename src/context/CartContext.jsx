import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Savat Context'i
const CartContext = createContext();

// Boshlang'ich holatni localStorage'dan yuklash
const getInitialState = () => {
  try {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : { items: [] };
  } catch (error) {
    console.error("Savatni localStorage'dan o'qishda xatolik:", error);
    return { items: [] };
  }
};

// Reducer funksiyasi
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity = 1 } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === product.id);

      let updatedItems;
      if (existingIndex > -1) {
        // Mahsulot allaqachon savatda bo'lsa, miqdorini oshirish
        updatedItems = state.items.map((item, index) =>
          index === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // Yangi mahsulot qo'shish
        updatedItems = [...state.items, { ...product, quantity }];
      }

      return { ...state, items: updatedItems };
    }

    case 'REMOVE_FROM_CART': {
      const id = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // Miqdor 0 yoki undan kam bo'lsa, savatdan o'chirish
        return {
          ...state,
          items: state.items.filter((item) => item.id !== id),
        };
      }
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      };
    }

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, null, getInitialState);

  // Savat o'zgarganda localStorage'ga saqlash
  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state));
    } catch (error) {
      console.error("Savatni localStorage'ga yozishda xatolik:", error);
    }
  }, [state]);

  // Savatdagi barcha tovarlar soni
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  // Savatdagi umumiy summa (USD)
  const totalPrice = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Qulay funksiyalar (Action dispatchers)
  const addToCart = (product, quantity = 1) => {
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
  };

  const updateQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.items,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart CartProvider ichida ishlatilishi shart");
  }
  return context;
};
