import React from "react";
import { PiPlant } from "react-icons/pi";

interface ContactMethod {
  title: string;
  value: string;
  description: string;
  icon: string;
}

const contactMethods: ContactMethod[] = [
  {
    title: "WhatsApp",
    value: "+62 813-3050-6652",
    description: "Chat dengan kami di WhatsApp untuk respon cepat",
    icon: "💬",
  },
  {
    title: "Email",
    value: "support@terratopia.com",
    description: "Kirim email untuk pertanyaan detail",
    icon: "📧",
  },
  {
    title: "Telepon",
    value: "(021) 1234-5678",
    description: "Tersedia pada jam kerja (09.00 - 17.00 WIB)",
    icon: "📞",
  },
];

export default function SupportContact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-16 w-[90vw]">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight max-w-xl tracking-tight">
              Hubungi <span className="text-amber-600">TerraTopia</span> untuk
              bantuan
            </h1>
            <p className="max-w-2xl text-xl md:text-2xl text-gray-600 leading-relaxed font-light italic">
              Kami siap membantu Anda dengan pertanyaan, saran, atau masalah
              yang Anda hadapi. Tim support kami yang berdedikasi akan merespon
              secepat mungkin.
            </p>
          </div>
          <div>
            <PiPlant size={40} />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          {/* Contact Methods */}
          <div className="flex flex-col gap-12 lg:w-1/2">
            {contactMethods.map((method, index) => (
              <div
                key={method.title}
                className="transform transition-all duration-300 hover:translate-x-2"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 text-2xl">
                    {method.icon}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                    {method.title}
                  </h2>
                </div>
                <div className="pl-14">
                  <p className="text-lg text-amber-600 font-semibold mb-2">
                    {method.value}
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {method.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form Section */}
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-100 rounded-xl transform rotate-3"></div>
              <div className="relative bg-white rounded-xl shadow-xl p-8 transform transition-all duration-300">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  Kirim Pesan
                </h3>
                <form className="space-y-6">
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300"
                      placeholder="Masukkan nama lengkap Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300"
                      placeholder="Masukkan email Anda"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2 font-medium">
                      Pesan
                    </label>
                    <textarea
                      className="w-full px-4 py-3 rounded-lg border bg-white border-gray-300 focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 h-32"
                      placeholder="Tuliskan pesan Anda"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-300 transform hover:scale-[1.02]"
                  >
                    Kirim Pesan
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="max-w-2xl mx-auto space-y-2 text-gray-600">
            <p className="text-lg">
              Jam Operasional: Senin - Jumat, 09.00 - 17.00 WIB
            </p>
            <p className="text-lg">
              Kami akan merespon pesan Anda dalam waktu 24 jam kerja
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
