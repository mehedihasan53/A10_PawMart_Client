import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import {
  FaArrowLeft,
  FaMapMarkerAlt,
  FaEnvelope,
  FaShoppingCart,
  FaPaw,
} from "react-icons/fa";
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
        toast.error("Failed to fetch listing");
        navigate("/pets-supplies");
      }
    };
    fetchListing();
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
    <div className="bg-white dark:bg-[#111827] min-h-screen transition-colors duration-300 py-12">
      <DynamicTitle title={listing.name} />
      <Toaster position="top-right" />

      <div className="max-w-7xl mx-auto px-4">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-gray-500 dark:text-gray-400 hover:text-orange-600 font-bold transition-colors"
        >
          <FaArrowLeft /> Go Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-gray-50 dark:bg-[#1f2937] p-8 rounded-[3rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          {/* Left: Image */}
          <div className="relative group">
            <img
              src={listing.image}
              alt={listing.name}
              className="w-full h-[550px] object-cover rounded-[2.5rem] shadow-2xl transition-transform"
            />
            <div className="absolute top-6 left-6 bg-orange-600 text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-sm shadow-xl">
              {listing.category}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#d1d5db] mb-4 uppercase tracking-tight">
                {listing.name}
              </h1>
              <p className="text-3xl font-bold text-orange-600">
                {listing.price === 0 || listing.price === "0"
                  ? "FREE ADOPTION"
                  : `৳ ${listing.price}`}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-[#374151] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                  Location
                </p>
                <div className="flex items-center gap-2 text-gray-700 dark:text-[#d1d5db] font-medium">
                  <FaMapMarkerAlt className="text-orange-500" />{" "}
                  {listing.location}
                </div>
              </div>
              <div className="bg-white dark:bg-[#374151] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <p className="text-xs font-bold text-gray-400 uppercase mb-1">
                  Contact Email
                </p>
                <div className="flex items-center gap-2 text-gray-700 dark:text-[#d1d5db] font-medium overflow-hidden">
                  <FaEnvelope className="text-orange-500 flex-shrink-0" />{" "}
                  <span className="truncate">{listing.email}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-[#d1d5db] mb-4 flex items-center gap-2">
                <span className="w-8 h-1 bg-orange-500 rounded-full"></span>{" "}
                Description
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg italic">
                {listing.description}
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-700 shadow-xl shadow-orange-600/20 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              {listing.category.toLowerCase() === "pets" ? (
                <>
                  <FaPaw /> ADOPT NOW
                </>
              ) : (
                <>
                  <FaShoppingCart /> PLACE ORDER
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* --- Modal Section --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1f2937] rounded-[2.5rem] w-full max-w-lg shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all animate-in fade-in zoom-in duration-300">
            <div className="bg-orange-600 p-8 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  Complete Order
                </h2>
                <p className="text-orange-100 text-sm">For: {listing.name}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-2xl hover:rotate-90 transition-transform"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOrderSubmit} className="p-8 space-y-5">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 dark:text-[#d1d5db] outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full px-5 py-4 rounded-xl bg-gray-100 dark:bg-[#111827] border border-gray-200 dark:border-gray-700 text-gray-500 cursor-not-allowed"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 dark:text-[#d1d5db] outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="text"
                name="address"
                placeholder="Delivery/Pickup Address"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 dark:text-[#d1d5db] outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                type="date"
                name="date"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 dark:text-[#d1d5db] outline-none focus:ring-2 focus:ring-orange-500"
              />

              <button
                type="submit"
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all active:scale-95 shadow-lg shadow-orange-600/20"
              >
                Confirm & Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingDetails;
