import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, googleLogin } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  const saveUserToDb = async (user, selectedRole) => {
    const userData = {
      name: user?.displayName,
      email: user?.email,
      photoURL: user?.photoURL,
      role: selectedRole,
    };
    try {
      await axios.put(`http://localhost:3000/users`, userData);
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
      navigate("/");
    } catch (err) {
      setLoading(false);
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await googleLogin();
      await saveUserToDb(result.user, "user");
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 px-4 py-10">
      <DynamicTitle title="Login" />
      <div className="card bg-white w-full max-w-lg shadow-2xl rounded-3xl overflow-hidden border border-orange-100">
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white text-center">
          <h1 className="text-3xl font-bold">Welcome Back</h1>
          <p className="text-sm opacity-90 mt-1">Please enter your details</p>
        </div>

        <div className="p-8">
          <div className="flex gap-3 mb-6">
            <button
              onClick={() => fillDemoCredentials("user")}
              className="flex-1 py-2 px-3 border-2 border-dashed border-orange-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:bg-orange-50 transition-all active:scale-95"
              type="button"
            >
              <FaUser className="text-orange-400" /> DEMO USER
            </button>
            <button
              onClick={() => fillDemoCredentials("admin")}
              className="flex-1 py-2 px-3 border-2 border-dashed border-pink-200 rounded-xl flex items-center justify-center gap-2 text-xs font-bold text-gray-500 hover:bg-pink-50 transition-all active:scale-95"
              type="button"
            >
              <FaUserShield className="text-pink-400" /> DEMO ADMIN
            </button>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="input input-bordered w-full  focus:border-orange-400"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-semibold text-gray-700">
                  Login As
                </label>
                <div className="relative">
                  <FaUserTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                  <select
                    className="select select-bordered w-full pl-12 focus:border-orange-400"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label font-semibold text-gray-700">
                  Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="input input-bordered w-full  focus:border-orange-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-4 rounded-xl font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-lg transition-all active:scale-95 disabled:opacity-70"
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="divider text-gray-400 text-xs my-6 uppercase font-medium">
              Or continue with
            </div>

            <button
              onClick={handleGoogleLogin}
              type="button"
              className="w-full py-3 rounded-xl border-2 border-gray-100 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all font-semibold text-gray-700"
            >
              <FaGoogle className="text-red-500" /> Google Account
            </button>

            <p className="text-center mt-6 text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                className="text-orange-600 font-bold hover:underline"
                to="/auth/register"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
