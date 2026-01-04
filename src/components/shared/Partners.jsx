import React from "react";
import { motion } from "framer-motion";
import { FaHandshake, FaAward, FaBuilding, FaPaw } from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Partners = () => {
  const partnerCategories = [
    {
      title: "Strategic Partners",
      icon: (
        <FaHandshake className="text-orange-600 dark:text-orange-500 text-4xl" />
      ),
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
      icon: <FaBuilding className="text-pink-500 text-4xl" />,
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
    <div className="bg-white dark:bg-[#0f172a] min-h-screen transition-colors duration-300 overflow-hidden">
      <section className="relative py-24 bg-gradient-to-b from-orange-50 to-white dark:from-[#1e293b] dark:to-[#0f172a]">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block px-5 py-2 mb-6 text-xs font-black tracking-[0.2em] text-orange-600 dark:text-orange-400 uppercase bg-white dark:bg-gray-800 rounded-full border border-orange-100 dark:border-gray-700">
              Our Network
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-6 uppercase tracking-tight">
              Meet Our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-pink-500">
                Key Partners
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
              Collaboration drives our mission. We work with global and local
              leaders to ensure every pet finds a home.
            </p>
          </motion.div>
        </div>
        <div className="absolute top-10 right-[-5%] text-orange-100 dark:text-gray-800 text-[200px] rotate-[-15deg] opacity-30 pointer-events-none">
          <FaPaw />
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          {partnerCategories.map((category, idx) => (
            <div key={idx} className={idx !== 0 ? "mt-32" : ""}>
              <div className="flex flex-col items-center mb-16 text-center">
                <div className="mb-6 bg-orange-50 dark:bg-gray-800 p-5 rounded-3xl">
                  {category.icon}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                  {category.title}
                </h2>
                <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-lg font-medium">
                  {category.description}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {category.logos.map((partner) => (
                  <motion.div
                    key={partner.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeInUp}
                    whileHover={{ scale: 1.05 }}
                    className="group flex flex-col items-center justify-center p-10 bg-gray-50 dark:bg-[#1e293b] border border-gray-100 dark:border-gray-800 rounded-[2.5rem] transition-all duration-300 hover:bg-white dark:hover:bg-gray-800 hover:border-orange-200 dark:hover:border-gray-700"
                  >
                    <div className="w-14 h-14 bg-white dark:bg-[#0f172a] rounded-2xl mb-6 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300 shadow-none">
                      <FaAward size={24} />
                    </div>
                    <span className="text-gray-900 dark:text-white font-black text-center tracking-tight leading-tight uppercase text-sm">
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
