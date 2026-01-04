import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import { useAuth } from "../firebase/firebase.config";
import Loading from "../components/Loading";
import DynamicTitle from "../components/DynamicTitle";

const MyListings = () => {
  const { user } = useAuth();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(
        `https://pawmart-server-ebon.vercel.app/my-listings?email=${user?.email}`
      )
        .then((res) => res.json())
        .then((data) => {
          setMyListings(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [user?.email]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      const res = await fetch(
        `https://pawmart-server-ebon.vercel.app/listings/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete");

      const result = await res.json();
      if (result.deletedCount > 0) {
        setMyListings(myListings.filter((item) => item._id !== id));
      }
    } catch (err) {
      alert("Could not delete listing.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="px-4 py-12 md:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      <DynamicTitle title="My Listings | PawMart" />

      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
        <div className="text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900  tracking-tight">
            My <span className="text-orange-500">Listings</span>
          </h1>
          <p className="text-gray-500 mt-1">
            Manage your pets and supplies in one dashboard.
          </p>
        </div>
        <Link
          to="/add-listing"
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-2xl font-bold transition-all shadow-lg shadow-orange-600/20 active:scale-95"
        >
          <FaPlus size={14} /> Add New Item
        </Link>
      </div>

      {myListings.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
          <div className="text-7xl mb-6">🐾</div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            No listings yet
          </h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">
            Ready to find a home for a pet or sell some supplies? Start by
            creating your first post!
          </p>
          <Link
            to="/add-listing"
            className="inline-block px-8 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-orange-600 transition-colors"
          >
            Create Your First Listing
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[2rem] border border-gray-100 shadow-xl bg-white">
          <div className="hidden md:block">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-400 text-xs uppercase tracking-widest font-black">
                  <th className="py-5 px-8">Item</th>
                  <th className="py-5 px-6">Category</th>
                  <th className="py-5 px-6">Price</th>
                  <th className="py-5 px-6">Location</th>
                  <th className="py-5 px-8 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {myListings.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-orange-50/30 transition-colors group"
                  >
                    <td className="py-5 px-8">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover shadow-sm group-hover:scale-105 transition-transform"
                        />
                        <span className="font-bold text-gray-900">
                          {item.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-sm">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 font-medium">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-5 px-6 font-bold text-orange-600">
                      {item.price === 0 || !item.price
                        ? "FREE"
                        : `৳${item.price}`}
                    </td>
                    <td className="py-5 px-6 text-gray-500 text-sm">
                      {item.location}
                    </td>
                    <td className="py-5 px-8">
                      <div className="flex justify-end gap-3">
                        <Link
                          to={`/update-listing/${item._id}`}
                          className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all"
                        >
                          <FaEdit size={16} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Grid View */}
          <div className="md:hidden grid grid-cols-1 divide-y divide-gray-100">
            {myListings.map((item) => (
              <div key={item._id} className="p-6">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-2xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-black text-gray-900 uppercase text-sm tracking-tight">
                      {item.name}
                    </h3>
                    <p className="text-orange-600 font-bold text-lg">
                      {item.price === 0 || !item.price
                        ? "FREE"
                        : `৳${item.price}`}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded uppercase">
                        {item.category}
                      </span>
                      <span className="text-[10px] font-bold bg-gray-100 px-2 py-0.5 rounded uppercase">
                        {item.location}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-4">
                  <Link
                    to={`/update-listing/${item._id}`}
                    className="flex-1 flex justify-center items-center py-3 bg-blue-50 text-blue-600 rounded-xl font-bold"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="flex-1 flex justify-center items-center py-3 bg-red-50 text-red-600 rounded-xl font-bold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyListings;
