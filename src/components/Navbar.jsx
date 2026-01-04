import { useState, useContext, useRef, useEffect } from "react";
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
  FaColumns,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import useRole from "../hooks/useRole";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);
  const [role] = useRole();
  const dropdownRef = useRef(null);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

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

  const activeLinkClass = ({ isActive }) =>
    `flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
      isActive
        ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md">
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

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={activeLinkClass}>
                <item.icon className="text-lg" />
                <span className="font-medium">{item.label}</span>
              </NavLink>
            ))}

            {user && (
              <>
                {role === "admin" &&
                  adminNavItems.map((item) => (
                    <NavLink
                      key={item.to}
                      to={item.to}
                      className={activeLinkClass}
                    >
                      <item.icon className="text-lg" />
                      <span className="font-medium">{item.label}</span>
                    </NavLink>
                  ))}
                {commonUserItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={activeLinkClass}
                  >
                    <item.icon className="text-lg" />
                    <span className="font-medium">{item.label}</span>
                  </NavLink>
                ))}
              </>
            )}

            <NavLink to={aboutUsItem.to} className={activeLinkClass}>
              <aboutUsItem.icon className="text-lg" />
              <span className="font-medium">{aboutUsItem.label}</span>
            </NavLink>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 transition-colors"
            >
              {isDark ? (
                <FaSun className="text-yellow-500 text-lg" />
              ) : (
                <FaMoon className="text-gray-700 dark:text-gray-300 text-lg" />
              )}
            </button>

            {!user ? (
              <div className="hidden lg:flex items-center space-x-3">
                <Link
                  to="/auth/login"
                  className="font-medium text-gray-700 dark:text-gray-200 hover:text-orange-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2.5 rounded-lg font-medium hover:scale-105 transition-all shadow-md"
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    className="w-10 h-10 rounded-full border-2 border-orange-500 object-cover p-0.5"
                    alt="User"
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border dark:border-gray-700 py-3 z-50">
                    <div className="px-4 py-3 border-b dark:border-gray-700 mb-2">
                      <p className="text-sm font-bold dark:text-white truncate">
                        {user?.displayName}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to={
                        role === "admin"
                          ? "/dashboard/admin-home"
                          : "/dashboard/user-home"
                      }
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FaColumns className="mr-3 text-orange-500" /> Dashboard
                    </Link>

                    <div className="border-t dark:border-gray-700 my-2"></div>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FaSignOutAlt className="mr-3" /> Logout Account
                    </button>
                  </div>
                )}
              </div>
            )}

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-gray-700 dark:text-gray-200"
            >
              {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="lg:hidden border-t py-3 border-gray-200 dark:border-gray-700">
            <div className="space-y-1">
              {[
                ...navItems,
                ...(user && role === "admin" ? adminNavItems : []),
                ...(user ? commonUserItems : []),
                aboutUsItem,
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              ))}
              {!user && (
                <div className="pt-4 px-4 space-y-2">
                  <Link
                    to="/auth/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-2 text-gray-700 dark:text-gray-200 border rounded-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/auth/register"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center py-2 bg-orange-500 text-white rounded-lg"
                  >
                    Register
                  </Link>
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
