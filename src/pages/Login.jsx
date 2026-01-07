import { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FaGoogle,
  FaUserShield,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserTag,
} from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import DynamicTitle from "../components/DynamicTitle";
import Button from "../components/ui/Button";
import Card from "../components/ui/Card";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, googleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  // Get the intended destination or default to home
  const from = location.state?.from?.pathname || "/";

  const saveUserToDb = async (user, selectedRole) => {
    const userData = {
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      role: selectedRole,
    };
    try {
      await axios.put(`https://pawmart-server-ebon.vercel.app/users`, userData);
    } catch (err) {
      console.error("Error syncing user role:", err);
    }
  };

  const fillDemoCredentials = (selectedRole) => {
    if (selectedRole === "admin") {
      setEmail("admin@pawmart.com");
      setPassword("Admin@123");
      setRole("admin");
      toast.success("Admin demo credentials loaded!");
    } else {
      setEmail("user@pawmart.com");
      setPassword("User@123");
      setRole("user");
      toast.success("User demo credentials loaded!");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn(email, password);
      await saveUserToDb(result.user, role);
      toast.success(`Logged in successfully as ${role}!`);
      
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
      await saveUserToDb(result.user, "user");
      toast.success("Logged in with Google!");
      
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
      <DynamicTitle title="Login" />
      
      <div className="w-full max-w-md">
        <Card className="auth-card p-8" hover={false} animated={false}>
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--color-text-primary)' }}>
              Welcome Back
            </h1>
            <p style={{ color: 'var(--color-text-secondary)' }}>
              Sign in to your PawMart account
            </p>
          </div>

          {/* Demo Credentials */}
          <div className="auth-demo-section mb-6 p-4 rounded-lg">
            <p className="text-sm mb-3 text-center" style={{ color: 'var(--color-text-secondary)' }}>
               Demo accounts:
            </p>
            <div className="flex gap-2">
              <Button
                onClick={() => fillDemoCredentials("user")}
                variant="outline"
                size="sm"
                className="auth-button-outline flex-1 flex items-center justify-center gap-2 hover:bg-transparent hover:border-primary-500/30 relative z-10"
              >
                <FaUser className="text-sm" />
                User Demo
              </Button>
              <Button
                onClick={() => fillDemoCredentials("admin")}
                variant="outline"
                size="sm"
                className="auth-button-outline flex-1 flex items-center justify-center gap-2 hover:bg-transparent hover:border-primary-500/30 relative z-10"
              >
                <FaUserShield className="text-sm" />
                Admin Demo
              </Button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleEmailLogin} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="auth-label block text-sm mb-2">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="auth-icon absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="auth-input w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                  required
                />
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="auth-input w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="auth-label block text-sm mb-2">
                Login As
              </label>
              <div className="relative">
                <FaUserTag className="auth-icon absolute left-3 top-1/2 -translate-y-1/2 z-10" />
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="auth-input w-full pl-10 pr-4 py-3 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:outline-none appearance-none cursor-pointer transition-all duration-200"
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

            {/* Sign In Button */}
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              disabled={loading}
              className="auth-button-primary hover:shadow-none hover:transform-none relative z-10"
            >
              {loading ? "Signing In..." : "Sign In"}
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
              Don't have an account?{" "}
              <Link
                className="auth-link font-medium transition-colors duration-200"
                to="/auth/register"
              >
                Create Account
              </Link>
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;