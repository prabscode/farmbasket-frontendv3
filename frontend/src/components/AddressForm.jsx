// AddressForm.jsx - Component for shipping address and product quantities
import { useState } from "react";

const AddressForm = ({ orderDetails, handleFormDataChange, handleAddressSubmit, cart, updateQuantity }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Shipping Information</h2>
      
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-r-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
        
        {/* Product Quantities */}
        <div className="mt-10 mb-8">
          <h3 className="text-lg font-semibold mb-4 pb-2 border-b border-gray-200">Choose Product Quantities</h3>
          
          {cart.map((product, index) => (
            <div key={product.productId || product._id} className="py-4 border-b border-gray-200">
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
                  <h4 className="font-medium">{product.name || product.cropName}</h4>
                  {product.farmerName && (
                    <p className="text-sm text-gray-500">By {product.farmerName}</p>
                  )}
                  <p className="text-sm font-semibold text-gray-800 mt-1">₹{product.price.toFixed(2)} per kg</p>
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
                          (product.quantity || 1) === qty
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
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
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition duration-300"
          >
            Continue to Review
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;