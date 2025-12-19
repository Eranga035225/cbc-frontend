import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleRegister() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/users",
        {
          email: email,
          firstName: firstName,
          lastName: lastName,
          password: password
        }
      );

      toast.success("Registration successful");
      console.log(response);

      navigate("/login");

    } catch (e) {
      toast.error(e.response?.data?.message || "Registration failed");
    }
  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex justify-evenly items-center">
      
      <div className="w-[50%] h-full"></div>

      <div className="w-[50%] h-full flex justify-center items-center">
        <div className="w-[400px] h-[650px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">

          <input
            type="email"
            placeholder="Email"
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[15px] px-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="text"
            placeholder="First Name"
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[15px] px-4"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Last Name"
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[15px] px-4"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[15px] px-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleRegister}
            className="w-[300px] h-[50px] bg-[#068b79] rounded-[20px] text-[20px] font-bold text-white my-[20px] cursor-pointer"
          >
            Register
          </button>

        </div>
      </div>
    </div>
  );
}





