import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API } from "../utils/api";

export default function Products({ setCart, cart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/api/product`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
    // Show success notification
    alert("Added to cart!");
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) {
      return;
    }
    const res = await fetch(`${API}/api/deleteProduct/${id}`, {
      method: "DELETE",
    });
    if (res.status === 204) {
      alert("Product deleted successfully");
      setProducts(products.filter(p => p._id !== id));
    } else {
      alert("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
              <div className="bg-gray-300 h-48 rounded mb-4"></div>
              <div className="bg-gray-300 h-4 rounded mb-2"></div>
              <div className="bg-gray-300 h-4 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 rounded-2xl p-12 mb-12 text-white text-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-20 transform -skew-y-6"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-purple-500 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-pink-500 rounded-full opacity-20 animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-blue-500 rounded-full opacity-15 animate-pulse"></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="text-6xl mb-6 animate-bounce-gentle">🛍️</div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient text-center">
            Welcome to ShopEasy
          </h1>
          <p className="text-lg md:text-xl mb-8 text-purple-100 max-w-3xl mx-auto leading-relaxed text-center">
            Discover amazing products at unbeatable prices. Your one-stop destination for everything you need!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/addproduct" 
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold hover:from-purple-400 hover:to-pink-400 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 text-center"
            >
              🚀 Start Selling Today
            </Link>
            <button className="bg-white bg-opacity-10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-semibold hover:bg-opacity-20 transition-all duration-300 border border-purple-300 border-opacity-30 hover:border-opacity-50 text-center">
              📱 Download App
            </button>
          </div>
        </div>
      </div>

      {/* Products Header */}
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">All Products</h2>
        <div className="text-gray-600">
          {products.length} product{products.length !== 1 ? 's' : ''} found
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">No products yet</h3>
          <p className="text-gray-600 mb-6">Be the first to add a product to the store!</p>
          <Link
            to="/addproduct"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Add First Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {products.map(product => (
            <div key={product._id} className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 border border-gray-100">
              {/* Product Image */}
              <div className="relative aspect-square bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden">
                <img 
                  src={product.image || `https://picsum.photos/400/400?random=${product._id}`} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    // First fallback: Try a different random image
                    if (!e.target.dataset.fallback1) {
                      e.target.dataset.fallback1 = "true";
                      e.target.src = `https://via.placeholder.com/400x400/8B5CF6/FFFFFF?text=${encodeURIComponent(product.name.substring(0, 10))}`;
                      return;
                    }
                    // Second fallback: Show placeholder with product name
                    if (!e.target.dataset.fallback2) {
                      e.target.dataset.fallback2 = "true";
                      e.target.style.display = 'none';
                      const placeholder = e.target.parentElement.querySelector('.image-placeholder');
                      if (placeholder) placeholder.style.display = 'flex';
                    }
                  }}
                />
                <div className="image-placeholder w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-pink-100 hidden">
                  <div className="text-center">
                    <div className="text-6xl mb-2">🛍️</div>
                    <p className="text-purple-600 font-semibold text-sm px-2">{product.name}</p>
                  </div>
                </div>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
                
                {/* Quick Actions */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 space-y-2">
                  <button className="bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200">
                    ❤️
                  </button>
                  <button className="bg-white bg-opacity-90 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-opacity-100 transition-all duration-200">
                    👁️
                  </button>
                </div>

                {/* Sale Badge */}
                <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  🔥 HOT
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <Link to={`/product/${product._id}`}>
                  <h3 className="font-bold text-lg text-gray-900 mb-2 hover:text-teal-600 transition-colors line-clamp-2 group-hover:text-teal-600">
                    {product.name}
                  </h3>
                </Link>
                
                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex text-amber-400 text-sm">
                    ⭐⭐⭐⭐⭐
                  </div>
                  <span className="text-xs text-gray-500 ml-2">(4.8)</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                      ₹{product.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">₹{Math.round(product.price * 1.3)}</span>
                    <span className="bg-teal-100 text-teal-800 text-xs px-2 py-1 rounded-full font-semibold">
                      23% OFF
                    </span>
                  </div>
                  <p className="text-xs text-teal-600 font-medium mt-1">🚚 Free delivery</p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    🛒 Add to Cart
                  </button>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to={`/product/${product._id}`}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-xl text-center font-medium transition-all duration-300 hover:shadow-md"
                    >
                      👀 View
                    </Link>
                    <Link
                      to={`/buynow/${product._id}`}
                      className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-2 px-4 rounded-xl text-center font-medium transition-all duration-300 hover:shadow-md"
                    >
                      ⚡ Buy Now
                    </Link>
                  </div>

                  {localStorage.getItem("user") && (
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 px-4 rounded-xl font-medium transition-all duration-300 hover:shadow-md"
                    >
                      🗑️ Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
