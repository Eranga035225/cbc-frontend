import { useState } from "react";
import { toast } from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [labeledPrice, setLabeledPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);

  const navigate = useNavigate();

  async function addProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first");
      return;
    }

    if (images.length === 0) {
      toast.error("Please add at least one image");
      return;
    }

    try {
      const imageUrls = await Promise.all(
        images.map((img) => mediaUpload(img))
      );

      const product = {
        productId,
        name,
        altNames: altNames.split(",").map((n) => n.trim()),
        description,
        images: imageUrls,
        labeledPrice,
        price,
        stock,
      };

      await axios.post(
        import.meta.env.VITE_BACKEND_URI + "/api/products",
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product added successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Error adding product");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12 px-4">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border p-8 space-y-8">

        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Add New Product
          </h2>
          <p className="text-sm text-gray-400">
            Create a new product for your store
          </p>
        </div>

        {/* PRODUCT DETAILS */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">
            Product Details
          </h3>

          <input
            type="text"
            placeholder="Product ID"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border
            focus:ring-2 focus:ring-primary/30 outline-none"
          />

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border
            focus:ring-2 focus:ring-primary/30 outline-none"
          />

          <input
            type="text"
            placeholder="Alt names (comma separated)"
            value={altNames}
            onChange={(e) => setAltNames(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border
            focus:ring-2 focus:ring-primary/30 outline-none"
          />

          <textarea
            rows={4}
            placeholder="Product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border resize-none
            focus:ring-2 focus:ring-primary/30 outline-none"
          />
        </div>

        {/* MEDIA */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">
            Product Images
          </h3>

          <input
            type="file"
            multiple
            onChange={(e) => setImages([...e.target.files])}
            className="w-full px-4 py-3 rounded-xl border bg-gray-50"
          />

          <p className="text-xs text-gray-400">
            Upload one or more product images
          </p>
        </div>

        {/* PRICING */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">
            Pricing & Stock
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              placeholder="Labelled Price"
              value={labeledPrice}
              onChange={(e) => setLabeledPrice(Number(e.target.value))}
              className="px-4 py-3 rounded-xl border
              focus:ring-2 focus:ring-primary/30 outline-none"
            />

            <input
              type="number"
              placeholder="Selling Price"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="px-4 py-3 rounded-xl border
              focus:ring-2 focus:ring-primary/30 outline-none"
            />
          </div>

          <input
            type="number"
            placeholder="Stock Quantity"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full px-4 py-3 rounded-xl border
            focus:ring-2 focus:ring-primary/30 outline-none"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            onClick={() => navigate("/admin/products")}
            className="px-6 py-3 rounded-xl border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={addProduct}
            className="px-8 py-3 rounded-xl bg-primary
            text-white font-semibold shadow-lg
            hover:bg-accent transition"
          >
            Add Product
          </button>
        </div>

      </div>
    </div>
  );
}
