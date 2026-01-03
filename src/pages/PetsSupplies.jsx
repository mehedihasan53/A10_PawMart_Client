import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaTag, FaSearch, FaFilter } from "react-icons/fa";
import Loading from "../components/Loading";
import DynamicTitle from "../components/DynamicTitle";

const PetsSupplies = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get(
          "https://pawmart-server-ebon.vercel.app/listings"
        );
        setListings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  const filteredListings = listings.filter((listing) => {
    const matchesCategory =
      categoryFilter === "" ||
      listing.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearch = listing.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) return <Loading />;

  return (
    <div className="bg-white dark:bg-[#111827] min-h-screen transition-colors duration-300">
      <DynamicTitle title="Pets & Supplies" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-black text-center text-gray-900 dark:text-[#d1d5db] mb-10">
          Pets & <span className="text-orange-600">Supplies</span>
        </h1>

        {/* -- Search & Filter Bar -- */}
        <div className="mb-12 flex flex-col md:flex-row items-center gap-4 bg-gray-50 dark:bg-[#1f2937] p-4 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="relative flex-1 w-full">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search pets or products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#374151] border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none text-gray-700 dark:text-[#d1d5db]"
            />
          </div>

          <div className="relative w-full md:w-64">
            <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#374151] border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-orange-500 outline-none cursor-pointer text-gray-700 dark:text-[#d1d5db] appearance-none"
            >
              <option value="">All Categories</option>
              <option value="pets">Pets (Adoption)</option>
              <option value="food">Pet Food</option>
              <option value="accessories">Accessories</option>
              <option value="care">Pet Care</option>
            </select>
          </div>
        </div>

        {/* --- Listing Grid --- */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <div
                key={listing._id}
                className="group flex flex-col h-full bg-white dark:bg-[#1f2937] border border-gray-100 dark:border-gray-700 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={listing.image}
                    alt={listing.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#111827]/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm text-xs font-bold text-orange-600 uppercase">
                    {listing.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-[#d1d5db] mb-2 line-clamp-1">
                    {listing.name}
                  </h2>
                  <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-2 mb-4 flex-grow">
                    {listing.description ||
                      "No description available for this listing."}
                  </p>

                  {/* Meta Info */}
                  <div className="space-y-2 mb-6 border-t border-gray-100 dark:border-gray-700 pt-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FaMapMarkerAlt className="mr-2 text-orange-500" />
                      {listing.location}
                    </div>
                    <div className="flex items-center text-sm font-bold text-gray-900 dark:text-[#d1d5db]">
                      <FaTag className="mr-2 text-orange-500" />
                      {listing.price === 0 || listing.price === "0" ? (
                        <span className="text-green-600 dark:text-green-400">
                          Free Adoption
                        </span>
                      ) : (
                        `৳ ${listing.price}`
                      )}
                    </div>
                  </div>

                  <Link
                    to={`/listing-details/${listing._id}`}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-xl font-bold transition-all active:scale-95"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No listings found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PetsSupplies;
