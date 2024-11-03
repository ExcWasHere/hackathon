import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Groq } from "groq-sdk";
import { TrendingUp } from 'lucide-react';

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

const GROQ_API = import.meta.env.VITE_GROQ_API_KEY;

const groq = new Groq({
  apiKey: GROQ_API,
  dangerouslyAllowBrowser: true,
});

interface PlantGrowthData {
  day: number;
  height: number;
  development: number;
}

const PlantGrowthAnalyzer: React.FC = () => {
  const [formData, setFormData] = useState({
    luasLahan: '',
    jenisTanah: 'Tanah Humus',
    phTanah: '',
    kelembaban: ''
  });
  const [growthData, setGrowthData] = useState<PlantGrowthData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const processAIResponse = (response: string) => {
    try {
      const jsonMatch = response.match(/\[.*\]/s);
      if (!jsonMatch) {
        throw new Error('No JSON data found in response');
      }

      const jsonData = JSON.parse(jsonMatch[0]);
      return {
        growthData: jsonData,
        analysis: response.replace(jsonMatch[0], '').trim()
      };
    } catch (err) {
      console.error('Error processing AI response:', err);
      console.log('Raw response:', response);
      throw err;
    }
  };

  const analyzePlantGrowth = async () => {
    if (!formData.luasLahan || !formData.phTanah || !formData.kelembaban) {
      setError('Mohon lengkapi semua field');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const prompt = `Analyze plant growth projection for 90 days with these parameters:
      - Land Area: ${formData.luasLahan} m²
      - Soil Type: ${formData.jenisTanah}
      - Soil pH: ${formData.phTanah}
      - Humidity: ${formData.kelembaban}%

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
            content: "You are an agricultural expert. Analyze plant growth patterns based on given parameters."
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
      console.error('Error analyzing growth:', err);
      setError('Gagal menganalisis pertumbuhan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  // Chart.js configuration
  const chartOptions = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Hari'
        }
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Tinggi (cm)'
        }
      },
      y2: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Perkembangan (%)'
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  const chartData = {
    labels: growthData.map(data => data.day),
    datasets: [
      {
        label: 'Tinggi Tanaman',
        data: growthData.map(data => data.height),
        borderColor: '#d97706',
        backgroundColor: '#d97706',
        yAxisID: 'y1',
      },
      {
        label: 'Perkembangan',
        data: growthData.map(data => data.development),
        borderColor: '#15803d',
        backgroundColor: '#15803d',
        yAxisID: 'y2',
      },
    ],
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center space-x-2 mb-4">
        {/* <Plant className="text-amber-500" size={24} /> */}
        <h2 className="text-2xl font-bold text-amber-800">Analisis Pertumbuhan Tanaman</h2>
      </div>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-amber-700">
              Luas Lahan
            </label>
            <input
              type="text"
              name="luasLahan"
              value={formData.luasLahan}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full rounded-md border-amber-300 
                shadow-sm focus:border-amber-500 focus:ring-amber-500
                bg-white text-amber-900"
              placeholder="Masukkan luas lahan (m²)"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-700">
              Jenis Tanah
            </label>
            <select
              name="jenisTanah"
              value={formData.jenisTanah}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full rounded-md border-amber-300 
                shadow-sm focus:border-amber-500 focus:ring-amber-500
                bg-white text-amber-900"
            >
              <option>Tanah Humus</option>
              <option>Tanah Lempung</option>
              <option>Tanah Berpasir</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-700">
              pH Tanah
            </label>
            <input
              type="number"
              name="phTanah"
              value={formData.phTanah}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full rounded-md border-amber-300 
                shadow-sm focus:border-amber-500 focus:ring-amber-500
                bg-white text-amber-900"
              placeholder="Masukkan pH tanah"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-amber-700">
              Kelembaban
            </label>
            <input
              type="text"
              name="kelembaban"
              value={formData.kelembaban}
              onChange={handleInputChange}
              className="mt-1 p-2 block w-full rounded-md border-amber-300 
                shadow-sm focus:border-amber-500 focus:ring-amber-500
                bg-white text-amber-900"
              placeholder="Masukkan kelembaban tanah (%)"
            />
          </div>
        </div>

        <button
          type="button"
          onClick={analyzePlantGrowth}
          disabled={loading}
          className="w-full bg-amber-500 text-white py-2 px-4 rounded-lg 
            hover:bg-amber-600 disabled:bg-gray-400 disabled:cursor-not-allowed 
            transition-colors flex items-center justify-center space-x-2"
        >
          {loading ? (
            'Menganalisis...'
          ) : (
            <>
              <TrendingUp size={20} />
              <span>Analisis Pertumbuhan</span>
            </>
          )}
        </button>
      </form>

      {error && (
        <div className="text-red-500 p-3 rounded-lg bg-red-50">
          {error}
        </div>
      )}

      {analysis && (
        <div className="bg-amber-50 p-4 rounded-lg border border-amber-200">
          <h3 className="font-semibold text-amber-800 mb-2">Analisis:</h3>
          <p className="text-amber-900">{analysis}</p>
        </div>
      )}

      {growthData.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="h-96">
            <Line options={chartOptions} data={chartData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PlantGrowthAnalyzer;