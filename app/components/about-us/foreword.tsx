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
    <div className="min-h-screen bg-white text-black">
      <div className="pt-12 flex flex-col md:flex-row h-full py-20 max-w-7xl mx-auto my-auto justify-between px-4">
        <h1 className="text-black font-semibold text-4xl md:text-6xl max-w-2xl mb-8 md:mb-0">
          Bersama kita <br /> semakin{" "}
          <span className="text-amber-600">kuat.</span>
        </h1>
        <div className="flex flex-col h-auto md:h-[40vh] justify-between">
          <h2 className="text-gray italic max-w-2xl text-base md:text-lg font-medium">
            Kami percaya bahwa panen yang melimpah adalah perjalanan yang kita
            tempuh bersama. Komunitas kami semakin kuat setiap hari, bersatu
            dengan satu tujuan: untuk menumbuhkan tanah yang subur, praktik
            pertanian yang bijak, dan{" "}
            <span className="text-amber-600">keseimbangan</span> dalam ekosistem
            kita.
          </h2>
          <p className="text-gray max-w-2xl font-light mt-4 md:mt-0">
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
            tantangan hidup. Misi kami adalah menciptakan ruang di mana orang
            bisa berkumpul, berbagi pengalaman, dan belajar dari satu sama lain,
            menuju dunia yang lebih harmonis dan seimbang.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-full max-w-7xl mx-auto my-auto justify-between items-center px-4">
        <div className="flex justify-center items-center mb-8 md:mb-0">
          <img
            src="/about-us/profile/mud.jpg"
            alt="CEO dari Serene"
            className="w-12 h-12 md:w-16 md:h-16 object-cover rounded-full shadow-md"
          />
          <div className="ml-5 flex flex-col">
            <h1 className="font-semibold text-lg md:text-xl">Pramudya Surya</h1>
            <h2 className="font-light italic text-gray-500">Pendiri & CEO</h2>
          </div>
        </div>
        <div>
          <h1 className="max-w-3xl font-bold text-4xl md:text-6xl">
            “Tujuan kami adalah mengolah setiap lahan menuju kelimpahan,
            menyediakan ruang di mana pertumbuhan dan{" "}
            <span className="text-amber-600">nutrisi</span> berkembang,
            menciptakan panen yang sehat dan keseimbangan dalam segala aspek
            kehidupan pertanian.”
          </h1>
        </div>
      </div>

      <div className="mt-16 flex flex-col md:flex-row h-auto md:h-[50vh] w-[90vw] gap-8 mx-auto my-auto justify-between px-4">
        <div className="flex flex-col justify-start mb-8 md:mb-0">
          <h1 className="text-center font-bold text-4xl md:text-6xl mb-4">
            {jumlahAnggotaTim}{" "}
            <span className="text-3xl md:text-5xl font-semibold text-amber-600">
              Dev
            </span>
          </h1>
          <p className="text-gray-700 max-w-lg">
            <b>3 developer yang berpengalaman</b> dalam bidang agraris, membawa
            wawasan dan keahlian unik untuk membantu Anda mencapai tujuan Anda.
          </p>
        </div>
        <div className="flex flex-col justify-start mb-8 md:mb-0">
          <h1 className="text-center font-bold text-4xl md:text-6xl mb-4">
            {pengalamanBertahunTahun}{" "}
            <span className="text-3xl md:text-5xl font-semibold text-amber-600">
              Tahun
            </span>
          </h1>
          <p className="text-gray-700 max-w-lg">
            <b>Dengan pengalaman bertahun-tahun</b>, tim Serene telah mengasah
            keahlian mereka untuk menyediakan konten yang penuh inspirasi.
          </p>
        </div>
        <div className="flex flex-col justify-start mb-8 md:mb-0">
          <h1 className="text-center font-bold text-4xl md:text-6xl mb-4">
            10k<span className="text-amber-600">+</span>
            <span className="text-3xl md:text-5xl font-semibold text-amber-600">
              User
            </span>
          </h1>
          <p className="text-gray-700 max-w-lg">
            <b>Kami telah membantu lebih dari 10.000</b> user untuk
            menyelesaikan permasalahan pertanian mereka.
          </p>
        </div>
        <div className="flex flex-col justify-start">
          <h1 className="text-center font-bold text-4xl md:text-6xl mb-4">
            {komunitasAktif}
            <span className="text-3xl md:text-5xl font-semibold text-amber-600">
              +
            </span>
          </h1>
          <p className="text-gray-700 max-w-lg">
            <b>
              Komunitas kami yang terus berkembang sebanyak {komunitasAktif}+
              user
            </b>{" "}
            memiliki akun terbuat sebanyak lebih dari{" "}
            <span className="text-amber-600">{komunitasAktif}</span> pada
            website TerraTopia
          </p>
        </div>
      </div>
    </div>
  );
}
