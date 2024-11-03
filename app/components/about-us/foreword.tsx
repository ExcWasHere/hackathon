import React from "react";

export default function TentangKamiPendahuluan(): JSX.Element {
  const jumlahAnggotaTim = 3;
  const TAHUN_PENDIRIAN_SERENE = 2019;
  const pengalamanBertahunTahun =
    new Date().getFullYear() - TAHUN_PENDIRIAN_SERENE;
  const jumlahKomunitasAktif = 17291;
  const komunitasAktif = formatNumber(jumlahKomunitasAktif);

  function formatNumber(num: number): number {
    if (num >= 1000) {
      const roundedNum = Math.round(num / 1000) * 1000;
      return roundedNum;
    }
    return num;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white text-black">
      {/* Hero Section */}
      <div className="relative pt-16 pb-24 flex flex-col md:flex-row h-full max-w-7xl mx-auto justify-between px-6">
        <h1 className="text-black font-bold text-5xl md:text-7xl max-w-2xl mb-8 md:mb-0 leading-tight">
          Bersama kita <br /> semakin{" "}
          <span className="text-amber-600 relative">
            kuat
            <span className="absolute bottom-0 left-0 w-full h-2 bg-amber-200/50"></span>
          </span>
        </h1>
        <div className="flex flex-col h-auto md:h-[40vh] justify-between space-y-8">
          <h2 className="text-gray-700 max-w-2xl text-lg md:text-xl font-medium leading-relaxed">
            Kami percaya bahwa panen yang melimpah adalah perjalanan yang kita
            tempuh bersama. Komunitas kami semakin kuat setiap hari, bersatu
            dengan satu tujuan: untuk menumbuhkan tanah yang subur, praktik
            pertanian yang bijak, dan{" "}
            <span className="text-amber-600 font-semibold">keseimbangan</span>{" "}
            dalam ekosistem kita.
          </h2>
          <p className="text-gray-600 max-w-2xl text-base leading-relaxed">
            Pada tahun 2024,{" "}
            <span className="text-amber-600 font-semibold">TerraTopia</span>{" "}
            didirikan untuk memberikan lahan subur di tengah kekacauan hidup.
            Platform kami menyatukan individu-individu yang sepaham tentang
            pentingnya menumbuhkan{" "}
            <span className="text-amber-600">keseimbangan</span> di ekosistem
            kita. Dengan membangun komunitas dan koneksi, kami bertujuan untuk
            memberdayakan pengguna kami hidup lebih{" "}
            <span className="text-amber-600">bijaksana</span> dan menemukan{" "}
            <span className="text-amber-600">ketenangan</span> di tengah
            tantangan hidup.
          </p>
        </div>
      </div>

      {/* CEO Quote Section */}
      <div className="bg-amber-50 py-16">
        <div className="flex flex-col md:flex-row max-w-7xl mx-auto justify-between items-center px-6 space-y-8 md:space-y-0">
          <div className="flex items-center mb-8 md:mb-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-amber-200 rounded-full blur-sm"></div>
              <img
                src="/about-us/profile/mud.jpg"
                alt="CEO dari Serene"
                className="relative w-16 h-16 md:w-20 md:h-20 object-cover rounded-full shadow-lg"
              />
            </div>
            <div className="ml-6 flex flex-col">
              <h3 className="font-bold text-xl md:text-2xl text-gray-900">
                Pramudya Surya
              </h3>
              <p className="font-medium text-amber-600">Pendiri & CEO</p>
            </div>
          </div>
          <div className="md:ml-12">
            <blockquote className="max-w-3xl text-3xl md:text-4xl font-bold leading-tight text-gray-900">
              "Tujuan kami adalah mengolah setiap lahan menuju kelimpahan,
              menyediakan ruang di mana pertumbuhan dan{" "}
              <span className="text-amber-600">nutrisi</span> berkembang,
              menciptakan panen yang sehat dan keseimbangan dalam segala aspek
              kehidupan pertanian."
            </blockquote>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-7xl mx-auto px-6">
          {/* Stat Card 1 */}
          <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-amber-100 hover:border-amber-200">
            <div className="flex flex-col items-center text-center">
              <span className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                {jumlahAnggotaTim}
              </span>
              <span className="text-2xl font-semibold text-amber-600 mb-4">
                Dev
              </span>
              <p className="text-gray-600">
                <strong className="text-gray-900">
                  3 developer yang berpengalaman
                </strong>{" "}
                dalam bidang agraris, membawa wawasan dan keahlian unik untuk
                membantu Anda.
              </p>
            </div>
          </div>

          {/* Stat Card 2 */}
          <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-amber-100 hover:border-amber-200">
            <div className="flex flex-col items-center text-center">
              <span className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                {pengalamanBertahunTahun}
              </span>
              <span className="text-2xl font-semibold text-amber-600 mb-4">
                Tahun
              </span>
              <p className="text-gray-600">
                <strong className="text-gray-900">
                  Dengan pengalaman bertahun-tahun
                </strong>
                , tim kami telah mengasah keahlian untuk menyediakan konten
                inspiratif.
              </p>
            </div>
          </div>

          {/* Stat Card 3 */}
          <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-amber-100 hover:border-amber-200">
            <div className="flex flex-col items-center text-center">
              <span className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                10k+
              </span>
              <span className="text-2xl font-semibold text-amber-600 mb-4">
                User
              </span>
              <p className="text-gray-600">
                <strong className="text-gray-900">
                  Kami telah membantu lebih dari 10.000
                </strong>{" "}
                user untuk menyelesaikan permasalahan pertanian mereka.
              </p>
            </div>
          </div>

          {/* Stat Card 4 */}
          <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 border border-amber-100 hover:border-amber-200">
            <div className="flex flex-col items-center text-center">
              <span className="text-5xl md:text-6xl font-bold text-gray-900 mb-2">
                {komunitasAktif}+
              </span>
              <span className="text-2xl font-semibold text-amber-600 mb-4">
                Komunitas
              </span>
              <p className="text-gray-600">
                <strong className="text-gray-900">
                  Komunitas aktif kami yang terus berkembang
                </strong>{" "}
                memiliki lebih dari{" "}
                <span className="text-amber-600 font-semibold">
                  {komunitasAktif}
                </span>{" "}
                pengguna terdaftar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
