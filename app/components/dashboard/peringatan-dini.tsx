// app/routes/sistem-peringatan-dini.tsx
import { json } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { useState } from "react";
import {
  Bell,
  Shield,
  CloudRain,
  Bug,
  Leaf,
  AlertTriangle,
} from "lucide-react";
import { RiArrowGoBackLine } from "react-icons/ri";

export default function SistemPeringatanDini() {
  // Sample data for warnings
  const [warnings] = useState([
    {
      id: 1,
      type: "hama",
      title: "Serangan Wereng Coklat",
      severity: "high",
      location: "Blok A3",
      date: "2024-03-01",
      description: "Terdeteksi potensi serangan wereng coklat pada area sawah.",
      recommendation:
        "Aplikasikan insektisida sistemik dengan dosis 2ml/L air.",
    },
    {
      id: 2,
      type: "cuaca",
      title: "Potensi Hujan Lebat",
      severity: "medium",
      location: "Seluruh Area",
      date: "2024-03-02",
      description:
        "Prakiraan cuaca menunjukkan potensi hujan lebat dalam 3 hari ke depan.",
      recommendation:
        "Siapkan sistem drainase dan lindungi tanaman dari genangan air.",
    },
    {
      id: 3,
      type: "penyakit",
      title: "Blast",
      severity: "high",
      location: "Blok B2",
      date: "2024-03-01",
      description: "Ditemukan gejala penyakit blast pada beberapa rumpun padi.",
      recommendation: "Aplikasikan fungisida dan isolasi area yang terinfeksi.",
    },
  ]);

  // Sample risk metrics
  const riskMetrics = {
    hamaRisk: 75,
    weatherRisk: 45,
    diseaseRisk: 60,
  };

  const navigate = useNavigation();

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="flex items-center gap-6">
              <a href="/dashboard" className="text-amber-600">
                <RiArrowGoBackLine size={35} />
              </a>
              <div>
                <h1 className="text-3xl font-bold text-amber-900">
                  Sistem Peringatan Dini
                </h1>
                <p className="mt-2 text-sm text-gray-600">
                  Monitor dan antisipasi ancaman pada lahan pertanian Anda
                </p>
              </div>
            </div>
          </div>
          <button className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
            <Bell className="h-5 w-5 mr-2" />
            Peringatan Aktif
            <span className="ml-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-700 rounded-full">
              3
            </span>
          </button>
        </div>

        {/* Risk Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Bug className="h-6 w-6 text-amber-400" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Risiko Hama
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {riskMetrics.hamaRisk}%
                      </div>
                      <div className="ml-2 flex items-center text-sm font-semibold text-amber-400">
                        Tinggi
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <CloudRain className="h-6 w-6 text-amber-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Risiko Cuaca
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {riskMetrics.weatherRisk}%
                      </div>
                      <div className="ml-2 flex items-center text-sm font-semibold text-amber-600">
                        Sedang
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Leaf className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Risiko Penyakit
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {riskMetrics.diseaseRisk}%
                      </div>
                      <div className="ml-2 flex items-center text-sm font-semibold text-green-600">
                        Sedang
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Warnings */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Peringatan Aktif
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {warnings.map((warning) => (
              <div key={warning.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {warning.type === "hama" && (
                      <Bug className="h-8 w-8 text-yellow-500" />
                    )}
                    {warning.type === "cuaca" && (
                      <CloudRain className="h-8 w-8 text-amber-500" />
                    )}
                    {warning.type === "penyakit" && (
                      <AlertTriangle className="h-8 w-8 text-red-500" />
                    )}
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {warning.title}
                      </h3>
                      <div className="mt-1 flex items-center">
                        <span className="text-sm text-gray-500">
                          {warning.location} • {warning.date}
                        </span>
                        <span
                          className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            warning.severity === "high"
                              ? "bg-red-100 text-red-800"
                              : warning.severity === "medium"
                              ? "bg-amber-200 text-amber-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {warning.severity === "high"
                            ? "Tinggi"
                            : warning.severity === "medium"
                            ? "Sedang"
                            : "Rendah"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <Shield className="h-5 w-5 mr-2" />
                    Lihat Tindakan
                  </button>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">{warning.description}</p>
                  <div className="mt-2 bg-gray-50 p-4 rounded-md">
                    <h4 className="text-sm font-medium text-gray-900">
                      Rekomendasi:
                    </h4>
                    <p className="mt-1 text-sm text-gray-500">
                      {warning.recommendation}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Prevention Actions */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Tindakan Pencegahan
            </h2>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  Monitoring Rutin
                </h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Periksa tanaman setiap pagi dan sore</li>
                  <li>• Catat setiap perubahan kondisi tanaman</li>
                  <li>• Dokumentasikan dengan foto jika perlu</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  Persiapan Peralatan
                </h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Siapkan alat semprot pestisida</li>
                  <li>• Sediakan stok pestisida dan fungisida</li>
                  <li>• Persiapkan peralatan perlindungan diri</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">
                  Antisipasi Cuaca
                </h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Pantau prakiraan cuaca harian</li>
                  <li>• Siapkan penutup tanaman jika diperlukan</li>
                  <li>• Pastikan sistem drainase berfungsi baik</li>
                </ul>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Konsultasi</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>• Hubungi penyuluh pertanian setempat</li>
                  <li>• Diskusikan dengan kelompok tani</li>
                  <li>• Catat saran dan rekomendasi yang diterima</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
