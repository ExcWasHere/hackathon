import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
  LucideIcon,
} from "lucide-react";

interface FarmerReview {
  id: string;
  farmerName: string;
  serviceType: string;
  date: string;
  usageType?: string;
  content: string;
  image?: string;
  verifiedFarmer: boolean;
}

const agriEaseReviews: FarmerReview[] = [
  {
    id: "ae001",
    farmerName: "Ahmad Taufik",
    serviceType: "Pemantauan Tanaman dengan AI",
    date: "18-10-2023",
    usageType: "Deteksi Penyakit pada Tanaman Padi",
    content:
      "Sistem pemantauan AI di AgriEase sangat membantu saya mendeteksi penyakit pada tanaman lebih awal. Teknologi ini mudah digunakan dan sangat akurat. Setelah menerapkan rekomendasi perawatan, hasil panen saya meningkat signifikan. Layanan ini benar-benar inovatif untuk petani.",
    image: "/images/farmers/ahmad.jpg",
    verifiedFarmer: true,
  },
  {
    id: "ae002",
    farmerName: "Budi Santoso",
    serviceType: "Analisis Tanah",
    date: "05-11-2023",
    usageType: "Pemantauan Nutrisi Tanah",
    content:
      "Analisis tanah dengan teknologi AI di TerraTopia sangat detail dan memberikan rekomendasi yang jelas untuk meningkatkan kesuburan tanah. Saya kini dapat menyesuaikan pemupukan sesuai kebutuhan tanah, yang sangat membantu dalam mengurangi biaya produksi.",
    image: "/images/farmers/budi.jpg",
    verifiedFarmer: true,
  },
  {
    id: "ae003",
    farmerName: "Siti Rahma",
    serviceType: "Sistem Irigasi Cerdas",
    date: "22-11-2023",
    usageType: "Pengelolaan Air Otomatis",
    content:
      "Penggunaan analisis menggunakan AI membantu kami untuk meningkatkan keuntungan dan juga kesuburan tanah.",
    image: "/images/farmers/siti.jpg",
    verifiedFarmer: true,
  },
  {
    id: "ae004",
    farmerName: "Excell Chrsitian",
    serviceType: "Platform Konsultasi AI",
    date: "30-11-2023",
    usageType: "Konsultasi Perawatan Tanaman",
    content:
      "Platform konsultasi AI ini sangat membantu dalam memberikan rekomendasi perawatan yang tepat untuk tanaman saya. Saya dapat berkonsultasi langsung tanpa harus datang ke kantor, sehingga sangat memudahkan di musim tanam yang sibuk.",
    image: "/images/farmers/joko.jpg",
    verifiedFarmer: true,
  },
];

interface NavigationButtonProps {
  onClick: () => void;
  disabled: boolean;
  icon: LucideIcon;
}
const NavigationButton = ({
  onClick,
  disabled,
  icon: Icon,
}: NavigationButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-full transition-all duration-200 
      ${
        disabled
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow"
      } border border-gray-200`}
  >
    <Icon className="w-5 h-5" />
  </button>
);

export default function IndexReview() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentReview = agriEaseReviews[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, agriEaseReviews.length - 1));
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-[90vw] mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                Review dari <span className="text-amber-600">Petani Kami</span>
              </h1>
              <p className="text-lg text-gray-600">
                Pengalaman nyata dari petani yang telah menggunakan teknologi AI
                kami untuk mendukung usaha tani mereka.
              </p>
            </div>

            <div className="bg-white/80 backdrop-blur rounded-2xl shadow-xl p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-gray-900">
                    {currentReview.serviceType}
                  </h3>
                  {currentReview.usageType && (
                    <p className="text-sm font-medium text-gray-500">
                      {currentReview.usageType}
                    </p>
                  )}
                </div>

                <p className="text-lg leading-relaxed text-gray-700">
                  {currentReview.content}
                </p>

                <div className="pt-6 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {currentReview.farmerName}
                        </h3>
                        {currentReview.verifiedFarmer && (
                          <BadgeCheck className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500">
                        {currentReview.date}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <NavigationButton
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        icon={ChevronLeft}
                      />
                      <NavigationButton
                        onClick={handleNext}
                        disabled={currentIndex === agriEaseReviews.length - 1}
                        icon={ChevronRight}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white">
              <img
                src="/index/review.jpg"
                alt="Farmer Review"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-amber-50 to-yellow-50 blur-3xl opacity-30 rounded-full transform translate-x-8 translate-y-8" />
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {agriEaseReviews.map((_, index) => (
            <div
              key={index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentIndex ? "w-8 bg-amber-500" : "w-2 bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
