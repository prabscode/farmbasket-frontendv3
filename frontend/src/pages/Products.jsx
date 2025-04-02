import { useEffect, useState } from "react";
import Cart from "../components/Cart";
import ProductHeader from "../components/ProductHeader";
import Categories from "../components/Categories";

const Products = ({ userId: propUserId, filters = {}, onCategoryChange }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [localUserId, setLocalUserId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  // Fetch products on component mount
  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Get userId from localStorage if not passed as prop
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    console.log("Products component - userId from localStorage:", storedUserId);
    setLocalUserId(storedUserId);
  }, [propUserId]);

  // Apply filters, search and sorting when they change
  useEffect(() => {
    if (products.length === 0) return;
    let result = [...products];

    // Apply search if there's a query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(product =>
        product.name?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.category?.toLowerCase().includes(query) ||
        product.location?.toLowerCase().includes(query) ||
        product.farmerLocation?.toLowerCase().includes(query) ||
        (product.price !== undefined && product.price.toString().includes(query))
      );
    }

    // Filter by category if specified and not 'all'
    if (filters.category && filters.category !== 'all') {
      result = result.filter(product =>
        product.category?.toLowerCase() === filters.category.toLowerCase()
      );
    }

    // Filter by location if specified
    if (filters.location) {
      result = result.filter(product =>
        product.location === filters.location ||
        product.farmerLocation === filters.location
      );
    }

    // Filter by price range
    if (filters.priceRange && filters.priceRange.length === 2) {
      result = result.filter(product =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
      );
    }

    // Filter by customer rating if any rating is selected
    if (filters.customerRating && filters.customerRating.length > 0) {
      result = result.filter(product => {
        const rating = product.rating || 0;
        return filters.customerRating.some(r => rating >= r);
      });
    }

    // Filter by delivery time if any delivery option is selected
    if (filters.deliveryTime && filters.deliveryTime.length > 0) {
      result = result.filter(product => {
        const deliveryOption = product.deliveryTime || '';
        return filters.deliveryTime.includes(deliveryOption);
      });
    }

    // Filter by payment options if any payment option is selected
    if (filters.paymentOptions && filters.paymentOptions.length > 0) {
      result = result.filter(product => {
        const paymentOption = product.paymentOption || [];
        return filters.paymentOptions.some(option => paymentOption.includes(option));
      });
    }

    // Apply sorting
    if (sortOption) {
      switch (sortOption) {
        case 'newest':
          result.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
          break;
        case 'price_low_high':
          result.sort((a, b) => (a.price || 0) - (b.price || 0));
          break;
        case 'price_high_low':
          result.sort((a, b) => (b.price || 0) - (a.price || 0));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
  }, [filters, products, searchQuery, sortOption]);

  // Determine the effective userId to use
  const effectiveUserId = propUserId || localUserId;

  // Function to add product to cart
  const addToCart = (product) => {
    if (!effectiveUserId) {
      alert("Please log in to add items to cart");
      return;
    }

    const cartItem = {
      userId: effectiveUserId,
      farmerId: product.farmerId,
      productId: product._id || product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    };

    console.log("Adding to cart with userId:", effectiveUserId);
    setCart((prevCart) => [...prevCart, cartItem]);
  };

  // Handle search from header
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Handle sort from header
  const handleSort = (option) => {
    setSortOption(option);
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <div>
      {/* Product Header component */}
      <ProductHeader
        onSearch={handleSearch}
        onSort={handleSort}
        cartItemCount={cart.length}
      />
      
      {/* Categories component - now below the ProductHeader */}
      <Categories onCategoryChange={handleCategorySelect} />
      
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Available Crops</h2>
        
        {/* Debug info - Remove in production */}
        <div className="mb-4 p-2 bg-gray-100 rounded text-sm">
          <p>User ID: {effectiveUserId || "Not logged in"}</p>
          <p>Cart Items: {cart.length}</p>
          <p>Total Products: {products.length}</p>
          <p>Filtered Products: {filteredProducts.length}</p>
          <p>Search Query: {searchQuery || "None"}</p>
          <p>Sort Option: {sortOption}</p>
          <p>Category Filter: {filters.category || "All"}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-lg">
              <img
                src={product.image || "https://via.placeholder.com/150"}
                alt={product.name}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-green-600 font-bold mt-2">₹{product.price}</p>
              {product.category && <p className="text-gray-600 text-sm">Category: {product.category}</p>}
              {(product.location || product.farmerLocation) &&
                <p className="text-gray-600 text-sm">Location: {product.location || product.farmerLocation}</p>
              }
              <p className="text-gray-500 text-sm">Farmer ID: {product.farmerId}</p>
              <p className="text-gray-500 text-sm">Product ID: {product._id || product.id}</p>
              <button
                onClick={() => addToCart(product)}
                className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={!effectiveUserId}
              >
                {effectiveUserId ? "Add to Cart" : "Login to Add"}
              </button>
            </div>
          ))}
        </div>
        
        {/* Cart Component */}
        <Cart cart={cart} userId={effectiveUserId} />
      </div>
    </div>
  );
};

export default Products;