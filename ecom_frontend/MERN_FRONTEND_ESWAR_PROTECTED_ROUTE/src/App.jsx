import { Link, Route, Routes } from "react-router-dom";
import Products from "./components/Products";
import Product from "./components/Product";
import { useEffect, useState } from "react";
import Cart from "./components/Cart";
import BuyNow from "./components/BuyNow";
import Login from "./components/Login";
import ProtectedRoute from "./pages/ProtectedRoute";
import AddProduct from "./components/AddProduct";

function App() {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    // Load cart from localStorage on app start
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md shadow-2xl sticky top-0 z-50 border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center group">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 rounded-xl mr-3 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 shadow-lg">
                <span className="text-2xl">🛒</span>
              </div>
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300">
                Glitch
              </h1>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="relative text-gray-300 hover:text-purple-300 font-semibold transition-all duration-300 group">
                <span>🏠 Products</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
              <Link to="/addproduct" className="relative text-gray-300 hover:text-purple-300 font-semibold transition-all duration-300 group">
                <span>💼 Sell Product</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center space-x-6">
              {/* Cart */}
              <Link to="/cart" className="relative group">
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm p-3 rounded-xl group-hover:from-purple-500/30 group-hover:to-pink-500/30 transition-all duration-300 border border-purple-400/30">
                  <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9" />
                  </svg>
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center font-bold animate-pulse shadow-lg">
                      {cart.length}
                    </span>
                  )}
                </div>
              </Link>

              {/* User Menu */}
              {localStorage.getItem("user") ? (
                <div className="flex items-center space-x-3">
                  <div className="bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-emerald-400/30">
                    <span className="text-sm font-semibold text-emerald-300">
                      👋 Hello, {localStorage.getItem("user").split('@')[0]}
                    </span>
                  </div>
                  <button 
                    onClick={logout}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    🚪 Logout
                  </button>
                </div>
              ) : (
                <Link 
                  to="/login"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  🔐 Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<Products cart={cart} setCart={setCart}/>}/>
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart cart={cart} setCart={setCart}/>
            </ProtectedRoute>
          } />
          <Route path="/addproduct" element={<AddProduct/>}/>
          <Route path="/buynow/:id" element={
            <ProtectedRoute>
              <BuyNow />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-teal-900 to-cyan-900 text-white py-16 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-5 transform -skew-y-6"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center mb-6">
                <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-3 rounded-xl mr-4">
                  <span className="text-3xl">🛒</span>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-amber-300 to-orange-300 bg-clip-text text-transparent">
                  ShopEasy
                </h3>
              </div>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                Your ultimate destination for amazing products at unbeatable prices. 
                Shop with confidence and enjoy a seamless shopping experience.
              </p>
              <div className="flex space-x-4">
                <button className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-110">
                  📘
                </button>
                <button className="bg-gradient-to-r from-pink-500 to-red-500 p-3 rounded-xl hover:from-pink-600 hover:to-red-600 transition-all duration-300 transform hover:scale-110">
                  📷
                </button>
                <button className="bg-gradient-to-r from-blue-400 to-blue-500 p-3 rounded-xl hover:from-blue-500 hover:to-blue-600 transition-all duration-300 transform hover:scale-110">
                  🐦
                </button>
                <button className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-110">
                  💼
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-yellow-300">🔗 Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all duration-300">🏠</span>
                    Products
                  </Link>
                </li>
                <li>
                  <Link to="/addproduct" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all duration-300">💼</span>
                    Start Selling
                  </Link>
                </li>
                <li>
                  <Link to="/cart" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all duration-300">🛒</span>
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="text-gray-300 hover:text-white transition-all duration-300 flex items-center group">
                    <span className="mr-2 group-hover:mr-3 transition-all duration-300">🔐</span>
                    Account
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-6 text-green-300">📞 Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center text-gray-300">
                  <span className="mr-3 text-xl">📧</span>
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm">support@shopeasy.com</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="mr-3 text-xl">📱</span>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p className="text-sm">+1 (999) 456-7890</p>
                  </div>
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="mr-3 text-xl">📍</span>
                  <div>
                    <p className="font-semibold">Address</p>
                    <p className="text-sm">123 Shopping St, City</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Newsletter */}
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 mb-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-4">📬 Stay Updated!</h3>
              <p className="text-gray-200 mb-6">Get the latest deals and offers delivered to your inbox</p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-amber-300"
                />
                <button className="bg-gradient-to-r from-amber-400 to-orange-500 text-gray-900 px-6 py-3 rounded-xl font-bold hover:from-amber-300 hover:to-orange-400 transition-all duration-300 transform hover:scale-105">
                  Subscribe 🚀
                </button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-lg">
              &copy; 2025 <span className="font-bold text-white">Glitch</span>. Made with ❤️ for amazing shopping experience.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
