import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import DynamicTitle from "../components/DynamicTitle";
import { FaCheckCircle, FaEdit, FaImage, FaMapMarkerAlt, FaCalendarAlt, FaEnvelope, FaDollarSign, FaTag, FaPaw } from "react-icons/fa";

const UpdateListing = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    location: "",
    description: "",
    image: "",
    date: "",
    email: user?.email || "",
  });
  const [isPriceReadonly, setIsPriceReadonly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalMessage, setModalMessage] = useState("");
  
  useEffect(() => {
    axios
      .get(`https://pawmart-server-ebon.vercel.app/listings/${id}`)
      .then((res) => {
        const data = res.data;
        setFormData({
          name: data.name,
          category: data.category,
          price: data.price,
          location: data.location,
          description: data.description,
          image: data.image,
          date: data.date,
          email: data.email,
        });
        if (data.category === "pets") setIsPriceReadonly(true);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [id]);

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, category: value });
    if (value === "pets") {
      setFormData({ ...formData, category: value, price: 0 });
      setIsPriceReadonly(true);
    } else {
      setIsPriceReadonly(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://pawmart-server-ebon.vercel.app/listings/${id}`,
        formData
      );
      setModalMessage("Listing updated successfully!");
      setTimeout(() => {
        setModalMessage("");
        navigate("/my-listings");
      }, 2000);
    } catch (err) {
      setModalMessage("Failed to update listing.");
      setTimeout(() => setModalMessage(""), 3000);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-surface">
      <DynamicTitle title="Update Listing | PawMart" />

      {/* Success Modal */}
      {modalMessage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="glass-primary p-8 rounded-3xl max-w-md w-full mx-4 shadow-glass-xl text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
              className="mx-auto w-20 h-20 bg-success-500/20 rounded-full flex items-center justify-center mb-6"
            >
              <FaCheckCircle className="text-4xl text-success-500" />
            </motion.div>
            <h3 className="text-xl font-bold text-text-primary">
              {modalMessage}
            </h3>
          </motion.div>
        </motion.div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-primary rounded-3xl p-8 md:p-12 mb-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
            className="w-20 h-20 mx-auto mb-6 bg-primary-500/20 rounded-full flex items-center justify-center"
          >
            <FaEdit className="text-3xl text-primary-500" />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-4xl md:text-5xl font-black text-text-primary mb-4"
          >
            Update <span className="gradient-text-primary">Listing</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-text-secondary text-lg"
          >
            Modify your listing details to keep them up to date
          </motion.p>
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="glass-secondary rounded-3xl p-8 md:p-12 shadow-glass-lg"
        >
          <form onSubmit={handleUpdate} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Product/Pet Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="space-y-3"
              >
                <label className="flex items-center gap-2 text-text-primary font-semibold text-lg">
                  <FaPaw className="text-primary-500" />
                  Product/Pet Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300"
                  placeholder="Enter product or pet name"
                />
              </motion.div>

              {/* Category */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.7 }}
                className="space-y-3"
              >
                <label className="flex items-center gap-2 text-text-primary font-semibold text-lg">
                  <FaTag className="text-primary-500" />
                  Category
                </label>
                <select
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleCategoryChange}
                  className="w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300"
                >
                  <option value="">Select Category</option>
                  <option value="pets">Pets (Adoption)</option>
                  <option value="food">Pet Food</option>
                  <option value="accessories">Accessories</option>
                  <option value="care">Pet Care Products</option>
                </select>
              </motion.div>

              {/* Price */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.8 }}
                className="space-y-3"
              >
                <label className="flex items-center gap-2 text-text-primary font-semibold text-lg">
                  <FaDollarSign className="text-primary-500" />
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  value={formData.price}
                  readOnly={isPriceReadonly}
                  onChange={handleChange}
                  required
                  className={`w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 ${isPriceReadonly ? 'opacity-60 cursor-not-allowed' : ''}`}
                  placeholder="0 if pet is selected"
                />
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="space-y-3"
              >
                <label className="flex items-center gap-2 text-text-primary font-semibold text-lg">
                  <FaMapMarkerAlt className="text-primary-500" />
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300"
                  placeholder="Enter location"
                />
              </motion.div>

              {/* Pick Up Date */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.0 }}
                className="space-y-3"
              >
                <label className="flex items-center gap-2 text-text-primary font-semibold text-lg">
                  <FaCalendarAlt className="text-primary-500" />
                  Pick Up Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300"
                />
              </motion.div>

              {/* Email */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 1.1 }}
                className="space-y-3"
              >
                <label className="flex items-center gap-2 text-text-primary font-semibold text-lg">
                  <FaEnvelope className="text-primary-500" />
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  readOnly
                  className="w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-secondary opacity-60 cursor-not-allowed"
                />
              </motion.div>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="space-y-3"
            >
              <label className="flex items-center gap-2 text-text-primary font-semibold text-lg">
                <FaEdit className="text-primary-500" />
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows="4"
                className="w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300 resize-none"
                placeholder="Enter product/pet description"
              />
            </motion.div>

            {/* Image URL */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.3 }}
              className="space-y-3"
            >
              <label className="flex items-center gap-2 text-text-primary font-semibold text-lg">
                <FaImage className="text-primary-500" />
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 glass-tertiary rounded-2xl border border-primary-500/20 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-300"
                placeholder="Enter image URL"
              />
              {formData.image && (
                <div className="mt-4">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-2xl shadow-glass border border-primary-500/20"
                  />
                </div>
              )}
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 1.4 }}
              className="pt-6"
            >
              <button
                type="submit"
                className="w-full btn-gradient-primary py-4 rounded-2xl font-bold text-white text-lg shadow-glow-primary hover:scale-[1.02] transition-all duration-300"
              >
                Update Listing
              </button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default UpdateListing;
