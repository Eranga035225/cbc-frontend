import UserData from "./userdata";

export default function Header(){  //structure

  return(
    <div className="bg-[#f9f9f9] ">
      <h1 className="font-bold text-2xl text-blue-500 text-[300px] ">Crystal Beauty</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vel, sed.</p>
      <UserData></UserData>
    </div>
  )


}