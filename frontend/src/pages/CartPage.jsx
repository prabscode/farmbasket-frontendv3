// CartPage.jsx - Create this new file in the pages folder
import { useState, useEffect } from "react";
import Cart from "../components/Cart";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Get userId from localStorage
    const storedUserId = localStorage.getItem("userId");
    setUserId(storedUserId);

    // Get cart from localStorage
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Error loading cart from localStorage:", e);
    }
  }, []);

  // Function to remove product from cart
  const removeFromCart = (index) => {
    const updatedCart = [...cart];
    updatedCart.splice(index, 1);
    setCart(updatedCart);
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  // Update cart item quantity
  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    // Update localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>
      {cart.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 mb-4">Your cart is empty</p>
          <a href="/products-page" className="text-blue-500 hover:underline">
            Continue Shopping
          </a>
        </div>
      ) : (
        <Cart
          cart={cart}
          userId={userId}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      )}
    </div>
  );
};

export default CartPage;