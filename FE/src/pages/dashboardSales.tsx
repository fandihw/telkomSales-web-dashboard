"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Download,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  TrendingUp,
  Users,
  DollarSign,
  Eye,
  Plus,
  LogOut,
  ChevronDown,
  User2,
  Home,
} from "lucide-react"

interface SalesData {
  id: string
  tanggal: string
  kategori: string
  namaSales: string
  telda: string
  sto: string
  jenisKegiatan: string
  namaPoi: string
  alamat: string
  ekosistem: string
  visitKe: number
  namaPic: string
  jabatanPic: string
  noHp: string
  provider: string
  detailProvider: string
  abonemen: string
}

interface DashboardStats {
  totalVisit: number
  visitBulanIni: number
  prospekAktif: number
  konversiRate: number
}

export default function DashboardSales() {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [filteredData, setFilteredData] = useState<SalesData[]>([])
  const [stats, setStats] = useState<DashboardStats>({
    totalVisit: 0,
    visitBulanIni: 0,
    prospekAktif: 0,
    konversiRate: 0,
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [filterKategori, setFilterKategori] = useState("")
  const [filterEkosistem, setFilterEkosistem] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [selectedData, setSelectedData] = useState<SalesData | null>(null)
  const [showUserDropdown, setShowUserDropdown] = useState(false)

  const itemsPerPage = 10
  // Mock data for current sales user (in real app, fetch from API based on user session)
  const currentSalesName = "John Doe" // This should come from user session/context

  useEffect(() => {
    // Check authentication status
    /*const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (isAuthenticated !== "true") {
      // Redirect to login page
      window.location.href = "/login"
      return
    }*/

    // Mock API call to fetch sales data - DATA DUMMY
    const mockData: SalesData[] = [
      {
        id: "1",
        tanggal: "2024-01-15",
        kategori: "Visit Baru",
        namaSales: "John Doe",
        telda: "Ketintang",
        sto: "WRU",
        jenisKegiatan: "Door to door",
        namaPoi: "Toko ABC",
        alamat: "Jl. Sudirman No. 123",
        ekosistem: "Ruko",
        visitKe: 1,
        namaPic: "Jane Smith",
        jabatanPic: "Manager",
        noHp: "081234567890",
        provider: "Telkom",
        detailProvider: "Indihome",
        abonemen: "Rp 12.000",
      },
      {
        id: "2",
        tanggal: "2024-01-16",
        kategori: "Follow Up",
        namaSales: "John Doe",
        telda: "Gresik",
        sto: "SDY",
        jenisKegiatan: "Door to door",
        namaPoi: "RS ABCDE",
        alamat: "Jl. Asia Afrika No. 456",
        ekosistem: "Health",
        visitKe: 2,
        namaPic: "Bob Wilson",
        jabatanPic: "Owner",
        noHp: "081987654321",
        provider: "Kompetitor",
        detailProvider: "BizNet",
        abonemen: "Rp 20.000",
      },
      {
        id: "3",
        tanggal: "2025-02-16",
        kategori: "Follow Up",
        namaSales: "John Doe",
        telda: "Ketintang",
        sto: "WRU",
        jenisKegiatan: "Door to door",
        namaPoi: "Gd Bangkit",
        alamat: "Jl. Asia Afrika No. 456",
        ekosistem: "Multifinance",
        visitKe: 2,
        namaPic: "Bob marlin",
        jabatanPic: "Owner",
        noHp: "081987654321",
        provider: "Telkom Group",
        detailProvider: "Indibiz",
        abonemen: "Rp 1.000.000",
      },
    ]
    // Filter data to show only current sales person's data
    const userSalesData = mockData.filter((item) => item.namaSales === currentSalesName)
    setSalesData(userSalesData)
    setFilteredData(userSalesData)
    // Calculate stats for current sales
    const totalVisit = userSalesData.length
    const currentMonth = new Date().getMonth() + 1
    const visitBulanIni = userSalesData.filter((item) => new Date(item.tanggal).getMonth() + 1 === currentMonth).length
    const prospekAktif = userSalesData.filter((item) => item.kategori === "Follow Up").length
    const konversiRate = totalVisit > 0 ? Math.round((visitBulanIni / totalVisit) * 100) : 0
    setStats({
      totalVisit,
      visitBulanIni,
      prospekAktif,
      konversiRate,
    })
  }, [])

  useEffect(() => {
    let filtered = salesData
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.namaPoi.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.alamat.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.namaPic.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }
    if (filterKategori) {
      filtered = filtered.filter((item) => item.kategori === filterKategori)
    }
    if (filterEkosistem) {
      filtered = filtered.filter((item) => item.ekosistem === filterEkosistem)
    }
    setFilteredData(filtered)
    setCurrentPage(1)
  }, [searchTerm, filterKategori, filterEkosistem, salesData])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest(".user-dropdown-container")) {
        setShowUserDropdown(false)
      }
    }

    if (showUserDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showUserDropdown])

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

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

  const handleDetail = (data: SalesData) => {
    setSelectedData(data)
    setShowDetailModal(true)
  }

  const handleExportData = () => {
    // Export only current sales data
    alert("Export data sales Anda dalam format CSV")
  }

  const handleLogout = () => {
    // Clear authentication status
    localStorage.removeItem("isAuthenticated")
    // Redirect to login page
    window.location.href = "/login"
  }

  const toggleUserDropdown = () => {
    setShowUserDropdown(!showUserDropdown)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/id/thumb/c/c4/Telkom_Indonesia_2013.svg/1200px-Telkom_Indonesia_2013.svg.png" 
              alt="Telkom Indonesia"
              className="h-12 w-auto\"
              onError={(e) => {
                ;(e.target as HTMLImageElement).style.display = "none"
              }}
            />
          </div>
        </div>
        <nav className="mt-6">
          <div className="px-3">
            <div className="flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md">
              <Home className="mr-3 w-5 h-5" />
              Dashboard
            </div>
          </div>
        </nav>
        {/* Sales Info with Dropdown */}
        <div className="absolute bottom-0 left-4 right-4 mb-2 border-t border-gray-200">
          <div className="user-dropdown-container relative">
            <button
              onClick={toggleUserDropdown}
              className="w-full flex items-center justify-between hover:bg-gray-50 rounded-md p-2 cursor-pointer transition-colors"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-medium">
                      {currentSalesName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  </div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{currentSalesName}</p>
                  <p className="text-xs text-gray-500">Sales</p>
                </div>
              </div>
              <ChevronDown
                className={`h-4 w-4 text-gray-500 transition-transform ${showUserDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {/* User Dropdown Menu */}
            {showUserDropdown && (
              <div className="absolute bottom-full left-4 right-4 mb-2 bg-white border border-gray-200 rounded-ld shadow-lg z-50">
                <div className="py-2">
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    <span className="font-medium"> Logout </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">Dashboard Sales</h1>
                <p className="text-sm text-gray-600">Kelola data kunjungan dan monitoring aktivitas Anda</p>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleExportData}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* Stats Cards */}
        <div className="p-6 pb-0">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <BarChart3 className="w-8 h-8 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Kunjungan</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalVisit}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Bulan Ini</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.visitBulanIni}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="w-8 h-8 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Prospek Aktif</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.prospekAktif}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <DollarSign className="w-8 h-8 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Konversi Rate</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.konversiRate}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Data Table */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Search and Filter */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Cari data..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                  </div>

                  <select
                    value={filterKategori}
                    onChange={(e) => setFilterKategori(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Semua Kategori</option>
                    <option value="Visit Baru">Visit Baru</option>
                    <option value="Follow Up">Follow Up</option>
                  </select>

                  <select
                    value={filterEkosistem}
                    onChange={(e) => setFilterEkosistem(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  >
                    <option value="">Semua Ekosistem</option>
                    <option value="Ruko">Ruko</option>
                    <option value="Sekolah">Sekolah</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Multifinance">Multifinance</option>
                    <option value="Health">Health</option>
                    <option value="Ekspedisi">Ekspedisi</option>
                    <option value="Energi">Energi</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Properti">Properti</option>
                    <option value="Manufaktur">Manufaktur</option>
                    <option value="Media & Communication">Media & Communication</option>

                  </select>
                </div>

                <p className="text-sm text-gray-500">
                  Menampilkan {paginatedData.length} dari {filteredData.length} data Anda
                </p>
              </div>
            </div>
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kategori
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Telda
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STO
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nama POI
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Alamat
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ekosistem
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Visit Ke
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Provider
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Abonemen
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.tanggal}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.namaSales}</td>

                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            item.kategori === "Visit Baru"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {item.kategori}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.telda}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.sto}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.namaPoi}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.alamat}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEkosistemBadge(
                            item.ekosistem,
                          )}`}
                        >
                          {item.ekosistem}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 text-center">{item.visitKe}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.provider}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{item.abonemen}</td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          onClick={() => handleDetail(item)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Menampilkan <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> sampai{" "}
                      <span className="font-medium">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span>{" "}
                      dari <span className="font-medium">{filteredData.length}</span> hasil
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => (
                        <button
                          key={i + 1}
                          onClick={() => setCurrentPage(i + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === i + 1
                              ? "z-10 bg-red-50 border-red-500 text-red-600"
                              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          {i + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      {/* Detail Modal */}
      {showDetailModal && selectedData && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-90vh overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Detail Kunjungan</h3>
            </div>
            <div className="px-6 py-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Tanggal</label>
                  <p className="text-sm text-gray-900">{selectedData.tanggal}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama</label>
                  <p className="text-sm text-gray-900">{selectedData.namaSales}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Kategori</label>
                  <p className="text-sm text-gray-900">{selectedData.kategori}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Telda</label>
                  <p className="text-sm text-gray-900">{selectedData.telda}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">STO</label>
                  <p className="text-sm text-gray-900">{selectedData.sto}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Nama POI</label>
                  <p className="text-sm text-gray-900">{selectedData.namaPoi}</p>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Alamat</label>
                  <p className="text-sm text-gray-900">{selectedData.alamat}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Ekosistem</label>
                  <p className="text-sm text-gray-900">{selectedData.ekosistem}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Visit Ke</label>
                  <p className="text-sm text-gray-900">{selectedData.visitKe}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nama PIC</label>
                  <p className="text-sm text-gray-900">{selectedData.namaPic}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Jabatan PIC</label>
                  <p className="text-sm text-gray-900">{selectedData.jabatanPic}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">No HP</label>
                  <p className="text-sm text-gray-900">{selectedData.noHp}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Provider</label>
                  <p className="text-sm text-gray-900">{selectedData.provider}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Detail Provider</label>
                  <p className="text-sm text-gray-900">{selectedData.detailProvider}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Abonemen</label>
                  <p className="text-sm text-gray-900">{selectedData.abonemen}</p>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
