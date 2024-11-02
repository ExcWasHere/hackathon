import { Link } from "@remix-run/react";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <footer className="w-full bg-amber-900 py-8 md:py-12 text-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        {/* Desktop View */}
        <div className="hidden md:flex flex-col lg:flex-row items-start justify-between">
          {/* Logo and Description Section */}
          <div className="lg:w-1/3 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold">
              Terra<span className="text-amber-300">Topia</span>
            </h2>
            <p className="mt-4 text-sm lg:text-base text-white/80 max-w-md">
              TerraTopia berupaya mendukung pelestarian lingkungan dan pembangunan berkelanjutan
              demi masa depan bumi yang lebih baik untuk generasi mendatang.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* About Us */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-xl font-bold mb-2">About Us</h3>
              <Link to="/our-story" className="hover:text-amber-200 transition-colors">
                Our Story
              </Link>
              <Link to="/why-terratopia" className="hover:text-amber-200 transition-colors">
                Why TerraTopia?
              </Link>
              <Link to="/testimonial" className="hover:text-amber-200 transition-colors">
                Testimonials
              </Link>
            </div>

            {/* Support */}
            <div className="flex flex-col space-y-3">
              <h3 className="text-xl font-bold mb-2">Support</h3>
              <Link to="/faq" className="hover:text-amber-200 transition-colors">
                FAQ
              </Link>
              <Link to="/contact" className="hover:text-amber-200 transition-colors">
                Contact Us
              </Link>
              <Link to="/help" className="hover:text-amber-200 transition-colors">
                Help Center
              </Link>
            </div>

            {/* Social and Policies */}
            <div className="flex flex-col space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 cursor-pointer transition-colors flex items-center justify-center"></div>
                  <div className="w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 cursor-pointer transition-colors flex items-center justify-center"></div>
                  <div className="w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 cursor-pointer transition-colors flex items-center justify-center"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-6">
          {/* Mobile Header */}
          <button
            className="flex w-full items-center justify-between"
            onClick={handleClick}
          >
            <h2 className="text-2xl font-bold">
              Terra<span className="text-amber-300">Topia</span>
            </h2>
            <ChevronRight
              size={24}
              className={`transform transition-transform ${isActive ? "rotate-90" : ""}`}
            />
          </button>

          {/* Mobile Menu */}
          <div
            className={`space-y-6 ${
              isActive ? "block" : "hidden"
            }`}
          >
            {/* Description */}
            <p className="text-sm text-white/80">
              TerraTopia berupaya mendukung pelestarian lingkungan dan pembangunan berkelanjutan
              demi masa depan bumi yang lebih baik untuk generasi mendatang.
            </p>

            {/* Mobile Navigation */}
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-lg font-bold">About Us</h3>
                <div className="flex flex-col space-y-2">
                  <Link to="/our-story" className="hover:text-amber-200">
                    Our Story
                  </Link>
                  <Link to="/why-terratopia" className="hover:text-amber-200">
                    Why TerraTopia?
                  </Link>
                  <Link to="/testimonial" className="hover:text-amber-200">
                    Testimonials
                  </Link>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-lg font-bold">Support</h3>
                <div className="flex flex-col space-y-2">
                  <Link to="/faq" className="hover:text-amber-200">
                    FAQ
                  </Link>
                  <Link to="/contact" className="hover:text-amber-200">
                    Contact Us
                  </Link>
                  <Link to="/help" className="hover:text-amber-200">
                    Help Center
                  </Link>
                </div>
              </div>
            </div>

            {/* Mobile Social */}
            <div>
              <h3 className="text-lg font-bold mb-3">Follow Us</h3>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 cursor-pointer transition-colors flex items-center justify-center"></div>
                <div className="w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 cursor-pointer transition-colors flex items-center justify-center"></div>
                <div className="w-10 h-10 bg-white/20 rounded-full hover:bg-white/30 cursor-pointer transition-colors flex items-center justify-center"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Policies */}
        <div className="mt-8 pt-6 border-t border-white/20">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-white/80">
            <Link to="/privacy" className="hover:text-amber-200">
              Privacy Policy
            </Link>
            <span className="hidden md:block">|</span>
            <Link to="/terms" className="hover:text-amber-200">
              Terms of Service
            </Link>
            <span className="hidden md:block">|</span>
            <Link to="/cookies" className="hover:text-amber-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
