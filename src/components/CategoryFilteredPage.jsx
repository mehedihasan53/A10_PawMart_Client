import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CategoryFilteredPage = () => {
  const { categoryName } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/listings/category/${categoryName}`
        );
        setItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    loadItems();
  }, [categoryName]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-6">{categoryName}</h1>

      {items.length === 0 && (
        <p className="text-gray-500">No items available in this category.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow rounded-xl p-4 hover:shadow-lg transition"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-56 rounded-lg object-cover"
            />

            <h3 className="text-xl font-semibold mt-3">{item.name}</h3>
            <p className="text-sm text-gray-500">{item.category}</p>
            <p className="font-bold text-orange-600 mt-1">
              {item.price === 0 ? "Free for Adoption" : `$${item.price}`}
            </p>

            <p className="text-gray-600 text-sm">{item.location}</p>

            <Link
              to={`/listing-details/${item._id}`}
              className="mt-3 inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-lg text-center w-full"
            >
              See Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilteredPage;
