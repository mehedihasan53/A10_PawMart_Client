import React, { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import DynamicTitle from "../components/DynamicTitle";

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const [price, setPrice] = useState("");
  const [isPriceReadonly, setIsPriceReadonly] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCategoryChange = (e) => {
    if (e.target.value === "pets") {
      setPrice(0);
      setIsPriceReadonly(true);
    } else {
      setPrice("");
      setIsPriceReadonly(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;

    const formData = {
      name: form.name.value,
      category: form.category.value,
      price: parseInt(form.price.value) || 0,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      date: form.date.value,
      email: form.email.value,
    };

    try {
      const response = await axios.post(
        "https://pawmart-server-ebon.vercel.app/listings",
        formData
      );
      if (response.data.insertedId) {
        toast.success("Listing added successfully!");
        form.reset();
        setPrice("");
        setIsPriceReadonly(false);
      }
    } catch (error) {
      toast.error("Failed to add listing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-bg-primary to-bg-surface min-h-screen transition-colors duration-300">
      <DynamicTitle title="Add Listing | PawMart" />
      <Toaster position="top-right" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header - Consistent with site design */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 glass-secondary rounded-full text-sm font-semibold text-primary-600 border border-primary-200/30 dark:border-primary-700/30 mb-6">
            <FaPlus className="mr-2 text-primary-500" />
            Create Listing
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-text-primary mb-4">
            Add New <span className="gradient-text-primary">Listing</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Share your pet or pet supplies with the community
          </p>
        </div>

        {/* Form */}
        <div className="glass-primary rounded-3xl border border-white/20 dark:border-white/10 shadow-glass-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product/Pet Name */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Product/Pet Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-4 py-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Enter product or pet name"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Category
                </label>
                <select
                  name="category"
                  required
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 appearance-none cursor-pointer"
                >
                  <option value="">Select Category</option>
                  <option value="pets">Pets (Adoption)</option>
                  <option value="food">Pet Food</option>
                  <option value="accessories">Accessories</option>
                  <option value="care">Pet Care Products</option>
                </select>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Price (৳)
                </label>
                <input
                  type="number"
                  name="price"
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  readOnly={isPriceReadonly}
                  required
                  className={`w-full px-4 py-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 ${isPriceReadonly ? 'opacity-60 cursor-not-allowed' : ''
                    }`}
                  placeholder="0 if pet is selected"
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  className="w-full px-4 py-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300"
                  placeholder="Enter location"
                />
              </div>

              {/* Pick Up Date */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Pick Up Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-4 py-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl text-text-primary focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={user?.email || ""}
                  readOnly
                  className="w-full px-4 py-3 glass-tertiary border border-white/20 dark:border-white/10 rounded-xl text-text-secondary cursor-not-allowed opacity-70"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Description
              </label>
              <textarea
                name="description"
                required
                rows="4"
                className="w-full px-4 py-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Enter product/pet description"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="block text-sm font-semibold text-text-primary mb-2">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                required
                className="w-full px-4 py-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-transparent transition-all duration-300"
                placeholder="Enter image URL"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 px-6 rounded-2xl font-semibold text-white text-lg transition-all duration-300 ${loading
                  ? 'bg-gray-400 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 hover:shadow-glass-lg hover:scale-[1.02] active:scale-[0.98]'
                  }`}
              >
                {loading ? 'Adding Listing...' : 'Add Listing'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddListing;