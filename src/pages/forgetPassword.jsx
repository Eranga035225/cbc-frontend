import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


export default function ForgetPasswordPage() {
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  async function sendOtp() {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/users/send-otp",
        { email }
      );
      setOtpSent(true);
      toast.success("OTP sent successfully");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  }

  async function verifyOtp() {
    if (!otp || !newPassword || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/users/reset-password",
        {
          email,
          otp,
          newPassword,
        }
      );
      toast.success("Password reset successfully");
      
    // ✅ Redirect to login after short delay
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    } catch (err) {
      toast.error(err.response?.data?.message || "Password reset failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[url('/login2.jpg')] bg-cover bg-right relative flex items-center justify-center px-4">

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* CARD */}
      <div className="relative w-full max-w-md backdrop-blur-xl bg-white/20
        rounded-3xl shadow-2xl p-8 border border-white/30">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Forgot Password
          </h1>
          <p className="text-white/80 text-sm mt-1">
            {otpSent
              ? "Enter OTP and set a new password"
              : "We’ll send an OTP to your email"}
          </p>
        </div>

        {/* STEP 1 – EMAIL */}
        {!otpSent && (
          <>
            <div className="mb-8">
              <label className="block text-sm text-white/70 mb-2">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent border-b border-white/40
                  px-1 py-3 text-white text-base
                  placeholder-white/40 focus:outline-none
                  focus:border-white transition-all"
              />
            </div>

            <button
              onClick={sendOtp}
              disabled={loading}
              className={`w-full h-[52px] rounded-xl text-lg font-semibold
                transition-all duration-300
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-accent shadow-lg hover:shadow-xl"
                }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {/* STEP 2 – OTP + PASSWORD */}
        {otpSent && (
          <>
            <div className="mb-6">
              <label className="block text-sm text-white/70 mb-2">
                OTP Code
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="6-digit OTP"
                className="w-full bg-transparent border-b border-white/40
                  px-1 py-3 text-white text-base
                  placeholder-white/40 focus:outline-none
                  focus:border-white transition-all"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm text-white/70 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-white/40
                  px-1 py-3 text-white text-base
                  placeholder-white/40 focus:outline-none
                  focus:border-white transition-all"
              />
            </div>

            <div className="mb-8">
              <label className="block text-sm text-white/70 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent border-b border-white/40
                  px-1 py-3 text-white text-base
                  placeholder-white/40 focus:outline-none
                  focus:border-white transition-all"
              />
            </div>

            <button
              onClick={verifyOtp}
              disabled={loading}
              className={`w-full h-[52px] rounded-xl text-lg font-semibold
                transition-all duration-300
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-accent shadow-lg hover:shadow-xl"
                }`}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </>
        )}

        {/* FOOTER */}
        <p className="text-center text-white/70 text-xs mt-6">
          Secure recovery • Powered by InventX
        </p>
      </div>
    </div>
  );
}
