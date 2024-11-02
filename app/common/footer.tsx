import { Link } from "@remix-run/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Footer(): JSX.Element {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <footer className="w-full bg-emerald-900 py-4 md:py-12">
      <div className="hidden max-w-7xl mx-auto px-4 md:flex items-start justify-between text-white">
        <div>
          <h2 className="text-2xl font-bold">
            Terra<span className="text-emerald-300">Topia</span>
          </h2>
        </div>

        <div className="flex flex-col space-y-3">
          <h3 className="text-xl font-bold mb-2">About Us</h3>
          <Link to="/our-story" className="hover:text-emerald-200">
            Our Story
          </Link>
          <Link to="/why-healthease" className="hover:text-emerald-200">
            Why HealthEase?
          </Link>
          <Link to="/testimonial" className="hover:text-emerald-200">
            Testimonial
          </Link>
        </div>

        <div className="flex flex-col space-y-3">
          <h3 className="text-xl font-bold mb-2">Support</h3>
          <Link to="/faq" className="hover:text-emerald-200">
            FAQ
          </Link>
          <Link to="/contact" className="hover:text-emerald-200">
            Contact Us
          </Link>
          <Link to="/help" className="hover:text-emerald-200">
            Help Center
          </Link>
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded hover:bg-white/30 cursor-pointer"></div>
              <div className="w-8 h-8 bg-white/20 rounded hover:bg-white/30 cursor-pointer"></div>
              <div className="w-8 h-8 bg-white/20 rounded hover:bg-white/30 cursor-pointer"></div>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <Link to="/privacy" className="hover:text-emerald-200">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-emerald-200">
              Terms of Service
            </Link>
            <span>|</span>
            <Link to="/cookies" className="hover:text-emerald-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>

      {/* Iki mobile :v */}
      <div className="flex flex-col md:hidden space-y-3 px-4 text-white">
        <button
          className="flex w-full items-center justify-between px-4"
          onClick={handleClick}
        >
          <h2 className="text-4xl font-bold">HealthEase</h2>
          <ChevronRight
            size={40}
            className={`${isActive === true ? "rotate-180" : ""}}`}
          />
        </button>

        <div
          className={`flex flex-col space-y-3 ml-4 w-full text-2xl font-medium ${
            isActive === true ? "block" : "hidden"
          }`}
        >
          <Link to="/profile" className="hover:text-emerald-200">
            Profile
          </Link>
          <Link to="/jaminan-kesehatan" className="hover:text-emerald-200">
            Jaminan Kesehatan
          </Link>
          <Link to="/layanan" className="hover:text-emerald-200">
            Layanan
          </Link>
          <Link to="/informasi-publik" className="hover:text-emerald-200">
            Informasi Publik
          </Link>
          <Link to="/tautan" className="hover:text-emerald-200">
            Tautan
          </Link>
        </div>

        <div className="flex flex-col space-y-3 ml-4">
          <h3 className="text-xl font-bold mb-2">About Us</h3>
          <Link to="/our-story" className="hover:text-emerald-200">
            Our Story
          </Link>
          <Link to="/why-healthease" className="hover:text-emerald-200">
            Why TerraTopia?
          </Link>
          <Link to="/testimonial" className="hover:text-emerald-200">
            Testimonial
          </Link>
        </div>

        <div className="flex flex-col space-y-3 ml-4">
          <h3 className="text-xl font-bold mb-2">Support</h3>
          <Link to="/faq" className="hover:text-emerald-200">
            FAQ
          </Link>
          <Link to="/contact" className="hover:text-emerald-200">
            Contact Us
          </Link>
          <Link to="/help" className="hover:text-emerald-200">
            Help Center
          </Link>
        </div>

        <div className="flex flex-col space-y-6">
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <div className="w-8 h-8 bg-white/20 rounded hover:bg-white/30 cursor-pointer"></div>
              <div className="w-8 h-8 bg-white/20 rounded hover:bg-white/30 cursor-pointer"></div>
              <div className="w-8 h-8 bg-white/20 rounded hover:bg-white/30 cursor-pointer"></div>
            </div>
          </div>

          <div className="flex items-center space-x-3 text-sm">
            <Link to="/privacy" className="hover:text-emerald-200">
              Privacy Policy
            </Link>
            <span>|</span>
            <Link to="/terms" className="hover:text-emerald-200">
              Terms of Service
            </Link>
            <span>|</span>
            <Link to="/cookies" className="hover:text-emerald-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
