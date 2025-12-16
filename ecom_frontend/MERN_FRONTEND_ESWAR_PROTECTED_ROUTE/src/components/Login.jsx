import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Please enter your email");
      return;
    }
    localStorage.setItem("user", email);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-cyan-50 to-emerald-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-y-12"></div>
      
      <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <Link to="/" className="flex justify-center group">
          <div className="bg-gradient-to-r from-teal-600 to-cyan-600 p-4 rounded-2xl mb-4 group-hover:from-teal-700 group-hover:to-cyan-700 transition-all duration-300 transform group-hover:scale-110 shadow-xl">
            <span className="text-4xl">🛒</span>
          </div>
        </Link>
        <Link to="/" className="flex justify-center">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            ShopEasy
          </h1>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">
          Welcome Back! 👋
        </h2>
        <p className="mt-2 text-center text-lg text-gray-600">
          Sign in to continue your shopping journey
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-10 px-8 shadow-2xl sm:rounded-2xl border border-gray-100 backdrop-blur-sm bg-opacity-95">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                📧 Email address
              </label>
              <div className="relative">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-4 border border-gray-300 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-200 focus:border-teal-500 transition-all duration-300 text-lg"
                  placeholder="Enter your email address"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <span className="text-gray-400">✉️</span>
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-4 px-6 border border-transparent text-lg font-bold rounded-xl text-white bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 focus:outline-none focus:ring-4 focus:ring-teal-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="mr-2">🚀</span>
                Sign in to ShopEasy
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-semibold">⚡ Quick Login Options</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button 
                onClick={() => {setEmail("demo@shopeasy.com"); handleLogin({preventDefault: () => {}});}}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-gradient-to-r from-teal-50 to-cyan-50 text-sm font-semibold text-teal-700 hover:from-teal-100 hover:to-cyan-100 transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">👤</span>
                Demo User
              </button>

              <button 
                onClick={() => {setEmail("admin@shopeasy.com"); handleLogin({preventDefault: () => {}});}}
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-gradient-to-r from-emerald-50 to-green-50 text-sm font-semibold text-emerald-700 hover:from-emerald-100 hover:to-green-100 transition-all duration-300 transform hover:scale-105"
              >
                <span className="mr-2">👑</span>
                Admin
              </button>
            </div>
          </div>

          {/* Demo Info */}
          <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
            <div className="flex items-center mb-3">
              <span className="text-2xl mr-3">ℹ️</span>
              <h3 className="text-lg font-bold text-blue-900">Demo Application</h3>
            </div>
            <p className="text-sm text-blue-800 leading-relaxed">
              This is a demo e-commerce application. You can use any email to sign in or use the quick login buttons above for instant access!
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="inline-flex items-center text-teal-600 hover:text-teal-500 font-semibold transition-all duration-300 group"
          >
            <span className="mr-2 group-hover:mr-3 transition-all duration-300">←</span>
            Back to shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
