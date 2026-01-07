import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaGoogle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaImage,
  FaUserTag,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import DynamicTitle from "../components/DynamicTitle";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const { createUser, googleLogin, updateUserProfile } =
    useContext(AuthContext);

  // Get the intended destination or default to home
  const from = location.state?.from?.pathname || "/";

  const saveUserToDb = async (name, email, photoURL, role) => {
    const userData = { name, email, photoURL, role };
    await axios.put(`https://pawmart-server-ebon.vercel.app/users`, userData);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const photoURL = form.photoURL.value;
    const role = form.role.value;

    if (!/[A-Z]/.test(password))
      return toast.error("Must include uppercase letter");
    if (!/[a-z]/.test(password))
      return toast.error("Must include lowercase letter");
    if (password.length < 6) return toast.error("Min 6 characters");

    setLoading(true);
    try {
      await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      await saveUserToDb(name, email, photoURL, role);
      toast.success("Account created successfully!");
      
      // Navigate to the intended destination or home
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
      await saveUserToDb(
        result.user.displayName,
        result.user.email,
        result.user.photoURL,
        "user"
      );
      toast.success("Logged in with Google");
      
      // Navigate to the intended destination or home
      navigate(from, { replace: true });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page flex items-center justify-center px-4 py-12">
      <DynamicTitle title="Register" />
      
      <div className="w-full max-w-lg">
        <Card className="auth-card p-8" hover={false} animated={false}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Create Account
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Join the PawMart community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="auth-label block text-sm mb-2">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="auth-icon absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="name"
                  placeholder="Enter your full name"
                  className="auth-input w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="auth-label block text-sm mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="auth-icon absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="auth-input w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Role Field */}
              <div>
                <label className="auth-label block text-sm mb-2">
                  Account Role
                </label>
                <div className="relative">
                  <FaUserTag className="auth-icon absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                  <select
                    name="role"
                    className="auth-input w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none appearance-none cursor-pointer transition-all duration-200"
                    defaultValue="user"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-5 h-5 auth-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label className="auth-label block text-sm mb-2">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="auth-icon absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    className="auth-input w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Photo URL Field */}
            <div>
              <label className="auth-label block text-sm mb-2">
                Profile Photo URL
              </label>
              <div className="relative">
                <FaImage className="auth-icon absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  name="photoURL"
                  placeholder="Enter photo URL"
                  className="auth-input w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Create Account Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
              className="auth-button-primary hover:shadow-none hover:transform-none relative z-10"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="auth-divider w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="auth-divider-text px-2">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Button */}
            <Button
              type="button"
              onClick={handleGoogleLogin}
              variant="outline"
              size="lg"
              fullWidth
              className="auth-button-outline flex items-center justify-center gap-3 hover:bg-transparent hover:border-primary-500/30 relative z-10"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </Button>

            {/* Footer Link */}
            <p className="text-center text-sm" style={{ color: 'var(--color-text-secondary)' }}>
              Already have an account?{" "}
              <Link
                className="auth-link font-medium transition-colors duration-200"
                to="/auth/login"
              >
                Sign In
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Register;