import React from "react";

interface ProcessProps {
  title: string;
  subtitle: string;
  image: string;
}

const processList: ProcessProps[] = [
  {
    title: "Input Informasi Mengenai Lahan Anda",
    subtitle:
      "Masukkan informasi tentang lahan anda, seperti jenis tanaman, jenis tanah, dan suhu cuaca.",
    image: "pilih-layanan.jpg",
  },
  {
    title: "Klik Generate Informasi Lahan Anda",
    subtitle:
      "Dengan beberapa klik, kami akan menemukan informasi yang sesuai dengan lahan anda, seperti tanaman yang cocok untuk lahan anda.",
    image: "buat-janji.jpg",
  },
  {
    title: "Simpan Hasil Informasi Lahan Anda",
    subtitle:
      "Setelah mencocokkan informasi yang sesuai dengan lahan anda, kami akan memberikan informasi tentang lahan anda, kemudian simpan hasil generate.",
    image: "terima-perawatan.jpg",
  },
];

export default function IndexIntroduction() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 ">
      <div className="container mx-auto px-4 py-16 w-[90vw]">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight max-w-xl tracking-tight">
            Perkenankan saya memaparkan{" "}
            <span className="text-amber-600">mekanisme kerjanya.</span>
          </h1>
          <p className="max-w-2xl text-xl md:text-2xl text-gray-600 leading-relaxed font-light italic">
            Kami hadir untuk memandu Anda langkah demi langkah, dari awal hingga
            akhir. Dengan antarmuka yang sederhana dan interaksi yang alami,
            Anda bebas menjelajahi berbagai sumber daya yang kami siapkan khusus
            untuk Anda.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          <div className="flex flex-col gap-12 lg:w-1/2">
            {processList.map((list, index) => (
              <div
                key={list.title}
                className="transform transition-all duration-300 hover:translate-x-2"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-semibold">
                    {index + 1}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                    {list.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed pl-12">
                  {list.subtitle}
                </p>
              </div>
            ))}
          </div>

          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-200 rounded-xl transform rotate-3"></div>
              <img
                src="/index/intro.jpg"
                alt="Process Illustration"
                className="relative rounded-xl shadow-xl w-full h-[500px] object-cover transform transition-all duration-300 hover:-rotate-[1deg] hover:scale-[1.02]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
