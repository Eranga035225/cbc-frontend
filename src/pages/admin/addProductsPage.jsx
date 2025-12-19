import { useState } from "react";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [labeledPrice, setLabeledPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  function addProduct(){
    if()

  }

  return (
    <div className="w-full h-full flex justify-center items-center bg-amber-300">
      
      {/* Card */}
      <div className="w-full max-w-[600px] bg-white rounded-xl shadow-xl p-8">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Add New Product
        </h2>

        {/* Product ID */}
        <input
          type="text"
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

        {/* Images */}
        <input
          type="file"
          multiple
          value={images}
          placeholder="Image URLs (comma separated)"
          className="w-full mb-3 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
          onChange={(e) => setImages(e.target.value.split(","))}
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
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition"
        >
          Add Product
        </button>

      </div>
    </div>
  );
}
