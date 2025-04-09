// OrderInfo.jsx - Order summary and cart items display
import React from 'react';

const OrderInfo = ({ cart, calculateTotal, removeFromCart }) => {
  const SHIPPING_PRICE = 40.00;
  const subtotal = calculateTotal();
  const finalTotal = subtotal + SHIPPING_PRICE;

  return (
    <div className="space-y-6 sticky top-6">
      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-bold mb-6 text-gray-900 border-b pb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Order Summary
        </h2>
        
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
              <span className="font-bold text-gray-900">Total</span>
              <span className="font-bold text-xl text-gray-900">₹{finalTotal.toFixed(2)}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Including all taxes and delivery charges
            </p>
          </div>
        </div>
      </div>
      
      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <div className="flex items-center justify-between mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            Your Cart
          </h2>
          <span className="bg-gray-100 text-gray-900 text-sm font-medium px-2.5 py-0.5 rounded-full">
            {cart.length} {cart.length === 1 ? 'item' : 'items'}
          </span>
        </div>
        
        <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
          {cart.map((item, index) => (
            <div key={item.productId || item._id} className="flex relative border-b border-gray-100 pb-6 last:border-b-0 last:pb-0 hover:bg-gray-50 p-2 rounded-md transition">
              {/* Product Image */}
              <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
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
                <h3 className="font-medium text-gray-900">{item.name || item.cropName}</h3>
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
                    className="text-sm text-red-500 hover:text-red-700 transition flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Remove
                  </button>
                  <span className="font-semibold text-gray-900">₹{(item.price * (item.quantity || 1)).toFixed(2)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-bold mb-6 text-center text-gray-900 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Benefits with every order
        </h3>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2 shadow-sm">
              <span className="text-2xl">🍎</span>
            </div>
            <span className="text-sm text-gray-600">Fresh & Organic</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2 shadow-sm">
              <span className="text-2xl">🚚</span>
            </div>
            <span className="text-sm text-gray-600">Free Delivery</span>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-2 shadow-sm">
              <span className="text-2xl">🛡</span>
            </div>
            <span className="text-sm text-gray-600">Trusted Farmers</span>
          </div>
        </div>
        
        <div className="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-100">
          <p className="text-sm text-gray-700 text-center">
            Your products are carefully handpicked from local farms
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderInfo;