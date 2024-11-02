import { BiChevronRight } from "react-icons/bi";

export default function AboutUsContact(): JSX.Element {
  return (
    <div className="relative h-screen bg-gradient-to-br from-green-300 to-green-600 text-white">
 <div className="absolute inset-0">
  <img src="/about-us/hero.jpg" alt="Hero Image" className="object-cover h-full w-full" />
</div>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black to-transparent"></div>
      <main className="relative z-10 flex w-[80vw] mx-auto py-8 items-center justify-between h-full">
        <div className="flex flex-col max-w-xl space-y-10">
          <h1 className="text-6xl font-semibold leading-snug">
            Have a question? Our team is happy to assist you
          </h1>
          <p className="text-lg max-w-[28rem]">
            Ask about Serene, our services, or anything else. Our highly trained
            reps are standing by, ready to help.
          </p>
          <hr className="border-t-2 border-gray-600" />
          <div className="flex space-x-6 items-center">
            <button className="flex items-center justify-between px-8 py-4 bg-white text-gray-800 rounded-xl shadow-xl font-bold hover:scale-110 transition-all duration-500">
              Contact Us <BiChevronRight size={25} />
            </button>
            <p>Or call us at +1 (555) 555-5555</p>
          </div>
        </div>

        {/* <div className="relative group">
          <img
            src="about-us/about-us2.png"
            alt="Customer Service"
            className="z-10 relative rounded-xl shadow-xl w-fit h-fit hover:scale-[1.03] group-hover:-rotate-3 transition-all duration-300"
          />
          <div className="absolute inset-0 z-0 rounded-xl rotate-3 bg-sky-800 shadow-md"></div>
          <div className="absolute group-hover:-rotate-3 transition-all duration-300 inset-0 z-10 rounded-xl bg-gradient-to-t from-sky-600 via-transparent to-transparent shadow-md opacity-50"></div>
        </div> */}
      </main>
    </div>
  );
}
