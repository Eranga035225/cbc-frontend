import { useState } from "react";


export default function TestPage(){
  const[count,setCount]= useState(0);
  const[status, setStatus] = useState("Passed");

return(
  <div className="w-full h-screen  flex flex-col justify-center items-center">
    <div className="w-[450px] h-[250px] shadow flex justify-center items-center">
      <button className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer" 
      onClick={()=>{
       setCount(count-1);
      }}>
        -
      </button>
      <span className="text-[20px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex justify-center items-center">
        {count}
      </span>
      <button className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer" 
      onClick={()=>{
       setCount(count+1);
      }}>
        +
      </button>

    </div>
   <div className="w-[450px] h-[250px] shadow flex flex-col justify-center items-center">
    <span className="text-[40px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex justify-center items-center">
      {status}
    </span>
    <div>
      <button className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer m-[20px]" onClick={()=>{
        setStatus("Passed")
      }}>
        Passed
      </button>
      <button className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer m-[20px]" onClick={()=>{
        setStatus("Failed")
      }}>
        Failed
      </button>
    </div>
      
    </div>
  </div>


);




}