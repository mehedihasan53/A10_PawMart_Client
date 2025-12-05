import React from "react";
import { FaPaw, FaHeart, FaHome, FaMoneyBillWave } from "react-icons/fa";

const WhyAdopt = () => {
  const reasons = [
    {
      icon: <FaPaw className="text-4xl text-orange-500" />,
      title: "Save a Life",
      desc: "Every adoption gives a homeless pet a warm and safe home.",
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-orange-500" />,
      title: "Budget Friendly",
      desc: "Adoption is much cheaper than buying from pet stores or breeders.",
    },
    {
      icon: <FaHeart className="text-4xl text-orange-500" />,
      title: "Ethical Choice",
      desc: "You support compassion and humane treatment of animals.",
    },
    {
      icon: <FaHome className="text-4xl text-orange-500" />,
      title: "Reduce Stray Population",
      desc: "You help reduce the number of abandoned animals on the streets.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          Why Adopt from PawMart?
        </h2>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {reasons.map((item, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 text-center "
            >
              <div className="flex justify-center mb-4">{item.icon}</div>

              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAdopt;
