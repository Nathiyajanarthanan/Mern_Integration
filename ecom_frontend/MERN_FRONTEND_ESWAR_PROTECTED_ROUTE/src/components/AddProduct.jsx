import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { API } from '../utils/api';

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || !description || !price) {
      alert("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API}/api/postProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          description,
          price: parseFloat(price),
          image
        })
      });
      
      if (res.ok) {
        alert("Product added successfully!");
        setName("");
        setDescription("");
        setPrice("");
        setImage("");
        navigate("/");
      } else {
        alert("Failed to add product. Please try again.");
      }
    } catch (error) {
      console.log(error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <nav className="mb-4">
          <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">
            ← Back to Products
          </Link>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900">Add New Product</h1>
        <p className="text-gray-600 mt-2">Fill in the details below to add a new product to your store</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Product Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Product Name *
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter product name"
                required
              />
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                Product Image URL
              </label>
              <input
                type="url"
                id="image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
              <p className="text-sm text-gray-500 mt-1">
                Optional: Add a URL to an image of your product
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Product Description *
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Describe your product in detail..."
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                {loading ? "Adding Product..." : "Add Product"}
              </button>
              <Link
                to="/"
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg text-center transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-lg shadow-md p-6 border">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Preview</h2>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            {/* Product Image Preview */}
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              {image ? (
                <img
                  src={image}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className={`text-gray-400 text-center ${image ? 'hidden' : 'flex'} flex-col items-center justify-center h-full`}>
                <div className="text-4xl mb-2">📷</div>
                <p>Product Image</p>
              </div>
            </div>

            {/* Product Info Preview */}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-900 mb-2">
                {name || "Product Name"}
              </h3>
              
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 mr-2">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-600">(0 reviews)</span>
              </div>

              <div className="mb-3">
                <span className="text-2xl font-bold text-green-600">
                  ₹{price || "0.00"}
                </span>
              </div>

              <p className="text-gray-700 text-sm mb-4">
                {description || "Product description will appear here..."}
              </p>

              <div className="space-y-2">
                <button className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg">
                  Add to Cart
                </button>
                <button className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-lg">
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-medium text-blue-900 mb-2">💡 Tips for better listings</h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use high-quality images (recommended: 500x500px or larger)</li>
              <li>• Write detailed, accurate descriptions</li>
              <li>• Set competitive pricing</li>
              <li>• Include key product features</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
