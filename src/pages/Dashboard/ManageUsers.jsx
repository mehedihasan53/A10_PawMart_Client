import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import axios from "axios";
import {
  FaTrashAlt,
  FaUserShield,
  FaUsers,
  FaEnvelope,
  FaIdBadge,
  FaSearch,
  FaFilter,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";
import { useState } from "react";
import Swal from "sweetalert2";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import { cn } from "../../utils/cn";

const ManageUsers = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        "https://pawmart-server-ebon.vercel.app/users"
      );
      return res.data;
    },
  });

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to make ${user.name} an Admin?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, make Admin!",
      background: 'rgba(255, 255, 255, 0.95)',
      backdrop: 'rgba(0, 0, 0, 0.4)',
      customClass: {
        popup: 'rounded-2xl border border-white/20',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://pawmart-server-ebon.vercel.app/users/admin/${user._id}`
          )
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              Swal.fire({
                title: "Promoted!",
                text: `${user.name} is now an Admin.`,
                icon: "success",
                background: 'rgba(255, 255, 255, 0.95)',
                customClass: {
                  popup: 'rounded-2xl border border-white/20',
                }
              });
            }
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete ${user.name}. This cannot be undone!`,
      icon: "error",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete user!",
      background: 'rgba(255, 255, 255, 0.95)',
      backdrop: 'rgba(0, 0, 0, 0.4)',
      customClass: {
        popup: 'rounded-2xl border border-white/20',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://pawmart-server-ebon.vercel.app/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "User has been removed.",
                icon: "success",
                background: 'rgba(255, 255, 255, 0.95)',
                customClass: {
                  popup: 'rounded-2xl border border-white/20',
                }
              });
            }
          });
      }
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-surface p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-500">
              <FaUsers className="text-2xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Manage Users</h1>
              <p className="text-text-secondary">
                Oversee user accounts and manage permissions ({users.length} total users)
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Filters and Search */}
          <motion.div
            variants={itemVariants}
            className="glass-primary rounded-2xl p-6"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                  <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary placeholder-text-secondary"
                  />
                </div>
              </div>

              {/* Role Filter */}
              <div className="flex items-center gap-3">
                <FaFilter className="text-text-secondary" />
                <select
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary"
                >
                  <option value="all">All Roles</option>
                  <option value="user">Users</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">{users.length}</p>
                <p className="text-sm text-text-secondary">Total Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                  {users.filter(u => u.role === 'admin').length}
                </p>
                <p className="text-sm text-text-secondary">Admins</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success-600 dark:text-success-400">
                  {users.filter(u => u.role !== 'admin').length}
                </p>
                <p className="text-sm text-text-secondary">Regular Users</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">{filteredUsers.length}</p>
                <p className="text-sm text-text-secondary">Filtered Results</p>
              </div>
            </div>
          </motion.div>

          {/* Users List */}
          <motion.div
            variants={itemVariants}
            className="glass-primary rounded-2xl p-6 lg:p-8"
          >
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="text-center py-12">
                <FaUsers className="text-4xl text-text-secondary mx-auto mb-4" />
                <p className="text-text-secondary">No users found matching your criteria</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl glass-secondary border border-white/10 dark:border-white/5 hover:glass-primary transition-all duration-300"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {/* Avatar */}
                      <Avatar
                        src={user.photoURL}
                        alt={user.name}
                        size="md"
                        className="ring-2 ring-white/20 dark:ring-white/10"
                      />

                      {/* User Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold text-text-primary truncate">
                            {user.name}
                          </h3>
                          {user.role === "admin" && (
                            <FaUserCheck className="text-primary-500 text-sm flex-shrink-0" />
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-text-secondary">
                          <FaEnvelope className="text-xs" />
                          <span className="truncate">{user.email}</span>
                        </div>
                      </div>

                      {/* Role Badge */}
                      <div className="flex-shrink-0">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                          user.role === "admin"
                            ? "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                        )}>
                          {user.role === "admin" ? "Admin" : "User"}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 ml-4">
                      {user.role !== "admin" && (
                        <Button
                          onClick={() => handleMakeAdmin(user)}
                          variant="ghost"
                          size="sm"
                          className="flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                        >
                          <FaUserShield className="text-sm" />
                          <span className="hidden sm:inline">Make Admin</span>
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDeleteUser(user)}
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 text-error-600 dark:text-error-400 hover:bg-error-50 dark:hover:bg-error-900/20"
                      >
                        <FaTrashAlt className="text-sm" />
                        <span className="hidden sm:inline">Delete</span>
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default ManageUsers;
