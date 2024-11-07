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

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { Groq } from "groq-sdk";
import { Plant, TrendingUp } from "lucide-react";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface PlantGrowthData {
  day: number;
  height: number;
  development: number;
}
const DashboardManajemenLahan = () => {
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
    jenisTanaman: "",
    tanggalTanam: "",
  });
  const [recommendation, setRecommendation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [growthData, setGrowthData] = useState<PlantGrowthData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>("");

  const processAIResponse = (response: string) => {
    try {
      const jsonMatch = response.match(/\[.*\]/s);
      if (!jsonMatch) {
        throw new Error("No JSON data found in response");
      }

      const jsonData = JSON.parse(jsonMatch[0]);
      return {
        growthData: jsonData,
        analysis: response.replace(jsonMatch[0], "").trim(),
      };
    } catch (err) {
      console.error("Error processing AI response:", err);
      console.log("Raw response:", response);
      throw err;
    }
  };

  const analyzePlantGrowth = async () => {
    if (!formData.jenisTanaman || !formData.tanggalTanam) {
      setError("Mohon lengkapi semua field");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const prompt = `Analyze plant growth projection for 90 days with these parameters:
      - Plant name: ${formData.jenisTanaman} m²
      - Planted From: ${formData.tanggalTanam}

      Provide a brief analysis and generate a JSON array of growth data points (every 15 days) with this format:
      Here's the growth analysis:
      [analysis text]

      [
        {"day": 0, "height": 0, "development": 0},
        {"day": 15, "height": 10, "development": 20},
        ...etc for 90 days
      ]
      
      Height should be in cm, development in percentage (0-100).
      Consider soil type and conditions for realistic growth patterns.`;

      const reply = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content:
              "You are an agricultural expert. Analyze plant growth patterns based on given parameters.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama3-70b-8192",
        temperature: 0.5,
      });

      const aiResponse = reply.choices[0].message.content;
      if (aiResponse) {
        const { growthData, analysis } = processAIResponse(aiResponse);
        setGrowthData(growthData);
        setAnalysis(analysis);
      }
    } catch (err) {
      console.error("Error analyzing growth:", err);
      setError("Gagal menganalisis pertumbuhan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  // Chart.js configuration
  const chartOptions = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hari",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Tinggi (cm)",
        },
      },
      y2: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Perkembangan (%)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const chartData = {
    labels: growthData.map((data) => data.day),
    datasets: [
      {
        label: "Tinggi Tanaman",
        data: growthData.map((data) => data.height),
        borderColor: "#d97706",
        backgroundColor: "#d97706",
        yAxisID: "y1",
      },
      {
        label: "Perkembangan",
        data: growthData.map((data) => data.development),
        borderColor: "#15803d",
        backgroundColor: "#15803d",
        yAxisID: "y2",
      },
    ],
  };

  // Predefined prompt template
  const generatePrompt = (data: any) => {
    return `"Berdasarkan data berikut:
    - Jenis Tanaman: ${data.jenisTanaman}
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
    if (!formData.jenisTanaman || !formData.tanggalTanam) return;

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
                    Manajemen Lahan
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
                  {/* Input Form */}
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-8 transition-transform duration-300 hover:scale-[1.02]">
                    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
                      <div>
                        <h1 className="text-xl sm:text-2xl font-bold">
                          <span className="bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                            Prediksi Panen
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
                              Jenis Tanaman
                            </label>
                            <input
                              type="text"
                              name="jenisTanaman"
                              value={formData.jenisTanaman}
                              onChange={handleInputChange}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                              placeholder="Masukkan jenis tanaman..."
                              step="0.1"
                              min="0"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-2">
                              Tanggal Tanam
                            </label>
                            <input
                              type="date"
                              name="tanggalTanam"
                              value={formData.tanggalTanam}
                              onChange={handleInputChange}
                              className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-gray-50 border border-gray-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-300"
                              placeholder="Masukkan tanggal tanam..."
                              step="0.1"
                              min="0"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="w-full px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl bg-amber-500 hover:bg-amber-600 text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-amber-200"
                          onClick={analyzePlantGrowth}
                          disabled={
                            isLoading ||
                            !formData.jenisTanaman ||
                            !formData.tanggalTanam
                          }
                        >
                          {isLoading ? "Memproses..." : "Dapatkan Rekomendasi"}
                        </button>
                      </form>
                      {error && (
                        <div className="text-red-500 p-3 rounded-lg bg-red-50">
                          {error}
                        </div>
                      )}

                      {/* {analysis && (
                        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
                          <h3 className="font-semibold text-amber-800 mb-2">
                            Analisis:
                          </h3>
                          <p className="text-amber-900">{analysis}</p>
                        </div>
                      )} */}

                      {growthData.length > 0 && (
                        <div className="bg-white p-4 rounded-lg shadow">
                          <div className="h-96">
                            <Line options={chartOptions} data={chartData} />
                          </div>
                        </div>
                      )}
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
                            Prediksi Panen
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

export default DashboardManajemenLahan;
