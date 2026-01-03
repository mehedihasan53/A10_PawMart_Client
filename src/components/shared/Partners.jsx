import React from "react";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaAward,
  FaBuilding,
  FaUsers,
  FaArrowRight,
} from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Partners = () => {
  const partnerCategories = [
    {
      title: "Strategic Partners",
      icon: <FaHandshake className="text-orange-500 text-3xl" />,
      description: "Organizations that help us scale our impact and reach.",
      logos: [
        { name: "Animal Welfare Trust", id: 1 },
        { name: "EcoSafe Foundation", id: 2 },
        { name: "Global Pet Care", id: 3 },
        { name: "Dhaka Vet Council", id: 4 },
      ],
    },
    {
      title: "Corporate Supporters",
      icon: <FaBuilding className="text-pink-500 text-3xl" />,
      description: "Companies providing resources and financial support.",
      logos: [
        { name: "Tech For Good", id: 5 },
        { name: "Healthline Pets", id: 6 },
        { name: "Green Logistics", id: 7 },
        { name: "Secure Bank", id: 8 },
      ],
    },
  ];

  return (
    <div className="bg-white dark:bg-[#111827] min-h-screen font-sans transition-colors duration-300">
      {/* --- Simple Hero Section --- */}
      <section className="py-20 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-widest text-orange-600 dark:text-amber-200 uppercase bg-orange-50 dark:bg-[#571515] rounded-full">
              Our Network
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-[#d1d5db] mb-6 tracking-tight">
              Meet Our <span className="text-orange-600">Key Partners</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
              Collaboration drives our mission. We work with global and local
              leaders to ensure every pet finds a home.
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Partners Grid --- */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {partnerCategories.map((category, idx) => (
            <div key={idx} className={idx !== 0 ? "mt-24" : ""}>
              <div className="flex flex-col items-center mb-12 text-center">
                <div className="mb-4">{category.icon}</div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-[#d1d5db]">
                  {category.title}
                </h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-lg">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.logos.map((partner) => (
                  <motion.div
                    key={partner.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02 }}
                    className="flex flex-col items-center justify-center p-8 bg-gray-50 dark:bg-[#1f2937] border border-gray-200 dark:border-[#4b5563] rounded-2xl transition-all"
                  >
                    <div className="w-12 h-12 bg-white dark:bg-[#374151] rounded-full mb-4 flex items-center justify-center shadow-sm">
                      <FaAward className="text-orange-500" />
                    </div>
                    <span className="text-gray-800 dark:text-[#d1d5db] font-bold text-center tracking-tight leading-snug">
                      {partner.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Partners;
