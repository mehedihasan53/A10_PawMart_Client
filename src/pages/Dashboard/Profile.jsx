import { useContext, useState, useEffect } from "react";
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
  FaPhone,
  FaMapMarkerAlt,
  FaTimes,
  FaExclamationTriangle,
} from "react-icons/fa";
import Avatar from "../../components/ui/Avatar";
import Button from "../../components/ui/Button";
import { cn } from "../../utils/cn";
import toast from "react-hot-toast";

const Profile = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [role] = useRole();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [lastUpdated, setLastUpdated] = useState(null);
  
  // Form state
  const [formData, setFormData] = useState({
    displayName: "",
    photoURL: "",
    phone: "",
    location: "",
    bio: "",
  });

  // Initialize form data when user loads
  useEffect(() => {
    if (user) {
      const phone = localStorage.getItem(`user_phone_${user.uid}`) || "";
      const location = localStorage.getItem(`user_location_${user.uid}`) || "";
      const bio = localStorage.getItem(`user_bio_${user.uid}`) || "";
      const updated = localStorage.getItem(`user_profile_updated_${user.uid}`);
      
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        phone: phone,
        location: location,
        bio: bio,
      });
      
      setLastUpdated(updated);
      
      console.log("Profile data loaded:", { phone, location, bio });
    }
  }, [user]);

  // Validation functions
  const validateForm = () => {
    const newErrors = {};

    if (!formData.displayName.trim()) {
      newErrors.displayName = "Display name is required";
    } else if (formData.displayName.trim().length < 2) {
      newErrors.displayName = "Display name must be at least 2 characters";
    } else if (formData.displayName.trim().length > 50) {
      newErrors.displayName = "Display name must be less than 50 characters";
    }

    if (formData.phone && formData.phone.trim()) {
      // More flexible phone validation - allows various formats
      const phoneRegex = /^[\+]?[(]?[\d\s\-\(\)]{10,}$/;
      const cleanPhone = formData.phone.replace(/[\s\-\(\)]/g, '');
      if (!phoneRegex.test(formData.phone) || cleanPhone.length < 10 || cleanPhone.length > 15) {
        newErrors.phone = "Please enter a valid phone number (10-15 digits)";
      }
    }

    if (formData.location && formData.location.length > 100) {
      newErrors.location = "Location must be less than 100 characters";
    }

    if (formData.bio && formData.bio.length > 500) {
      newErrors.bio = "Bio must be less than 500 characters";
    }

    if (formData.photoURL && formData.photoURL.trim()) {
      try {
        new URL(formData.photoURL);
      } catch {
        newErrors.photoURL = "Please enter a valid URL";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  // Handle save
  const handleSave = async () => {
    if (!validateForm()) {
      toast.error("Please fix the errors before saving");
      return;
    }

    setIsSaving(true);
    
    try {
      // Update Firebase profile
      const profileUpdate = {
        displayName: formData.displayName.trim(),
      };

      if (formData.photoURL.trim()) {
        profileUpdate.photoURL = formData.photoURL.trim();
      }

      await updateUserProfile(profileUpdate);

      // Save additional data to localStorage (in a real app, this would go to a database)
      if (user) {
        localStorage.setItem(`user_phone_${user.uid}`, formData.phone.trim());
        localStorage.setItem(`user_location_${user.uid}`, formData.location.trim());
        localStorage.setItem(`user_bio_${user.uid}`, formData.bio.trim());
        
        // Also save a timestamp for when the profile was last updated
        localStorage.setItem(`user_profile_updated_${user.uid}`, new Date().toISOString());
      }

      toast.success("Profile updated successfully!");
      setIsEditing(false);
      
      // Update the lastUpdated state to trigger re-render
      const updateTime = new Date().toISOString();
      setLastUpdated(updateTime);
      
      // Force a small delay to ensure localStorage is written before any potential re-renders
      setTimeout(() => {
        console.log("Profile data saved:", {
          phone: localStorage.getItem(`user_phone_${user.uid}`),
          location: localStorage.getItem(`user_location_${user.uid}`),
          bio: localStorage.getItem(`user_bio_${user.uid}`)
        });
      }, 100);
      
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    // Reset form data to original values from localStorage
    if (user) {
      const phone = localStorage.getItem(`user_phone_${user.uid}`) || "";
      const location = localStorage.getItem(`user_location_${user.uid}`) || "";
      const bio = localStorage.getItem(`user_bio_${user.uid}`) || "";
      
      setFormData({
        displayName: user.displayName || "",
        photoURL: user.photoURL || "",
        phone: phone,
        location: location,
        bio: bio,
      });
      
      console.log("Form reset with data:", { phone, location, bio });
    }
    setErrors({});
    setIsEditing(false);
  };

  // Get member since date
  const getMemberSince = () => {
    if (user?.metadata?.creationTime) {
      return new Date(user.metadata.creationTime).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    }
    return "January 2026";
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
                  src={formData.photoURL || user?.photoURL}
                  alt={formData.displayName || user?.displayName || "User"}
                  size="2xl"
                  className="ring-4 ring-primary-200/50 dark:ring-primary-700/50"
                />
                {isEditing && (
                  <div className="absolute -bottom-2 -right-2">
                    <button 
                      onClick={() => {
                        const newURL = prompt("Enter new profile picture URL:", formData.photoURL);
                        if (newURL !== null) {
                          handleInputChange('photoURL', newURL);
                        }
                      }}
                      className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors shadow-glass"
                    >
                      <FaCamera className="text-sm" />
                    </button>
                  </div>
                )}
                <div className="absolute top-2 right-2 w-4 h-4 bg-success-500 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
              </div>

              {/* Profile Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-4">
                  <h2 className="text-3xl font-bold text-text-primary">
                    {formData.displayName || user?.displayName || "Anonymous User"}
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
                    <p className="font-bold text-text-primary">{getMemberSince()}</p>
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

              {/* Action Buttons */}
              <div className="flex-shrink-0 flex gap-3">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <FaTimes className="text-sm" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="flex items-center gap-2"
                    >
                      {isSaving ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <FaSave className="text-sm" />
                      )}
                      <span>{isSaving ? "Saving..." : "Save Changes"}</span>
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center gap-2"
                  >
                    <FaEdit className="text-sm" />
                    Edit Profile
                  </Button>
                )}
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
              {/* Display Name */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Display Name *
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => handleInputChange('displayName', e.target.value)}
                  disabled={!isEditing}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl glass-secondary border transition-all",
                    errors.displayName 
                      ? "border-error-500 focus:ring-error-500/50" 
                      : "border-white/20 dark:border-white/10 focus:ring-primary-500/50",
                    "focus:outline-none focus:ring-2 text-text-primary placeholder-text-secondary",
                    !isEditing && "opacity-60 cursor-not-allowed"
                  )}
                  placeholder="Enter your display name"
                />
                {errors.displayName && (
                  <div className="flex items-center gap-2 mt-2 text-error-500 text-sm">
                    <FaExclamationTriangle className="text-xs" />
                    {errors.displayName}
                  </div>
                )}
              </div>
              
              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled={true}
                  className="w-full px-4 py-3 rounded-xl glass-secondary border border-white/20 dark:border-white/10 text-text-primary opacity-60 cursor-not-allowed"
                />
                <p className="text-xs text-text-muted mt-1">Email cannot be changed</p>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl glass-secondary border transition-all",
                    errors.phone 
                      ? "border-error-500 focus:ring-error-500/50" 
                      : "border-white/20 dark:border-white/10 focus:ring-primary-500/50",
                    "focus:outline-none focus:ring-2 text-text-primary placeholder-text-secondary",
                    !isEditing && "opacity-60 cursor-not-allowed"
                  )}
                  placeholder="e.g., +1 (555) 123-4567 or 555-123-4567"
                />
                {errors.phone && (
                  <div className="flex items-center gap-2 mt-2 text-error-500 text-sm">
                    <FaExclamationTriangle className="text-xs" />
                    {errors.phone}
                  </div>
                )}
                {!isEditing && formData.phone && (
                  <p className="text-xs text-success-600 dark:text-success-400 mt-1">
                  
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl glass-secondary border transition-all",
                    errors.location 
                      ? "border-error-500 focus:ring-error-500/50" 
                      : "border-white/20 dark:border-white/10 focus:ring-primary-500/50",
                    "focus:outline-none focus:ring-2 text-text-primary placeholder-text-secondary",
                    !isEditing && "opacity-60 cursor-not-allowed"
                  )}
                  placeholder="Enter your location"
                />
                {errors.location && (
                  <div className="flex items-center gap-2 mt-2 text-error-500 text-sm">
                    <FaExclamationTriangle className="text-xs" />
                    {errors.location}
                  </div>
                )}
              </div>
            </div>

            {/* Bio */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-text-primary mb-2">
                Bio
                <span className="text-text-muted text-xs ml-2">
                  ({formData.bio.length}/500)
                </span>
              </label>
              <textarea
                rows={4}
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                className={cn(
                  "w-full px-4 py-3 rounded-xl glass-secondary border transition-all resize-none",
                  errors.bio 
                    ? "border-error-500 focus:ring-error-500/50" 
                    : "border-white/20 dark:border-white/10 focus:ring-primary-500/50",
                  "focus:outline-none focus:ring-2 text-text-primary placeholder-text-secondary",
                  !isEditing && "opacity-60 cursor-not-allowed"
                )}
                placeholder="Tell us about yourself..."
                maxLength={500}
              />
              {errors.bio && (
                <div className="flex items-center gap-2 mt-2 text-error-500 text-sm">
                  <FaExclamationTriangle className="text-xs" />
                  {errors.bio}
                </div>
              )}
            </div>

            {/* Profile Picture URL */}
            {isEditing && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Profile Picture URL
                </label>
                <input
                  type="url"
                  value={formData.photoURL}
                  onChange={(e) => handleInputChange('photoURL', e.target.value)}
                  className={cn(
                    "w-full px-4 py-3 rounded-xl glass-secondary border transition-all",
                    errors.photoURL 
                      ? "border-error-500 focus:ring-error-500/50" 
                      : "border-white/20 dark:border-white/10 focus:ring-primary-500/50",
                    "focus:outline-none focus:ring-2 text-text-primary placeholder-text-secondary"
                  )}
                  placeholder="https://example.com/your-photo.jpg"
                />
                {errors.photoURL && (
                  <div className="flex items-center gap-2 mt-2 text-error-500 text-sm">
                    <FaExclamationTriangle className="text-xs" />
                    {errors.photoURL}
                  </div>
                )}
              </div>
            )}

            {/* Last Updated Info */}
            {lastUpdated && !isEditing && (
              <div className="mt-6 p-4 glass-tertiary rounded-xl border border-success-200/30 dark:border-success-700/30">
                <div className="flex items-center gap-2 text-success-600 dark:text-success-400">
                  <FaCheckCircle className="text-sm" />
                  <span className="text-sm font-medium">
                    Profile last updated: {new Date(lastUpdated).toLocaleString()}
                  </span>
                </div>
              </div>
            )}
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
                {getMemberSince()}
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
