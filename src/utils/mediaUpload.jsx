import { createClient } from '@supabase/supabase-js';



const url = 'https://omfainenyhrufrqtiyap.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9tZmFpbmVueWhydWZycXRpeWFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYxNTI0MTIsImV4cCI6MjA4MTcyODQxMn0.QW_GztE8ZXQKxN_5WMunZ41dPW16LrnQ-UnaLF_1b6Q';
 

const supabase = createClient(url, key);


export default function mediaUpload(file){
  const mediaUploadPromise = new Promise(
      (resolve,reject)=> {
        if(file==null){
          reject("No file selected");
          return
        }
        const timestamp  = new Date().getTime()
        const newName = timestamp + file.name;

         supabase.storage.from('images').upload(newName, file, {
              upsert: false,
              cacheControl: '3600',
            }).then(()=>{
              const publicUrl = supabase.storage.from('images').getPublicUrl(newName).data.publicUrl;
              resolve(publicUrl);
            }).catch(
              (e)=>{
                reject("Error occured in supbase connection" + e)
              }
            )



      }


  );





  return mediaUploadPromise




}


