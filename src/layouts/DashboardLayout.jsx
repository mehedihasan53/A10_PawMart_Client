import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import {
  FaHome,
  FaUser,
  FaPlusCircle,
  FaChartBar,
  FaSignOutAlt,
  FaPaw,
  FaUsers,
  FaClipboardList,
  FaBars,
  FaExternalLinkAlt,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import useRole from "../hooks/useRole";
import { AuthContext } from "../provider/AuthProvider";
import ScrollToTop from "../components/shared/ScrollToTop";
import Logo from "../components/ui/Logo";
import { cn } from "../utils/cn";

const DashboardLayout = () => {
  const [role] = useRole();
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  // Enhanced glassmorphism navigation styling
  const navStyle = ({ isActive }) =>
    cn(
      "flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
      "focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 dark:focus:ring-offset-dark-bg",
      isActive
        ? "glass-primary border border-white/20 dark:border-white/10 text-primary-600 dark:text-primary-400 shadow-glass"
        : "text-neutral-600 dark:text-neutral-400 hover:glass-tertiary hover:text-primary-600 dark:hover:text-primary-400 hover:border hover:border-white/10 dark:hover:border-white/5"
    );

  const sidebarVariants = {
    closed: {
      x: "-100%",
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    open: {
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Enhanced Logo Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="p-8 border-b border-white/10 dark:border-white/5"
      >
        <Logo size="lg" variant="default" animated />
      </motion.div>

      {/* Enhanced Navigation */}
      <nav className="flex-1 px-6 py-6 space-y-3 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 ml-2 mb-4">
            Navigation
          </p>

          <NavLink to="/" className={navStyle}>
            <div className="flex items-center">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 mr-3 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300">
                <FaExternalLinkAlt className="text-lg text-primary-500" />
              </div>
              <span className="font-medium">Back to Home</span>
            </div>
          </NavLink>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <NavLink
            to="/dashboard/profile"
            className={navStyle}
            onClick={() => setIsMobileOpen(false)}
          >
            <div className="flex items-center">
              <div className="p-2 rounded-xl bg-gradient-to-br from-neutral-500/10 to-neutral-600/10 mr-3 group-hover:from-neutral-500/20 group-hover:to-neutral-600/20 transition-all duration-300">
                <FaUser className="text-lg text-neutral-600 dark:text-neutral-400" />
              </div>
              <span className="font-medium">My Profile</span>
            </div>
          </NavLink>
        </motion.div>

        <div className="pt-6 mt-6 border-t border-white/10 dark:border-white/5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-xs font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 ml-2 mb-4">
              {role === "admin" ? "Administrator" : "User Dashboard"}
            </p>

            {role === "admin" ? (
              <div className="space-y-2">
                <NavLink
                  to="/dashboard/admin-home"
                  className={navStyle}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <div className="flex items-center">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 mr-3 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300">
                      <FaChartBar className="text-lg text-primary-500" />
                    </div>
                    <span className="font-medium">Overview</span>
                  </div>
                </NavLink>
                <NavLink
                  to="/dashboard/manage-users"
                  className={navStyle}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <div className="flex items-center">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-secondary-500/10 to-primary-500/10 mr-3 group-hover:from-secondary-500/20 group-hover:to-primary-500/20 transition-all duration-300">
                      <FaUsers className="text-lg text-secondary-500" />
                    </div>
                    <span className="font-medium">Manage Users</span>
                  </div>
                </NavLink>
              </div>
            ) : (
              <NavLink
                to="/dashboard/user-home"
                className={navStyle}
                onClick={() => setIsMobileOpen(false)}
              >
                <div className="flex items-center">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-primary-500/10 to-secondary-500/10 mr-3 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300">
                    <FaHome className="text-lg text-primary-500" />
                  </div>
                  <span className="font-medium">Overview</span>
                </div>
              </NavLink>
            )}
          </motion.div>
        </div>
      </nav>

      {/* Enhanced Logout Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="p-6 border-t border-white/10 dark:border-white/5"
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center p-4 glass-tertiary hover:glass-secondary border border-error-500/20 hover:border-error-500/40 text-error-600 dark:text-error-400 rounded-2xl font-medium transition-all duration-300 group"
        >
          <div className="p-2 rounded-xl bg-error-500/10 group-hover:bg-error-500/20 mr-3 transition-all duration-300">
            <FaSignOutAlt className="text-error-600 dark:text-error-400" />
          </div>
          <span>Sign Out</span>
        </button>
      </motion.div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-bg-primary to-bg-surface">
      <ScrollToTop />
      
      {/* Desktop Sidebar */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-80 glass-primary border-r border-white/20 dark:border-white/10 hidden md:flex flex-col sticky top-0 h-screen backdrop-blur-24"
      >
        <SidebarContent />
      </motion.div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              variants={sidebarVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="absolute left-0 h-full w-80 glass-primary border-r border-white/20 dark:border-white/10 backdrop-blur-24"
            >
              <SidebarContent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Enhanced Mobile Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="md:hidden glass-primary border-b border-white/20 dark:border-white/10 p-4 flex justify-between items-center backdrop-blur-24"
        >
          <Logo size="sm" variant="navbar" />
          <div className="flex items-center space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMobileOpen(true)}
              className="p-3 glass-secondary border border-white/20 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all duration-300"
            >
              <FaBars className="text-neutral-600 dark:text-neutral-300" />
            </motion.button>
          </div>
        </motion.header>

        {/* Enhanced Main Content */}
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex-1 p-6 md:p-12 overflow-auto"
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default DashboardLayout;
