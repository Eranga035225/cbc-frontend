import { useState } from "react";
export default function TestPage(){
  const [image, setImage] = useState(null);

  



  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <input type="file" className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      onChange = {(e) => {
        setImage(e.target.files[0]);


      }
    }
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
        Upload File
      </button>


    </div>
   
  ) ;






}