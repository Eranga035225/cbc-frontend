import { useState } from "react";
import { toast } from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";



export default function EditProductPage() {
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState([location.state.altNames.join(",")]);
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [labeledPrice, setLabeledPrice] = useState(location.state.labeledPrice);
  const [price, setPrice] = useState(location.state.price);
  const [stock, setStock] = useState(location.state.stock);

  const navigate = useNavigate();

  async function updateProduct(){
    const token = localStorage.getItem("token");
    if(!token){
      toast.error("Please Log in first");
      return;
    }

    let imageUrls = location.state.images;

    const promisesArray = []

    for (let i=0; i<images.length; i++){
      promisesArray[i] = mediaUpload(images[i]);
    }

    try{
      if(images.length > 0){
         imageUrls = await Promise.all(promisesArray)

      }
      
       console.log("Uploaded image URLs:", imageUrls);

      //  const altNamesArray = altNames.Split(",")

       const product = {
        productId : productId,
        name : name,
        altNames : altNames,
        description : description,
        images : imageUrls,
        labeledPrice : labeledPrice,
        price : price,
        stock : stock
       }

       axios.put(import.meta.env.VITE_BACKEND_URI + "/api/products/"+productId, product, {
        headers : {
          Authorization : "Bearer " + token
        }
        
       }).then((response)=>{
        console.log("Product updated successfully:", response.data);
        toast.success("Product updated successfully");
        navigate("/admin/products");

       }).catch((err)=>{
        console.error("Error updating product:", err);
        toast.error("Error updating product");
       })


       

    }catch(e){
      console.log(e)

    }

  

  }

  return (
    <div className="w-full h-full flex justify-center items-center bg-amber-300">
      
      {/* Card */}
      <div className="w-full max-w-[600px] bg-white rounded-xl shadow-xl p-8">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Update Product
        </h2>

        {/* Product ID */}
        <input
          type="text"
          disabled
          placeholder="Product ID"
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
        />

        {/* Name */}
        <input
          type="text"
          placeholder="Product Name"
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Alt Names */}
        <input
          type="text"
          placeholder="Alt Names (comma separated)"
          value={altNames}
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setAltNames(e.target.value.split(","))}
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          rows={4}
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

       <input
          type="file"
          multiple
          className="w-full mb-3 p-3 border rounded-lg"
          onChange={(e) => setImages([...e.target.files])}
        />


        {/* Prices */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <input
            type="number"
            placeholder="Labeled Price"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={labeledPrice}
            onChange={(e) => setLabeledPrice(Number(e.target.value))}
          />

          <input
            type="number"
            placeholder="Selling Price"
            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        {/* Stock */}
        <input
          type="number"
          placeholder="Stock Quantity"
          className="w-full mb-5 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
        />

        {/* Button */}
        <button
        onClick={updateProduct}
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
         Update  Product
        </button>

      </div>
    </div>
  );
}
