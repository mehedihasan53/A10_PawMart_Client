import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGoogle, FaUserShield, FaUser } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import DynamicTitle from "../components/DynamicTitle";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, googleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to auto-fill demo credentials
  const fillDemoCredentials = (role) => {
    if (role === "admin") {
      setEmail("admin@pawmart.com");
      setPassword("Admin@123");

      toast.success("Admin credentials filled!");
    } else {
      setEmail("user@pawmart.com");
      setPassword("User@123");
      toast.success("User credentials filled!");
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signIn(email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      setLoading(false);
      if (err.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again!");
      } else if (err.code === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else if (err.code === "auth/invalid-email") {
        toast.error("Invalid email address.");
      } else {
        toast.error(err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      await googleLogin();
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 px-4">
      <DynamicTitle title="Login" />
      <div className="card bg-white w-full max-w-md shadow-2xl p-8 rounded-2xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-orange-500">
          Login Now
        </h1>

        {/* Demo Buttons  */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => fillDemoCredentials("user")}
            className="flex-1 py-2 px-3 border-2 border-dashed border-orange-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:bg-orange-50 transition-colors"
            type="button"
          >
            <FaUser className="text-orange-400" /> DEMO USER
          </button>
          <button
            onClick={() => fillDemoCredentials("admin")}
            className="flex-1 py-2 px-3 border-2 border-dashed border-pink-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:bg-pink-50 transition-colors"
            type="button"
          >
            <FaUserShield className="text-pink-400" /> DEMO ADMIN
          </button>
        </div>

        <form onSubmit={handleEmailLogin} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500 shadow-md hover:opacity-90 transition-all active:scale-95"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-3 rounded-lg border flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
        >
          <FaGoogle className="text-red-500" /> Login with Google
        </button>

        <p className="text-center mt-4 text-gray-600 text-sm">
          Don't have an account?{" "}
          <Link className="text-orange-500 font-medium" to="/auth/register">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
