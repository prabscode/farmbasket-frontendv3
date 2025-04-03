import { useEffect, useState } from "react";
import { MapPin, Heart, Share, User } from "lucide-react";
import Cart from "../components/Cart";
import ProductHeader from "../components/ProductHeader";
import Categories from "../components/Categories";
// ProductCard Component
const ProductCard = ({ product, effectiveUserId, addToCart, removeFromCart, cart, setActiveCategory }) => {
const [isLiked, setIsLiked] = useState(false);
// Check if THIS specific product is in cart by comparing product ID
const isInCart = cart.some(item => item.productId === product._id);
const handleLikeClick = (e) => {
e.stopPropagation();
setIsLiked(!isLiked);
};
const handleShareClick = (e) => {
e.stopPropagation();
console.log("Sharing product:", product.name);
};
const handleFarmerProfileClick = (e) => {
e.stopPropagation();
console.log("Opening farmer profile for:", product.farmerName, "with ID:", product.farmerId);
window.open(`/farmer-profile/${product.farmerId}`, "_blank");
};
const handleCategoryClick = (e) => {
e.stopPropagation();
if (setActiveCategory && product.category) {
setActiveCategory(product.category);
}
};
// Handle cart button click for this specific product
const handleCartButtonClick = () => {
if (isInCart) {
removeFromCart(product);
} else {
addToCart(product);
}
};
return (
<div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-101 border border-gray-200">
{/* Crop Name Header - Changed from Farmer Name to Crop Name */}
<div className="p-3 bg-gray-900 text-white">
<h3 className="font-bold truncate">{product.cropName || product.name || "Unknown Crop"}</h3>
</div>
{/* Product Image */}
<div className="relative w-full h-52 bg-gray-100">
<img
src={product.image || "https://res.cloudinary.com/john-mantas/image/upload/v1537291846/codepen/delicious-apples/green-apple-with-slice.png"}
alt={product.cropName || product.name}
className="w-full h-full object-contain"
/>
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
<button onClick={handleFarmerProfileClick} className="p-2 hover:bg-gray-100 rounded-full">
<User
size={20}
stroke="#555"
className="transition-colors duration-300"
/>
</button>
</div>
{/* Product Info */}
<div className="p-4 flex flex-col flex-grow">
{/* Product Name */}
<div className="mb-1">
<span onClick={handleCategoryClick} className="inline-block bg-gray-100 rounded-full px-2 py-1 text-xs font-medium text-gray-800 cursor-pointer hover:bg-gray-200 mb-2">
{product.category || "Other"}
</span>
<h3 className="font-medium text-lg">{product.cropName || product.name}</h3>
</div>
{/* Location */}
<div className="flex items-center text-gray-500 text-sm mb-2">
<MapPin size={14} className="mr-1" />
<span className="truncate">{product.location || "Unknown Location"}</span>
</div>
{/* Stock & Delivery */}
<div className="text-sm text-gray-600 space-y-1 mb-2">
<p>Stock: {product.stock || 0}</p>
<p>Estimated Delivery: {product.estimatedDeliveryTime || "Unknown"}</p>
</div>
{/* Product ID & Farmer ID - Fixed Product ID display */}
<div className="text-xs text-gray-400 space-y-1 mb-4">
<p>Product ID: {product._id || "N/A"}</p>
<p>Farmer ID: {product.farmerId || "N/A"}</p>
</div>
</div>
{/* Price and Add to Cart Button */}
<div className="flex justify-between items-center px-4 py-3 bg-gray-900 mt-auto">
<div className="text-white">
<span className="text-xl font-semibold">
₹
{product.price}</span>
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
// Main Products Component
const Products = ({
userId: propUserId,
filters = {},
searchQuery = '',
sortOption = 'popular',
category = 'all',
onCategoryChange
}) => {
const [products, setProducts] = useState([]);
const [filteredProducts, setFilteredProducts] = useState([]);
const [cart, setCart] = useState([]);
const [localUserId, setLocalUserId] = useState(null);
const [activeCategory, setActiveCategory] = useState(category);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchQueryLocal, setSearchQueryLocal] = useState(searchQuery);
const [sortOptionLocal, setSortOptionLocal] = useState(sortOption);
// Fetch products on component mount
useEffect(() => {
setLoading(true);
console.log("Fetching products...");
fetch("http://localhost:5000/api/products")
.then((res) => {
if (!res.ok) {
throw new Error(`Error fetching products: ${res.status}`);
}
return res.json();
})
.then((data) => {
console.log("API Response:", data);
// Handle direct array of products
if (Array.isArray(data)) {
// If the API returns an array of farmer objects with works arrays
let allProducts = [];
data.forEach(farmerData => {
if (farmerData.works && Array.isArray(farmerData.works)) {
// Extract each work item as a product with farmer info
farmerData.works.forEach(workItem => {
// Use the _id directly from the work item
const productId = workItem._id;
allProducts.push({
...workItem,
_id: productId, // Use the work item's _id directly
farmerName: farmerData.farmerName,
farmerId: farmerData._id,
phoneNumber: farmerData.phoneNumber,
name: workItem.cropName, // Ensure we have a name property
// Add any default values or transformations needed
rating: Math.floor(Math.random() * 5) + 1 // Example random rating
});
});
} else {
// If it's a direct product object
allProducts.push({
...farmerData,
_id: farmerData._id || `product-${Math.random().toString(36).substr(2, 9)}`
});
}
});
console.log("Transformed products:", allProducts);
setProducts(allProducts);
setFilteredProducts(allProducts);
} else {
console.error("Unexpected API response format:", data);
setError("Unexpected data format from API");
}
setLoading(false);
})
.catch((err) => {
console.error("Error fetching products:", err);
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
console.log("Products component - userId from localStorage:", storedUserId);
setLocalUserId(storedUserId);
}, [propUserId]);
// Apply filters, search, sort, and category when they change
useEffect(() => {
if (products.length === 0) return;
console.log("Filtering products with:", {
category: activeCategory,
searchQuery: searchQueryLocal,
filters,
sortOption: sortOptionLocal
});
// Start with all products
let result = [...products];

// Apply category filter
if (activeCategory && activeCategory !== 'all') {
result = result.filter(product =>
product.category &&
product.category.toLowerCase() === activeCategory.toLowerCase()
);
}
// Enhanced search filter to search through all properties
if (searchQueryLocal) {
const query = searchQueryLocal.toLowerCase();
result = result.filter(product => {
// Convert product to string for easy searching across all fields
const productStr = JSON.stringify(product).toLowerCase();
return productStr.includes(query) ||
// Explicit checks for common fields
(product.name && product.name.toLowerCase().includes(query)) ||
(product.cropName && product.cropName.toLowerCase().includes(query)) ||
(product.description && product.description.toLowerCase().includes(query)) ||
(product.category && product.category.toLowerCase().includes(query)) ||
(product.location && product.location.toLowerCase().includes(query)) ||
// Convert price to string and check
(product.price !== undefined && product.price.toString().includes(query));
});
}
// Apply location filter
if (filters.location) {
result = result.filter(product =>
product.location && product.location.includes(filters.location)
);
}
// Apply price range filter
if (filters.priceRange && filters.priceRange.length === 2) {
const [min, max] = filters.priceRange;
result = result.filter(product =>
product.price >= min && product.price <= max
);
}
// Apply customer rating filter
if (filters.customerRating && filters.customerRating.length > 0) {
const minRating = Math.min(...filters.customerRating);
result = result.filter(product =>
product.rating >= minRating
);
}
// Apply delivery time filter
if (filters.deliveryTime && filters.deliveryTime.length > 0) {
result = result.filter(product => {
if (!product.estimatedDeliveryTime) return true;
const deliveryDays = typeof product.estimatedDeliveryTime === 'number'
? product.estimatedDeliveryTime
: parseInt(product.estimatedDeliveryTime.split(' ')[0]) || 0;
return (
(filters.deliveryTime.includes("next_day") && deliveryDays <= 1) ||
(filters.deliveryTime.includes("2-3_days") && deliveryDays >= 2 && deliveryDays <= 3) ||
(filters.deliveryTime.includes("4-7_days") && deliveryDays >= 4 && deliveryDays <= 7)
);
});
}
// Apply payment options filter
if (filters.paymentOptions && filters.paymentOptions.length > 0) {
result = result.filter(product =>
product.paymentOptions && filters.paymentOptions.some(option =>
product.paymentOptions.includes(option)
)
);
}
// Apply sorting
if (sortOptionLocal) {
switch (sortOptionLocal) {
case 'popular':
// Assuming you have a popularity field, or using rating as a proxy
result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
break;
case 'rating':
result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
break;
case 'newest':
// Assuming you have a createdAt field
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
console.log("Filtered products count:", result.length);
setFilteredProducts(result);
}, [filters, products, searchQueryLocal, sortOptionLocal, activeCategory]);
// Determine the effective userId to use
const effectiveUserId = propUserId || localUserId;
// Function to add product to cart
const addToCart = (product) => {
if (!effectiveUserId) {
alert("Please log in to add items to cart");
return;
}
// Check if the product is already in the cart
if (cart.some(item => item.productId === product._id)) {
console.log("Product already in cart, not adding again");
return;
}
const cartItem = {
userId: effectiveUserId,
farmerId: product.farmerId,
productId: product._id,
name: product.cropName || product.name,
price: product.price,
image: product.image,
quantity: 1, // Add quantity for cart functionality
farmerName: product.farmerName,
category: product.category,
location: product.location,
estimatedDeliveryTime: product.estimatedDeliveryTime
};
console.log("Adding to cart:", cartItem);
// Update local state
const updatedCart = [...cart, cartItem];
setCart(updatedCart);
// Store in localStorage for persistence
localStorage.setItem('cart', JSON.stringify(updatedCart));
};
// Function to remove product from cart
const removeFromCart = (product) => {
console.log("Removing from cart, product ID:", product._id);
const updatedCart = cart.filter(item => item.productId !== product._id);
setCart(updatedCart);
// Update localStorage
localStorage.setItem('cart', JSON.stringify(updatedCart));
};
// Handle category change
const handleCategoryChange = (newCategory) => {
console.log("Setting active category:", newCategory);
setActiveCategory(newCategory.toLowerCase());
// If parent component provided a category change handler, call it
if (onCategoryChange) {
onCategoryChange(newCategory.toLowerCase());
}
};
// Handle search from header
const handleSearch = (query) => {
setSearchQueryLocal(query);
};
// Handle sort from header
const handleSort = (option) => {
setSortOptionLocal(option);
};
// Update cart item quantity
const updateQuantity = (index, newQuantity) => {
if (newQuantity < 1) return;
const updatedCart = [...cart];
updatedCart[index].quantity = newQuantity;
setCart(updatedCart);
// Update localStorage
localStorage.setItem('cart', JSON.stringify(updatedCart));
};
// Loading state
if (loading) {
return (
<div className="p-4">
<ProductHeader
onSearch={handleSearch}
onSort={handleSort}
cartItemCount={cart.length}
/>
<Categories onCategoryChange={handleCategoryChange} />
<h2 className="text-2xl font-bold mb-4">Available Crops</h2>
<div className="flex justify-center items-center h-64">
<div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
<p className="ml-4 text-gray-500">Loading products...</p>
</div>
</div>
);
}
// Error state
if (error) {
return (
<div className="p-4">
<ProductHeader
onSearch={handleSearch}
onSort={handleSort}
cartItemCount={cart.length}
/>
<Categories onCategoryChange={handleCategoryChange} />
<h2 className="text-2xl font-bold mb-4">Available Crops</h2>
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
);
}
return (
<div>
{/* Product Header component */}
<ProductHeader
onSearch={handleSearch}
onSort={handleSort}
cartItemCount={cart.length}
/>
{/* Categories component */}
<Categories onCategoryChange={handleCategoryChange} />
<div className="p-4">
<h2 className="text-2xl font-bold mb-4">Available Crops</h2>
{/* Debug info - Remove in production */}
<div className="mb-4 p-2 bg-gray-100 rounded text-sm">
<p>User ID: {effectiveUserId || "Not logged in"}</p>
<p>Cart Items: {cart.length}</p>
<p>Products Count: {products.length}</p>
<p>Filtered Products: {filteredProducts.length}</p>
<p>Search Query: {searchQueryLocal || "None"}</p>
<p>Sort Option: {sortOptionLocal}</p>
<p>Active Category: {activeCategory}</p>
<p>Active Filters: {Object.entries(filters)
.filter(([key, value]) =>
(Array.isArray(value) && value.length > 0) ||
(!Array.isArray(value) && value)
)
.map(([key]) => key)
.join(', ') || 'None'}</p>
</div>
{/* Filter Tags */}
{Object.entries(filters).some(([key, value]) =>
(Array.isArray(value) && value.length > 0) ||
(!Array.isArray(value) && value)
) && (
<div className="flex flex-wrap gap-2 mb-4">
{filters.location && (
<span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
Location: {filters.location}
</span>
)}
{filters.priceRange && filters.priceRange.length === 2 && (
<span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">
Price: ₹
{filters.priceRange[0]}
- ₹
{filters.priceRange[1]}
</span>
)}
{filters.customerRating && filters.customerRating.length > 0 && (
<span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
Rating: {Math.min(...filters.customerRating)}+ Stars
</span>
)}
{filters.deliveryTime && filters.deliveryTime.length > 0 && (
<span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm">
Delivery: {filters.deliveryTime.map(dt =>
dt === "next_day" ? "Next Day" :
dt === "2-3_days" ? "2-3 Days" :
"4-7 Days"
).join(', ')}
</span>
)}
{filters.paymentOptions && filters.paymentOptions.length > 0 && (
<span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">
Payment: {filters.paymentOptions.map(po =>
po === "cod" ? "COD" :
po === "online" ? "Online" :
po === "upi" ? "UPI" :
"Card"
).join(', ')}
</span>
)}
</div>
)}
{/* Search result info */}
{searchQueryLocal && (
<div className="mb-4">
<p className="text-gray-600">
Showing results for: <span className="font-semibold">{searchQueryLocal}</span>
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
{/* Product Grid */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-2">
{filteredProducts.length > 0 ? (
filteredProducts.map((product, index) => (
<ProductCard
key={product._id || index}
product={product}
effectiveUserId={effectiveUserId}
addToCart={addToCart}
removeFromCart={removeFromCart}
cart={cart}
setActiveCategory={handleCategoryChange}
/>
))
) : (
<div className="col-span-full text-center py-10">
<p className="text-lg text-gray-500">No products match your current criteria.</p>
<p className="text-sm text-gray-400">Try adjusting your filters or search terms.</p>
</div>
)}
</div>
{/* Cart Component */}
<Cart
cart={cart}
userId={effectiveUserId}
removeFromCart={(index) => {
const itemToRemove = cart[index];
if (itemToRemove) {
removeFromCart({ _id: itemToRemove.productId });
}
}}
updateQuantity={updateQuantity}
/>
</div>
</div>
);
};
export default Products;