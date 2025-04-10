import React, { useState, useEffect } from "react"; 
import SidebarFilter from "../components/SidebarFilter"; 
import ProductHeader from "../components/ProductHeader"; 
import Categories from "../components/Categories"; 
import { MapPin, Heart, Share, User } from "lucide-react";

// BundleCard Component 
const BundleCard = ({ bundle, effectiveUserId, addToCart, removeFromCart, cart, setActiveCategory }) => { 
  const [isLiked, setIsLiked] = useState(false); 

  // Check if THIS specific bundle is in cart by comparing bundle ID 
  const isInCart = cart.some(item => item.bundleId === bundle._id); 

  const handleLikeClick = (e) => { 
    e.stopPropagation(); 
    setIsLiked(!isLiked); 
  }; 

  const handleShareClick = (e) => { 
    e.stopPropagation(); 
    console.log("Sharing bundle:", bundle.name); 
  }; 

  const handleCategoryClick = (e) => { 
    e.stopPropagation(); 
    if (setActiveCategory && bundle.items[0].category) { 
      setActiveCategory(bundle.items[0].category); 
    } 
  }; 

  // Handle cart button click for this specific bundle 
  const handleCartButtonClick = () => { 
    if (isInCart) { 
      removeFromCart(bundle); 
    } else { 
      addToCart(bundle); 
    } 
  }; 

  // Calculate savings percentage (5-20% range)
  const calculateSavings = () => { 
    const originalTotal = bundle.items.reduce((total, item) => total + item.price, 0); 
    const savings = ((originalTotal - bundle.price) / originalTotal) * 100; 
    return Math.round(savings); 
  }; 

  return ( 
    <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-101 border border-gray-200"> 
      {/* Bundle Name Header */} 
      <div className="p-3 bg-gray-900 text-white flex justify-between items-center"> 
        <h3 className="font-bold truncate">{bundle.name}</h3> 
        <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full"> 
          Save {calculateSavings()}% 
        </span> 
      </div> 

      {/* Bundle Image Grid - only showing 2 images */} 
      <div className="grid grid-cols-2 gap-1 p-2 bg-gray-100"> 
        {bundle.items.slice(0, 2).map((item, index) => ( 
          <div key={index} className="relative aspect-square overflow-hidden bg-white rounded"> 
            <img 
              src={item.image || "https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png"} 
              alt={item.cropName || item.name} 
              className="w-full h-full object-contain" 
            /> 
          </div> 
        ))} 
      </div> 

      {/* Action Buttons */} 
      <div className="flex justify-between items-center px-4 py-2 border-t border-b border-gray-200"> 
        <button onClick={handleLikeClick} className="p-2 hover:bg-gray-100 rounded-full"> 
          <Heart 
            size={20} 
            stroke={isLiked ? "#d95552" : "#555"} 
            fill={isLiked ? "#d95552" : "none"} 
            className="transition-colors duration-300" 
          /> 
        </button> 
        <button onClick={handleShareClick} className="p-2 hover:bg-gray-100 rounded-full"> 
          <Share 
            size={20} 
            stroke="#555" 
            className="transition-colors duration-300" 
          /> 
        </button> 
        <button onClick={handleCategoryClick} className="p-2 hover:bg-gray-100 rounded-full"> 
          <User 
            size={20} 
            stroke="#555" 
            className="transition-colors duration-300" 
          /> 
        </button> 
      </div> 

      {/* Bundle Info */} 
      <div className="p-4 flex flex-col flex-grow"> 
        {/* Bundle Name and Reason */} 
        <div className="mb-3"> 
          <span className="inline-block bg-blue-100 rounded-full px-2 py-1 text-xs font-medium text-blue-800 mb-2"> 
            {bundle.reason} 
          </span> 
          <h3 className="font-medium text-lg">{bundle.name}</h3> 
        </div> 

        {/* Bundle Items */} 
        <div className="mb-3"> 
          <h4 className="text-sm font-medium text-gray-600 mb-1">Bundle Includes:</h4> 
          <ul className="text-sm text-gray-700 space-y-1 ml-2"> 
            {bundle.items.map((item, index) => ( 
              <li key={index} className="flex items-center"> 
                <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span> 
                {item.cropName || item.name} (₹{item.price}) 
              </li> 
            ))} 
          </ul> 
        </div> 

        {/* Location */} 
        <div className="flex items-center text-gray-500 text-sm mb-2"> 
          <MapPin size={14} className="mr-1" /> 
          <span className="truncate">{bundle.location || bundle.items[0].location || "Various Locations"}</span> 
        </div> 

        {/* Bundle ID */} 
        <div className="text-xs text-gray-400 space-y-1 mb-4"> 
          <p>Bundle ID: {bundle._id}</p> 
        </div> 
      </div> 

      {/* Price and Add to Cart Button */} 
      <div className="flex justify-between items-center px-4 py-3 bg-gray-900 mt-auto"> 
        <div className="text-white"> 
          <div className="flex items-center"> 
            <span className="text-xl font-semibold mr-2">₹{bundle.price}</span> 
            <span className="text-sm line-through text-gray-400"> 
              ₹{bundle.items.reduce((total, item) => total + item.price, 0)} 
            </span> 
          </div> 
        </div> 
        <button 
          onClick={handleCartButtonClick} 
          className={`px-4 py-2 ${isInCart ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded font-medium transition-colors duration-300`} 
          disabled={!effectiveUserId} 
        > 
          {!effectiveUserId ? "Login to Add" : isInCart ? "Remove" : "Add to Cart"} 
        </button> 
      </div> 
    </div> 
  ); 
}; 

// Main Bundles Component 
const Bundles = ({ userId: propUserId }) => { 
  // States for filters and display 
  const [filters, setFilters] = useState({ 
    location: "", 
    priceRange: [0, 50000], 
    customerRating: [], 
    deliveryTime: [], 
    paymentOptions: [], 
    category: "all" 
  }); 

  const [searchQuery, setSearchQuery] = useState(""); 
  const [sortOption, setSortOption] = useState("newest"); 
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(false); 

  // States from second file 
  const [products, setProducts] = useState([]); 
  const [bundles, setBundles] = useState([]); 
  const [filteredBundles, setFilteredBundles] = useState([]); 
  const [cart, setCart] = useState([]); 
  const [localUserId, setLocalUserId] = useState(null); 
  const [activeCategory, setActiveCategory] = useState("all"); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Fetch products on component mount 
  useEffect(() => { 
    setLoading(true); 
    console.log("Fetching products for bundles..."); 

    fetch("http://localhost:5000/api/products") 
      .then((res) => { 
        if (!res.ok) { 
          throw new Error(`Error fetching products: ${res.status}`); 
        } 
        return res.json(); 
      }) 
      .then((data) => { 
        console.log("API Response for bundles:", data); 
        // Process the data 
        let allProducts = []; 
        if (Array.isArray(data)) { 
          data.forEach(farmerData => { 
            if (farmerData.works && Array.isArray(farmerData.works)) { 
              farmerData.works.forEach(workItem => { 
                const productId = workItem._id || `${farmerData._id}-${workItem.cropName}-${Math.random().toString(36).substr(2, 9)}`; 
                allProducts.push({ 
                  ...workItem, 
                  _id: productId, 
                  farmerName: farmerData.farmerName, 
                  farmerId: farmerData._id, 
                  phoneNumber: farmerData.phoneNumber, 
                  name: workItem.cropName, 
                  rating: Math.floor(Math.random() * 5) + 1 
                }); 
              }); 
            } else { 
              allProducts.push({ 
                ...farmerData, 
                _id: farmerData._id || `product-${Math.random().toString(36).substr(2, 9)}` 
              }); 
            } 
          }); 
        } 

        setProducts(allProducts); 
        // Generate bundles based on the bundle creation rules 
        const generatedBundles = generateBundles(allProducts); 
        setBundles(generatedBundles);
        setFilteredBundles(generatedBundles); 
        setLoading(false); 
      }) 
      .catch((err) => { 
        console.error("Error fetching products for bundles:", err); 
        setError(err.message); 
        setLoading(false); 
      }); 

    // Try to get cart from localStorage on mount 
    try { 
      const savedCart = localStorage.getItem('cart'); 
      if (savedCart) { 
        setCart(JSON.parse(savedCart)); 
      } 
    } catch (e) { 
      console.error("Error loading cart from localStorage:", e); 
    } 
  }, []); 

  // Get userId from localStorage if not passed as prop 
  useEffect(() => { 
    const storedUserId = localStorage.getItem("userId"); 
    console.log("Bundles component - userId from localStorage:", storedUserId); 
    setLocalUserId(storedUserId); 
  }, [propUserId]); 

  // Apply filters, search, sort, and category when they change 
  useEffect(() => { 
    if (bundles.length === 0) return; 

    console.log("Filtering bundles with:", { 
      category: activeCategory, 
      searchQuery, 
      filters, 
      sortOption 
    }); 

    // Start with all bundles 
    let result = [...bundles]; 

    // Apply category filter 
    if (activeCategory && activeCategory !== 'all') { 
      result = result.filter(bundle => 
        bundle.items.some(item => 
          item.category && item.category.toLowerCase() === activeCategory.toLowerCase() 
        ) 
      ); 
    } 

    // Search filter 
    if (searchQuery) { 
      const query = searchQuery.toLowerCase(); 
      result = result.filter(bundle => { 
        // Check bundle name 
        if (bundle.name.toLowerCase().includes(query)) return true; 

        // Check bundle price 
        if (bundle.price && bundle.price.toString().includes(query)) return true; 

        // Check items within bundle 
        return bundle.items.some(item => { 
          const itemStr = JSON.stringify(item).toLowerCase(); 
          return itemStr.includes(query) || 
            (item.name && item.name.toLowerCase().includes(query)) || 
            (item.cropName && item.cropName.toLowerCase().includes(query)) || 
            (item.category && item.category.toLowerCase().includes(query)) || 
            (item.location && item.location.toLowerCase().includes(query)); 
        }); 
      }); 
    } 

    // Apply location filter 
    if (filters.location) { 
      result = result.filter(bundle => 
        bundle.location && bundle.location.includes(filters.location) || 
        bundle.items.some(item => item.location && item.location.includes(filters.location)) 
      ); 
    } 

    // Apply price range filter 
    if (filters.priceRange && filters.priceRange.length === 2) { 
      const [min, max] = filters.priceRange; 
      result = result.filter(bundle => 
        bundle.price >= min && bundle.price <= max 
      ); 
    } 

    // Apply delivery time filter if selected 
    if (filters.deliveryTime && filters.deliveryTime.length > 0) { 
      result = result.filter(bundle => 
        bundle.items.some(item => 
          filters.deliveryTime.includes(item.deliveryTime) 
        ) 
      ); 
    } 

    // Apply payment options filter if selected 
    if (filters.paymentOptions && filters.paymentOptions.length > 0) { 
      result = result.filter(bundle => 
        bundle.items.some(item => 
          filters.paymentOptions.includes(item.paymentOption) 
        ) 
      ); 
    } 

    // Apply sorting 
    if (sortOption) { 
      switch (sortOption) { 
        case 'popular': 
          // For bundles, we can sort by discount percentage as a proxy for popularity 
          result.sort((a, b) => { 
            const discountA = ((a.items.reduce((total, item) => total + item.price, 0) - a.price) / 
              a.items.reduce((total, item) => total + item.price, 0)) * 100; 
            const discountB = ((b.items.reduce((total, item) => total + item.price, 0) - b.price) / 
              b.items.reduce((total, item) => total + item.price, 0)) * 100; 
            return discountB - discountA; 
          }); 
          break; 
        case 'price_low_high': 
          result.sort((a, b) => a.price - b.price); 
          break; 
        case 'price_high_low': 
          result.sort((a, b) => b.price - a.price); 
          break; 
        case 'newest': 
          // For bundles, we'll use the bundle creation timestamp or ID as a proxy 
          result.sort((a, b) => b._id.localeCompare(a._id)); 
          break; 
        default: 
          break; 
      } 
    } 

    console.log("Filtered bundles count:", result.length); 
    setFilteredBundles(result); 
  }, [filters, bundles, searchQuery, sortOption, activeCategory]); 

  // Generate bundles from products based on the rules 
  const generateBundles = (products) => { 
    const bundles = []; 
    const bundleGroups = { 
      sameName: {}, 
      sameFarmer: {}, 
      sameCategory: {}, 
      sameLocation: {} 
    }; 

    // Group products by each criteria 
    products.forEach(product => { 
      // By name 
      const name = product.cropName || product.name; 
      if (name) { 
        if (!bundleGroups.sameName[name]) bundleGroups.sameName[name] = []; 
        bundleGroups.sameName[name].push(product); 
      } 

      // By farmer 
      const farmerId = product.farmerId; 
      if (farmerId) { 
        if (!bundleGroups.sameFarmer[farmerId]) bundleGroups.sameFarmer[farmerId] = []; 
        bundleGroups.sameFarmer[farmerId].push(product); 
      } 

      // By category 
      const category = product.category; 
      if (category) { 
        if (!bundleGroups.sameCategory[category]) bundleGroups.sameCategory[category] = []; 
        bundleGroups.sameCategory[category].push(product); 
      } 

      // By location 
      const location = product.location; 
      if (location) { 
        if (!bundleGroups.sameLocation[location]) bundleGroups.sameLocation[location] = []; 
        bundleGroups.sameLocation[location].push(product); 
      } 
    }); 

    // Create bundles from groups that have at least 2 items 
    // Same Name Bundles 
    Object.entries(bundleGroups.sameName).forEach(([name, items]) => { 
      if (items.length >= 2) { 
        // Take up to 3 items 
        const bundleItems = items.slice(0, 3); 
        const originalPrice = bundleItems.reduce((sum, item) => sum + item.price, 0); 
        const discount = Math.random() * 0.15 + 0.05; // Random discount between 5-20% 
        const discountedPrice = Math.round(originalPrice * (1 - discount)); 

        bundles.push({ 
          _id: `bundle-name-${name.replace(/\s+/g, '-').toLowerCase()}-${bundles.length}`, 
          name: `${name} Bundle`, 
          items: bundleItems, 
          price: discountedPrice, 
          reason: "Same Product", 
          location: bundleItems[0].location 
        }); 
      } 
    }); 

    // Same Farmer Bundles 
    Object.entries(bundleGroups.sameFarmer).forEach(([farmerId, items]) => { 
      if (items.length >= 2) { 
        // Take 2-3 random items from the farmer 
        const shuffled = [...items].sort(() => 0.5 - Math.random()); 
        const bundleItems = shuffled.slice(0, Math.min(3, shuffled.length)); 
        const originalPrice = bundleItems.reduce((sum, item) => sum + item.price, 0); 
        const discount = Math.random() * 0.15 + 0.05; // Random discount between 5-20% 
        const discountedPrice = Math.round(originalPrice * (1 - discount)); 
        const farmerName = bundleItems[0].farmerName || "Farmer"; 

        bundles.push({ 
          _id: `bundle-farmer-${farmerId}-${bundles.length}`, 
          name: `${farmerName}'s Special Bundle`, 
          items: bundleItems, 
          price: discountedPrice, 
          reason: "Same Farmer", 
          location: bundleItems[0].location 
        }); 
      } 
    }); 

    // Same Category Bundles 
    Object.entries(bundleGroups.sameCategory).forEach(([category, items]) => { 
      if (items.length >= 2) { 
        // Take 2-3 random items from the category 
        const shuffled = [...items].sort(() => 0.5 - Math.random()); 
        const bundleItems = shuffled.slice(0, Math.min(3, shuffled.length)); 
        const originalPrice = bundleItems.reduce((sum, item) => sum + item.price, 0); 
        const discount = Math.random() * 0.15 + 0.05; // Random discount between 5-20% 
        const discountedPrice = Math.round(originalPrice * (1 - discount)); 

        bundles.push({ 
          _id: `bundle-category-${category.replace(/\s+/g, '-').toLowerCase()}-${bundles.length}`, 
          name: `${category} Collection`, 
          items: bundleItems, 
          price: discountedPrice, 
          reason: "Same Category", 
          location: bundleItems.map(item => item.location).filter(Boolean)[0] || "Various" 
        }); 
      } 
    }); 

    // Same Location Bundles 
    Object.entries(bundleGroups.sameLocation).forEach(([location, items]) => { 
      if (items.length >= 2) { 
        // Take 2-3 random items from the location 
        const shuffled = [...items].sort(() => 0.5 - Math.random()); 
        const bundleItems = shuffled.slice(0, Math.min(3, shuffled.length)); 
        const originalPrice = bundleItems.reduce((sum, item) => sum + item.price, 0); 
        const discount = Math.random() * 0.15 + 0.05; // Random discount between 5-20% 
        const discountedPrice = Math.round(originalPrice * (1 - discount)); 

        bundles.push({ 
          _id: `bundle-location-${location.replace(/\s+/g, '-').toLowerCase()}-${bundles.length}`, 
          name: `${location} Local Bundle`, 
          items: bundleItems, 
          price: discountedPrice, 
          reason: "Same Location", 
          location: location 
        }); 
      } 
    }); 

    console.log(`Generated ${bundles.length} bundles from ${products.length} products`); 
    return bundles; 
  }; 

  // Determine the effective userId to use 
  const effectiveUserId = propUserId || localUserId; 

  // Function to add bundle to cart 
  const addToCart = (bundle) => { 
    if (!effectiveUserId) { 
      alert("Please log in to add items to cart"); 
      return; 
    } 

    // Check if the bundle is already in the cart 
    if (cart.some(item => item.bundleId === bundle._id)) { 
      console.log("Bundle already in cart, not adding again"); 
      return; 
    } 

    const cartItem = { 
      userId: effectiveUserId, 
      bundleId: bundle._id, 
      name: bundle.name, 
      price: bundle.price, 
      image: bundle.items[0].image, // Use first item's image as bundle image 
      quantity: 1, 
      items: bundle.items.map(item => ({ 
        productId: item._id, 
        name: item.cropName || item.name, 
        price: item.price, 
        farmerId: item.farmerId, 
        farmerName: item.farmerName, 
        category: item.category, 
        location: item.location 
      })), 
      isBundle: true 
    }; 

    console.log("Adding bundle to cart:", cartItem); 

    // Update local state 
    const updatedCart = [...cart, cartItem]; 
    setCart(updatedCart); 

    // Store in localStorage for persistence 
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  }; 

  // Function to remove bundle from cart 
  const removeFromCart = (bundle) => { 
    console.log("Removing bundle from cart, bundle ID:", bundle._id); 
    const updatedCart = cart.filter(item => item.bundleId !== bundle._id); 
    setCart(updatedCart); 

    // Update localStorage 
    localStorage.setItem('cart', JSON.stringify(updatedCart)); 
  }; 

  // Handle category change 
  const handleCategoryChange = (categoryId) => { 
    console.log("Setting active category:", categoryId); 
    setActiveCategory(categoryId.toLowerCase()); 
    setFilters({ ...filters, category: categoryId.toLowerCase() }); 
  }; 

  // Handle search 
  const handleSearch = (query) => { 
    setSearchQuery(query); 
  }; 

  // Handle sort 
  const handleSort = (option) => { 
    setSortOption(option); 
  }; 

  // Handle filter changes 
  const handleFilterChange = (newFilters) => { 
    setFilters({ ...filters, ...newFilters }); 
  }; 

  // Handle filter collapse state 
  const handleFilterCollapseChange = (collapsed) => { 
    setIsFilterCollapsed(collapsed); 
  }; 

  // Reset all filters
  const resetFilters = () => {
    setFilters({
      location: "",
      priceRange: [0, 50000],
      customerRating: [],
      deliveryTime: [],
      paymentOptions: [],
      category: "all"
    });
    setSearchQuery("");
    setSortOption("newest");
    setActiveCategory("all");
  };

  // Loading state 
  if (loading) { 
    return ( 
      <div className="bg-[#f9f4ef] min-h-screen"> 
        <div className="max-w-10xl mx-auto p-4"> 
          <h2 className="text-2xl font-bold mb-4">Product Bundles</h2> 
          <div className="flex justify-center items-center h-64"> 
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div> 
            <p className="ml-4 text-gray-500">Creating bundles for you...</p> 
          </div> 
        </div> 
      </div> 
    ); 
  } 

  // Error state 
  if (error) { 
    return ( 
      <div className="bg-[#f9f4ef] min-h-screen"> 
        <div className="max-w-10xl mx-auto p-4"> 
          <h2 className="text-2xl font-bold mb-4">Product Bundles</h2> 
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert"> 
            <strong className="font-bold">Error!</strong> 
            <span className="block sm:inline"> {error}</span> 
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
            > 
              Retry 
            </button> 
          </div> 
        </div> 
      </div> 
    ); 
  } 

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
            {/* Product Header */} 
            <ProductHeader 
              onSearch={handleSearch} 
              onSort={handleSort} 
              cartItemCount={cart.length} 
            /> 

            {/* Categories */} 
            <Categories onCategoryChange={handleCategoryChange} /> 

            {/* Bundle Content */} 
            <div className="px-6 py-8"> 
              <h1 className="text-3xl font-bold mb-8 text-center">Product Bundles</h1> 

              {/* Filter Tags */} 
              {Object.entries(filters).some(([key, value]) => 
                (Array.isArray(value) && value.length > 0) || 
                (!Array.isArray(value) && value && key !== "category" && value !== "all") 
              ) && ( 
                <div className="flex flex-wrap gap-2 mb-4"> 
                  {filters.location && ( 
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm"> 
                      Location: {filters.location} 
                    </span> 
                  )} 
                  {filters.priceRange && filters.priceRange.length === 2 && ( 
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm"> 
                      Price: ₹{filters.priceRange[0]} - ₹{filters.priceRange[1]} 
                    </span> 
                  )} 
                </div> 
              )} 

              {/* Search result info */} 
              {searchQuery && ( 
                <div className="mb-4"> 
                  <p className="text-gray-600"> 
                    Showing results for: <span className="font-semibold">{searchQuery}</span> 
                  </p> 
                </div> 
              )} 

              {/* Category info */} 
              {activeCategory && activeCategory !== 'all' && ( 
                <div className="mb-4"> 
                  <p className="text-gray-600"> 
                    Category: <span className="font-semibold capitalize">{activeCategory}</span> 
                  </p> 
                </div> 
              )} 

              {/* Debug info - can be removed in production */} 
              <div className="bg-white p-4 rounded-lg shadow-md mb-6 text-sm text-gray-600"> 
                <p>User ID: {effectiveUserId || "Not logged in"}</p> 
                <p>Cart Items: {cart.length}</p> 
                <p>Products Count: {products.length}</p> 
                <p>Bundle Count: {bundles.length}</p> 
                <p>Filtered Bundles: {filteredBundles.length}</p> 
                <p>Search Query: {searchQuery || "None"}</p> 
                <p>Sort Option: {sortOption}</p> 
                <p>Active Category: {activeCategory}</p> 
                <p>Active Filters: {Object.entries(filters) 
                  .filter(([key, value]) => 
                    (Array.isArray(value) && value.length > 0) || 
                    (!Array.isArray(value) && value && key !== "category") 
                  ) 
                  .map(([key]) => key) 
                  .join(', ') || 'None'}</p> 
              </div> 

              {/* Bundle Grid */} 
              {filteredBundles.length > 0 ? ( 
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6"> 
                  {filteredBundles.map((bundle, index) => ( 
                    <BundleCard 
                      key={bundle._id || index} 
                      bundle={bundle} 
                      effectiveUserId={effectiveUserId} 
                      addToCart={addToCart} 
                      removeFromCart={removeFromCart} 
                      cart={cart} 
                      setActiveCategory={handleCategoryChange} 
                    /> 
                  ))} 
                </div> 
              ) : ( 
                <div className="bg-white p-10 rounded-lg shadow-md text-center"> 
                  <p className="text-lg text-gray-500">No bundles match your current criteria.</p> 
                  <p className="text-sm text-gray-400 mt-2">Try adjusting your filters or search terms.</p> 
                  <button 
                    onClick={resetFilters} 
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700" 
                  > 
                    Reset Filters 
                  </button> 
                </div> 
              )} 
            </div> 
          </div> 
        </div> 
      </div> 
    </div> 
  ); 
}; 

export default Bundles;