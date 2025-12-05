import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import DynamicTitle from "../components/DynamicTitle";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { createUser, googleLogin, updateUserProfile } =
    useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const photoURL = e.target.photoURL.value;

    // Password validation
    if (!/[A-Z]/.test(password))
      return toast.error("Must include uppercase letter");
    if (!/[a-z]/.test(password))
      return toast.error("Must include lowercase letter");
    if (password.length < 6) return toast.error("Min 6 characters");

    setLoading(true);
    try {
      const result = await createUser(email, password);
      await updateUserProfile({ displayName: name, photoURL });
      toast.success("Account created!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      await googleLogin();
      toast.success("Logged in with Google");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-pink-50 px-4">
      <DynamicTitle title="Register" />
      <div className="card bg-white w-full max-w-md shadow-2xl p-8 rounded-2xl my-15">
        <h1 className="text-4xl font-bold text-center mb-6 text-orange-500">
          Create Account
        </h1>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input
              name="name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label">Photo URL</label>
            <input
              name="photoURL"
              className="input input-bordered w-full"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-pink-500"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <div className="divider my-4">OR</div>

        <button
          onClick={handleGoogleRegister}
          className="w-full py-3 rounded-lg border flex items-center justify-center gap-2"
        >
          <FaGoogle className="text-red-500" /> Register with Google
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link className="text-orange-500 font-medium" to="/auth/login">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
