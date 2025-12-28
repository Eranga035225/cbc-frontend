import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/users/login",
        {
          email,
          password,
        }
      );

      toast.success("Welcome back!");
      localStorage.setItem("token", response.data.token);

      navigate(response.data.role === "Admin" ? "/admin" : "/");
    } catch (e) {
      toast.error(e.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[url('/login.jpg')] bg-cover bg-center flex items-center justify-center px-4 relative">

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* LOGIN CARD */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/20
        rounded-3xl shadow-2xl p-8 border border-white/30">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Welcome Back
          </h1>
          <p className="text-white/80 text-sm mt-1">
            Sign in to continue
          </p>
        </div>

        {/* EMAIL */}
        <div className="relative mb-5">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="peer w-full h-[52px] px-4 pt-5 rounded-xl
              bg-white/90 text-gray-800
              border border-white/40
              outline-none backdrop-blur-sm
              focus:border-primary
              focus:ring-2 focus:ring-primary/30
              transition-all"
          />
          <label
            className="absolute left-4 top-3 text-sm text-gray-600
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-xs
              peer-focus:text-primary
              transition-all"
          >
            Email Address
          </label>
        </div>

        {/* PASSWORD */}
        <div className="relative mb-6">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            className="peer w-full h-[52px] px-4 pt-5 rounded-xl
              bg-white/90 text-gray-800
              border border-white/40
              outline-none backdrop-blur-sm
              focus:border-primary
              focus:ring-2 focus:ring-primary/30
              transition-all"
          />
          <label
            className="absolute left-4 top-3 text-sm text-gray-600
              peer-placeholder-shown:top-4
              peer-placeholder-shown:text-base
              peer-focus:top-2
              peer-focus:text-xs
              peer-focus:text-primary
              transition-all"
          >
            Password
          </label>
        </div>

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full h-[52px] rounded-xl text-lg font-semibold
            transition-all duration-300
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primary text-white hover:bg-accent shadow-lg hover:shadow-xl"
            }`}
        >
          {loading ? "Signing in..." : "Login"}
        </button>

        {/* FOOTER */}
        <p className="text-center text-white/70 text-xs mt-6">
          Secure login • Powered by InventX
        </p>
      </div>
    </div>
  );
}
