import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RecentListings = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const loadRecent = async () => {
      try {
        const res = await axios.get("http://localhost:3000/recent-listings");
        setRecent(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadRecent();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-2 ">
      <h2 className="text-3xl font-bold mb-6 text-center">Recent Listings</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recent.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition p-4"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 object-cover rounded-lg"
            />

            <h3 className="text-xl font-semibold mt-3">{item.name}</h3>

            <p className="text-sm text-gray-500">{item.category}</p>

            <p className="mt-2 font-bold text-orange-600">
              {item.price === 0 ? "Free for Adoption" : `$${item.price}`}
            </p>

            <p className="text-gray-600 text-sm">{item.location}</p>

            <Link
              to={`/listing-details/${item._id}`}
              className="mt-3 inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg w-full text-center"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RecentListings;
