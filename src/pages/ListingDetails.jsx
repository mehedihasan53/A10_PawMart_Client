import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

        // Fetch Suggested Items (Category based)
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* --- Image Gallery Section --- */}
          <div className="space-y-4">
            <div className="relative overflow-hidden rounded-[2.5rem] shadow-2xl border border-gray-100 dark:border-gray-800">
              <img
                src={listing.image}
                alt={listing.name}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute top-6 left-6 bg-orange-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-xl">
                {listing.category}
              </div>
            </div>
            {/* Multiple Image Mockups */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-24 bg-gray-100 dark:bg-[#1f2937] rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 opacity-60 hover:opacity-100 cursor-pointer transition-all"
                >
                  <img
                    src={listing.image}
                    alt="gallery"
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* --- Main Info & CTA Section --- */}
          <div className="flex flex-col space-y-6">
            <div>
              <div className="flex items-center gap-2 text-orange-500 mb-2">
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                  (12 Verified Reviews)
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-[#d1d5db] uppercase tracking-tight">
                {listing.name}
              </h1>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                {listing.price === 0 || listing.price === "0"
                  ? "FREE ADOPTION"
                  : `৳ ${listing.price}`}
              </p>
            </div>

            {/* Quick Specs Table */}
            <div className="bg-gray-50 dark:bg-[#1f2937] p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800">
              <h3 className="text-sm font-black text-gray-400 uppercase mb-4 flex items-center gap-2">
                <FaInfoCircle /> Key Information
              </h3>
              <div className="grid grid-cols-2 gap-y-4">
                <div className="text-sm">
                  <span className="text-gray-400">Location:</span>{" "}
                  <span className="dark:text-[#d1d5db] font-bold block">
                    {listing.location}
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Status:</span>{" "}
                  <span className="text-green-500 font-bold block">
                    Available
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Added:</span>{" "}
                  <span className="dark:text-[#d1d5db] font-bold block">
                    Jan 2026
                  </span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-400">Verified:</span>{" "}
                  <span className="dark:text-[#d1d5db] font-bold block">
                    Yes
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black text-xl hover:bg-orange-700 shadow-xl shadow-orange-600/20 transition-all flex items-center justify-center gap-3 active:scale-95"
            >
              {listing.category.toLowerCase() === "pets" ? (
                <>
                  <FaPaw /> START ADOPTION
                </>
              ) : (
                <>
                  <FaShoppingCart /> BUY NOW
                </>
              )}
            </button>

            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 bg-orange-50 dark:bg-[#571515] p-4 rounded-xl">
              <FaShieldAlt className="text-orange-600 text-xl" />
              <p>
                PawMart Guarantee: Verified health records and 24/7 support for
                every adoption or purchase.
              </p>
            </div>
          </div>
        </div>

        {/* --- Description Section --- */}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-12 mb-16">
          <div className="max-w-4xl">
            <h2 className="text-2xl font-black text-gray-900 dark:text-[#d1d5db] mb-6 uppercase">
              Description & Overview
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg whitespace-pre-line">
              {listing.description ||
                "No detailed description provided for this listing."}
            </p>
          </div>
        </div>

        {/* --- Suggested Items --- */}
        {relatedItems.length > 0 && (
          <div className="border-t border-gray-100 dark:border-gray-800 pt-12">
            <h2 className="text-2xl font-black text-gray-900 dark:text-[#d1d5db] mb-8 uppercase">
              You Might Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedItems.map((item) => (
                <Link
                  key={item._id}
                  to={`/listing-details/${item._id}`}
                  className="group"
                >
                  <div className="bg-white dark:bg-[#1f2937] border border-gray-100 dark:border-gray-800 rounded-[2rem] p-4 shadow-sm hover:shadow-xl transition-all">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-40 object-cover rounded-2xl mb-4 group-hover:scale-105 transition-transform"
                    />
                    <h4 className="font-bold text-gray-900 dark:text-[#d1d5db] truncate">
                      {item.name}
                    </h4>
                    <p className="text-orange-600 font-bold text-sm mt-1">
                      ৳ {item.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* --- Modal Section --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-[#1f2937] rounded-[2.5rem] w-full max-w-lg shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-all animate-in fade-in zoom-in duration-300">
            <div className="bg-orange-600 p-8 text-white flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">
                  Order Request
                </h2>
                <p className="text-orange-100 text-sm">{listing.name}</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-2xl"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleOrderSubmit} className="p-8 space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full px-5 py-4 rounded-xl bg-gray-50 dark:bg-[#374151] border border-gray-200 dark:border-gray-600 dark:text-[#d1d5db] outline-none focus:ring-2 focus:ring-orange-500"
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
                placeholder="Address"
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
                className="w-full bg-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-700 transition-all shadow-lg shadow-orange-600/20 active:scale-95"
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
