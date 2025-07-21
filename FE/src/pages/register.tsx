import React, { useState } from 'react';
import { User, Mail, Lock, MessageCircle, UserCheck, Eye, EyeOff, ArrowLeft, Users } from 'lucide-react';

interface FormData {
  email: string;
  password: string;
  telegramId: string;
  role: string;
}

interface FormErrors {
  [key: string]: string;
}

const roles = [
  { value: 'super_admin', label: 'Super Admin' },
  { value: 'admin', label: 'Admin' },
  { value: 'sales_assistant', label: 'Sales Assistant' },
  { value: 'account_representative', label: 'Account Representative' }
];

export default function Register() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    telegramId: '',
    role: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email wajib diisi';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password wajib diisi';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password minimal 8 karakter';
    }

    // Telegram ID validation
    if (!formData.telegramId) {
      newErrors.telegramId = 'ID Telegram wajib diisi';
    } else if (!/^@?[a-zA-Z0-9_]{5,32}$/.test(formData.telegramId)) {
      newErrors.telegramId = 'ID Telegram tidak valid (5-32 karakter, huruf, angka, underscore)';
    }

    // Role validation
    if (!formData.role) {
      newErrors.role = 'Role wajib dipilih';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    try {
      // API call to register endpoint
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        alert('Akun berhasil didaftarkan!');
        
        // Reset form
        setFormData({
          email: '',
          password: '',
          telegramId: '',
          role: ''
        });
        
        // Redirect back to dashboard
        window.location.href = '/dashboard';
      } else {
        const error = await response.json();
        alert(error.message || 'Terjadi kesalahan saat mendaftarkan akun');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Terjadi kesalahan saat mendaftarkan akun');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <img 
              src="https://upload.wikimedia.org/wikipedia/id/thumb/c/c4/Telkom_Indonesia_2013.svg/1200px-Telkom_Indonesia_2013.svg.png" 
              alt="Telkom Indonesia" 
              className="h-12 w-auto"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div>
            </div>
          </div>
        </div>

        <nav className="mt-6">
          <div className="px-3">
            <button
              onClick={handleBack}
              className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="mr-3 w-5 h-5" />
              Dashboard
            </button>
            
            <div className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md mt-2">
              <Users className="mr-3 w-5 h-5" />
              Register Akun
            </div>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Register Akun</h1>
                <p className="text-sm text-gray-600">Buat akun untuk user</p>
              </div>
            </div>
          </div>
        </header>

        {/* Form Content */}
        <main className="flex-1 p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="mb-6">
                <h2 className="text-lg font-medium text-gray-900 mb-2">Buat Akun Baru</h2>
                <p className="text-sm text-gray-600">Isi form di bawah untuk mendaftarkan akun baru</p>
              </div>

              <div className="space-y-6">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                        errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="name@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                        errors.password ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="Masukkan password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-600 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Telegram ID Field */}
                <div>
                  <label htmlFor="telegramId" className="block text-sm font-medium text-gray-700 mb-2">
                    ID Telegram <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      id="telegramId"
                      name="telegramId"
                      value={formData.telegramId}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors ${
                        errors.telegramId ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                      placeholder="ID Telegram"
                    />
                  </div>
                  {errors.telegramId && (
                    <p className="text-red-600 text-sm mt-1">{errors.telegramId}</p>
                  )}
                </div>

                {/* Role Field */}
                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                    Role <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <UserCheck className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <select
                      id="role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors appearance-none bg-white ${
                        errors.role ? 'border-red-500 bg-red-50' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Pilih Role</option>
                      {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                          {role.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.role && (
                    <p className="text-red-600 text-sm mt-1">{errors.role}</p>
                  )}
                </div>

                {/* Submit Buttons */}
                <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                  >
                    Batal
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className={`px-4 py-2 text-sm font-medium text-white rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
                      isLoading
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Mendaftarkan...
                      </div>
                    ) : (
                      'Daftar Akun'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}