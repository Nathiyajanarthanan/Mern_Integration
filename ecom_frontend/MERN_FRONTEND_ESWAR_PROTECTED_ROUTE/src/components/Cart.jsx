import { Link } from "react-router-dom";

export default function Cart({ cart, setCart }) {
  const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link
            to="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600 mt-2">{cart.length} item(s) in your cart</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <div key={item._id} className="bg-white rounded-lg shadow-md p-6 border">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={item.image || `https://picsum.photos/150/150?random=${item._id}`}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-lg"
                    onError={(e) => {
                      if (!e.target.dataset.fallback) {
                        e.target.dataset.fallback = "true";
                        e.target.src = `https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=${encodeURIComponent(item.name.substring(0, 8))}`;
                      }
                    }}
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-4">
                  <div>
                    <Link 
                      to={`/product/${item._id}`}
                      className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 mt-1">
                      {item.description?.substring(0, 100)}...
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    {/* Price */}
                    <div>
                      <span className="text-2xl font-bold text-green-600">₹{item.price}</span>
                      <span className="text-sm text-green-600 ml-2">In Stock</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => removeItem(item._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Remove
                      </button>
                      <Link
                        to={`/buynow/${item._id}`}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                      >
                        Buy Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 border sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal ({cart.length} items)</span>
                <span className="font-medium">₹{getTotalPrice().toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">FREE</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">₹{Math.round(getTotalPrice() * 0.18).toLocaleString()}</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span className="text-green-600">₹{Math.round(getTotalPrice() * 1.18).toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
                Proceed to Checkout
              </button>
              
              <Link
                to="/"
                className="block w-full text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                Continue Shopping
              </Link>
            </div>

            {/* Benefits */}
            <div className="mt-6 space-y-3">
              <div className="flex items-center text-green-600 text-sm">
                <span className="mr-2">🚚</span>
                <span>Free shipping on all orders</span>
              </div>
              <div className="flex items-center text-blue-600 text-sm">
                <span className="mr-2">🔒</span>
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center text-purple-600 text-sm">
                <span className="mr-2">🔄</span>
                <span>Easy returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
