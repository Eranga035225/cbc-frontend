import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";


export default function LoginPage() {
  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  

  async function handleLogin(){
    console.log(email);
    console.log(password);
    try{
         const response = await axios.post(import.meta.env.VITE_BACKEND_URI+"/api/users/login",{
      email:email,
      password:password
    });
    // 
    toast.success("Login success");  //if error status code is returned that goes a an error
    console.log(response);
    localStorage.setItem("token", response.data.token);
    if(response.data.role == 'Admin'){
       window.location.href = "/admin"

    }else{
      window.location.href = "/"
    }
   


    }catch(e){
      // 
      toast.error(e.response.data.message);
      //  //if the status code coming from front end is like 401,400 except 200 things it comes near to catch side as an error
    }
 

  }

  return (
    <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex  justify-evenly items-center">
      <div className="w-[50%] h-full">

      </div>

      <div className="w-[50%] h-full flex justify-center items-center ">
        <div className="w-[400px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
          <input onChange={(e)=>{ 
            setEmail(e.target.value);
          }
          } className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[20px]" value={email}></input>

          <input onChange={(e)=>{
            setPassword(e.target.value);
          }
          }className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] mb-[20px]" type="password" value={password}></input>
          <button  onClick={handleLogin} className="w-[300px] h-[50px] bg-[#068b79] rounded-[20px] text-[20px] font-bold text-white my-[20px] cursor-pointer">Login</button>

        </div>


      </div>


      
    </div>
  );
}