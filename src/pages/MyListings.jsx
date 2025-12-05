import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useAuth } from "../firebase/firebase.config";
import Loading from "../components/Loading";

const MyListings = () => {
  const { user } = useAuth();
  const [myListings, setMyListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/my-listings?email=${user?.email}`)
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
    if (!confirm("Are you sure you want to delete this listing?")) return;

    try {
      const res = await fetch(`http://localhost:3000/listings/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete");

      const result = await res.json();
      if (result.deletedCount > 0) {
        setMyListings(myListings.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Could not delete listing.");
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="px-4 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">My Listings</h1>

      {myListings.length === 0 ? (
        <p className="text-center text-gray-600">No listings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Location</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {myListings.map((item, index) => (
                <tr key={item._id} className="border-b">
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      alt=""
                      className="w-14 h-14 rounded object-cover"
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>
                    {item.price ? item.price + " BDT" : "Free for Adoption"}
                  </td>
                  <td>{item.location}</td>
                  <td>
                    <Link
                      to={`/update-listing/${item._id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </Link>
                  </td>
                  <td>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyListings;
