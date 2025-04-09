// OrderInfo.jsx - Order summary and cart items display
import React from 'react';

const OrderInfo = ({ cart, calculateTotal, removeFromCart }) => {
  const SHIPPING_PRICE = 40.00;
  const subtotal = calculateTotal();
  const finalTotal = subtotal + SHIPPING_PRICE;

  return (
    <div className="space-y-6">
      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6 text-gray-800">Order Summary</h2>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center text-gray-600">
            <span>Subtotal ({cart.reduce((acc, item) => acc + (item.quantity || 1), 0)} items)</span>
            <span className="font-medium">₹{subtotal.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between items-center text-gray-600">
            <span>Shipping</span>
            <span className="font-medium">₹{SHIPPING_PRICE.toFixed(2)}</span>
          </div>
          
          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-800">Total</span>
              <span className="font-bold text-xl text-gray-800">₹{finalTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Including all taxes and delivery charges
            </p>
          </div>
        </div>
      </div>
      
      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Your Cart</h2>
          <span className="bg-gray-100 text-gray-700 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        
        <div className="space-y-6">
          {cart.map((item, index) => (
            <div key={item.productId || item._id} className="flex relative border-b border-gray-100 pb-6">
              {/* Product Image */}
              <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name || item.cropName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-xs text-gray-400">No image</span>
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="ml-4 flex-1">
                <h3 className="font-medium text-gray-800">{item.name || item.cropName}</h3>
                
                <div className="flex items-center mt-1">
                  <span className="text-sm text-gray-500">Qty: {item.quantity || 1} kg</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm font-medium text-gray-800">₹{item.price.toFixed(2)} per kg</span>
                </div>
                
                {item.category && (
                  <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-0.5 rounded mt-2">
                    {item.category}
                  </span>
                )}
                
                <div className="flex items-center justify-between mt-2">
                  <button
                    onClick={() => removeFromCart(index)}
                    className="text-sm text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                  
                  <span className="font-semibold text-gray-800">
                    ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold mb-6 text-center text-gray-800">Benefits with every order</h3>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🍎</span>
            </div>
            <span className="text-sm text-gray-600">Fresh & Organic</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🚚</span>
            </div>
            <span className="text-sm text-gray-600">Free Delivery</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-yellow-50 rounded-full flex items-center justify-center mb-2">
              <span className="text-2xl">🛡️</span>
            </div>
            <span className="text-sm text-gray-600">Trusted Farmers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;