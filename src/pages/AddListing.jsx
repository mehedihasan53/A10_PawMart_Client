import React, { useContext, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import DynamicTitle from "../components/DynamicTitle";

const AddListing = () => {
  const { user } = useContext(AuthContext);
  const [price, setPrice] = useState("");
  const [isPriceReadonly, setIsPriceReadonly] = useState(false);

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
        toast.success("Listing added successfully!", {
          style: { borderRadius: "10px", background: "#333", color: "#fff" },
        });
        form.reset();
        setPrice("");
        setIsPriceReadonly(false);
      }
    } catch (err) {
      toast.error("Failed to add listing. Please try again.");
    }
  };

  const inputStyle =
    "w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-400/50 focus:border-orange-400 transition-all duration-300 bg-gray-50/50";

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <DynamicTitle title="Add New Listing | PawMart" />
      <Toaster position="top-right" />

      <div className="text-center mb-10">
        <h1 className="text-4xl font-black text-gray-900  tracking-tight">
          Add New{" "}
          <span className="text-transparent bg-clip-text bg-orange-500 ">
            Listing
          </span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">
          Find a new home for pets or list quality pet supplies.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 md:p-12 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block mb-2 ml-1 text-sm font-bold text-gray-700 uppercase tracking-wider">
              Product/Pet Name
            </label>
            <input
              type="text"
              name="name"
              required
              className={inputStyle}
              placeholder="Enter name"
            />
          </div>

          <div>
            <label className="block mb-2 ml-1 text-sm font-bold text-gray-700 uppercase tracking-wider">
              Category
            </label>
            <select
              name="category"
              required
              onChange={handleCategoryChange}
              className={inputStyle}
            >
              <option value="">Select Category</option>
              <option value="pets">Pets (Adoption)</option>
              <option value="food">Pet Food</option>
              <option value="accessories">Accessories</option>
              <option value="care">Pet Care Products</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 ml-1 text-sm font-bold text-gray-700 uppercase tracking-wider">
              Price (৳)
            </label>
            <input
              type="number"
              name="price"
              min="0"
              value={price}
              readOnly={isPriceReadonly}
              onChange={(e) => setPrice(e.target.value)}
              required
              className={`${inputStyle} ${
                isPriceReadonly ? "bg-orange-50 text-orange-600 font-bold" : ""
              }`}
              placeholder={isPriceReadonly ? "0 (Free)" : "Enter price"}
            />
          </div>

          <div>
            <label className="block mb-2 ml-1 text-sm font-bold text-gray-700 uppercase tracking-wider">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              className={inputStyle}
              placeholder="e.g. Dhaka"
            />
          </div>

          <div>
            <label className="block mb-2 ml-1 text-sm font-bold text-gray-700 uppercase tracking-wider">
              Pick Up Date
            </label>
            <input type="date" name="date" required className={inputStyle} />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 ml-1 text-sm font-bold text-gray-700 uppercase tracking-wider">
              Image URL
            </label>
            <input
              type="text"
              name="image"
              required
              className={inputStyle}
              placeholder="Paste image link"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 ml-1 text-sm font-bold text-gray-700 uppercase tracking-wider">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="4"
              className={`${inputStyle} resize-none`}
              placeholder="Enter details..."
            />
          </div>

          <div className="md:col-span-2">
            <label className="block mb-2 ml-1 text-sm font-bold text-gray-700 uppercase tracking-wider">
              Contact Email
            </label>
            <input
              type="email"
              name="email"
              value={user?.email || ""}
              readOnly
              className={`${inputStyle} bg-gray-100 text-gray-500 cursor-not-allowed`}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 text-white py-4 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl  hover:scale-[1.01] active:scale-[0.99] transition-all duration-300"
        >
          Publish Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
