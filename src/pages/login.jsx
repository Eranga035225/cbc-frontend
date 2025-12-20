import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleLogin() {
    console.log(email);
    console.log(password);
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/users/login",
        {
          email: email,
          password: password,
        }
      );

      toast.success("Login success");
      console.log(response);
      localStorage.setItem("token", response.data.token);

      if (response.data.role == "Admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (e) {
      toast.error(e.response.data.message);
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-cover bg-center flex items-center justify-center px-4">
      
      <div className="w-full max-w-md backdrop-blur-xl bg-white/20 rounded-2xl shadow-2xl p-8">
        
        {/* Title */}
        <h1 className="text-3xl font-bold text-center text-black mb-2">
          Welcome Back
        </h1>
        <p className="text-center text-black/80 mb-8">
          Please sign in to your account
        </p>

        {/* Email */}
        <div className="mb-5">
          <label className="block text-black text-sm mb-2">
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full h-[48px] px-4 rounded-xl bg-white/80 outline-none focus:ring-2 focus:ring-[#068b79]"
          />
        </div>

        {/* Password */}
        <div className="mb-6">
          <label className="block text-black text-sm mb-2">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full h-[48px] px-4 rounded-xl bg-white/80 outline-none focus:ring-2 focus:ring-[#068b79]"
          />
        </div>

        {/* Button */}
        <button
          onClick={handleLogin}
          className="w-full h-[48px] bg-[#068b79] rounded-xl text-lg font-semibold text-white hover:bg-[#057366] transition duration-300"
        >
          Login
        </button>
      </div>
    </div>
  );
}
