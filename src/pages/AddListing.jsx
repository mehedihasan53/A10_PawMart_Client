import React from "react";
import toast, { Toaster } from "react-hot-toast";

const AddListing = ({ currentUserEmail }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const category = e.target.category.value;
    const price = e.target.price.value;
    const location = e.target.location.value;
    const description = e.target.description.value;
    const image = e.target.image.value;
    const date = e.target.date.value;
    const email = e.target.email.value;

    const formData = {
      name,
      category,
      price,
      location,
      description,
      image,
      date,
      email,
    };
    console.log(formData);

    try {
      const response = await fetch("http://localhost:3000/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to add listing");

      toast.success("Listing added successfully!");
      e.target.reset();
      e.target.email.value = currentUserEmail || "";
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-center">Add New Listing</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <label className="block mb-2 font-medium">Product/Pet Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter product or pet name"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Category</label>
          <select
            name="category"
            required
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
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="Enter location"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Description</label>
          <textarea
            name="description"
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
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={currentUserEmail || ""}
            readOnly
            className="w-full px-4 py-2 border rounded-lg bg-gray-100"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
        >
          Add Listing
        </button>
      </form>
    </div>
  );
};

export default AddListing;
