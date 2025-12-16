import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { API } from "../utils/api";

export default function BuyNow() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);

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

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="bg-gray-300 h-8 rounded w-1/3 mb-4"></div>
          <div className="bg-gray-300 h-64 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-6xl mb-4">😞</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
        <p className="text-gray-600 mb-6">The product you're trying to buy doesn't exist.</p>
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <div className="text-8xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
        <p className="text-xl text-gray-600 mb-8">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        
        <div className="bg-white rounded-lg shadow-md p-6 border max-w-md mx-auto mb-8">
          <h3 className="font-semibold text-lg mb-4">Order Details</h3>
          <div className="text-left space-y-2">
            <p><span className="font-medium">Product:</span> {product.name}</p>
            <p><span className="font-medium">Price:</span> ₹{product.price}</p>
            <p><span className="font-medium">Order ID:</span> #ORD{Date.now()}</p>
            <p><span className="font-medium">Status:</span> <span className="text-green-600">Confirmed</span></p>
          </div>
        </div>

        <div className="space-x-4">
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            to="/cart"
            className="bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            View Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="mb-6">
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li>›</li>
          <li><Link to={`/product/${product._id}`} className="hover:text-blue-600">Product</Link></li>
          <li>›</li>
          <li className="text-gray-900">Buy Now</li>
        </ol>
      </nav>

      <div className="bg-white rounded-lg shadow-md p-8 border">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Complete Your Purchase</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Details */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Product Details</h2>
            <div className="border rounded-lg p-4">
              <div className="flex gap-4">
                <img
                  src={product.image || `https://picsum.photos/100/100?random=${product._id}`}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                  onError={(e) => {
                    if (!e.target.dataset.fallback) {
                      e.target.dataset.fallback = "true";
                      e.target.src = `https://via.placeholder.com/100x100/8B5CF6/FFFFFF?text=${encodeURIComponent(product.name.substring(0, 5))}`;
                    }
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    {product.description?.substring(0, 100)}...
                  </p>
                  <p className="text-2xl font-bold text-green-600">₹{product.price}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
            <div className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span>Product Price:</span>
                <span>₹{product.price}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="text-green-600">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (18%):</span>
                <span>₹{Math.round(product.price * 0.18)}</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-green-600">₹{Math.round(product.price * 1.18)}</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-6">
              <h3 className="font-semibold mb-3">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input type="radio" name="payment" defaultChecked className="mr-2" />
                  <span>Cash on Delivery</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="payment" className="mr-2" />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input type="radio" name="payment" className="mr-2" />
                  <span>UPI Payment</span>
                </label>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
            >
              Place Order
            </button>

            <div className="mt-4 text-center">
              <Link
                to={`/product/${product._id}`}
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                ← Back to Product
              </Link>
            </div>
          </div>
        </div>

        {/* Security Info */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-center space-x-6 text-sm text-gray-600">
            <div className="flex items-center">
              <span className="mr-2">🔒</span>
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🚚</span>
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">🔄</span>
              <span>Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
