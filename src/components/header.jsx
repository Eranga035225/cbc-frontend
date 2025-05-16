import UserData from "./userdata";
import { Link } from "react-router-dom";

export default function Header(){  //structure

  return(
    <div className="bg-yellow-500">
     <Link to="/">Home</Link>
     <Link to="/login">Login</Link>
      <Link to="/signup">Sign up</Link>
      <a href="https://www.google.com/">Google</a>
    </div>
  )


}