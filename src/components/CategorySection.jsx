import React from "react";
import { Link } from "react-router-dom";
import { FaDog, FaDrumstickBite, FaBaby, FaPills } from "react-icons/fa";

const categories = [
  { name: "pets", label: "Pets (Adoption)", icon: <FaDog size={50} /> },
  { name: "food", label: "Pet Food", icon: <FaDrumstickBite size={50} /> },
  { name: "accessories", label: "Accessories", icon: <FaBaby size={50} /> },
  { name: "care", label: "Pet Care Products", icon: <FaPills size={50} /> },
];

const CategorySection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 my-12">
      <h1 className="text-3xl font-bold text-center mb-10">Category Section</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link
            key={category.name}
            to={`/category-filtered-product/${category.name}`}
            className="bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300 p-6 flex flex-col items-center justify-center text-center"
          >
            <div className="text-orange-500 mb-4">{category.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{category.label}</h3>
            <button className="mt-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200">
              Explore
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
