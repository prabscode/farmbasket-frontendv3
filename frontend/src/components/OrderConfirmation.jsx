// OrderConfirmation.jsx - Component displayed after successful order placement
import React from "react";

const OrderConfirmation = ({ orderId, orderDetails }) => {
  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);
  
  // Format the date as DD Month YYYY
  const formattedDate = estimatedDelivery.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Successfully Placed!</h2>
      <p className="text-lg text-gray-600 mb-8">Thank you for shopping with us. Your order has been received.</p>
      
      <div className="bg-gray-50 p-6 rounded-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Order ID</h3>
            <p className="text-lg font-bold text-gray-800">{orderId}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Estimated Delivery</h3>
            <p className="text-lg font-bold text-gray-800">{formattedDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Shipping Address</h3>
            <p className="text-gray-800">
              {orderDetails.name}<br />
              {orderDetails.address}<br />
              {orderDetails.city}, {orderDetails.state}, {orderDetails.zipcode}
            </p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Contact</h3>
            <p className="text-gray-800">+91 {orderDetails.phone}</p>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
        <div className="flex items-center justify-center p-3 bg-blue-50 rounded-lg flex-1">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-xl">📦</span>
          </div>
          <div className="text-left">
            <p className="font-medium text-gray-800">Order Tracking</p>
            <p className="text-sm text-gray-500">Track your order status</p>
          </div>
        </div>
        <div className="flex items-center justify-center p-3 bg-green-50 rounded-lg flex-1">
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
            <span className="text-xl">📱</span>
          </div>
          <div className="text-left">
            <p className="font-medium text-gray-800">Order Support</p>
            <p className="text-sm text-gray-500">Questions about your order</p>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center space-x-4">
        <a
          href="/orders"
          className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-300"
        >
          View My Orders
        </a>
        <a
          href="/products-page"
          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-300"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
};

export default OrderConfirmation;