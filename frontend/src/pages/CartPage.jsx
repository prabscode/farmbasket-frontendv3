// CartPage.jsx - Main cart page with multi-step checkout process
import { useState, useEffect } from "react";
import AddressForm from "../components/AddressForm";
import OrderInfo from "../components/OrderInfo";
import Review from "../components/Review";
import OrderConfirmation from "../components/OrderConfirmation";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [userId, setUserId] = useState(null);
  const [currentStep, setCurrentStep] = useState("address");
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    phone: "",
    zipcode: "",
  });
  const [orderId, setOrderId] = useState(null);

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

  // Calculate total price of all items in cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  };

  // Handle form data update
  const handleFormDataChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prev => ({ ...prev, [name]: value }));
  };

  // Handle address submission and move to review
  const handleAddressSubmit = (e) => {
    e.preventDefault();
    setCurrentStep("review");
  };

  // Go back to previous step
  const handleBack = () => {
    if (currentStep === "review") {
      setCurrentStep("address");
    } else if (currentStep === "confirmation") {
      setCurrentStep("review");
    }
  };

  // Handle checkout/order placement
  const placeOrder = async () => {
    if (!userId) {
      alert("Please log in to complete your purchase");
      return;
    }

    // Prepare order data for backend with full product details
    const orderData = {
      userId,
      products: cart.map(item => ({
        productId: item.productId || item._id,
        farmerId: item.farmerId,
        name: item.name || item.cropName,
        price: item.price,
        image: item.image,
        category: item.category,
        quantity: item.quantity || 1,
        farmerName: item.farmerName
      })),
      shippingDetails: orderDetails,
      totalAmount: calculateTotal()
    };

    try {
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to place order");
      }

      const data = await response.json();
      setOrderId(data._id || "ORD-" + Math.random().toString(36).substring(2, 10));
      
      // Clear cart
      localStorage.removeItem('cart');
      setCart([]);
      
      // Move to confirmation step
      setCurrentStep("confirmation");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  // If cart is empty, show empty cart message
  if (cart.length === 0 && currentStep !== "confirmation") {
    return (
      <div className="container mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Cart</h1>
        <div className="bg-white rounded-lg shadow-lg p-10 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-700">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added any products to your cart yet.</p>
          <a
            href="/products-page"
            className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>
      
      {/* Progress Steps */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center">
          <div className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${
            currentStep === "address" ? "border-blue-500 text-blue-500" : 
            currentStep === "review" || currentStep === "confirmation" ? "bg-blue-500 border-blue-500 text-white" : 
            "border-gray-300 text-gray-300"
          }`}>
            1
          </div>
          <span className={`ml-2 text-sm font-medium ${
            currentStep === "address" ? "text-blue-500" : 
            currentStep === "review" || currentStep === "confirmation" ? "text-gray-700" : 
            "text-gray-400"
          }`}>Address</span>
        </div>
        
        <div className={`flex-1 h-1 mx-4 ${
          currentStep === "review" || currentStep === "confirmation" ? "bg-blue-500" : "bg-gray-200"
        }`}></div>
        
        <div className="flex items-center">
          <div className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${
            currentStep === "review" ? "border-blue-500 text-blue-500" : 
            currentStep === "confirmation" ? "bg-blue-500 border-blue-500 text-white" : 
            "border-gray-300 text-gray-300"
          }`}>
            2
          </div>
          <span className={`ml-2 text-sm font-medium ${
            currentStep === "review" ? "text-blue-500" : 
            currentStep === "confirmation" ? "text-gray-700" : 
            "text-gray-400"
          }`}>Review</span>
        </div>
        
        <div className={`flex-1 h-1 mx-4 ${
          currentStep === "confirmation" ? "bg-blue-500" : "bg-gray-200"
        }`}></div>
        
        <div className="flex items-center">
          <div className={`rounded-full h-10 w-10 flex items-center justify-center border-2 ${
            currentStep === "confirmation" ? "bg-blue-500 border-blue-500 text-white" : 
            "border-gray-300 text-gray-300"
          }`}>
            3
          </div>
          <span className={`ml-2 text-sm font-medium ${
            currentStep === "confirmation" ? "text-blue-500" : "text-gray-400"
          }`}>Confirmation</span>
        </div>
      </div>
      
      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side - Form Area */}
        <div className="lg:col-span-2">
          {currentStep === "address" && (
            <AddressForm
              orderDetails={orderDetails}
              handleFormDataChange={handleFormDataChange}
              handleAddressSubmit={handleAddressSubmit}
              cart={cart}
              updateQuantity={updateQuantity}
            />
          )}
          
          {currentStep === "review" && (
            <Review
              orderDetails={orderDetails}
              cart={cart}
              calculateTotal={calculateTotal}
              handleBack={handleBack}
              placeOrder={placeOrder}
            />
          )}
          
          {currentStep === "confirmation" && (
            <OrderConfirmation
              orderId={orderId}
              orderDetails={orderDetails}
            />
          )}
        </div>
        
        {/* Right Side - Order Summary */}
        {currentStep !== "confirmation" && (
          <div className="lg:col-span-1">
            <OrderInfo
              cart={cart}
              calculateTotal={calculateTotal}
              removeFromCart={removeFromCart}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;