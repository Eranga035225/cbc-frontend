export default function AddProductPage(){
  //import mongoose from "mongoose";


//   {
//     productId :{
//       type : String,
//       required : true,
//       unique : true,
//     },
//     name : {
//       type: String,
//       required : true
     
//     },
//     altNames : [
//       { type : String  }
//     ],
//     description : {
//       type : String,
//       required : true
//     },
//     images : [
//       {type : String }
//     ],
//     labeledPrice : {
//       type : Number,
//       required : true
//     },
//     price : {
//       type : Number,
//       required : true
//     },
//     stock : {
//       type : Number,
//       required : true
//     },
//     isAvailable : {
//       type : Boolean,
//       required : true,
//       default : true
//     }
//   }
  
// )
  return (
  <div className="w-full h-full flex flex-col justify-center items-center">
    const [productId, setProductId] = useState("");
    const [name, setName] = useState("");
    const [altNames, setAltNames] = useState([]);
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [labeledPrice, setLabeledPrice] = useState(0);
    const [price, setPrice] = useState(0);
    const [stock, setStock] = useState(0);
    const [isAvailable, setIsAvailable] = useState(true);



  </div>

  )
}