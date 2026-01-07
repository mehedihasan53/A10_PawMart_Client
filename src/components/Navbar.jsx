import { useState, useContext, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaHome,
  FaShoppingBag,
  FaPlus,
  FaList,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
  FaColumns,
  FaSignOutAlt,
  FaPaw,
  FaCog,
  FaChevronDown,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import useRole from "../hooks/useRole";
import useTheme from "../hooks/useTheme";
import Button from "./ui/Button";
import Avatar from "./ui/Avatar";
import Logo from "./ui/Logo";
import { cn } from "../utils/cn";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logOut, authInitialized } = useContext(AuthContext);
  const { isDark, toggleTheme } = useTheme();
  const [role] = useRole();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logOut();
      setIsProfileOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const navItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/pets-supplies", label: "Pets & Supplies", icon: FaShoppingBag },
  ];

  const adminNavItems = [
    { to: "/add-listing", label: "Add Listing", icon: FaPlus },
    { to: "/my-listings", label: "My Listings", icon: FaList },
  ];

  const commonUserItems = [
    { to: "/my-orders", label: "My Orders", icon: FaShoppingCart },
  ];

  const aboutUsItem = { to: "/about-us", label: "About Us", icon: FaPaw };

  // Enhanced active link styling with glassmorphism only on active buttons
  const activeLinkClass = ({ isActive }) =>
    cn(
      "flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 relative group",
      "focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 dark:focus:ring-offset-dark-bg",
      isActive
        ? "glass-secondary border border-white/20 dark:border-white/10 backdrop-blur-16 bg-gradient-to-r from-primary-500/10 to-secondary-500/10 text-primary-600 dark:text-primary-400"
        : "text-text-primary hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gradient-to-r hover:from-primary-500/5 hover:to-secondary-500/5"
    );

  return (
    <nav className="sticky top-0 z-50 navbar-glass border-b border-white/10 dark:border-white/5">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Logo size="md" variant="navbar" animated />
          </div>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center justify-center flex-1 max-w-2xl mx-8">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <div key={item.to}>
                  <NavLink to={item.to} className={activeLinkClass}>
                    <item.icon className="text-base flex-shrink-0" />
                    <span className="whitespace-nowrap">{item.label}</span>
                  </NavLink>
                </div>
              ))}

              {user && (
                <>
                  {role === "admin" &&
                    adminNavItems.map((item) => (
                      <div key={item.to}>
                        <NavLink to={item.to} className={activeLinkClass}>
                          <item.icon className="text-base flex-shrink-0" />
                          <span className="whitespace-nowrap">{item.label}</span>
                        </NavLink>
                      </div>
                    ))}
                  {commonUserItems.map((item) => (
                    <div key={item.to}>
                      <NavLink to={item.to} className={activeLinkClass}>
                        <item.icon className="text-base flex-shrink-0" />
                        <span className="whitespace-nowrap">{item.label}</span>
                      </NavLink>
                    </div>
                  ))}
                </>
              )}

              <div>
                <NavLink to={aboutUsItem.to} className={activeLinkClass}>
                  <aboutUsItem.icon className="text-base flex-shrink-0" />
                  <span className="whitespace-nowrap">{aboutUsItem.label}</span>
                </NavLink>
              </div>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl glass-button focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 dark:focus:ring-offset-dark-bg group transition-all duration-300 hover:scale-105"
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {isDark ? (
                <FaSun className="text-yellow-500 text-lg group-hover:text-yellow-400 transition-colors" />
              ) : (
                <FaMoon className="text-primary-600 dark:text-primary-400 text-lg group-hover:text-primary-500 transition-colors" />
              )}
            </button>

            {/* Auth Section */}
            {!authInitialized ? (
              // Show loading placeholder while auth is initializing
              <div className="hidden lg:flex items-center space-x-2">
                <div className="w-20 h-8 glass-secondary rounded-lg animate-pulse"></div>
                <div className="w-24 h-8 glass-secondary rounded-lg animate-pulse"></div>
              </div>
            ) : !user ? (
              <div className="hidden lg:flex items-center space-x-2">
                <Button
                  as={Link}
                  to="/auth/login"
                  variant="ghost"
                  size="sm"
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  to="/auth/register"
                  variant="gradient"
                  size="sm"
                >
                  Register
                </Button>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl glass-button focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 dark:focus:ring-offset-dark-bg transition-all duration-300 group hover:scale-102"
                  aria-label="Open user menu"
                >
                  <Avatar
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    size="sm"
                    className="ring-2 ring-primary-500/20 group-hover:ring-primary-500/40 transition-all duration-300"
                  />
                  <div className="hidden lg:block text-left">
                    <p className="text-sm font-medium text-text-primary truncate max-w-24">
                      {user?.displayName || "User"}
                    </p>
                    <p className="text-xs text-text-secondary capitalize">
                      {role}
                    </p>
                  </div>
                  <div className="hidden lg:block">
                    <FaChevronDown className={`text-xs text-text-secondary group-hover:text-primary-500 transition-all duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isProfileOpen && (
                  <div
                    className="absolute right-0 mt-3 w-80 sm:w-80 glass-primary rounded-2xl overflow-hidden z-50 border border-white/20 dark:border-white/10 shadow-2xl backdrop-blur-24 max-w-[calc(100vw-2rem)] sm:max-w-none"
                    style={{
                      background: isDark 
                        ? 'linear-gradient(135deg, rgba(23, 23, 23, 0.95) 0%, rgba(23, 23, 23, 0.9) 100%)'
                        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%)',
                    }}
                  >
                    {/* User Profile Header */}
                    <div className="relative px-6 py-5 bg-gradient-to-br from-primary-500/8 via-secondary-500/6 to-primary-600/8 border-b border-white/15 dark:border-white/8 overflow-hidden">
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary-400/20 to-transparent rounded-full blur-2xl"></div>
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-secondary-400/20 to-transparent rounded-full blur-xl"></div>
                      </div>
                      
                      <div className="relative flex items-center space-x-4">
                        <div className="relative">
                          <Avatar
                            src={user.photoURL}
                            alt={user.displayName || "User"}
                            size="lg"
                            className="ring-3 ring-white/30 dark:ring-white/20 shadow-lg"
                          />
                          {/* Online status indicator */}
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success-500 rounded-full border-3 border-white dark:border-gray-800 shadow-sm">
                            <div className="w-full h-full bg-success-400 rounded-full animate-pulse"></div>
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-text-primary truncate leading-tight">
                            {user?.displayName || "User"}
                          </h3>
                          <p className="text-sm text-text-secondary truncate mt-0.5">
                            {user?.email}
                          </p>
                          <div className="mt-2">
                            <span className="inline-flex items-center px-2.5 py-1 text-xs font-medium bg-gradient-to-r from-primary-500/15 to-secondary-500/15 text-primary-700 dark:text-primary-300 rounded-lg border border-primary-200/40 dark:border-primary-700/40 backdrop-blur-sm">
                              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2 animate-pulse"></div>
                              {role}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="py-3">
                      <div className="mx-2 rounded-xl hover:bg-white/8 transition-all duration-200">
                        <Link
                          to={
                            role === "admin"
                              ? "/dashboard/admin-home"
                              : "/dashboard/user-home"
                          }
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center w-full px-4 py-3.5 text-sm transition-all duration-200 group rounded-xl"
                        >
                          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500/12 to-secondary-500/12 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300 mr-3.5 shadow-sm">
                            <FaColumns className="text-primary-600 dark:text-primary-400 text-sm" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                              Dashboard
                            </p>
                            <p className="text-xs text-text-secondary mt-0.5">
                              Manage your account & data
                            </p>
                          </div>
                          <FaChevronDown className="text-xs text-text-secondary rotate-[-90deg]" />
                        </Link>
                      </div>

                      <div className="mx-2 rounded-xl hover:bg-white/8 transition-all duration-200">
                        <Link
                          to="/dashboard/settings"
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center w-full px-4 py-3.5 text-sm transition-all duration-200 group rounded-xl"
                        >
                          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-gray-500/12 to-gray-600/12 group-hover:from-gray-500/20 group-hover:to-gray-600/20 transition-all duration-300 mr-3.5 shadow-sm">
                            <FaCog className="text-gray-600 dark:text-gray-400 text-sm" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-text-primary group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                              Settings
                            </p>
                            <p className="text-xs text-text-secondary mt-0.5">
                              Preferences & privacy controls
                            </p>
                          </div>
                          <FaChevronDown className="text-xs text-text-secondary rotate-[-90deg]" />
                        </Link>
                      </div>

                      {/* Divider */}
                      <div className="my-3 mx-4 relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent h-px"></div>
                        <div className="relative bg-white/10 dark:bg-white/5 h-px"></div>
                      </div>

                      {/* Logout Button */}
                      <div className="mx-2 rounded-xl hover:bg-red-500/8 transition-all duration-200">
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-3.5 text-sm transition-all duration-200 group rounded-xl"
                        >
                          <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-gradient-to-br from-error-500/12 to-error-600/12 group-hover:from-error-500/20 group-hover:to-error-600/20 transition-all duration-300 mr-3.5 shadow-sm">
                            <FaSignOutAlt className="text-error-600 dark:text-error-400 text-sm" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-text-primary group-hover:text-error-600 dark:group-hover:text-error-400 transition-colors">
                              Sign Out
                            </p>
                            <p className="text-xs text-text-secondary mt-0.5">
                              End your current session
                            </p>
                          </div>
                          <FaSignOutAlt className="text-xs text-error-500 opacity-60" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 rounded-xl glass-button focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:ring-offset-2 dark:focus:ring-offset-dark-bg hover:scale-105 transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes size={18} className="text-text-primary" />
              ) : (
                <FaBars size={18} className="text-text-primary" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 dark:border-white/5 overflow-hidden">
            <div className="py-4 space-y-2">
              {[
                ...navItems,
                ...(user && role === "admin" ? adminNavItems : []),
                ...(user ? commonUserItems : []),
                aboutUsItem,
              ].map((item) => (
                <div key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl glass-tertiary mx-4 hover:glass-secondary transition-all duration-300 group"
                  >
                    <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300">
                      <item.icon className="text-primary-600 dark:text-primary-400 text-sm" />
                    </div>
                    <span className="font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {item.label}
                    </span>
                  </Link>
                </div>
              ))}
              
              {user && (
                <>
                  <div>
                    <Link
                      to={role === "admin" ? "/dashboard/admin-home" : "/dashboard/user-home"}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl glass-tertiary mx-4 hover:glass-secondary transition-all duration-300 group"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-primary-500/10 to-secondary-500/10 group-hover:from-primary-500/20 group-hover:to-secondary-500/20 transition-all duration-300">
                        <FaColumns className="text-primary-600 dark:text-primary-400 text-sm" />
                      </div>
                      <span className="font-medium text-text-primary group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        Dashboard
                      </span>
                    </Link>
                  </div>

                  <div>
                    <Link
                      to="/dashboard/settings"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl glass-tertiary mx-4 hover:glass-secondary transition-all duration-300 group"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-gray-500/10 to-gray-600/10 group-hover:from-gray-500/20 group-hover:to-gray-600/20 transition-all duration-300">
                        <FaCog className="text-gray-600 dark:text-gray-400 text-sm" />
                      </div>
                      <span className="font-medium text-text-primary group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
                        Settings
                      </span>
                    </Link>
                  </div>
                </>
              )}

              {!authInitialized ? (
                // Show loading placeholder in mobile menu
                <div className="pt-4 px-4 space-y-3">
                  <div className="w-full h-10 glass-secondary rounded-lg animate-pulse"></div>
                  <div className="w-full h-10 glass-secondary rounded-lg animate-pulse"></div>
                </div>
              ) : !user ? (
                <div className="pt-4 px-4 space-y-3">
                  <Button
                    as={Link}
                    to="/auth/login"
                    variant="ghost"
                    fullWidth
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Button>
                  <Button
                    as={Link}
                    to="/auth/register"
                    variant="gradient"
                    fullWidth
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register
                  </Button>
                </div>
              ) : null}

              {user && (
                <div className="pt-2 px-4">
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-error-500/10 hover:bg-error-500/20 transition-all duration-300 group w-full"
                  >
                    <div className="p-2 rounded-lg bg-error-500/20 group-hover:bg-error-500/30 transition-all duration-300">
                      <FaSignOutAlt className="text-error-600 dark:text-error-400 text-sm" />
                    </div>
                    <span className="font-medium text-error-600 dark:text-error-400">
                      Sign Out
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;