import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductHeader = ({ onSearch, onSort, cartItemCount = 0 }) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [sortOption, setSortOption] = useState('newest');
  
  // Updated sort options with the new ones
  const sortOptions = [
    { name: 'Newest', value: 'newest' },
    { name: 'Price: Low to High', value: 'price_low_high' },
    { name: 'Price: High to Low', value: 'price_high_low' },
    { name: 'Stock: High to Low', value: 'stock_high_low' },
    { name: 'Stock: Low to High', value: 'stock_low_high' },
    { name: 'Delivery: Quickest', value: 'delivery_quickest' },
    { name: 'Delivery: Longest', value: 'delivery_longest' },
  ];

  // Trigger search when typing
  useEffect(() => {
    onSearch(searchQuery);
  }, [searchQuery, onSearch]);

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSort = (selectedValue) => {
    setSortOption(selectedValue);
    onSort(selectedValue);
    setShowSortOptions(false);
  };

  const handleCartClick = () => {
    if (cartItemCount > 0) {
      navigate('/cart');
    }
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div className="bg-white w-full shadow-md">
      <div className="w-full">
        <main className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between border-b border-gray-200 pt-4 pb-6 w-full">
            <div className="w-full max-w-lg min-w-[300px] ml-50">
              <form onSubmit={handleSearch} className="relative">
                <input
                  className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-base border border-slate-200 rounded-md pl-3 pr-28 py-2.5 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                  placeholder="Search by name, price, category, location..."
                  value={searchQuery}
                  onChange={handleInputChange}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    className="absolute top-2.5 right-24 text-gray-400 hover:text-gray-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                <button
                  type="submit"
                  className="absolute top-1.5 right-1.5 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 mr-2">
                    <path fillRule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clipRule="evenodd" />
                  </svg>
                  Search
                </button>
              </form>
            </div>
            <div className="flex items-center">
              {/* Sort Dropdown */}
              <div className="relative inline-block text-left">
                <div>
                  <button
                    onClick={() => setShowSortOptions(!showSortOptions)}
                    className="group inline-flex justify-center text-sm font-medium bg-gray-800 px-4 py-2 mr-4 rounded-md text-white hover:bg-gray-700 focus:outline-none"
                  >
                    Sort: {sortOptions.find(option => option.value === sortOption)?.name || 'Newest'}
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                {showSortOptions && (
                  <div className="absolute right-0 z-10 mt-2 w-60 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <button
                          key={option.name}
                          onClick={() => handleSort(option.value)}
                          className={classNames(
                            option.value === sortOption ? 'font-bold text-gray-900' : 'text-gray-500',
                            'block w-full text-left px-4 py-2 text-sm hover:bg-gray-100'
                          )}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Cart Button */}
              <div className="relative">
                <button
                  type="button"
                  className={`px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none flex items-center ${cartItemCount === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  aria-label="Shopping Cart"
                  onClick={handleCartClick}
                  disabled={cartItemCount === 0}
                >
                  {/* Shopping Cart SVG */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gray-400 text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductHeader;