import { useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = (e: FormEvent) => {
  e.preventDefault();

  // Simpan status login (dummy token)
  localStorage.setItem('isLoggedIn', 'true');

  // Arahkan ke dashboard
  navigate('/dashboardAdmin');
};

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-100 to-blue-100 font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <a href="#" className="inline-block">
            <img
              src="https://upload.wikimedia.org/wikipedia/id/thumb/c/c4/Telkom_Indonesia_2013.svg/1200px-Telkom_Indonesia_2013.svg.png"
              alt="Telkom Indonesia"
              className="h-12 transition-transform hover:scale-105"
            />
          </a>
        </div>
      </nav>

      {/* Login Container */}
      <div className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-1">Login</h2>
          <p className="text-sm text-center text-gray-600 mb-6">Masuk ke akun Anda</p>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-50"
                placeholder="Masukkan email Anda"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 bg-gray-50"
                placeholder="Masukkan password Anda"
                required
              />
            </div>
            
            {/* <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-sm text-gray-700">
                <input type="checkbox" className="mr-2 text-red-600 focus:ring-red-500" />
                Ingat saya
              </label>
              <a href="#" className="text-sm text-red-600 hover:underline">
                Lupa password?
              </a>
            </div> */}

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-md transition-transform hover:-translate-y-0.5 shadow-md"
            >
              Login
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">atau</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="text-center">
            <p className="text-balance text-gray-900 mb-1">Silahkan menghubungi admin jika ingin membuat akun</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
