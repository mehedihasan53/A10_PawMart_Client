import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaEnvelope,
  FaShoppingCart,
  FaPaw,
  FaInfoCircle,
  FaStar,
  FaShieldAlt,
  FaCalendarAlt,
  FaCheckCircle,
  FaPhone,
  FaUser,
  FaHome,
} from "react-icons/fa";
import Loading from "../components/Loading";
import DynamicTitle from "../components/DynamicTitle";
import { AuthContext } from "../provider/AuthProvider";

const ListingDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [relatedItems, setRelatedItems] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(
          `https://pawmart-server-ebon.vercel.app/listings/${id}`
        );
        setListing(res.data);

        const allRes = await axios.get(
          "https://pawmart-server-ebon.vercel.app/listings"
        );
        const suggested = allRes.data
          .filter(
            (item) => item.category === res.data.category && item._id !== id
          )
          .slice(0, 4);
        setRelatedItems(suggested);
      } catch (err) {
        toast.error("Failed to fetch listing");
        navigate("/pets-supplies");
      }
    };
    fetchListing();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const orderData = {
      listingId: listing._id,
      productName: listing.name,
      buyerName: formData.get("name"),
      email: user?.email,
      phone: formData.get("phone"),
      quantity:
        listing.category.toLowerCase() === "pets"
          ? 1
          : formData.get("quantity"),
      price: listing.price,
      address: formData.get("address"),
      date: formData.get("date"),
      additionalNotes: formData.get("additionalNotes"),
    };

    try {
      await axios.post(
        "https://pawmart-server-ebon.vercel.app/orders",
        orderData
      );
      toast.success("Order placed successfully!");
      setIsModalOpen(false);
    } catch (err) {
      toast.error("Failed to place order");
    }
  };

  if (!listing) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-surface">
      <DynamicTitle title={listing.name} />
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          onClick={() => navigate(-1)}
          className="mb-8 glass-button flex items-center gap-3 px-6 py-3 rounded-2xl text-text-secondary hover:text-primary-600 font-bold transition-all duration-300"
        >
          <FaArrowLeft /> Go Back
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery Section */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="relative glass-secondary rounded-3xl overflow-hidden shadow-glass-lg">
              <img
                src={listing.image}
                alt={listing.name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute top-6 left-6 glass-primary px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wider shadow-glass text-primary-600 border border-primary-500/20">
                {listing.category}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
            </div>
            
            {/* Image Gallery Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="h-24 glass-tertiary rounded-2xl overflow-hidden border border-primary-500/20 opacity-60 hover:opacity-100 cursor-pointer transition-all duration-300 hover:scale-105"
                >
                  <img
                    src={listing.image}
                    alt="gallery"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Info & CTA Section */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col space-y-8"
          >
            <div>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="flex items-center gap-2 text-primary-500 mb-4"
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar key={star} />
                ))}
                <span className="text-sm text-text-secondary font-medium ml-2">
                  (12 Verified Reviews)
                </span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-4xl md:text-5xl font-black text-text-primary uppercase tracking-tight mb-4"
              >
                {listing.name}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-3xl font-bold text-primary-600"
              >
                {listing.price === 0 || listing.price === "0"
                  ? "FREE ADOPTION"
                  : `৳ ${listing.price}`}
              </motion.p>
            </div>

            {/* Quick Specs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="glass-secondary p-8 rounded-3xl border border-primary-500/20 shadow-glass"
            >
              <h3 className="text-sm font-bold text-text-secondary uppercase mb-6 flex items-center gap-2">
                <FaInfoCircle className="text-primary-500" /> Key Information
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-text-secondary text-sm">Location:</span>
                  <span className="text-text-primary font-bold block text-lg">
                    {listing.location}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-text-secondary text-sm">Status:</span>
                  <span className="text-success-500 font-bold block text-lg">
                    Available
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-text-secondary text-sm">Added:</span>
                  <span className="text-text-primary font-bold block text-lg">
                    Jan 2026
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-text-secondary text-sm">Verified:</span>
                  <span className="text-text-primary font-bold block text-lg flex items-center gap-2">
                    <FaCheckCircle className="text-success-500" /> Yes
                  </span>
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              onClick={() => setIsModalOpen(true)}
              className="w-full py-6 rounded-2xl font-bold text-xl text-white shadow-glow-primary transition-all duration-300 flex items-center justify-center gap-3 hover:scale-[1.02] bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 hover:shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10 flex items-center gap-3">
                {listing.category.toLowerCase() === "pets" ? (
                  <>
                    <FaPaw /> START ADOPTION
                  </>
                ) : (
                  <>
                    <FaShoppingCart /> BUY NOW
                  </>
                )}
              </span>
            </motion.button>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="glass-tertiary p-6 rounded-2xl border border-primary-500/20 flex items-center gap-4"
            >
              <FaShieldAlt className="text-primary-500 text-2xl flex-shrink-0" />
              <p className="text-text-secondary text-sm">
                PawMart Guarantee: Verified health records and 24/7 support for
                every adoption or purchase.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Description Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="glass-secondary rounded-3xl p-8 md:p-12 mb-16 shadow-glass-lg"
        >
          <h2 className="text-3xl font-black text-text-primary mb-8 uppercase flex items-center gap-3">
            <FaInfoCircle className="text-primary-500" />
            Description & Overview
          </h2>
          <p className="text-text-secondary leading-relaxed text-lg whitespace-pre-line">
            {listing.description ||
              "No detailed description provided for this listing."}
          </p>
        </motion.div>

        {/* Related Items */}
        {relatedItems.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="glass-secondary rounded-3xl p-8 md:p-12 shadow-glass-lg"
          >
            <h2 className="text-3xl font-black text-text-primary mb-8 uppercase">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedItems.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.1 + index * 0.1 }}
                >
                  <Link
                    to={`/listing-details/${item._id}`}
                    className="group block"
                  >
                    <div className="glass-tertiary rounded-3xl p-6 border border-primary-500/20 shadow-glass hover:shadow-glass-lg transition-all duration-300 hover:scale-105">
                      <div className="relative overflow-hidden rounded-2xl mb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      <h4 className="font-bold text-text-primary truncate mb-2">
                        {item.name}
                      </h4>
                      <p className="text-primary-600 font-bold">
                        ৳ {item.price}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Order Modal */}
      {isModalOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass-primary rounded-3xl w-full max-w-lg shadow-glass-xl border border-primary-500/20 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-8 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  Order Request
                </h2>
                <p className="text-white/80 text-sm">{listing.name}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-2xl hover:scale-110 transition-transform"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleOrderSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-text-primary font-semibold">
                  <FaUser className="text-primary-500" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your full name"
                  required
                  className="w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-text-primary font-semibold">
                  <FaPhone className="text-primary-500" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your phone number"
                  required
                  className="w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-text-primary font-semibold">
                  <FaHome className="text-primary-500" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter your address"
                  required
                  className="w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300"
                />
              </div>
              
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-text-primary font-semibold">
                  <FaCalendarAlt className="text-primary-500" />
                  Preferred Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300"
                />
              </div>
              
              <button
                type="submit"
                className="w-full btn-gradient-primary py-4 rounded-2xl font-bold text-lg text-white shadow-glow-primary hover:scale-[1.02] transition-all duration-300"
              >
                Confirm & Submit Order
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default ListingDetails;
