import React from "react";
import Products from "./Products";

const Productspage = ({ userId }) => {
  return (
    <div className="py-8 px-6 bg-[#f9f4ef] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
          <p className="text-gray-700 mb-4">
            Explore our selection of farm-fresh products, harvested and delivered with care.
            All our products are sourced directly from local farmers.
          </p>
        </div>
        
        {/* Include the existing Products component */}
        <Products userId={userId} />
      </div>
    </div>
  );
};

export default Productspage;