import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { createUser, googleLogin, updateUserProfile } =
    useContext(AuthContext);

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

      toast.success(`Account created as ${role}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await googleLogin();
      await saveUserToDb(
        result.user.displayName,
        result.user.email,
        result.user.photoURL,
        "user"
      );
      toast.success("Logged in with Google");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 px-4 py-10">
      <DynamicTitle title="Register" />
      <div className="card bg-white w-full max-w-lg shadow-2xl rounded-3xl overflow-hidden border border-orange-100">
        <div className="bg-gradient-to-r from-orange-500 to-pink-500 p-6 text-white text-center">
          <h1 className="text-3xl font-bold">Create Account</h1>
          <p className="text-sm opacity-90 mt-1">Join the PawMart community</p>
        </div>

        <form onSubmit={handleRegister} className="p-8 space-y-4">
          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Full Name
            </label>
            <div className="relative">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="name"
                placeholder="Enter your name"
                className="input input-bordered w-full focus:border-orange-400"
                required
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="email"
                type="email"
                placeholder="Enter your email"
                className="input input-bordered w-full focus:border-orange-400"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label font-semibold text-gray-700">
                Account Role
              </label>
              <div className="relative">
                <FaUserTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                <select
                  name="role"
                  className="select select-bordered w-full pl-12 focus:border-orange-400"
                  defaultValue="user"
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
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-12 focus:border-orange-400"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-control">
            <label className="label font-semibold text-gray-700">
              Profile Photo URL
            </label>
            <div className="relative">
              <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                name="photoURL"
                placeholder="Enter photo URL"
                className="input input-bordered w-full pl-12 focus:border-orange-400"
                required
              />
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
              "Register Now"
            )}
          </button>

          <div className="divider text-gray-400 text-xs">OR CONTINUE WITH</div>

          <button
            onClick={handleGoogleRegister}
            type="button"
            className="w-full py-3 rounded-xl border-2 border-gray-100 flex items-center justify-center gap-2 hover:bg-gray-50 transition-all font-semibold"
          >
            <FaGoogle className="text-red-500" /> Google
          </button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              className="text-orange-600 font-bold hover:underline"
              to="/auth/login"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
