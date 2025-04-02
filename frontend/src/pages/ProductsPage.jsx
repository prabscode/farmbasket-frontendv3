import React, { useState } from "react";
import Products from "./Products";
import SidebarFilter from "../components/SidebarFilter";

const Productspage = ({ userId }) => {
  const [filters, setFilters] = useState({
    location: "",
    priceRange: [0, 50000],
    customerRating: [],
    deliveryTime: [],
    paymentOptions: []
  });

  // Handle filter changes from SidebarFilter component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

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
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Filter Component */}
          <div className="w-full md:w-1/4">
            <SidebarFilter onFilterChange={handleFilterChange} />
          </div>
          {/* Products Component */}
          <div className="w-full md:w-3/4">
            <Products userId={userId} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productspage;