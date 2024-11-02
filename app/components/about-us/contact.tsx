import { BiChevronRight } from "react-icons/bi";

export default function AboutUsContact(): JSX.Element {
  return (
    <div className="relative h-screen bg-gradient-to-br from-green-300 to-green-600 text-white">
      <div className="absolute inset-0">
        <img
          src="/about-us/hero.jpg"
          alt="Hero Image"
          className="object-cover h-full w-full"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent"></div>
      <main className="relative z-10 flex flex-col md:flex-row w-[90vw] mx-auto py-8 items-center justify-between h-full text-center md:text-left">
        <div className="flex flex-col max-w-xl space-y-10">
          <h1 className="text-4xl md:text-6xl font-semibold leading-snug">
            Have a <span className="text-amber-600">question?</span> Our team is
            happy to assist you
          </h1>
          <p className="text-base md:text-lg max-w-[28rem]">
            Ask about Serene, our services, or anything else. Our highly trained
            reps are standing by, ready to help.
          </p>
          <hr className="border-t-2 border-gray-600" />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center">
            <button className="flex items-center justify-between px-8 py-4 bg-amber-200 text-black rounded-xl shadow-xl font-bold hover:scale-110 transition-all duration-500">
              Contact Us <BiChevronRight size={25} />
            </button>
            <p>Or call us at +1 (555) 555-5555</p>
          </div>
        </div>
      </main>
    </div>
  );
}
