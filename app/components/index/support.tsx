import React from "react";
import { BiData } from "react-icons/bi";
import { BsCpu } from "react-icons/bs";
import { GiPlantWatering } from "react-icons/gi";
import { TiWeatherCloudy } from "react-icons/ti";

interface AccordionProps {
  title: string;
  subtitle: string;
  icon: JSX.Element;
}

const accordionList: AccordionProps[] = [
  {
    title: "Optimalisasi Pertanian dengan AI",
    subtitle:
      "Kami menggunakan teknologi AI untuk menganalisis data tanah dan cuaca, sehingga petani dapat membuat keputusan yang lebih baik dan meningkatkan hasil panen.",
    icon: <BsCpu />,
  },
  {
    title: "Sistem Peringatan Dini Berbasis AI",
    subtitle:
      "Sistem kami memberikan peringatan dini tentang hama dan penyakit tanaman, memungkinkan petani untuk mengambil tindakan cepat dan mengurangi kerugian.",
    icon: <TiWeatherCloudy />,
  },
  {
    title: "Analisis Data untuk Perencanaan Pertanian",
    subtitle:
      "Menggunakan analisis data besar, kami membantu petani merencanakan musim tanam dan memilih varietas tanaman yang paling sesuai dengan kondisi lokal.",
    icon: <BiData />,
  },
];

export default function IndexSupport() {
  return (
    <div className="h-[170vh] bg-gradient-to-br from-green-900 to-green-700">
      <div className="w-[90vw] mx-auto px-6 lg:px-8 h-full items-center">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between h-full gap-16">
          <div className="lg:w-1/2 h-full relative hidden lg:block">
            <div className="absolute inset-0 bg-green-700/10 backdrop-blur-sm rounded-3xl" />
            <img
              src="/index/support.jpg"
              alt="Gambar Dukungan"
              className="hidden md:block h-full w-full object-cover shadow-2xl"
            />
          </div>

          <div className="lg:w-1/2 space-y-12">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-light text-gray-50 leading-tight tracking-tight">
                Kami peduli pada pertanian Anda,{" "}
                <span className="font-semibold mt-2 inline-flex">
                  kami mendukung dengan hati <GiPlantWatering />
                </span>
              </h1>

              <p className="text-lg text-gray-300 leading-relaxed tracking-wide">
                <span className="text-green-200 font-medium">TerraTopia</span>{" "}
                adalah pusat layanan pertanian modern yang berkomitmen untuk
                memberikan pengalaman yang nyaman, terjangkau, dan berkualitas
                tinggi dalam mendukung kesejahteraan petani.
              </p>
            </div>

            <div className="space-y-4">
              {accordionList.map((list, index) => (
                <div
                  key={list.title}
                  className="group relative overflow-hidden"
                >
                  <div
                    className="relative p-6 bg-green-100/10 backdrop-blur-md rounded-2xl 
                                border border-green-100/20 hover:border-green-100/40
                                transition-all duration-300 ease-in-out
                                hover:bg-green-100/20"
                  >
                    <div className="space-y-2">
                      <h2 className="inline-flex items-center gap-2 text-xl font-medium text-green-100 tracking-wide">
                        {list.icon}
                        {list.title}
                      </h2>
                      <p className="text-gray-300 leading-relaxed">
                        {list.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
