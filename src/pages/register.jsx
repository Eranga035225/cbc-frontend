import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function handleRegister() {
    if (!email || !firstName || !lastName || !password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      await axios.post(import.meta.env.VITE_BACKEND_URI + "/api/users", {
        email,
        firstName,
        lastName,
        password,
      });

      toast.success("Registration successful");
      navigate("/login");
    } catch (e) {
      toast.error(e.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[url('/login4.jpg')] bg-cover bg-center relative flex items-center justify-center px-4">
      
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* CARD */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/20
        rounded-3xl shadow-2xl p-8 border border-white/30">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Create Account
          </h1>
          <p className="text-white/80 text-sm mt-1">
            Sign up to get started
          </p>
        </div>

        {/* EMAIL */}
        <div className="mb-6">
          <label className="block text-sm text-white/70 mb-2">
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full bg-transparent border-b border-white/40
              px-1 py-3 text-white
              placeholder-white/40 focus:outline-none
              focus:border-white transition-all"
          />
        </div>

        {/* FIRST NAME */}
        <div className="mb-6">
          <label className="block text-sm text-white/70 mb-2">
            First name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            className="w-full bg-transparent border-b border-white/40
              px-1 py-3 text-white
              placeholder-white/40 focus:outline-none
              focus:border-white transition-all"
          />
        </div>

        {/* LAST NAME */}
        <div className="mb-6">
          <label className="block text-sm text-white/70 mb-2">
            Last name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            className="w-full bg-transparent border-b border-white/40
              px-1 py-3 text-white
              placeholder-white/40 focus:outline-none
              focus:border-white transition-all"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-8">
          <label className="block text-sm text-white/70 mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-transparent border-b border-white/40
              px-1 py-3 text-white
              placeholder-white/40 focus:outline-none
              focus:border-white transition-all"
          />
        </div>

        {/* REGISTER BUTTON */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className={`w-full h-[52px] rounded-xl text-lg font-semibold
            transition-all duration-300
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-accent shadow-lg hover:shadow-xl"
            }`}
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-center text-white/80 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold hover:underline">
            Log in
          </Link>
        </p>

        {/* FOOTER */}
        <p className="text-center text-white/60 text-xs mt-4">
          Secure registration • Powered by InventX
        </p>
      </div>
    </div>
  );
}
