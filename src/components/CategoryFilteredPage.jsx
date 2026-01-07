import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";

const CategoryFilteredPage = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log(`Fetching items for category: ${categoryName}`);
        
        // First try the category-specific endpoint
        let apiUrl = `https://pawmart-server-ebon.vercel.app/listings/category/${categoryName}`;
        console.log(`Trying category endpoint: ${apiUrl}`);
        
        try {
          const res = await axios.get(apiUrl);
          console.log(`Category API Response:`, res.data);
          setItems(res.data || []);
          return;
        } catch (categoryError) {
          console.log(`Category endpoint failed, trying fallback:`, categoryError.response?.status);
          
          // Fallback: Get all listings and filter client-side
          if (categoryError.response?.status === 404 || categoryError.response?.status === 500) {
            console.log(`Falling back to all listings and filtering client-side`);
            const allListingsRes = await axios.get('https://pawmart-server-ebon.vercel.app/listings');
            console.log(`All listings response:`, allListingsRes.data);
            
            // Filter by category client-side
            const filteredItems = allListingsRes.data.filter(item => 
              item.category && item.category.toLowerCase() === categoryName.toLowerCase()
            );
            console.log(`Filtered items:`, filteredItems);
            setItems(filteredItems);
            return;
          }
          
          throw categoryError;
        }
        
      } catch (err) {
        console.error("Error fetching category items:", err);
        console.error("Error details:", {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        
        setError(err.response?.data?.message || "Failed to load items. Please try again.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };
    
    if (categoryName) {
      loadItems();
    }
  }, [categoryName]);

  // Show loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {categoryName?.replace(/-/g, ' ') || 'Category'}
        </h1>
        <Loading />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6 capitalize">
          {categoryName?.replace(/-/g, ' ') || 'Category'}
        </h1>
        <div className="text-center py-12">
          <div className="text-red-500 text-lg mb-4">⚠️ Error Loading Items</div>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 capitalize">
        {categoryName?.replace(/-/g, ' ') || 'Category'}
      </h1>

      {/* Debug info in development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <p><strong>Debug Info:</strong></p>
          <p>Category: {categoryName}</p>
          <p>Loading: {loading.toString()}</p>
          <p>Error: {error || 'None'}</p>
          <p>Items count: {items.length}</p>
        </div>
      )}

      {/* No items found */}
      {items.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No items found
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            There are no items in the "{categoryName}" category yet.
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Browse All Categories
          </Link>
        </div>
      ) : (
        <>
          {/* Items count */}
          <div className="mb-6">
            <p className="text-gray-600 dark:text-gray-400">
              Found {items.length} item{items.length !== 1 ? 's' : ''} in "{categoryName}"
            </p>
          </div>

          {/* Items grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white dark:bg-gray-800 shadow-soft dark:shadow-dark-soft rounded-xl p-4 hover:shadow-medium dark:hover:shadow-dark-medium transition-all duration-300 hover:-translate-y-1"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-56 rounded-lg object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />

                <h3 className="text-xl font-semibold mt-3 text-gray-900 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                  {item.category}
                </p>
                <p className="font-bold text-orange-600 dark:text-orange-400 mt-1">
                  {item.price === 0 ? "Free for Adoption" : `$${item.price}`}
                </p>

                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  📍 {item.location}
                </p>

                <Link
                  to={`/listing-details/${item._id}`}
                  className="mt-3 inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg text-center w-full hover:shadow-lg transition-all duration-200 font-medium"
                >
                  See Details
                </Link>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryFilteredPage;