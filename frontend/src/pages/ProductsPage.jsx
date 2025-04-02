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
  
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);
  
  // Handle filter changes from SidebarFilter component
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };
  
  // Handle filter collapse state
  const handleFilterCollapseChange = (collapsed) => {
    setIsFilterCollapsed(collapsed);
  };
  
  return (
    <div className="py-2 px-2 bg-[#f9f4ef] min-h-screen">
      <div className="max-w-10xl mx-auto">
     
        {/* <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
          <p className="text-gray-700 mb-4">
            Explore our selection of farm-fresh products, harvested and delivered with care.
            All our products are sourced directly from local farmers.
          </p>
        </div> */}
        
        <div className="flex flex-col md:flex-row ">
          {/* Sidebar Filter Component */}
          <div className={`transition-all duration-300 ${isFilterCollapsed ? 'md:w-16' : 'md:w-1/4'} w-full`}>
            <SidebarFilter 
              onFilterChange={handleFilterChange} 
              onCollapseChange={handleFilterCollapseChange} 
            />
          </div>
          
          {/* Products Component */}
          <div className={`transition-all duration-300 ${isFilterCollapsed ? 'md:w-[calc(100%-4rem)]' : 'md:w-3/4'} w-full`}>
            <Products userId={userId} filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productspage;