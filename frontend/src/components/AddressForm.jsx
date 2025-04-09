// AddressForm.jsx - Component for shipping address and product quantities
import { useState, useEffect } from "react";

const AddressForm = ({ orderDetails, handleFormDataChange, handleAddressSubmit, cart, updateQuantity }) => {
  // Ensure each product has a minimum quantity of 5kg when component mounts
  useEffect(() => {
    cart.forEach((product, index) => {
      if (!product.quantity || product.quantity < 5) {
        updateQuantity(index, 5);
      }
    });
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-4">Shipping Information</h2>
      <form onSubmit={handleAddressSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              value={orderDetails.name}
              onChange={handleFormDataChange}
              placeholder="John Doe"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <span className="inline-flex items-center px-3 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-gray-500 text-sm">
                +91
              </span>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                pattern="[0-9]{10}"
                maxLength="10"
                value={orderDetails.phone}
                onChange={handleFormDataChange}
                placeholder="9876543210"
                className="w-full px-4 py-3 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
              />
            </div>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Complete Address <span className="text-red-500">*</span>
            </label>
            <input
              id="address"
              name="address"
              type="text"
              required
              value={orderDetails.address}
              onChange={handleFormDataChange}
              placeholder="123 Main Street, Apartment 4B"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
              City <span className="text-red-500">*</span>
            </label>
            <input
              id="city"
              name="city"
              type="text"
              required
              value={orderDetails.city}
              onChange={handleFormDataChange}
              placeholder="Mumbai"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
              State <span className="text-red-500">*</span>
            </label>
            <input
              id="state"
              name="state"
              type="text"
              required
              value={orderDetails.state}
              onChange={handleFormDataChange}
              placeholder="Maharashtra"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <input
              id="zipcode"
              name="zipcode"
              type="text"
              required
              pattern="[0-9]{6}"
              maxLength="6"
              value={orderDetails.zipcode}
              onChange={handleFormDataChange}
              placeholder="400001"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-gray-900 shadow-sm"
            />
          </div>
        </div>
        {/* Product Quantities */}
        <div className="mt-10 mb-8">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200 flex items-center">
            <span className="bg-gray-100 text-gray-900 p-1 rounded-full mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </span>
            Choose Product Quantities
          </h3>
          <div className="space-y-4 bg-whitesmoke p-4 rounded-lg">
            {cart.map((product, index) => (
              <div key={product.productId || product._id} className="py-4 border-b border-gray-200 last:border-b-0 bg-white p-4 rounded-md shadow-sm">
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-4 bg-gray-100">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name || product.cropName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{product.name || product.cropName}</h4>
                    {product.farmerName && (
                      <p className="text-sm text-gray-500">By {product.farmerName}</p>
                    )}
                    <p className="text-sm font-semibold text-gray-900 mt-1">
                      ₹{product.price.toFixed(2)} per kg
                    </p>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-gray-600 mb-2">Select quantity:</p>
                    <div className="flex flex-wrap gap-2">
                      {[5, 10, 25, 50, 75, 100].map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => updateQuantity(index, qty)}
                          className={`px-3 py-1 text-sm border rounded-md transition ${
                            (product.quantity || 5) === qty
                              ? 'bg-gray-900 text-white border-gray-900'
                              : 'bg-white text-gray-700 border-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {qty} kg
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <button
            type="submit"
            className="px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 transition duration-300 shadow-md flex items-center"
          >
            Continue to Review
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;