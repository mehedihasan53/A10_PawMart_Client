import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  FaTrashAlt,
  FaUserShield,
  FaUsers,
  FaEnvelope,
  FaIdBadge,
} from "react-icons/fa";
import Swal from "sweetalert2";

const ManageUsers = () => {
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3000/users");
      return res.data;
    },
  });

 
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${user.name} an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, make Admin!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(`http://localhost:3000/users/admin/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire(
                "Promoted!",
                `${user.name} is now an Admin.`,
                "success"
              );
            }
          });
      }
    });
  };

  // --- Delete User ---
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${user.name}. This cannot be undone!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete user!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:3000/users/${user._id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "User has been removed.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="p-4 md:p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-sm  dark:border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold dark:text-white flex items-center gap-2">
          <FaUsers className="text-orange-500" /> All Users ({users.length})
        </h2>
      </div>

      {/* Desktop Version Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left ">
          <thead className="bg-orange-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-200">
            <tr>
              <th className="p-4 rounded-l-xl">#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="p-4 rounded-r-xl">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y dark:divide-gray-700">
            {users.map((user, index) => (
              <tr
                key={user._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors"
              >
                <td className="p-4 dark:text-gray-300">{index + 1}</td>
                <td className="font-medium dark:text-white">{user.name}</td>
                <td className="text-gray-500 dark:text-gray-400">
                  {user.email}
                </td>
                <td className="py-4">
                  {user.role === "admin" ? (
                    <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Admin
                    </span>
                  ) : (
                    <button
                      onClick={() => handleMakeAdmin(user)}
                      className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-xl transition-all shadow-sm"
                    >
                      <FaUserShield size={18} />
                    </button>
                  )}
                </td>
                <td>
                  <button
                    onClick={() => handleDeleteUser(user)}
                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
                  >
                    <FaTrashAlt size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Version Card */}
      <div className="md:hidden space-y-4">
        {users.map((user, index) => (
          <div
            key={user._id}
            className="bg-gray-50 dark:bg-gray-700/30 p-4 rounded-2xl border border-gray-100 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold dark:text-white">{user.name}</h3>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <FaEnvelope className="mr-1" /> {user.email}
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleDeleteUser(user)}
                className="text-red-500 p-2"
              >
                <FaTrashAlt size={16} />
              </button>
            </div>

            <div className="flex items-center justify-between mt-4 pt-3 border-t dark:border-gray-700">
              <div className="flex items-center gap-2">
                <FaIdBadge className="text-gray-400" />
                <span className="text-sm dark:text-gray-300">Role:</span>
                <span
                  className={`text-xs font-bold uppercase ${
                    user.role === "admin" ? "text-purple-600" : "text-gray-500"
                  }`}
                >
                  {user.role === "admin" ? "Admin" : "User"}
                </span>
              </div>

              {user.role !== "admin" && (
                <button
                  onClick={() => handleMakeAdmin(user)}
                  className="bg-orange-500 text-white px-4 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md"
                >
                  <FaUserShield size={14} /> Make Admin
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageUsers;
