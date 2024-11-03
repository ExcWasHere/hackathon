import React, { useEffect, useState } from "react";

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
  ThermometerSun,
  Menu,
  SettingsIcon,
  AlertCircle,
} from "lucide-react";

import { requestToAI } from "~/utils/groq";
import { BsCpu } from "react-icons/bs";
import axios from "axios";
import { useNavigate } from "@remix-run/react";
import BusinessNews from "~/utils/dashboard/news";
import { jwtDecode } from "jwt-decode";

const DashboardMainPage = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logout = async () => {
    try {
      await axios.delete("http://localhost:5000/logout", {
        withCredentials: true,
      });
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:5000/token", {
        withCredentials: true,
      });
      setToken(response.data.accessToken);
      const decoded = jwtDecode(response.data.accessToken);
      console.log(decoded);
      setName(decoded.name);
    } catch (error) {
      console.error(error);
      navigate("/");
    }
  };

  useEffect(() => {
    refreshToken();
  }, []);

  const getUsers = async () => {
    const response: any = await axios.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  const [formData, setFormData] = useState({
    landArea: "",
    pH: "",
    temperature: "",
    soilType: "",
    lokasi: "",
  });
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Predefined prompt template
  const generatePrompt = (data: any) => {
    return `Berdasarkan data berikut:
    - Luas lahan: ${data.landArea} hektar
    - Suhu rata-rata: ${data.temperature}°C
    - Jenis tanah (1=Humus, 2=Lempung, 3=Pasir): Tipe ${data.soilType}
    - pH tanah: ${data.pH}
    - lokasi: ${data.lokasi}

    
    Berikan rekomendasi tanaman yang cocok untuk ditanam tanpa jelaskan. Berikan 3 saja
    return output menjadi 3 jenis tanaman yang berada pada ${data.lokasi} dan penjelasan singkat dalam bahasa indonesia`;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData.landArea || !formData.temperature || !formData.soilType)
      return;

    setIsLoading(true);
    try {
      const prompt = generatePrompt(formData);
      const response = await requestToAI(prompt);
      setRecommendation(response ?? "");
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setRecommendation("Terjadi kesalahan saat memproses rekomendasi.");
    } finally {
      setIsLoading(false);
    }
  };
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("Dashboard");

  const navigationItems = [
    { name: "Dashboard", icon: NotebookIcon, path: "/dashboard" },
    { name: "Manajemen Lahan", icon: Calendar, path: "/manajemen-lahan" },
    { name: "Peringatan Dini", icon: AlertCircle, path: "/peringatan-dini" },
    { name: "Settings", icon: SettingsIcon, path: "/settings" },
  ];

  const getWeatherIcon = (condition: any) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-5 h-5 text-gray-400" />;
      case "rain":
        return <CloudRain className="w-5 h-5 text-amber-400" />;
      default:
        return <Cloud className="w-5 h-5 text-gray-400" />; // Default to Cloud if unknown
    }
  };

  const getDayName = (index: any) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date.toLocaleDateString("id-ID", { weekday: "long" });
  };

  const API_KEY = "cfe49b8c595ff38456e56b004311aa18";
  const defaultLat = "-8.036579865829735";
  const defaultLon = "112.8266631024765";

  function WeatherForecast() {
    const [forecastData, setForecastData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [coordinates, setCoordinates] = useState({
      lat: defaultLat,
      lon: defaultLon,
    });
    const [tempCoordinates, setTempCoordinates] = useState({
      lat: defaultLat,
      lon: defaultLon,
    });

    const handleCoordinatesSubmit = (e: any) => {
      e.preventDefault();
      setCoordinates(tempCoordinates);
    };

    useEffect(() => {
      async function fetchWeather() {
        setLoading(true);
        try {
          const response = await fetch(
            `https://api.agromonitoring.com/agro/1.0/weather/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${API_KEY}`
          );

          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }

          const data = await response.json();

          console.log("API response: ", data);

          if (data.message) {
            console.log("Message: ", data.message);
          }

          // Convert temperature from Kelvin to Celsius if needed
          const convertedData = data.slice(0, 7).map((forecast: any) => ({
            ...forecast,
            main: {
              ...forecast.main,
              temp: forecast.main.temp - 273.15, // Convert to Celsius
            },
          }));

          setForecastData(convertedData);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching weather data:", error);
          setLoading(false);
        }
      }

      fetchWeather();
    }, [coordinates]);

    return (
      <>
        <div className="mt-12 mr-7 col-span-12 md:col-span-3 shadow-lg h-fit rounded-lg p-5 text-black">
          <form
            onSubmit={handleCoordinatesSubmit}
            className="space-y-3 rounded-t-xl bg-whitep-4"
          >
            <h1 className="text-amber-800 text-2xl font-semibold">
              Prakiraan Cuaca
            </h1>
            <label className="py-2 text-lg text-gray-600">
              Masukkan Koordinat Lokasi Anda
            </label>
            <input
              type="text"
              value={tempCoordinates.lat}
              onChange={(e) =>
                setTempCoordinates((prev) => ({ ...prev, lat: e.target.value }))
              }
              placeholder="Enter latitude"
              className="w-full p-2 rounded-lg bg-white border-2"
            />
            <input
              type="text"
              value={tempCoordinates.lon}
              onChange={(e) =>
                setTempCoordinates((prev) => ({ ...prev, lon: e.target.value }))
              }
              placeholder="Enter longitude"
              className="w-full p-2 border-2 rounded-lg bg-white"
            />
            <button
              type="submit"
              className="w-full p-2 bg-amber-400 rounded-lg shadow-md text-white hover:bg-amber-600 transition-colors"
            >
              Submit
            </button>
          </form>
          <div className=" bg-white text-black p-6 rounded-b-xl">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Cloud className="w-5 h-5 mr-2" />
              Perkiraan Cuaca
            </h2>
            <div className="text-sm text-black mb-4">7 hari kedepan</div>
            <div className="space-y-4 text-black">
              {loading ? (
                <p>Loading...</p>
              ) : (
                forecastData.map((forecast: any, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white py-1 px-4 border-2 rounded-lg"
                  >
                    <span className="text-sm font-medium">
                      {getDayName(index)}
                    </span>
                    <div className="flex items-center space-x-2">
                      {getWeatherIcon(forecast.weather[0].main)}
                      <span>{forecast.weather[0].description}</span>
                      <span>{forecast.main.temp.toFixed(1)}°C</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-amber-200">
      <div className="">
        <div className="bg-white/80 backdrop-blur-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8">
            {/* Mobile Menu Button */}
            <div className="md:hidden px-4 py-3 bg-white/95 border-b border-gray-100 flex items-center justify-between">
              <h1 className="text-xl font-extrabold text-amber-600">
                Terra<span className="text-amber-800">Topia</span>
              </h1>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <Menu size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Sidebar */}
            <div
              className={`
              col-span-12 md:col-span-2 bg-white/95 border-gray-100
              ${isMobileMenuOpen ? "block" : "hidden"} md:block
              fixed md:relative top-0 left-0 w-full md:w-auto h-full md:h-auto
              z-50 md:z-auto
            `}
            >
              <div className="p-4 sm:p-6 space-y-6 sm:space-y-8">
                <div className="hidden md:flex items-center space-x-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-amber-600">
                    Terra<span className="text-amber-800">Topia</span>
                  </h1>
                </div>
                <nav className="space-y-2 sm:space-y-4">
                  {navigationItems.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => {
                        navigate(item.path);
                        setActiveNav(item.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex items-center space-x-3 p-2 sm:p-3 rounded-xl cursor-pointer transition-all duration-300 ${
                        activeNav === item.name
                          ? "bg-amber-500 text-white shadow-lg shadow-amber-200"
                          : "text-gray-600 hover:bg-amber-50"
                      }`}
                    >
                      <item.icon size={20} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                  ))}
                  <button
                    onClick={logout}
                    className="flex items-center space-x-3 p-2 sm:p-3 text-red-500 hover:bg-red-50 rounded-xl cursor-pointer transition-all duration-300"
                  >
                    <LogOut size={20} />
                    <span className="font-medium">Log Out</span>
                  </button>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-12 md:col-span-7 p-4 sm:p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-amber-800">
                  Berita Terkini
                </h1>
                <div className="flex items-center justify-between sm:justify-end space-x-4 sm:space-x-6">
                  <button className="p-2 rounded-full hover:bg-gray-100 relative transition-colors duration-300">
                    <Bell size={20} className="text-gray-600" />
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 rounded-full text-white text-xs flex items-center justify-center">
                      3
                    </span>
                  </button>
                  <div className="flex items-center space-x-3">
                    <img
                      src="nandhu-kumar-5NGTf4oD8RA-unsplash.jpg"
                      className="w-8 sm:w-10 h-8 sm:h-10 rounded-full object-cover ring-2 ring-amber-500"
                      alt="Profile"
                    />
                    <div>
                      <div className="font-semibold text-amber-800">{name}</div>
                      <div className="text-sm text-gray-500">Petani</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* News Section */}
              <BusinessNews />

              {/* Management Section */}
              <div className="mt-8 sm:mt-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Dashboard
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                  {/* Input Form */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 transition-transform duration-300 hover:scale-[1.02]">
                    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                      <div>
                        <h1 className="text-xl sm:text-2xl font-bold">
                          <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                            Rekomendasi Tanaman
                          </span>
                        </h1>
                        <p className="text-gray-500 mt-2">
                          Masukkan data lahan Anda
                        </p>
                      </div>

                      <form
                        onSubmit={handleSubmit}
                        className="space-y-4 sm:space-y-6 text-black"
                      >
                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">
                              Luas Lahan (Hektar)
                            </label>
                            <input
                              type="number"
                              name="landArea"
                              value={formData.landArea}
                              onChange={handleInputChange}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                              placeholder="Masukkan luas lahan..."
                              step="0.1"
                              min="0"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">
                              pH
                            </label>
                            <input
                              type="number"
                              name="pH"
                              value={formData.pH}
                              onChange={handleInputChange}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                              placeholder="Masukkan pH Tanah..."
                              step="0.1"
                              min="0"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">
                              Temperatur (Celcius)
                            </label>
                            <input
                              type="number"
                              name="temperature"
                              value={formData.temperature}
                              onChange={handleInputChange}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                              placeholder="Masukkan temperatur..."
                              step="0.1"
                              min="0"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">
                              Lokasi (Kabupten, dan Provinsi)
                            </label>
                            <input
                              type="text"
                              name="lokasi"
                              value={formData.lokasi}
                              onChange={handleInputChange}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                              placeholder="Kabupaten, dan Provinsi..."
                              step="0.1"
                              min="0"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-black font-medium mb-2">
                            Jenis Tanah
                          </label>
                          <select
                            name="soilType"
                            value={formData.soilType}
                            onChange={handleInputChange}
                            className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 text-black border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                          >
                            <option value="">Pilih Jenis Tanah..</option>
                            <option value="1">Humus</option>
                            <option value="2">Lempung</option>
                            <option value="3">Pasir</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-amber-200"
                          disabled={
                            isLoading ||
                            !formData.landArea ||
                            !formData.temperature ||
                            !formData.soilType
                          }
                        >
                          {isLoading ? "Memproses..." : "Dapatkan Rekomendasi"}
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Output Section */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 transition-transform duration-300 hover:scale-[1.02]">
                    {recommendation && (
                      <div className="flex flex-col items-start space-y-4 sm:space-y-6">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 sm:p-3 bg-amber-50 rounded-lg sm:rounded-xl">
                            <BsCpu size={24} className="text-amber-600" />
                          </div>
                          <h1 className="text-lg sm:text-xl font-bold text-gray-800">
                            Rekomendasi Tanaman
                          </h1>
                        </div>
                        <div className="w-full p-4 sm:p-6 bg-gray-50 rounded-lg sm:rounded-xl">
                          <div className="prose max-w-none text-gray-700 whitespace-pre-line">
                            {recommendation}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Weather Forecast Section */}

            <WeatherForecast />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMainPage;
