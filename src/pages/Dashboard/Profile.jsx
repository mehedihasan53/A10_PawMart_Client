import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { AuthContext } from "../../provider/AuthProvider";
import useRole from "../../hooks/useRole";
import {
  FaEnvelope,
  FaShieldAlt,
  FaClock,
  FaCheckCircle,
  FaStar,
  FaFingerprint,
  FaUser,
  FaEdit,
  FaSave,
  FaCamera,
} from "react-icons/fa";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import { cn } from "../../utils/cn";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [role] = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSaving(false);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg-primary to-bg-surface p-4 lg:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-text-primary mb-2">My Profile</h1>
          <p className="text-text-secondary">
            Manage your personal information and account settings
          </p>
        </motion.div>

        <div className="space-y-6">
          {/* Profile Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-primary rounded-2xl p-6 lg:p-8"
          >
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-6">
              {/* Avatar Section */}
              <div className="relative flex-shrink-0">
                <Avatar
                  src={user?.photoURL}
                  alt={user?.displayName || "User"}
                  size="2xl"
                  className="ring-4 ring-primary-200/50 dark:ring-primary-700/50"
                />
                <button className="absolute -bottom-2 -right-2 p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors shadow-glass">
                  <FaCamera className="text-sm" />
                </button>
                <div className="absolute top-2 right-2 w-4 h-4 bg-success-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
                  <h2 className="text-3xl font-bold text-text-primary">
                    {user?.displayName || "Anonymous User"}
                  </h2>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <FaCheckCircle className="text-primary-500 text-lg" />
                    <span className="text-sm font-medium text-success-600 dark:text-success-400">
                      Verified
                    </span>
                  </div>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
                  <div className="flex items-center justify-center lg:justify-start gap-2 text-text-secondary">
                    <FaEnvelope className="text-primary-500" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider",
                      role === "admin" 
                        ? "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
                        : "bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
                    )}>
                      {role || "Member"}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-center lg:justify-start gap-6">
                  <div className="text-center lg:text-left">
                    <div className="flex items-center gap-1 text-warning-500 mb-1">
                      <FaStar className="text-sm" />
                      <span className="font-bold">9.8</span>
                    </div>
                    <p className="text-xs text-text-secondary">Trust Score</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <p className="font-bold text-text-primary">Jan 2026</p>
                    <p className="text-xs text-text-secondary">Member Since</p>
                  </div>
                  <div className="text-center lg:text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium text-success-600 dark:text-success-400">Active</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex-shrink-0">
                <Button
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  disabled={isSaving}
                  className="flex items-center gap-2"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : isEditing ? (
                    <FaSave className="text-sm" />
                  ) : (
                    <FaEdit className="text-sm" />
                  )}
                  <span>
                    {isSaving ? "Saving..." : isEditing ? "Save Changes" : "Edit Profile"}
                  </span>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Profile Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-primary rounded-2xl p-6 lg:p-8"
          >
            <h3 className="text-xl font-semibold text-text-primary mb-6">Profile Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  defaultValue={user?.displayName || ""}
                  disabled={!isEditing}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary placeholder-text-secondary transition-all",
                    !isEditing && "opacity-60 cursor-not-allowed"
                  )}
                  placeholder="Enter your display name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  defaultValue={user?.email || ""}
                  disabled={true}
                  className="w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 text-text-primary opacity-60 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  disabled={!isEditing}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary placeholder-text-secondary transition-all",
                    !isEditing && "opacity-60 cursor-not-allowed"
                  )}
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Location
                </label>
                <input
                  type="text"
                  disabled={!isEditing}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary placeholder-text-secondary transition-all",
                    !isEditing && "opacity-60 cursor-not-allowed"
                  )}
                  placeholder="Enter your location"
                />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Bio
              </label>
              <textarea
                rows={4}
                disabled={!isEditing}
                className={cn(
                  "w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-primary-500/50 text-text-primary placeholder-text-secondary resize-none transition-all",
                  !isEditing && "opacity-60 cursor-not-allowed"
                )}
                placeholder="Tell us about yourself..."
              />
            </div>
          </motion.div>

          {/* Account Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="glass-secondary rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
                  <FaFingerprint className="text-lg text-primary-600 dark:text-primary-400" />
                </div>
                <h4 className="font-semibold text-text-primary">Account ID</h4>
              </div>
              <p className="text-xs font-mono text-text-secondary break-all">
                {user?.uid?.slice(0, 16) || "N/A"}...
              </p>
            </div>

            <div className="glass-secondary rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-success-500/10 to-success-600/10">
                  <FaClock className="text-lg text-success-600 dark:text-success-400" />
                </div>
                <h4 className="font-semibold text-text-primary">Member Since</h4>
              </div>
              <p className="text-sm font-medium text-text-secondary">
                January 2026
              </p>
            </div>

            <div className="glass-secondary rounded-2xl p-6 border border-primary-500/20">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10">
                  <FaShieldAlt className="text-lg text-primary-600 dark:text-primary-400" />
                </div>
                <h4 className="font-semibold text-text-primary">Security</h4>
              </div>
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-success-500 text-sm" />
                <span className="text-sm font-medium text-success-600 dark:text-success-400">
                  Ultra Secure
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
