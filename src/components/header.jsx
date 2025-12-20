
import { Link, useNavigate } from "react-router-dom";

export default function Header(){  //structure
  const navigate = useNavigate();

  return(
    <div className="w-full h-[80px] shadow-2xl flex">
        <img
        onClick= {() => navigate("/")}
        src="/logo.jpg" alt="Logo" className="w-[70px] h-[70px]  m-2 object-cover cursor-pointer"/>
        <div className="w-[calc(100%-70px)] h-full bg-gray-100">
          </div>
    </div>
  )


}