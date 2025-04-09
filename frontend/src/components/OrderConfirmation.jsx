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
    <div className="flex justify-center items-center ml-130  ">
      <div className="bg-gray-200 rounded-xl shadow-xl p-4 max-w-2xl w-full">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Thank You For Your Order!</h2>
          <p className="text-lg text-gray-600">Your order has been successfully placed and is being processed.</p>
        </div>

        {/* Order Details Card */}
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">Order Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Order ID</h4>
                <p className="text-lg font-semibold text-gray-800">{orderId}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Estimated Delivery</h4>
                <p className="text-lg font-semibold text-gray-800">{formattedDate}</p>
              </div>
            </div>
            <div>
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-500 mb-1">Shipping Address</h4>
                <p className="text-gray-800">
                  <span className="font-medium">{orderDetails.name}</span><br />
                  {orderDetails.address}<br />
                  {orderDetails.city}, {orderDetails.state}, {orderDetails.zipcode}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Contact</h4>
                <p className="text-gray-800">+91 {orderDetails.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Notification */}
        <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4 mb-8 flex items-center">
          <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">We've sent you a confirmation email</h4>
            <p className="text-sm text-gray-600">You'll receive updates about your order status</p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/orders"
            className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium text-center rounded-lg hover:bg-blue-700 transition duration-300"
          >
            View My Orders
          </a>
          <a
            href="/products-page"
            className="flex-1 px-6 py-3 border bg-gray-400 border-gray-300 text-gray-100 font-medium text-center rounded-lg hover:bg-gray-200 text-gray-900 transition duration-300"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;