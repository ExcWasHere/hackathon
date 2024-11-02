import React from "react";
import {
  IoLeaf,
  IoCloud,
  IoAnalytics,
  IoServer,
  IoBarChart,
  IoFlower,
} from "react-icons/io5";

interface FeatureProps {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

const featureList: FeatureProps[] = [
  {
    id: 1,
    icon: <IoAnalytics className="h-6 w-6 text-emerald-600" />,
    title: "AI Analisis Tanah & Nutrisi",
    subtitle:
      "Analisis tanah real-time menggunakan AI untuk memberikan rekomendasi nutrisi yang tepat dan optimal bagi tanaman Anda.",
  },
  {
    id: 2,
    icon: <IoCloud className="h-6 w-6 text-emerald-600" />,
    title: "Prediksi Cuaca & Irigasi",
    subtitle:
      "Sistem AI yang memprediksi pola cuaca dan mengotomatisasi sistem irigasi untuk penggunaan air yang efisien.",
  },
  {
    id: 3,
    icon: <IoFlower className="h-6 w-6 text-emerald-600" />,
    title: "Monitoring Pertumbuhan Tanaman",
    subtitle:
      "Pemantauan kesehatan tanaman AI untuk deteksi dini hama dan penyakit.",
  },
  {
    id: 4,
    icon: <IoBarChart className="h-6 w-6 text-emerald-600" />,
    title: "Optimasi Hasil Panen",
    subtitle:
      "AI menganalisis data historis dan kondisi untuk memaksimalkan hasil panen dan efisiensi sumber daya.",
  },
  {
    id: 5,
    icon: <IoServer className="h-6 w-6 text-emerald-600" />,
    title: "Smart Farming Database",
    subtitle:
      "Database komprehensif yang diperkaya AI tentang varietas tanaman, teknik budidaya, dan praktik pertanian terbaik.",
  },
  {
    id: 6,
    icon: <IoLeaf className="h-6 w-6 text-emerald-600" />,
    title: "Pertanian Berkelanjutan",
    subtitle:
      "Rekomendasi AI untuk praktik pertanian ramah lingkungan dan berkelanjutan.",
  },
];

const FeatureCard = ({ feature }: { feature: FeatureProps }) => {
  return (
    <div className="bg-white rounded-xl p-8 relative hover:scale-105 hover:shadow-lg transition-all duration-300">
      <div className="absolute inset-5 bg-emerald-100 rounded-xl transform rotate-[1deg]"></div>
      <div className="relative bg-white rounded-xl p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-100">
            {feature.icon}
          </div>
          <h3 className="text-xl font-bold text-gray-800 tracking-tight">
            {feature.title}
          </h3>
        </div>

        <p className="text-gray-600 leading-relaxed mb-4 pl-16">
          {feature.subtitle}
        </p>
      </div>
    </div>
  );
};

export default function IndexFeatures(): JSX.Element {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16 w-[90vw]">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          <p className="max-w-2xl text-xl md:text-2xl text-gray-600 leading-relaxed font-light italic">
            Tingkatkan produktivitas pertanian Anda dengan solusi AI canggih
            yang memberikan wawasan real-time, prediksi akurat, dan rekomendasi
            yang dipersonalisasi untuk setiap tahap pertumbuhan tanaman.
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight max-w-xl tracking-tight">
            Smart Farming dengan
            <span className="text-emerald-600"> Kecerdasan Buatan</span>
          </h1>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featureList.map((feature) => (
            <FeatureCard key={feature.id} feature={feature} />
          ))}
        </div>

        <div className="mt-20 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-200 rounded-xl transform -rotate-3"></div>
              <img
                src="/index/features.jpg"
                alt="Smart Farming"
                className="relative rounded-xl shadow-xl w-full h-[400px] hover:rotate-1 hover:scale-[1.02] object-cover transform transition-transform duration-300"
              />
            </div>
          </div>

          <div className="lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 tracking-tight mb-6">
              Mengapa Memilih Platform{" "}
              <span className="text-emerald-600">Smart Farming</span> Kami?
            </h2>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-semibold">
                  1
                </span>
                <p className="text-lg text-gray-600">
                  AI canggih yang memberikan rekomendasi real-time 24/7
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-semibold">
                  2
                </span>
                <p className="text-lg text-gray-600">
                  Solusi yang dipersonalisasi untuk setiap jenis tanaman dan
                  kondisi
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-semibold">
                  3
                </span>
                <p className="text-lg text-gray-600">
                  Pemantauan komprehensif dan prediksi berbasis data
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
