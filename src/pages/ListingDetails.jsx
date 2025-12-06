import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Loading from "../components/Loading";
import DynamicTitle from "../components/DynamicTitle";
import { AuthContext } from "../provider/AuthProvider";

const ListingDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await axios.get(
          `https://pawmart-server-ebon.vercel.app/listings/${id}`
        );
        setListing(res.data);
      } catch (err) {
        // console.error(err);
        toast.error("Failed to fetch listing");
        navigate("/");
      }
    };
    fetchListing();
  }, [id, navigate]);

  const openOrderModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const orderData = {
      listingId: listing._id,
      productName: listing.name,
      buyerName: formData.get("name"),
      email: user?.email || formData.get("email"),
      phone: formData.get("phone"),
      quantity: listing.category === "Pets" ? 1 : formData.get("quantity"),
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
      closeModal();
    } catch (err) {
      //   console.error(err);
      toast.error("Failed to place order");
    }
  };

  if (!listing) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <DynamicTitle title={listing.name} />
      <Toaster position="top-right" />

      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        ← Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <img
            src={listing.image}
            alt={listing.name}
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
          />
        </div>

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{listing.name}</h1>
            <div className="flex items-center justify-between mt-2">
              <span className="text-2xl font-bold text-orange-600">
                {listing.price === 0
                  ? "Free Adoption"
                  : `Price: ${listing.price}`}
              </span>
              <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full">
                {listing.category}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{listing.location}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Owner</p>
              <p className="font-medium">{listing.email}</p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Description</h3>
            <p className="text-gray-600">{listing.description}</p>
          </div>

          <button
            onClick={openOrderModal}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            {listing.category === "Pets" ? "🐾 Adopt Now" : "🛒 Order Now"}
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl w-full max-w-md">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-bold">Complete Order</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="p-6 space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={user?.email || ""}
                readOnly
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="text"
                name="address"
                placeholder="Delivery Address"
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <input
                type="date"
                name="date"
                required
                className="w-full px-4 py-3 border rounded-lg"
              />
              <textarea
                name="additionalNotes"
                placeholder="Additional Notes (Optional)"
                rows="3"
                className="w-full px-4 py-3 border rounded-lg"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-pink-500 text-white py-3 rounded-lg font-semibold"
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
