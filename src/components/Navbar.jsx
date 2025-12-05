import { useState, useContext, useEffect } from "react";
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
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isChecked, setChecked] = useState(false);

  useEffect(() => {
    const theme = isChecked ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme);
  }, [isChecked]);

  const handleThemeChange = () => {
    setChecked((prev) => !prev);
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-base-100 shadow">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-2 rounded-full">
              <FaPaw className="text-white text-xl" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">
                PawMart
              </h1>
              <p className="text-xs text-neutral">Pet Adoption & Supply</p>
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
                      : "text-base-content hover:bg-base-200"
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
                        : "text-base-content hover:bg-base-200"
                    }`
                  }
                >
                  <item.icon className="text-lg" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              ))}
          </div>

          {/* Theme  */}
          <label className="flex cursor-pointer gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="5" />
              <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
            </svg>
            <input
              type="checkbox"
              value="synthwave"
              checked={isChecked}
              onChange={handleThemeChange}
              className="toggle theme-controller"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </label>

          {/* Right Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {!user ? (
              <>
                <Link
                  to="/auth/login"
                  className="font-medium text-base-content hover:text-primary transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/auth/register"
                  className="bg-primary text-primary-content px-6 py-2.5 rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all shadow-md"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName || "Profile"}
                  className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                />
                <span className="text-base-content font-medium">
                  {user.displayName || "Profile"}
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-error text-error-content px-4 py-2 rounded-lg hover:bg-error-focus transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-base-content hover:text-primary"
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t py-3 border-base-300">
            <div className="space-y-2 px-2">
              {[...navItems, ...(user ? userNavItems : [])].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg text-base-content hover:bg-base-200 transition-colors"
                >
                  <item.icon className="text-lg" />
                  <span>{item.label}</span>
                </Link>
              ))}

              <div className="pt-4 space-y-3">
                {!user ? (
                  <>
                    <Link
                      to="/auth/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2.5 text-base-content hover:text-primary"
                    >
                      Login
                    </Link>
                    <Link
                      to="/auth/register"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block w-full text-center py-2.5 bg-primary text-primary-content rounded-lg font-medium hover:shadow-lg"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center space-x-3 px-4 py-2.5">
                    <img
                      src={user.photoURL || "/default-avatar.png"}
                      alt={user.displayName || "Profile"}
                      className="w-8 h-8 rounded-full object-cover border-2 border-primary"
                    />
                    <span className="text-base-content font-medium">
                      {user.displayName || "Profile"}
                    </span>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="ml-auto w-full text-center py-2.5 bg-error text-error-content rounded-lg font-medium hover:bg-error-focus"
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
