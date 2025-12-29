import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrGoogle } from "react-icons/gr";
import { useNavigate, Link } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      const accessToken = res.access_token;
      axios
        .post(import.meta.env.VITE_BACKEND_URI + "/api/users/login/google", {
          accessToken,
        })
        .then((res) => {
          toast.success("Login Successful");
          localStorage.setItem("token", res.data.token);
          navigate(res.data.role === "Admin" ? "/admin" : "/");
        });
    },
  });

  async function handleLogin() {
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/users/login",
        { email, password }
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
    <div className="min-h-screen bg-[url('/login5.jpg')] bg-cover bg-center relative">
      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* CENTERED CONTENT */}
      <div className="relative min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="backdrop-blur-xl bg-white/20 rounded-3xl shadow-2xl p-8 border border-white/30">

            {/* HEADER */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
              <p className="text-white/80 text-sm mt-1">
                Sign in to continue
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
                className="w-full bg-transparent border-b border-white/40 px-1 py-3
                  text-white placeholder-white/40 focus:outline-none
                  focus:border-white transition-all"
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-2">
              <label className="block text-sm text-white/70 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-white/40 px-1 py-3
                  text-white placeholder-white/40 focus:outline-none
                  focus:border-white transition-all"
              />
            </div>

            {/* FORGOT PASSWORD */}
            <div className="text-right mb-6">
              <Link
                to="/forget"
                className="text-sm text-white/70 hover:text-white transition"
              >
                Forgot password?
              </Link>
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

            {/* DIVIDER */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-white/30"></div>
              <span className="px-3 text-xs text-white/70">OR</span>
              <div className="flex-1 h-px bg-white/30"></div>
            </div>

            {/* GOOGLE LOGIN */}
            <button
              onClick={googleLogin}
              className="w-full h-[52px] rounded-xl flex items-center justify-center gap-3
                bg-white text-gray-800 font-semibold hover:bg-gray-100
                transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <GrGoogle size={22} />
              Continue with Google
            </button>

            {/* SIGN UP */}
            <p className="text-center text-white/80 text-sm mt-6">
              Don’t have an account?{" "}
              <Link to="/signup" className="font-semibold hover:underline">
                Sign up
              </Link>
            </p>

            {/* FOOTER */}
            <p className="text-center text-white/60 text-xs mt-4">
              Secure login • Powered by InventX
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
