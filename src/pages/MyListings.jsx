import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
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

  // Delete handler
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
      //   console.error(err);
      alert("Could not delete listing.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="px-4 py-8 md:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          My Listings
        </h1>
        <p className="text-gray-600">
          Manage all your pet listings in one place
        </p>
      </div>

      {myListings.length === 0 ? (
        <div className="text-center py-12 bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl shadow-sm ">
          <DynamicTitle title="My Listings" />
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No listings found
          </h3>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You haven't created any listings yet. Start by adding your first pet
            or product!
          </p>
          <Link
            to="/add-listing"
            className="inline-block px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
          >
            + Add New Listing
          </Link>
        </div>
      ) : (
        <>
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-orange-50 to-pink-50">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    #
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Image
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Category
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Location
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Update
                  </th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-gray-700">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {myListings.map((item, index) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="py-4 px-6 text-gray-500 font-medium">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover shadow-sm"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {item.name}
                        </h3>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                          item.category === "Pets"
                            ? "bg-blue-100 text-blue-800"
                            : item.category === "Pet Food"
                            ? "bg-green-100 text-green-800"
                            : item.category === "Accessories"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-semibold">
                        {item.price === 0 || !item.price ? (
                          <span className="text-green-600">Free Adoption</span>
                        ) : (
                          <span className="text-gray-900">${item.price}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">{item.location}</td>
                    <td className="py-4 px-6">
                      <Link
                        to={`/update-listing/${item._id}`}
                        className="p-2 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors inline-block"
                        title="Edit"
                      >
                        <FaEdit size={16} />
                      </Link>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="p-2 bg-red-50 hover:bg-red-100 rounded-lg text-red-600 transition-colors"
                        title="Delete"
                      >
                        <FaTrash size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="md:hidden space-y-4">
            {myListings.map((item, index) => (
              <div
                key={item._id}
                className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                  />

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <span className="text-sm text-gray-500">
                        #{index + 1}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.category === "Pets"
                            ? "bg-blue-100 text-blue-800"
                            : item.category === "Pet Food"
                            ? "bg-green-100 text-green-800"
                            : item.category === "Accessories"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-pink-100 text-pink-800"
                        }`}
                      >
                        {item.category}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {item.location}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="font-semibold">
                        {item.price === 0 || !item.price ? (
                          <span className="text-green-600 text-sm">
                            Free Adoption
                          </span>
                        ) : (
                          <span className="text-gray-900">${item.price}</span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2">
                        <Link
                          to={`/update-listing/${item._id}`}
                          className="p-1.5 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600"
                          title="Edit"
                        >
                          <FaEdit size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg text-red-600"
                          title="Delete"
                        >
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyListings;
