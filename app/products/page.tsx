"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, Plus, Home, ChevronRight, Pencil } from "lucide-react";
import { toast } from "sonner";

interface IProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  description: string;
  images: string[];
  colors: string[];
  sizes: string[];
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [colorsInput, setColorsInput] = useState("");
  const [sizesInput, setSizesInput] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  // Form States (Ab imageFiles ek array hai)
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("T-shirts");
  const [stock, setStock] = useState("");
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://e-cormarce-8qgn.vercel.app/api/products");
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Upload Multiple Images to Cloudinary
  const uploadMultipleImagesToCloudinary = async (files: File[]) => {
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "smit-admin-panal");

      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/foxdskua/image/upload",
        formData,
      );
      return res.data.secure_url;
    });

    return await Promise.all(uploadPromises);
  };

  // Add Product Handler
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const colorsArray = colorsInput
      .split(",")
      .map((c) => c.trim())
      .filter((c) => c);
    const sizesArray = sizesInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s);
    if (imageFiles.length === 0) {
      toast.warning("Please select at least one image!");
      return;
    }

    try {
      setUploading(true);

      // 1. Upload multiple images to Cloudinary
      const imageUrls = await uploadMultipleImagesToCloudinary(imageFiles);

      // 2. Send to Backend MongoDB
      await axios.post("https://e-cormarce-8qgn.vercel.app/api/products", {
        name,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        description,
        category,
        stock: Number(stock),
        images: imageUrls,
        colors: colorsArray,
        sizes: sizesArray,
      });

      toast.success("Product with multiple images added successfully!");
      setIsModalOpen(false);
      fetchProducts();

      // Reset form
      setName("");
      setPrice("");
      setDescription("");
      setStock("");
      setImageFiles([]);
      setColorsInput("");
      setSizesInput("");
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("Failed to add product.");
    } finally {
      setUploading(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`https://e-cormarce-8qgn.vercel.app/api/products/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  // Edit Button Click Handler
  const handleEditClick = (product: IProduct) => {
    setEditingProduct(product);
    setName(product.name);
    setPrice(product.price.toString());
    setDescription(product.description || "");
    setCategory(product.category);
    setStock(product.stock.toString());
    setColorsInput(product.colors ? product.colors.join(', ') : ""); 
  setSizesInput(product.sizes ? product.sizes.join(', ') : "");
    setImageFiles([]); // Reset file input on edit
    setIsEditModalOpen(true);
  };

  // Update Product Submit Handler
const handleUpdateProduct = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!editingProduct) return;

  // Colors aur Sizes ko array mein convert karein
  const colorsArray = colorsInput ? colorsInput.split(',').map(c => c.trim()).filter(c => c) : [];
  const sizesArray = sizesInput ? sizesInput.split(',').map(s => s.trim()).filter(s => s) : [];

  try {
    setUploading(true);
    let imageUrls = editingProduct.images;

    // Agar user ne nayi images select ki hain toh upload karein
    if (imageFiles.length > 0) {
      imageUrls = await uploadMultipleImagesToCloudinary(imageFiles);
    }

    // Backend par PUT request bhejein (originalPrice ke sath)
    await axios.put(
      `https://e-cormarce-8qgn.vercel.app/api/products/${editingProduct._id}`,
      {
        name,
        price: Number(price),
        originalPrice: originalPrice ? Number(originalPrice) : undefined,
        description,
        category,
        stock: Number(stock),
        images: imageUrls,
        colors: colorsArray, 
        sizes: sizesArray,   
      }
    );

    toast.success("Product updated successfully!");
    setIsEditModalOpen(false);
    setEditingProduct(null);
    fetchProducts();

    // Form reset
    setName("");
    setPrice("");
    setOriginalPrice(""); // 👈 Reset original price
    setDescription("");
    setStock("");
    setImageFiles([]);
    setColorsInput("");
    setSizesInput("");
  } catch (err) {
    console.error("Error updating product:", err);
    toast.error("Failed to update product.");
  } finally {
    setUploading(false);
  }
};

  if (loading)
    return (
      <div className="text-center py-20 text-gray-400 bg-[#0f172a] min-h-screen">
        Loading products...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0f172a] text-gray-200 p-6 sm:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8 bg-[#1e293b] p-4 rounded-xl border border-gray-800">
        <h1 className="text-xl font-bold text-white">Product Management</h1>
        <button
          onClick={() => {
            setName("");
            setPrice("");
            setDescription("");
            setStock("");
            setImageFiles([]);
            setIsModalOpen(true);
          }}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 cursor-pointer transition"
        >
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-[#1e293b] border border-gray-800 rounded-2xl shadow-xl overflow-hidden p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 text-xs uppercase text-gray-400">
                <th className="py-4 px-4">Image</th>
                <th className="py-4 px-4">Name</th>
                <th className="py-4 px-4">Category</th>
                <th className="py-4 px-4">Price</th>
                <th className="py-4 px-4">Stock</th>
                <th className="py-4 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm">
              {products.map((product) => (
                <tr
                  key={product._id}
                  className="hover:bg-gray-800/40 transition"
                >
                  <td className="py-4 px-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                  </td>
                  <td className="py-4 px-4 font-semibold text-white">
                    {product.name}
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {product.category}
                  </td>
                  <td className="py-4 px-4 text-gray-300">${product.price}</td>
                  <td className="py-4 px-4 text-gray-300">{product.stock}</td>
                  <td className="py-4 px-4 text-right space-x-3">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-indigo-400 hover:text-indigo-300 transition cursor-pointer"
                      title="Edit Product"
                    >
                      <Pencil className="w-4 h-4 inline" />
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      className="text-red-400 hover:text-red-300 transition cursor-pointer"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-[#1e293b] border border-gray-800 rounded-2xl p-6 w-full max-w-lg text-gray-200">
            <h2 className="text-xl font-bold mb-4 text-white">
              Add New Product
            </h2>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm"
                />
              </div>

           <div className="grid grid-cols-3 gap-3">
  <div>
    <label className="block text-xs font-medium text-gray-400 mb-1">
      Price ($)
    </label>
    <input
      type="number"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      required
      className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm"
    />
  </div>
  <div>
    <label className="block text-xs font-medium text-gray-400 mb-1">
      Old Price ($)
    </label>
    <input
      type="number"
      value={originalPrice}
      onChange={(e) => setOriginalPrice(e.target.value)}
      placeholder="e.g. 150"
      className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm"
    />
  </div>
  <div>
    <label className="block text-xs font-medium text-gray-400 mb-1">
      Stock
    </label>
    <input
      type="number"
      value={stock}
      onChange={(e) => setStock(e.target.value)}
      required
      className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm"
    />
  </div>
</div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Colors (comma separated)
                  </label>
                  <input
                    type="text"
                    value={colorsInput}
                    onChange={(e) => setColorsInput(e.target.value)}
                    placeholder="Black, Deep Olive"
                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">
                    Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={sizesInput}
                    onChange={(e) => setSizesInput(e.target.value)}
                    placeholder="Small, Medium, Large"
                    className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm"
                >
                  <option value="T-shirts">T-shirts</option>
                  <option value="Shorts">Shorts</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Hoodie">Hoodie</option>
                  <option value="Jeans">Jeans</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm h-20"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">
                  Product Images (Multiple)
                </label>
                <input
                  type="file"
                  multiple
                  onChange={(e) =>
                    setImageFiles(
                      e.target.files ? Array.from(e.target.files) : [],
                    )
                  }
                  required
                  className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer"
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-gray-700 text-sm font-medium hover:bg-gray-600 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-sm font-medium hover:bg-indigo-700 cursor-pointer"
                >
                  {uploading ? "Uploading..." : "Save Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {/* Edit Product Modal */}
{isEditModalOpen && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
    <div className="bg-[#1e293b] border border-gray-800 rounded-2xl p-6 w-full max-w-lg text-gray-200">
      <h2 className="text-xl font-bold mb-4 text-white">Edit Product</h2>
      
      <form onSubmit={handleUpdateProduct} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Product Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} required className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm" />
        </div>

        {/* 3 Columns Grid for Price, Old Price, Stock */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Price ($)</label>
            <input type="number" value={price} onChange={e => setPrice(e.target.value)} required className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Old Price ($)</label>
            <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} placeholder="e.g. 150" className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Stock</label>
            <input type="number" value={stock} onChange={e => setStock(e.target.value)} required className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm" />
          </div>
        </div>

        {/* Colors & Sizes */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Colors (comma separated)</label>
            <input type="text" value={colorsInput} onChange={e => setColorsInput(e.target.value)} placeholder="Black, Deep Olive" className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm" />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-400 mb-1">Sizes (comma separated)</label>
            <input type="text" value={sizesInput} onChange={e => setSizesInput(e.target.value)} placeholder="Small, Medium, Large" className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Category</label>
          <select value={category} onChange={e => setCategory(e.target.value)} className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm">
            <option value="T-shirts">T-shirts</option>
            <option value="Shorts">Shorts</option>
            <option value="Shirts">Shirts</option>
            <option value="Hoodie">Hoodie</option>
            <option value="Jeans">Jeans</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required className="w-full bg-[#0f172a] border border-gray-700 rounded-lg p-2.5 text-sm h-20"></textarea>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-400 mb-1">New Images (Optional - Multiple)</label>
          <input type="file" multiple onChange={e => setImageFiles(e.target.files ? Array.from(e.target.files) : [])} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 cursor-pointer" />
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button type="button" onClick={() => setIsEditModalOpen(false)} className="px-4 py-2 rounded-lg bg-gray-700 text-sm font-medium hover:bg-gray-600 cursor-pointer">Cancel</button>
          <button type="submit" disabled={uploading} className="px-4 py-2 rounded-lg bg-indigo-600 text-sm font-medium hover:bg-indigo-700 cursor-pointer">
            {uploading ? 'Updating...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
    </div>
  );
}
