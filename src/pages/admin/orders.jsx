import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";  

export default function AdminOrderPage(){
  const [order, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(
    ()=> {

      if(isLoading){
        const token = localStorage.getItem("token")
        if(!token){
          toast.error("Please log in first");
          return;
        }

        axios.get(import.meta.env.VITE_BACKEND_URI + "/api/orders",
          {
            headers: {
              Authorization : "Bearer " + token
            }

          }
          
        ).then((res) => {
          
          setOrders(res.data);
          setIsLoading(false);
        }).catch((e)=> {
          toast.error(e.response.data.message);
          setIsLoading(false);
        } 
    

        )
      } 
    }, [isLoading]
  )
  return (

    <div>
      



    </div>




  )







}