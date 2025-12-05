import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";

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

  useEffect(() => {
    // fetch existing listing data
    axios
      .get(`http://localhost:3000/listings/${id}`)
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
        console.error(err);
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
      await axios.put(`http://localhost:3000/listings/${id}`, formData);
      toast.success("Listing updated successfully!");
      navigate("/my-listings");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update listing");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-center">Update Listing</h1>
      <form
        onSubmit={handleUpdate}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block mb-2 font-medium">Product/Pet Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter product or pet name"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleCategoryChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Select Category</option>
            <option value="pets">Pets (Adoption)</option>
            <option value="food">Pet Food</option>
            <option value="accessories">Accessories</option>
            <option value="care">Pet Care Products</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium">Price</label>
          <input
            type="number"
            name="price"
            min="0"
            value={formData.price}
            readOnly={isPriceReadonly}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="0 if pet is selected"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter product/pet description"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter image URL"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Pick Up Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          Update Listing
        </button>
      </form>
    </div>
  );
};

export default UpdateListing;
