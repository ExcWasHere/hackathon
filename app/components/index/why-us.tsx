import React from "react";
import { Check } from "lucide-react";

const farmingPractices = [
  "Pertanian Organik",
  "Manajemen Air Efisien",
  "Rotasi Tanaman",
  "Pemantauan Harian",
  "Pengendalian Hama Terpadu",
  "Penggunaan Teknologi Smart Farm",
  "Pengelolaan Nutrisi Tanah",
  "Panen Tepat Waktu",
];

export default function IndexAdvantage() {
  return (
    <div className="min-h-screen py-12 bg-white">
      <div className="container w-[90vw] mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-12">
        <article className="max-w-2xl flex flex-col space-y-6">
          <h4 className="text-amber-600 font-semibold text-lg tracking-wide">
            Keunggulan Kami
          </h4>

          <h1 className="font-bold text-4xl lg:text-5xl text-gray-900 leading-tight">
            Menghadirkan Solusi Pertanian Modern dengan Teknologi Terdepan
          </h1>

          <p className="text-lg text-gray-600 leading-relaxed">
            Hasil panen berkualitas adalah prioritas kami. Dengan dukungan tim
            ahli pertanian dan teknologi modern, kami berkomitmen untuk
            mengoptimalkan produktivitas lahan dan keberlanjutan pertanian.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {farmingPractices.map((practice) => (
              <div
                key={practice}
                className="flex items-center space-x-2 text-gray-700 font-medium"
              >
                <Check className="text-amber-500 h-5 w-5" />
                <span className="text-base">{practice}</span>
              </div>
            ))}
          </div>
          <a
            href="/register"
            className="mt-6 flex px-6 py-3 bg-amber-600 text-white w-fit rounded-lg shadow-lg hover:scale-105 transition-all duration-500"
          >
            Daftar sekarang
          </a>
        </article>

        <div className="hidden lg:flex relative w-full lg:w-auto flex-shrink-0">
          <div className="absolute top-1/2 -right-10 -translate-y-1/2 h-[32rem] w-[20rem] bg-amber-200 rounded-lg"></div>
          <img
            src="/index/why-us.jpg"
            alt="Lahan Pertanian Modern"
            className="relative w-[30rem] h-[25rem] max-w-xl rounded-lg object-cover shadow-xl hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>
    </div>
  );
}
