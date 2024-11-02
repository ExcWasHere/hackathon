import React, { useState } from 'react';

import { 
  Settings, 
  LogOut, 
  ChevronRight, 
  Users, 
  Clock,
  Sun, 
  Cloud, 
  CloudRain,
  Bell,
  NotebookIcon,
  Search,
  TrendingUp,
  Calendar,
  ThermometerSun
} from 'lucide-react';

const DashboardPage = () => {
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Pemantauan Tanaman');

  const navigationItems = [
    { name: 'Pemantauan Tanaman', icon: NotebookIcon },
    { name: 'Kelola Tugas', icon: Calendar },
    { name: 'Komunitas & Bantuan', icon: Users },
    { name: 'Pengaturan', icon: Settings },
  ];

  const getWeatherIcon = (condition : any) => {
    switch (condition) {
      case 'Cerah': return <Sun className="text-yellow-400" />;
      case 'Mendung': return <Cloud className="text-gray-400" />;
      case 'Hujan': return <CloudRain className="text-blue-400" />;
      default: return <Sun />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 p-4">
    <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 mx-auto shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Sidebar */}
        <div className="col-span-12 md:col-span-2 mr-2">
          <div className="space-y-6">
            <div className="flex items-center space-x-2 p-3">
              <h1 className="text-2xl font-extrabold text-slate-900">TERRATOPIA</h1>
            </div>
            <nav className="space-y-4">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  onClick={() => setActiveNav(item.name)}
                  className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-teal-50 ${
                    activeNav === item.name ? 'bg-teal-100 text-teal-600 font-medium' : 'text-gray-500'
                  }`}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </div>
              ))}
              <div className="flex items-center space-x-2 p-3 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-lg cursor-pointer transition-all duration-200">
                <LogOut size={20} />
                <span>Log Out</span>
              </div>
            </nav>
          </div>
        </div>
  
        {/* Main Content */}
        <div className="col-span-12 md:col-span-7">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Cari..." 
                className="pl-10 pr-4 py-2 rounded-lg border bg-white bg-opacity-50 border-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-transparent w-full"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
            <div className="flex items-center space-x-4">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 relative"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <Bell size={20} className="text-gray-500" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
              </button>
              <div className="flex items-center space-x-2">
                <img src="nandhu-kumar-5NGTf4oD8RA-unsplash.jpg" className="w-10 h-10 rounded-full object-cover border-2 border-teal-500"/>
                <div className="text-sm">
                  <div className="font-medium text-slate-900">Seseorang</div>
                  <div className="text-gray-500">Petani</div>
                </div>
              </div>
            </div>
          </div>
  
          {/* Trend Card */}
          <div className="relative rounded-2xl overflow-hidden mb-8 group">
            <img 
              src="/adrian-schledorn-31aJKD2f9xs-unsplash.jpg"
              alt="Red Chilies" 
              className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
              <div className="absolute bottom-0 left-0 p-6">
                <div className="flex items-center space-x-2 text-teal-400 mb-2">
                  <TrendingUp size={20} />
                  <span className="text-sm font-medium">Tren Terbaru</span>
                </div>
                <h2 className="text-2xl font-bold mb-2 text-white">Permintaan Cabai Merah Melonjak</h2>
                <p className="text-gray-200">di Pasar Lokal dan Ekspor</p>
              </div>
            </div>
            <button className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center space-x-1 text-white transition-all duration-300 hover:bg-white/20">
              <span>Lihat</span>
              <ChevronRight size={20} />
            </button>
          </div>
  
          {/* Status Section */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Status Pertanian</h2>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">Lihat Semua</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg mb-4 text-slate-900 font-bold flex items-center">
                  <ThermometerSun className="w-5 h-5 mr-2 text-teal-500" />
                  Kondisi Terkini
                </h3>
                <div className="flex flex-row justify-center text-center space-x-10 mb-5">
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <div className="text-3xl text-teal-600 font-semibold">45%</div>
                    <div className="text-gray-600">Kelembaban Tanah</div>
                  </div>
                  <div className="bg-teal-50 p-4 rounded-lg">
                    <div className="text-3xl text-teal-600 font-semibold">6,5</div>
                    <div className="text-gray-600">pH Tanah</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white p-4 rounded-xl">
                  <div className="mb-2 text-center">
                    Status Nutrisi: <span className="text-emerald-400 font-semibold">Seimbang</span>
                  </div>
                  <div className="bg-white/20 rounded-full h-0.5 w-full mb-4"></div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {[
                      { label: 'Nitrogen', value: '80 ppm' },
                      { label: 'Fosfor', value: '25 ppm' },
                      { label: 'Kalium', value: '120 ppm' }
                    ].map((nutrient) => (
                      <div key={nutrient.label} className="bg-white/10 rounded-lg p-2">
                        <div className="text-sm font-bold">{nutrient.value}</div>
                        <div className="text-xs text-gray-300">{nutrient.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
  
              {/* Additional content */}
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg mb-4 text-slate-900 font-bold flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-teal-500" />
                    Pengelola Tugas
                  </h3>
                  <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white text-center p-2 rounded-lg mb-4">
                    Mendatang
                  </div>
                  <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
                    <div className="text-slate-900 font-semibold flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                      Tugas Mendesak
                    </div>
                    <div className="text-sm text-slate-900">
                      Penyemprotan anti hama organik pada tanaman cabai
                    </div>
                    <div className="flex items-center text-sm text-slate-500">
                      <Clock className="w-4 h-4 mr-2" />
                      17 Oktober 2024
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                        Menunggu
                      </span>
                      <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
  
            {/* Enhanced NotebookIcon Monitoring */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Pemantauan Tanaman</h2>
                <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                  Lihat Semua
                </button>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-slate-900">Cabai Merah</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="h-2 w-24 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full w-[90%] bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-green-500 font-medium">90%</span>
                  </div>
                  <div className="text-slate-600">Pembentukan Buah</div>
                  <div className="text-green-500 font-medium">
                    Estimasi Panen: 3 Minggu (500Kg)
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200">
                    <ChevronRight size={20} className="text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          </div>
  
        {/* Weather Forecast */}
        <div className="col-span-12 md:col-span-3">
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Cloud className="w-5 h-5 mr-2" />
              Perkiraan Cuaca
            </h2>
            <div className="text-sm text-gray-300 mb-4">7 hari kedepan</div>
            <div className="space-y-4 ">
              {[
                { day: 'Hari ini', condition: 'Cerah' },
                { day: 'Selasa', condition: 'Mendung' },
                { day: 'Rabu', condition: 'Hujan' },
                { day: 'Kamis', condition: 'Mendung' },
                { day: "Jum'at", condition: 'Cerah' },
                { day: 'Sabtu', condition: 'Hujan' },
                { day: 'Minggu', condition: 'Mendung' }
              ].map((forecast) => (
                <div key={forecast.day} className="flex items-center justify-between py-1 px-4 bg-white/10 rounded-lg">
                  <span className="text-sm font-medium">{forecast.day}</span>
                  <div className="flex items-center space-x-2">
                      {getWeatherIcon(forecast.condition)}
                      <span>{forecast.condition}</span>
                    </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>  
    );
};

export default DashboardPage;