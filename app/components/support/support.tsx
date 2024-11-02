import React from "react";

interface SupportCategory {
  icon: string;
  title: string;
  description: string;
}

const supportCategories: SupportCategory[] = [
  {
    icon: "👤",
    title: "My account",
    description: "Create and manage your Brevo account",
  },
  {
    icon: "✉️",
    title: "Email campaigns",
    description:
      "Engage your contacts using the best mobile-friendly email design tools",
  },
  {
    icon: "📱",
    title: "WhatsApp & SMS",
    description:
      "Connect directly with your contacts using targeted WhatsApp & SMS messages",
  },
];

const faqs = [
  {
    question: "Bagaimana cara memulai dengan TerraTopia?",
    answer:
      "Untuk memulai, cukup mendaftar akun di website kami dan ikuti panduan langkah demi langkah yang telah kami sediakan untuk mengatur profil dan preferensi agrikultural Anda.",
  },
  {
    question: "Bagaimana cara kerja analisis data pertanian menggunakan AI?",
    answer:
      "TerraTopia mengumpulkan data dari berbagai sumber, seperti sensor lapangan dan citra satelit, kemudian menganalisisnya menggunakan algoritma AI untuk memberikan wawasan dan rekomendasi bagi peningkatan hasil pertanian.",
  },
  {
    question: "Apakah platform ini mendukung keberlanjutan pertanian?",
    answer:
      "Ya, TerraTopia dirancang untuk mendukung pertanian berkelanjutan dengan memberikan rekomendasi yang membantu mengurangi penggunaan sumber daya dan meningkatkan efisiensi produksi.",
  },
];

export default function SupportMain() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight max-w-xl tracking-tight">
            Pusat Bantuan <span className="text-amber-600">TerraTopia</span>
          </h1>
          <p className="max-w-2xl text-xl md:text-2xl text-gray-600 leading-relaxed font-light italic">
            Temukan jawaban atas pertanyaan Anda dan pelajari cara
            mengoptimalkan penggunaan layanan kami untuk hasil pertanian yang
            lebih baik.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
          <div className="flex flex-col gap-12 lg:w-1/2">
            {supportCategories.map((category) => (
              <div
                key={category.title}
                className="category-item transform transition-all duration-300 hover:translate-x-2"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-amber-100 text-amber-600 font-semibold">
                    {category.icon}
                  </span>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
                    {category.title}
                  </h2>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed pl-12">
                  {category.description}
                </p>
              </div>
            ))}
          </div>

          <div className="group ">
            <div className="relative w-fit h-fit">
              <div className="absolute inset-0 bg-amber-200 rounded-xl transform rotate-3"></div>
              <div className="absolute z-10 inset-0 bg-gradient-to-t from-amber-600 via-transparent to-transparent rounded-xl group-hover:rotate-2 group-hover:scale-[1.02] group-hover:shadow-2xl transition-all duration-300"></div>

              <img
                src="/support/help-center.jpg"
                alt="Support Illustration"
                className="relative rounded-xl shadow-xl w-[400px] h-[400px] object-cover transform hover:-rotate-[1deg] group-hover:rotate-2 group-hover:scale-[1.02] group-hover:shadow-2xl transition-all duration-300"
              />
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Pertanyaan yang Sering Diajukan
          </h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
