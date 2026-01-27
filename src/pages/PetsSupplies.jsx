import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaTag,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaChevronLeft,
  FaChevronRight,
  FaPaw,
  FaStore,
} from "react-icons/fa";
import Loading from "../components/Loading";
import DynamicTitle from "../components/DynamicTitle";

const PetsSupplies = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter and Pagination 
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  if (loading) return <Loading />;

  return (
    <div className="bg-gradient-to-br from-bg-primary to-bg-surface min-h-screen transition-colors duration-300">
      <DynamicTitle title="Explore Pets & Supplies" />

      {/* Minimal Hero Section - Just Heading */}
      <section className="relative py-8 bg-gradient-to-r from-primary-50/20 via-bg-primary to-secondary-50/20 border-b border-white/10 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-text-primary">
              Explore <span className="gradient-text-primary">PawMart</span>
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Fixed Filter Bar - Community Section - Positioned at very top */}
      <div className="sticky top-0 z-50 bg-bg-primary/98 backdrop-blur-xl border-b border-white/10 dark:border-white/5 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="glass-primary p-4 rounded-2xl border border-white/20 dark:border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Search */}
              <div className="relative lg:col-span-2">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm" />
                <input
                  type="text"
                  placeholder="Search pets & supplies..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary placeholder-text-muted text-sm font-medium"
                />
              </div>

              {/* Category */}
              <div className="relative">
                <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm z-10" />
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary appearance-none cursor-pointer text-sm font-medium"
                >
                  <option value="">All Categories</option>
                  <option value="pets">Pets</option>
                  <option value="food">Food</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>

              {/* Price Range */}
              <div className="relative">
                <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm z-10" />
                <select
                  value={priceRange}
                  onChange={(e) => {
                    setPriceRange(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full pl-10 pr-4 py-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary appearance-none cursor-pointer text-sm font-medium"
                >
                  <option value="all">Any Price</option>
                  <option value="free">Free Adoption</option>
                  <option value="low">Under ৳1000</option>
                  <option value="high">Over ৳1000</option>
                </select>
              </div>

              {/* Sorting */}
              <div className="relative">
                <FaSortAmountDown className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm z-10" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary appearance-none cursor-pointer text-sm font-medium"
                >
                  <option value="newest">Newest First</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Results Summary */}
            <div className="mt-4 pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2">
              <div className="text-sm text-text-secondary font-medium">
                Showing {currentItems.length} of {filteredAndSortedListings.length} results
              </div>
              {(searchQuery || categoryFilter || priceRange !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCategoryFilter("");
                    setPriceRange("all");
                    setSortBy("newest");
                    setCurrentPage(1);
                  }}
                  className="text-sm text-primary-600 hover:text-primary-700 font-semibold transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content with proper spacing for fixed header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Listings Grid */}
        {currentItems.length > 0 ? (
          <>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            >
              {currentItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  variants={itemVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group glass-primary rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden hover:shadow-glass-lg transition-all duration-300 flex flex-col h-full"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-full uppercase shadow-glass">
                      {item.category}
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-text-primary mb-2 truncate">
                      {item.name}
                    </h3>
                    <div className="flex items-center text-sm text-text-secondary mb-4 gap-2">
                      <FaMapMarkerAlt className="text-primary-500 flex-shrink-0" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="mt-auto">
                      <p className="text-xl font-bold gradient-text-primary mb-4">
                        {parseFloat(item.price) === 0
                          ? "FREE"
                          : `৳${item.price}`}
                      </p>
                      <Link
                        to={`/listing-details/${item._id}`}
                        className="block w-full text-center bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2.5 rounded-xl font-semibold hover:shadow-glass-lg hover:scale-105 transition-all active:scale-95"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Enhanced Pagination Controls */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mt-12 flex flex-wrap justify-center items-center gap-2"
              >
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center justify-center w-10 h-10 rounded-xl glass-secondary border border-white/20 dark:border-white/10 text-text-primary hover:glass-primary hover:text-primary-600 disabled:opacity-30 disabled:hover:glass-secondary disabled:hover:text-text-primary transition-all"
                >
                  <FaChevronLeft size={12} />
                </button>

                <div className="flex gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => handlePageChange(i + 1)}
                      className={`w-10 h-10 rounded-xl font-semibold text-sm transition-all ${currentPage === i + 1
                        ? "bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-glass-lg"
                        : "glass-secondary border border-white/20 dark:border-white/10 text-text-primary hover:glass-primary hover:text-primary-600"
                        }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center justify-center w-10 h-10 rounded-xl glass-secondary border border-white/20 dark:border-white/10 text-text-primary hover:glass-primary hover:text-primary-600 disabled:opacity-30 disabled:hover:glass-secondary disabled:hover:text-text-primary transition-all"
                >
                  <FaChevronRight size={12} />
                </button>
              </motion.div>
            )}
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16 glass-secondary rounded-2xl border-2 border-dashed border-white/20 dark:border-white/10"
          >
            <div className="text-5xl mb-4 text-primary-400">🔍</div>
            <h2 className="text-xl font-bold text-text-primary mb-3">
              No items found
            </h2>
            <p className="text-text-secondary font-medium mb-6">
              Try adjusting your filters to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setCategoryFilter("");
                setPriceRange("all");
                setSortBy("newest");
                setCurrentPage(1);
              }}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-semibold hover:shadow-glass-lg hover:scale-105 transition-all"
            >
              Clear Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PetsSupplies;
