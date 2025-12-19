import { useState } from "react";
import { createClient } from '@supabase/supabase-js';

export default function TestPage(){
  const [image, setImage] = useState(null);
  const url = 'https://omfainenyhrufrqtiyap.supabase.co';
  const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZmFpbmVueWhydWZycXRpeWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTI0MTIsImV4cCI6MjA4MTcyODQxMn0.QW_GztE8ZXQKxN_5WMunZ41dPW16LrnQ-UnaLF_1b6Q';
 

  const supabase = createClient(url, key);

  function fileUpload(){
    supabase.storage.from('images').upload(image.name, image, {
      upsert: false,
      cacheControl: '3600',
    })

    



  }


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
        onClick={fileUpload}
      </button>


    </div>
   
  ) ;






}