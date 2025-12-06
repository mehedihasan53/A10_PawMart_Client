import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaPaw,
  FaHome,
  FaShoppingBag,
  FaPlus,
  FaList,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSun,
  FaMoon,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    if (!isDark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  };

  const navItems = [
    { to: "/", label: "Home", icon: FaHome },
    { to: "/pets-supplies", label: "Pets & Supplies", icon: FaShoppingBag },
  ];

  const userNavItems = [
    { to: "/add-listing", label: "Add Listing", icon: FaPlus },
    { to: "/my-listings", label: "My Listings", icon: FaList },
    { to: "/my-orders", label: "My Orders", icon: FaShoppingCart },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
    } catch (err) {}
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-full">
              <FaPaw className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                PawMart
              </h1>
              <p className="text-xs text-gray-600 dark:text-gray-300">
                Pet Adoption & Supply
              </p>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`
                }
              >
                <item.icon className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}

            {user &&
              userNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                    }`
                  }
                >
                  <item.icon className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDark ? (
                <FaSun className="text-yellow-500 text-lg" />
              ) : (
                <FaMoon className="text-gray-700 dark:text-gray-300 text-lg" />
              )}
            </button>

            <div className="hidden lg:flex items-center space-x-4">
              {!user ? (
                <>
                  <Link
                    to="/auth/login"
                    className="font-medium text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all shadow-md"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <div className="flex items-center space-x-3">
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt={user.displayName || "Profile"}
                    className="w-8 h-8 rounded-full object-cover border-2 border-orange-500"
                  />
                  <span className="text-gray-700 dark:text-gray-200 font-medium">
                    {user.displayName || "Profile"}
                  </span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-gray-700 dark:text-gray-200 hover:text-orange-500"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t py-3 border-gray-200 dark:border-gray-700">
            <div className="space-y-2 px-2">
              {[...navItems, ...(user ? userNavItems : [])].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <item.icon className="text-lg" />
                  <span>{item.label}</span>
                </Link>
              ))}

              <button
                onClick={() => {
                  toggleTheme();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full"
              >
                {isDark ? (
                  <FaSun className="text-lg text-yellow-500" />
                ) : (
                  <FaMoon className="text-lg" />
                )}
                <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
              </button>

              <div className="pt-4 space-y-3">
                {!user ? (
                  <>
                    <Link
                      to="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2.5 text-gray-700 dark:text-gray-200 hover:text-orange-500"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <div className="px-4 py-3">
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={user.photoURL || "/default-avatar.png"}
                        alt={user.displayName || "Profile"}
                        className="w-8 h-8 rounded-full object-cover border-2 border-orange-500"
                      />
                      <span className="text-gray-700 dark:text-gray-200 font-medium">
                        {user.displayName || "Profile"}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="w-full text-center py-2.5 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
