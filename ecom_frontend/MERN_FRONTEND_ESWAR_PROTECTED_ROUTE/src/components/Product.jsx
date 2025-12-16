import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { API } from '../utils/api';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/product`)
      .then(res => res.json())
      .then(allproduct => {
        const foundProduct = allproduct.find(p => p._id === id);
        setProduct(foundProduct);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-gray-300 h-96 rounded"></div>
            <div className="space-y-4">
              <div className="bg-gray-300 h-8 rounded w-3/4"></div>
              <div className="bg-gray-300 h-4 rounded w-1/2"></div>
              <div className="bg-gray-300 h-6 rounded w-1/4"></div>
              <div className="bg-gray-300 h-20 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">😞</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li>›</li>
          <li><Link to="/" className="hover:text-blue-600">Products</Link></li>
          <li>›</li>
          <li className="text-gray-900">{product.name}</li>
        </ol>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          <div className="aspect-square bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg overflow-hidden">
            <img
              src={product.image || `https://picsum.photos/500/500?random=${product._id}`}
              alt={product.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                if (!e.target.dataset.fallback) {
                  e.target.dataset.fallback = "true";
                  e.target.src = `https://via.placeholder.com/500x500/8B5CF6/FFFFFF?text=${encodeURIComponent(product.name.substring(0, 15))}`;
                }
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  ★★★★★
                </div>
                <span className="text-sm text-gray-600">(4.5 out of 5)</span>
              </div>
              <span className="text-sm text-green-600 font-medium">In Stock</span>
            </div>
          </div>

          {/* Price */}
          <div className="border-b pb-6">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-4xl font-bold text-green-600">₹{product.price}</span>
            </div>
            <p className="text-sm text-gray-600">Inclusive of all taxes</p>
            <p className="text-sm text-green-600 font-medium">FREE delivery available</p>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-3">About this product</h3>
            <p className="text-gray-700 leading-relaxed">
              {product.description || "High-quality product with excellent features and durability. Perfect for everyday use with modern design and functionality."}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Key Features</h3>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Premium quality materials
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                1 year warranty included
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Fast and secure delivery
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Easy returns and exchanges
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="border-t pt-6">
            <div className="space-y-4">
              <Link
                to={`/buynow/${product._id}`}
                className="block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg text-center transition-colors text-lg"
              >
                Buy Now
              </Link>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg">
                Add to Cart
              </button>

              <Link
                to="/"
                className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-4 px-6 rounded-lg text-center transition-colors text-lg"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Additional Info */}
            <div className="mt-6 space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
              <p className="flex items-center">
                <span className="mr-2">🚚</span>
                Free delivery on orders over ₹500
              </p>
              <p className="flex items-center">
                <span className="mr-2">🔄</span>
                Easy 30-day returns
              </p>
              <p className="flex items-center">
                <span className="mr-2">🛡️</span>
                2-year warranty
              </p>
              <p className="flex items-center">
                <span className="mr-2">💳</span>
                Secure payment options
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
