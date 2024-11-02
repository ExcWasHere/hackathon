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
} from "lucide-react";

import { requestToAI } from "~/utils/groq";
import { BsCpu } from "react-icons/bs";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "@remix-run/react";

const PrediksiTanaman = () => {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

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

  useEffect(() => {
    refreshToken();
  }, []);

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

  const getUsers = async () => {
    const response: any = await axios.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
  };

  const [formData, setFormData] = useState({
    jenisTanaman: "",
    lokasiLahan: "",
    tanggalTanam: "",
  });
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Predefined prompt template
  const generatePrompt = (data: any) => {
    return `"Berdasarkan data berikut:
    - Jenis Tanaman: ${data.jenisTanaman}
    - Lokasi Lahan: ${data.lokasiLahan}
    - Tanggal Tanam: ${data.tanggalTanam}

Berikan perkiraan hasil panen dan waktu yang diperlukan sampai panen, serta kondisi ideal lainnya untuk jenis tanaman yang dipilih. Tolong dalam bahasa Indonesia, dan kemudian mainkan asumsi saja tidak 100% akurat tidak masalah, Jika inputan tidak masuk akal atau data kurang lengkap, jawab: data tersebut tidak masuk akal atau data kurang lengkap."
`;
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
    if (
      !formData.jenisTanaman ||
      !formData.lokasiLahan ||
      !formData.tanggalTanam
    )
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
  const [activeNav, setActiveNav] = useState("Manajemen Lahan");

  const navigationItems = [
    { name: "Dashboard", icon: NotebookIcon },
    { name: "Manajemen Lahan", icon: Calendar },
  ];

  const getWeatherIcon = (condition: any) => {
    switch (condition.toLowerCase()) {
      case "clear":
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case "clouds":
        return <Cloud className="w-5 h-5 text-gray-400" />;
      case "rain":
        return <CloudRain className="w-5 h-5 text-blue-400" />;
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
        <div className="h-fit shadow-md rounded-lg col-span-12 md:col-span-3 text-black">
          <form
            onSubmit={handleCoordinatesSubmit}
            className="space-y-3 rounded-t-xl bg-gradient-to-tr from-blue-800 to-blue-900 p-4"
          >
            <label className="text-white py-2 text-xl text-gray-600">
              Masukkan Koordinat Lokasi Anda
            </label>
            <input
              type="text"
              value={tempCoordinates.lat}
              onChange={(e) =>
                setTempCoordinates((prev) => ({ ...prev, lat: e.target.value }))
              }
              placeholder="Enter latitude"
              className="w-full p-2 rounded-lg bg-white"
            />
            <input
              type="text"
              value={tempCoordinates.lon}
              onChange={(e) =>
                setTempCoordinates((prev) => ({ ...prev, lon: e.target.value }))
              }
              placeholder="Enter longitude"
              className="w-full p-2 border rounded-lg bg-white"
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-500 rounded-lg shadow-md text-white hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </form>
          <div className="bg-gradient-to-br from-blue-800 to-blue-900 text-white p-6 rounded-b-xl shadow-lg">
            <h2 className="text-xl font-bold mb-6 flex items-center">
              <Cloud className="w-5 h-5 mr-2" />
              Perkiraan Cuaca
            </h2>
            <div className="text-sm text-gray-300 mb-4">7 hari kedepan</div>
            <div className="space-y-4">
              {loading ? (
                <p>Loading...</p>
              ) : (
                forecastData.map((forecast: any, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-1 px-4 bg-white/10 rounded-lg"
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
    <div className="min-h-screen bg-blue-950 p-2">
      <div className="bg-white/100  rounded-3xl p-6 mx-auto ">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-12 md:col-span-2 mr-2">
            <div className="space-y-6">
              <div className="flex items-center space-x-2 p-3">
                <h1 className="text-2xl font-extrabold text-slate-900">
                  TERRATOPIA
                </h1>
              </div>
              <nav className="space-y-4">
                {navigationItems.map((item) => (
                  <div
                    key={item.name}
                    onClick={() =>
                      navigate(
                        "/" + item.name.toLowerCase().replace(/\s+/g, "-")
                      )
                    }
                    className={`flex items-center space-x-2 p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-teal-50 ${
                      activeNav === item.name
                        ? "bg-teal-100 text-teal-600 font-medium"
                        : "text-gray-500"
                    }`}
                  >
                    <item.icon size={20} />
                    <span>{item.name}</span>
                  </div>
                ))}
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 p-3 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-lg cursor-pointer transition-all duration-200"
                >
                  <LogOut size={20} />
                  <span>Log Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-12 md:col-span-7">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
              <div className="relative">
                {/* <input
                  type="text"
                  placeholder="Cari..."
                  className="pl-10 pr-4 py-2 rounded-lg border bg-white bg-opacity-50 border-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-100 focus:border-transparent w-full"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={18}
                /> */}
              </div>
              <div className="flex items-center space-x-4">
                <button
                  className="p-2 rounded-full hover:bg-gray-100 relative"
                  onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                >
                  <Bell size={20} className="text-gray-500" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">
                    3
                  </span>
                </button>
                <div className="flex items-center space-x-2">
                  <img
                    src="nandhu-kumar-5NGTf4oD8RA-unsplash.jpg"
                    className="w-10 h-10 rounded-full object-cover border-2 border-teal-500"
                  />
                  <div className="text-sm">
                    <div className="font-medium text-slate-900">{name}</div>
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
                className="w-full h-48 md:h-64 object-cover transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent">
                <div className="absolute bottom-0 left-0 p-6">
                  <div className="flex items-center space-x-2 text-teal-400 mb-2">
                    <TrendingUp size={20} />
                    <span className="text-sm font-medium">Tren Terbaru</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-white">
                    Permintaan Cabai Merah Melonjak
                  </h2>
                  <p className="text-gray-200">di Pasar Lokal dan Ekspor</p>
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div>
              <div className="flex justify-between items-center mb-6 w-[32rem]">
                <h2 className="text-2xl font-bold text-slate-900">
                  Manajemen Lahan
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Needs to be fixed */}
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="max-w-4xl mx-auto space-y-6">
                    <div className="text-start ">
                      <h1 className="text-xl md:text-xl font-bold tracking-tight">
                        <span className="text-gray-800">Rekomendasi</span>
                        <span className="bg-gradient-to-r from-gray-600 to-gray-700 bg-clip-text text-transparent">
                          {" "}
                          Tanaman
                        </span>
                      </h1>
                      <p className="text-base md:text-base text-gray-600 font-light">
                        Masukkan data lahan Anda
                      </p>
                    </div>

                    {/** Generate AI * */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-gray-600 mb-2 bg">
                            Jenis Tanaman
                          </label>
                          <input
                            type="text"
                            name="jenisTanaman"
                            value={formData.jenisTanaman}
                            onChange={handleInputChange}
                            className="w-full px-6 py-2 rounded-2xl bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-indigo-500 focus:border-transparent transition-all duration-200
                           shadow-lg backdrop-blur-sm"
                            placeholder="Masukkan jenis tanaman"
                            step="0.1"
                            min="0"
                          />
                        </div>

                        <div>
                          <label className="block text-gray-600 mb-2">
                            Lokasi Lahan
                          </label>
                          <select
                            name="lokasiLahan"
                            value={formData.lokasiLahan}
                            onChange={handleInputChange}
                            className="w-full px-6 py-2 rounded-2xl bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-indigo-500 focus:border-transparent transition-all duration-200
                           shadow-lg backdrop-blur-sm"
                          >
                            <option value="">Pilih lokasi lahan...</option>
                            <option value="1">Dataran Tinggi</option>
                            <option value="2">Dataran Rendah</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-gray-600 mb-2">
                            Suhu Rata-rata (°C)
                          </label>
                          <input
                            type="date"
                            name="tanggalTanam"
                            value={formData.tanggalTanam}
                            onChange={handleInputChange}
                            className="w-full px-6 py-2 rounded-2xl bg-gray-100 text-black placeholder-gray-400 focus:outline-none focus:ring-2
                           focus:ring-indigo-500 focus:border-transparent transition-all duration-200
                           shadow-lg backdrop-blur-sm"
                            placeholder="Masukkan tanggal tanam"
                            step="0.1"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full px-6 py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-600
                       text-white transition-colors duration-200 disabled:opacity-50
                       disabled:cursor-not-allowed font-semibold"
                        disabled={
                          isLoading ||
                          !formData.jenisTanaman ||
                          !formData.lokasiLahan ||
                          !formData.tanggalTanam
                        }
                      >
                        {isLoading ? "Memproses..." : "Dapatkan Rekomendasi"}
                      </button>
                    </form>
                  </div>
                </div>

                {/* Output prompt */}
                <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  {recommendation && (
                    <div className="flex flex-col items-start space-y-4">
                      <div className="flex items-center space-x-2 text-gray-600 px-4 py-2 ">
                        <div className="px-2 py-2 border-2 rounded-lg">
                          <BsCpu size={20} />
                        </div>
                        <h1 className="text-lg font-semibold">
                          Rekomendasi Tanaman
                        </h1>
                      </div>
                      <div
                        className="mt-8 p-6 rounded-2xl  text-gray-600
                           transition-all duration-300 ease-in-out w-full"
                      >
                        <div className="prose prose-invert max-w-none whitespace-pre-line">
                          {recommendation}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Enhanced NotebookIcon Monitoring */}
            {/* <div className="mt-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  Pemantauan Tanaman
                </h2>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="font-medium text-slate-900">
                      Cabai Merah
                    </span>
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
            </div> */}
          </div>

          {/* Weather Forecast */}
          <WeatherForecast />
        </div>
      </div>
    </div>
  );
};

export default PrediksiTanaman;
