import { useState } from "react";
import { toast } from "react-hot-toast";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

export default function EditProductPage() {
  const location = useLocation();

  const [productId] = useState(location.state.productId);
  const [name, setName] = useState(location.state.name);
  const [altNames, setAltNames] = useState(location.state.altNames.join(", "));
  const [description, setDescription] = useState(location.state.description);
  const [images, setImages] = useState([]);
  const [labeledPrice, setLabeledPrice] = useState(location.state.labeledPrice);
  const [price, setPrice] = useState(location.state.price);
  const [stock, setStock] = useState(location.state.stock);

  const navigate = useNavigate();

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please log in first");
      return;
    }

    let imageUrls = location.state.images;
    const uploadPromises = images.map((img) => mediaUpload(img));

    try {
      if (images.length > 0) {
        imageUrls = await Promise.all(uploadPromises);
      }

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

      await axios.put(
        import.meta.env.VITE_BACKEND_URI + "/api/products/" + productId,
        product,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.error(err);
      toast.error("Error updating product");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-12 px-4">

      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl border p-8 space-y-8">

        {/* HEADER */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Edit Product
          </h2>
          <p className="text-sm text-gray-400">
            Update product information
          </p>
        </div>

        {/* BASIC INFO */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-gray-600 uppercase">
            Product Details
          </h3>

          <input
            type="text"
            disabled
            value={productId}
            className="w-full px-4 py-3 rounded-xl border bg-gray-100 text-gray-500"
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
            Upload new images to replace existing ones (optional)
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

        {/* ACTION */}
        <div className="flex justify-end gap-4 pt-4 border-t">
          <button
            onClick={() => navigate("/admin/products")}
            className="px-6 py-3 rounded-xl border text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={updateProduct}
            className="px-8 py-3 rounded-xl bg-primary
            text-white font-semibold shadow-lg
            hover:bg-accent transition"
          >
            Update Product
          </button>
        </div>

      </div>
    </div>
  );
}
