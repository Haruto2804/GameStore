import { CartContext } from "./CartContext";
import { useEffect, useMemo, useState } from "react";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((item) => item._id === product._id);

      if (isExist) {
        return prevCart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };
  const totalQuantity = useMemo(() => {
    return cart.reduce((count, item) => {
      return count + item?.quantity;
    }, 0)
  }, [cart])
  const totalPrice = useMemo(() => {
    return cart.reduce((total, item) => {
      const basePrice = Number(item.pricing.base_price) || 0;
      const quantity = Number(item.quantity) || 0;
      const discountPercent = Number(item.pricing.discount_percent) || 0;
      const priceAfterGameDiscount = basePrice * (1 - discountPercent / 100)
      return total + (priceAfterGameDiscount * quantity);
    }, 0)
  }, [cart])
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
  };

  const resetCart = (() => {
    setCart([]);
  })
  const updateQuantity = (id, newQuantity) => {
    setCart((prevCart) => {
      return (
        prevCart.map((item) => {
          return (
            item._id === id
              ? { ...item, quantity: Math.max(1, Math.min(99, newQuantity)) }
              : item
          )
        })
      )
    })
  }

  const value = {
    cart,
    setCart,
    addToCart,
    removeFromCart,
    totalQuantity,
    totalPrice,
    updateQuantity,
    resetCart,

  };


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};