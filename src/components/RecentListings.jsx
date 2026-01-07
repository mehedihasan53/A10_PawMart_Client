import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Tag, Heart } from "lucide-react";
import Loading from "./Loading";
import Card from "./ui/Card";
import Button from "./ui/Button";

const RecentListings = () => {
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecent = async () => {
      try {
        const res = await axios.get(
          "https://pawmart-server-ebon.vercel.app/recent-listings"
        );
        setRecent(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadRecent();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 via-secondary-500 to-primary-600 bg-clip-text text-transparent mb-4">
          Recent Listings
        </h2>
        <p className="text-text-secondary max-w-2xl mx-auto text-lg">
          Discover the newest pets looking for their forever homes
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {recent.map((item) => (
          <motion.div key={item._id} variants={itemVariants}>
            <Card variant="glassmorphism" className="group overflow-hidden">
              <div className="relative overflow-hidden rounded-xl mb-4">
                <motion.img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 p-2 bg-surface/80 backdrop-blur-sm rounded-full text-text-secondary hover:text-error-500 transition-colors duration-300"
                >
                  <Heart className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-text-primary group-hover:text-primary-600 transition-colors duration-300">
                  {item.name}
                </h3>

                <div className="flex items-center gap-2 text-text-secondary">
                  <Tag className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.category}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">
                    {item.price === 0 ? (
                      <span className="text-success-600 bg-success-100 dark:bg-success-900/30 px-3 py-1 rounded-full text-sm">
                        Free Adoption
                      </span>
                    ) : (
                      <span className="text-primary-600">${item.price}</span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 text-text-secondary">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{item.location}</span>
                </div>

                <Link to={`/listing-details/${item._id}`} className="block mt-4">
                  <Button 
                    variant="gradient" 
                    className="w-full group-hover:scale-[1.02] transition-transform duration-300"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {recent.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🐾</div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            No Recent Listings
          </h3>
          <p className="text-text-secondary">
            Check back soon for new pets looking for homes!
          </p>
        </motion.div>
      )}
    </section>
  );
};

export default RecentListings;