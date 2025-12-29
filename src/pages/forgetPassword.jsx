import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgetPasswordPage(){

  const [otpSent, setOtpSent] = useState(false);
  const [email,setEmail] = useState('');
  const [otp,setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const[confrimPassword, setConfrimPassword] = useState('');
  function sendOtp(){

    axios.post(import.meta.env.VITE_BACKEND_URI + '/api/users/send-otp',{
      email: email
      
    }).then((res) => {
      console.log(res.data);
      setOtpSent(true);
      toast.success('OTP sent successfully');
    }).catch((err) => {
      console.log(err);
    })

  }

  return (

    <div className="w-full h-screen flex justify-center items-center bg-[url('/login2.jpg')] bg-cover bg-center'">

      otpSent? 
      <div className="w-[400px] h-[400px] bg-white rounded-2xl">


      </div>
      : 
      <div className="w-full h-full flex justify-center items-center bg-[url('/login2.jpg')] bg-cover bg-center'">  
          <input type="email" placeholder="Enter your email" className=""></input>
          <button onClick={() => setOtpSent(true)}>Send OTP</button>
      
      
      </div>




    </div>



  )

}