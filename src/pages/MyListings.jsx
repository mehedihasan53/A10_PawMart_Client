import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus, FaList } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import DynamicTitle from "../components/DynamicTitle";

const MyListings = () => {
  const { user } = useContext(AuthContext);
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
    <div className="bg-gradient-to-br from-bg-primary to-bg-surface min-h-screen transition-colors duration-300">
      <DynamicTitle title="My Listings | PawMart" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header - Consistent with site design */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 glass-secondary rounded-full text-sm font-semibold text-primary-600 border border-primary-200/30 dark:border-primary-700/30 mb-6">
            <FaList className="mr-2 text-primary-500" />
            My Listings
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-text-primary mb-4">
            Manage Your <span className="gradient-text-primary">Listings</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
            View, edit, and manage all your pets and supplies in one place
          </p>
        </div>

        {/* Add New Listing Button */}
        <div className="flex justify-center mb-8">
          <Link
            to="/add-listing"
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold hover:shadow-glass-lg hover:scale-105 transition-all duration-300 active:scale-95"
          >
            <FaPlus className="text-sm" />
            Add New Listing
          </Link>
        </div>

        {myListings.length === 0 ? (
          <div className="text-center py-16 glass-secondary rounded-3xl border-2 border-dashed border-white/20 dark:border-white/10">
            <div className="text-6xl mb-6 text-primary-400">🐾</div>
            <h3 className="text-2xl font-bold text-text-primary mb-4">
              No listings yet
            </h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto leading-relaxed">
              Ready to find a home for a pet or sell some supplies? Start by creating your first listing!
            </p>
            <Link
              to="/add-listing"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-2xl font-semibold hover:shadow-glass-lg hover:scale-105 transition-all duration-300"
            >
              <FaPlus className="text-sm" />
              Create Your First Listing
            </Link>
          </div>
        ) : (
          <div className="glass-primary rounded-3xl border border-white/20 dark:border-white/10 overflow-hidden shadow-glass-lg">
            {/* Desktop Table View */}
            <div className="hidden md:block">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="glass-secondary border-b border-white/10 dark:border-white/5">
                    <th className="py-6 px-8 text-sm font-bold text-text-secondary uppercase tracking-wider">
                      Item
                    </th>
                    <th className="py-6 px-6 text-sm font-bold text-text-secondary uppercase tracking-wider">
                      Category
                    </th>
                    <th className="py-6 px-6 text-sm font-bold text-text-secondary uppercase tracking-wider">
                      Price
                    </th>
                    <th className="py-6 px-6 text-sm font-bold text-text-secondary uppercase tracking-wider">
                      Location
                    </th>
                    <th className="py-6 px-8 text-sm font-bold text-text-secondary uppercase tracking-wider text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 dark:divide-white/5">
                  {myListings.map((item) => (
                    <tr
                      key={item._id}
                      className="hover:bg-gradient-to-r hover:from-primary-500/5 hover:to-secondary-500/5 transition-all duration-300 group"
                    >
                      <td className="py-6 px-8">
                        <div className="flex items-center gap-4">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 rounded-2xl object-cover shadow-glass group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-text-primary text-lg leading-tight">
                              {item.name}
                            </h3>
                            <p className="text-text-secondary text-sm mt-1 line-clamp-1">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6">
                        <span className="inline-flex items-center px-3 py-1.5 glass-tertiary border border-white/20 dark:border-white/10 rounded-full text-sm font-semibold text-text-primary">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-6 px-6">
                        <span className="text-xl font-bold gradient-text-primary">
                          {item.price === 0 || !item.price ? "FREE" : `৳${item.price}`}
                        </span>
                      </td>
                      <td className="py-6 px-6">
                        <span className="text-text-secondary font-medium">
                          {item.location}
                        </span>
                      </td>
                      <td className="py-6 px-8">
                        <div className="flex justify-end gap-3">
                          <Link
                            to={`/update-listing/${item._id}`}
                            className="p-3 glass-secondary border border-white/20 dark:border-white/10 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-500/10 hover:border-blue-500/30 hover:scale-105 transition-all duration-300 group/btn"
                          >
                            <FaEdit className="text-base group-hover/btn:scale-110 transition-transform" />
                          </Link>
                          <button
                            onClick={() => handleDelete(item._id)}
                            className="p-3 glass-secondary border border-white/20 dark:border-white/10 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-500/10 hover:border-red-500/30 hover:scale-105 transition-all duration-300 group/btn"
                          >
                            <FaTrash className="text-base group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden divide-y divide-white/10 dark:divide-white/5">
              {myListings.map((item) => (
                <div key={item._id} className="p-6 hover:bg-gradient-to-r hover:from-primary-500/5 hover:to-secondary-500/5 transition-all duration-300">
                  <div className="flex gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 rounded-2xl object-cover shadow-glass"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-text-primary text-lg leading-tight mb-1">
                        {item.name}
                      </h3>
                      <p className="text-xl font-bold gradient-text-primary mb-2">
                        {item.price === 0 || !item.price ? "FREE" : `৳${item.price}`}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-flex items-center px-2.5 py-1 glass-tertiary border border-white/20 dark:border-white/10 rounded-lg text-xs font-semibold text-text-primary">
                          {item.category}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 glass-tertiary border border-white/20 dark:border-white/10 rounded-lg text-xs font-semibold text-text-secondary">
                          {item.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Link
                      to={`/update-listing/${item._id}`}
                      className="flex-1 flex justify-center items-center py-3 glass-secondary border border-white/20 dark:border-white/10 text-blue-600 dark:text-blue-400 rounded-xl font-semibold hover:bg-blue-500/10 hover:border-blue-500/30 hover:scale-105 transition-all duration-300"
                    >
                      <FaEdit className="mr-2" />
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="flex-1 flex justify-center items-center py-3 glass-secondary border border-white/20 dark:border-white/10 text-red-600 dark:text-red-400 rounded-xl font-semibold hover:bg-red-500/10 hover:border-red-500/30 hover:scale-105 transition-all duration-300"
                    >
                      <FaTrash className="mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyListings;