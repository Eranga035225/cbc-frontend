import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";


export default function TestPage(){
  const [image, setImage] = useState(null);


  function fileUpload(){
    mediaUpload(image).then(
      (res)=> {
        console.log("File uploaded successfully. Public URL:", res);
      }
    ).catch(
      (res)=>{
        console.error("File upload failed:", res);
      }
    )
   


  }


  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <input type="file" className="border border-gray-300 rounded-md px-4 py-2 mb-4"
      onChange = {(e) => {
        setImage(e.target.files[0]);


      }
    }
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"  onClick={fileUpload}>
        Upload File
       
      </button>


    </div>
   
  ) ;






}