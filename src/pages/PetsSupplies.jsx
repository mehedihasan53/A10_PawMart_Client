import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaTag,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import Loading from "../components/Loading";
import DynamicTitle from "../components/DynamicTitle";

const PetsSupplies = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter and Pagination States
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Fetch data from API
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(
          "https://pawmart-server-ebon.vercel.app/listings"
        );
        setListings(res.data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // Filter and Sort Logic
  const filteredAndSortedListings = listings
    .filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "" ||
        item.category.toLowerCase() === categoryFilter.toLowerCase();

      let matchesPrice = true;
      const price = parseFloat(item.price);
      if (priceRange === "free") matchesPrice = price === 0;
      else if (priceRange === "low") matchesPrice = price > 0 && price <= 1000;
      else if (priceRange === "high") matchesPrice = price > 1000;

      return matchesSearch && matchesCategory && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === "priceLow") return a.price - b.price;
      if (sortBy === "priceHigh") return b.price - a.price;
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAndSortedListings.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredAndSortedListings.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-white dark:bg-[#111827] min-h-screen transition-colors duration-300">
      <DynamicTitle title="Explore Pets & Supplies" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-black text-gray-900 dark:text-[#d1d5db] mb-4 uppercase tracking-tight">
            Explore <span className="text-orange-600">PawMart</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Find the perfect companion or the best supplies for your pets.
          </p>
        </header>

        {/* Standard Filter Bar */}
        <div className="bg-white dark:bg-[#1f2937] p-4 md:p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800 shadow-lg mb-12 transition-all">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative lg:col-span-2">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-[#374151] border-none rounded-2xl focus:ring-2 focus:ring-orange-500 text-gray-700 dark:text-[#d1d5db] outline-none"
              />
            </div>

            {/* Category */}
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
              <select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#374151] border-none rounded-2xl focus:ring-2 focus:ring-orange-500 text-gray-700 dark:text-[#d1d5db] appearance-none cursor-pointer outline-none"
              >
                <option value="">All Categories</option>
                <option value="pets">Pets</option>
                <option value="food">Food</option>
                <option value="accessories">Accessories</option>
              </select>
            </div>

            {/* Price Range */}
            <div className="relative">
              <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
              <select
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#374151] border-none rounded-2xl focus:ring-2 focus:ring-orange-500 text-gray-700 dark:text-[#d1d5db] appearance-none cursor-pointer outline-none"
              >
                <option value="all">Any Price</option>
                <option value="free">Free Adoption</option>
                <option value="low">Under ৳1000</option>
                <option value="high">Over ৳1000</option>
              </select>
            </div>

            {/* Sorting */}
            <div className="relative">
              <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-gray-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-[#374151] border-none rounded-2xl focus:ring-2 focus:ring-orange-500 text-gray-700 dark:text-[#d1d5db] appearance-none cursor-pointer outline-none"
              >
                <option value="newest">Newest First</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {currentItems.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {currentItems.map((item) => (
                <div
                  key={item._id}
                  className="group bg-white dark:bg-[#1f2937] rounded-[2.5rem] border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-[#d1d5db] mb-2 truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-4 gap-2">
                      <FaMapMarkerAlt className="text-orange-500" />{" "}
                      {item.location}
                    </div>
                    <div className="mt-auto">
                      <p className="text-2xl font-black text-orange-600 mb-4">
                        {parseFloat(item.price) === 0
                          ? "FREE"
                          : `৳${item.price}`}
                      </p>
                      <Link
                        to={`/listing-details/${item._id}`}
                        className="block w-full text-center bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-600/20 active:scale-95"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-wrap justify-center items-center gap-3">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#1f2937] text-gray-600 dark:text-gray-400 hover:bg-orange-600 hover:text-white disabled:opacity-30 disabled:hover:bg-gray-100 transition-all"
                >
                  <FaChevronLeft size={14} />
                </button>

                <div className="flex gap-2">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-12 h-12 rounded-xl font-bold transition-all ${
                        currentPage === i + 1
                          ? "bg-orange-600 text-white shadow-lg"
                          : "bg-gray-100 dark:bg-[#1f2937] text-gray-600 dark:text-gray-400 hover:bg-orange-100"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-gray-100 dark:bg-[#1f2937] text-gray-600 dark:text-gray-400 hover:bg-orange-600 hover:text-white disabled:opacity-30 disabled:hover:bg-gray-100 transition-all"
                >
                  <FaChevronRight size={14} />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-20 bg-gray-50 dark:bg-[#1f2937]/50 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-gray-800">
            <div className="text-6xl mb-4 text-gray-300">🔍</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-[#d1d5db]">
              No items found
            </h2>
            <p className="text-gray-500">Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetsSupplies;
