import React, { useState } from "react";
import Products from "./Products";
import SidebarFilter from "../components/SidebarFilter";

const Productspage = ({ userId }) => {
  const [filters, setFilters] = useState({
    location: "",
    priceRange: [0, 50000],
    customerRating: [],
    deliveryTime: [],
    paymentOptions: [],
    category: "all" // Add category to filters
  });
  
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false);

  // Handle filter changes from SidebarFilter component
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
  };

  // Handle filter collapse state
  const handleFilterCollapseChange = (collapsed) => {
    setIsFilterCollapsed(collapsed);
  };

  // Handle category change from Categories component
  const handleCategoryChange = (categoryId) => {
    setFilters({ ...filters, category: categoryId });
  };

  return (
    <div className="bg-[#f9f4ef] min-h-screen">
      <div className="max-w-10xl mx-auto">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Filter Component */}
          <div className={`transition-all duration-300 ${isFilterCollapsed ? 'md:w-16' : 'md:w-1/4'} w-full`}>
            <SidebarFilter
              onFilterChange={handleFilterChange}
              onCollapseChange={handleFilterCollapseChange}
            />
          </div>
          
          {/* Main content area */}
          <div className={`transition-all duration-300 ${isFilterCollapsed ? 'md:w-[calc(100%-4rem)]' : 'md:w-3/4'} w-full`}>
            {/* Products Component (which will now contain ProductHeader and Categories) */}
            <Products 
              userId={userId} 
              filters={filters} 
              onCategoryChange={handleCategoryChange} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Productspage;