import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const PetsSupplies = () => {
  const [listings, setListings] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await axios.get("http://localhost:3000/listings");
        setListings(res.data);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
      }
    };
    fetchListings();
  }, []);

  // Filter and search
  const filteredListings = listings.filter((listing) => {
    const matchesCategory =
      categoryFilter === "" || listing.category === categoryFilter;
    const matchesSearch = listing.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6 text-center">Pets & Supplies</h1>

      {/* Filters and Search */}
      <div className="mb-6 flex flex-col sm:flex-row justify-center gap-4">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">All Categories</option>
          <option value="pets">Pets (Adoption)</option>
          <option value="food">Pet Food</option>
          <option value="accessories">Accessories</option>
          <option value="care">Pet Care Products</option>
        </select>

        <input
          type="text"
          placeholder="Search by name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400 flex-1"
        />
      </div>

      {filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <div
              key={listing.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col"
            >
              <img
                src={listing.image}
                alt={listing.name}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-bold mb-2">{listing.name}</h2>
              <p>
                <strong>Category:</strong> {listing.category}
              </p>
              <p>
                <strong>Location:</strong> {listing.location}
              </p>
              <p>
                <strong>Price:</strong> {listing.price}
              </p>
              <Link
                to={`/listing-details/${listing._id}`}
                className="mt-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-center py-2 rounded-lg hover:shadow-lg transition-all duration-200"
              >
                See Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default PetsSupplies;
