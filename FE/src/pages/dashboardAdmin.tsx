import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Search, Filter, Download, BarChart3, Users, Eye, LogOut, ChevronDown, Home } from 'lucide-react';

const DashboardAdmin = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const itemsPerPage = 10;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => 
      document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle logout
  const handleLogout = () => {
    // Clear any stored authentication data (localStorage, sessionStorage, etc.)
    // In a real app, you might clear tokens, user data, etc.
        
    // For demonstration, we'll just redirect to login page
    // In a real React Router setup, you'd use navigate('/login') or similar
    window.location.href = '/login';
  };

  // DATA DUMMY - nanti akan diambil dari MongoDB
  const sampleData = [
    {
      id: 1,
      tanggal: '2024-01-15',
      kategori: 'Visit Baru',
      namaSales: 'John Doe',
      telda: 'Ketintang',
      sto: 'WRU',
      jenisKegiatan: 'Door to door',
      namaPOI: 'Toko ABC',
      alamat: 'Jl. Sudirman No. 123',
      ekosistem: 'Ruko',
      visitKe: 1,
      namaPIC: 'Jane Smith',
      jabatanPIC: 'Manager',
      noHP: '081234567890',
      provider: 'Telkom',
      detailProvider: 'Indihome',
      abonemen: 'Rp 12.000.000',
      feedback: 'Bertemu dengan PIC/Owner/Manajemen',
      detailFeedback: 'Tidak Tertarik Berlangganan Indibiz',
      detailInformasi: 'Sudah puas dengan indihome',
      eviden: 'foto_survey.jpg'
    },
    {
      id: 2,
      tanggal: '2024-01-16',
      kategori: 'Follow Up',
      namaSales: 'Dzawin',
      telda: 'Gresik',
      sto: 'SDY',
      jenisKegiatan: 'Door to door',
      namaPOI: 'RS ABCDE',
      alamat: 'Jl. Asia Afrika No. 456',
      ekosistem: 'Health',
      visitKe: 2,
      namaPIC: 'Bob Wilson',
      jabatanPIC: 'Owner',
      noHP: '081987654321',
      provider: 'Kompetitor',
      detailProvider: 'BizNet',
      abonemen: 'Rp 20.000.000',
      feedback: 'Bertemu dengan PIC/Owner/Manajemen',
      detailFeedback: 'Tidak Tertarik Berlangganan Indibiz',
      detailInformasi: 'BizNet lebih kencang',
      eviden: 'foto_followup12.jpg'
    },
    {
      id: 3,
      tanggal: '2025-02-16',
      namaSales: 'Udin',
      kategori: 'Follow Up',
      telda: 'Ketintang',
      sto: 'WRU',
      jenisKegiatan: 'Door to door',
      namaPOI: 'Gd Bangkit',
      alamat: 'Jl. Asia Afrika No. 456',
      ekosistem: 'Multifinance',
      visitKe: 2,
      namaPIC: 'Bob marlin',
      jabatanPIC: 'Owner',
      noHP: '081987654321',
      provider: 'Telkom Group',
      detailProvider: 'Indibiz',
      abonemen: 'Rp 1.000.000',
      feedback: 'Bertemu dengan PIC/Owner/Manajemen',
      detailFeedback: 'Tertarik Berlangganan Indibiz',
      detailInformasi: 'sudah berlangganan',
      eviden: 'whatsapp.jpg'
    },
  ];

  const filteredData = sampleData.filter(item =>
    Object.values(item).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getEkosistemBadge = (ekosistem: string) => {
    const badges: Record<string, string> = {
      Ruko: "bg-blue-100 text-blue-800",
      Sekolah: "bg-yellow-100 text-yellow-800",
      Hotel: "bg-pink-100 text-pink-800",
      Multifinance: "bg-purple-100 text-purple-800",
      Health: "bg-green-100 text-green-800",
      Ekspedisi: "bg-orange-100 text-orange-800",
      Energi: "bg-red-100 text-red-800",
      Agriculture: "bg-lime-100 text-lime-800",
      Properti: "bg-cyan-100 text-cyan-800",
      Manufaktur: "bg-teal-100 text-teal-800",
      MediaCommunication: "bg-rose-100 text-rose-800"
    }
    return badges[ekosistem] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-white shadow-lg transition-all duration-300 flex flex-col`}>
        {/* Logo Section */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
              <img 
                src="https://upload.wikimedia.org/wikipedia/id/thumb/c/c4/Telkom_Indonesia_2013.svg/1200px-Telkom_Indonesia_2013.svg.png" 
                alt="Telkom Indonesia" 
                className="h-12 w-auto"
              />
            </div>
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-colors">
            <Home size={20} />
            {!sidebarCollapsed && <span className="font-medium">Dashboard</span>}
          </button>
          <a href="/register">
          <button className="flex-1 p-4 space-y-2 w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <Users size={20} />
            {!sidebarCollapsed && <span className="font-medium">Register Akun</span>}
          </button>
          </a>
                  
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
            <BarChart3 size={20} />
            {!sidebarCollapsed && <span className="font-medium">Visualisasi Data</span>}
          </button>
        </nav>

        {/* User Info with Dropdown */}
        <div className="p-4 border-t border-gray-200 relative" ref={dropdownRef}>
          <div className={`${sidebarCollapsed ? 'hidden' : 'block'}`}>
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="w-full flex items-center justify-between space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-red-600 font-medium">A</span>
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Admin</p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
              </div>
              <ChevronDown 
                size={16} 
                className={`text-gray-400 transition-transform ${showUserDropdown ? 'rotate-180' : ''}`} 
              />
            </button>

            {/* Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
                  
          {/* Collapsed state - just show logout icon */}
          {sidebarCollapsed && (
            <button
              onClick={handleLogout}
              className="w-full p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center justify-center"
              title="Logout"
            >
              <LogOut size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
              <p className="text-sm text-gray-600">Kelola data sales dan monitoring aktivitas</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                <Download size={16} />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {/* Search and Filter Bar */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Cari data..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Filter size={16} />
                  <span>Filter</span>
                </button>
              </div>
              <div className="text-sm text-gray-500">
                Menampilkan {startIndex + 1}-{Math.min(endIndex, filteredData.length)} dari {filteredData.length} data
              </div>
            </div>
          </div>

          {/* Data Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Sales</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telda</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STO</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jenis Kegiatan</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama POI</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ekosistem</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visit ke</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama PIC</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jabatan PIC</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No HP</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Provider</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail Provider</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Abonemen</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feedback</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail Feedback</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Detail Informasi</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Eviden</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.tanggal}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.kategori}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.namaSales}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.telda}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.sto}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          {item.jenisKegiatan}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.namaPOI}</td>
                      <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">{item.alamat}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEkosistemBadge(
                            item.ekosistem,
                          )}`}
                        >
                          {item.ekosistem}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.visitKe}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.namaPIC}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.jabatanPIC}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.noHP}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.provider}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.detailProvider}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.abonemen}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          item.feedback === 'Bertemu dengan PIC/Owner/Manajemen' ? 'bg-green-100 text-green-800' :
                          item.feedback === 'Tidak bertemu dengan PIC' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {item.feedback}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            item.detailFeedback === 'Tertarik Berlangganan Indibiz'
                              ? 'bg-green-100 text-green-800'
                              : item.detailFeedback === 'Tidak Tertarik Berlangganan Indibiz'
                              ? 'bg-red-100 text-red-800'
                              : item.detailFeedback === 'Ragu-ragu atau masih dipertimbangkan'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {item.detailFeedback}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-900 max-w-xs truncate">{item.detailInformasi}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.eviden}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-colors">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Menampilkan <span className="font-medium">{startIndex + 1}</span> sampai{' '}
                      <span className="font-medium">{Math.min(endIndex, filteredData.length)}</span> dari{' '}
                      <span className="font-medium">{filteredData.length}</span> hasil
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            page === currentPage
                              ? 'z-10 bg-red-50 border-red-500 text-red-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardAdmin;