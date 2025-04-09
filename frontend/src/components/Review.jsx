// Review.jsx - Component for order review before final placement
import React from "react";

const Review = ({ orderDetails, cart, calculateTotal, handleBack, placeOrder }) => {
  const SHIPPING_PRICE = 40.00;
  const subtotal = calculateTotal();
  const finalTotal = subtotal + SHIPPING_PRICE;

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Review Your Order</h2>
        <button
          onClick={handleBack}
          className="text-gray-900 hover:text-gray-700 flex items-center font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Edit Address
        </button>
      </div>

      {/* Shipping Details */}
      <div className="mb-10 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-5 pb-2 border-b border-gray-200 text-gray-900">Shipping Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <p className="text-sm text-gray-500 mb-1">Name</p>
            <p className="font-medium text-gray-800">{orderDetails.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Phone</p>
            <p className="font-medium text-gray-800">+91 {orderDetails.phone}</p>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-gray-500 mb-1">Address</p>
            <p className="font-medium text-gray-800">{orderDetails.address}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">City</p>
            <p className="font-medium text-gray-800">{orderDetails.city}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">State</p>
            <p className="font-medium text-gray-800">{orderDetails.state}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">ZIP Code</p>
            <p className="font-medium text-gray-800">{orderDetails.zipcode}</p>
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-5 pb-2 border-b border-gray-200 text-gray-900">Order Items</h3>
        <div className="space-y-5">
          {cart.map((item) => (
            <div key={item.productId || item._id} className="flex items-start py-4 border-b border-gray-100">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100">
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
              <div className="ml-5 flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-gray-900">{item.name || item.cropName}</h4>
                  <span className="font-semibold text-gray-900">
                    ₹{(item.price * (item.quantity || 1)).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center mt-2">
                  <span className="text-sm text-gray-600">Quantity: {item.quantity || 1} kg</span>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-sm text-gray-600">
                    ₹{item.price.toFixed(2)} per kg
                  </span>
                </div>
                {item.farmerName && (
                  <p className="text-sm text-gray-600 mt-2">Farmer: {item.farmerName}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 p-6 rounded-lg mb-10">
        <h3 className="text-lg font-semibold mb-5 text-gray-900">Order Summary</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-700">Subtotal</span>
            <span className="text-gray-900">
              ₹{subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Shipping</span>
            <span className="text-gray-900">
              ₹{SHIPPING_PRICE.toFixed(2)}
            </span>
          </div>
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between font-bold">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">
                ₹{finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method (Simplified to just Cash on Delivery) */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold mb-5 pb-2 border-b border-gray-200 text-gray-900">Payment Method</h3>
        <div className="bg-blue-50 p-5 rounded-lg flex items-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-900">Cash on Delivery</p>
            <p className="text-sm text-gray-600">Pay when your order arrives</p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-6 py-3 border border-gray-300 text-gray-900 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
        >
          Back to Address
        </button>
        <button
          onClick={placeOrder}
          className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 transition duration-300"
        >
          Place Order
        </button>
      </div>
    </div>
  );
};

export default Review;