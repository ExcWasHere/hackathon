import { useLocation } from "@remix-run/react";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const currentPage = useLocation();

  useEffect(() => {
    if (
      currentPage.pathname === "/categories" ||
      currentPage.pathname === "/dashboard" 
    ) {
      setIsScrolled(true);
    } else {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        if (currentPage.pathname === "/about-us" || currentPage.pathname === "/support" ) {
          setIsScrolled(scrollPosition >= window.innerHeight * 0.4);
        } else {
          setIsScrolled(scrollPosition >= window.innerHeight * 0.85);
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [currentPage.pathname]);

  const navItems = ["Home", "About Us", "Support"];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        <li key={item}>
          <a
            href={`${
              item === "Home"
                ? "/"
                : `/${item.toLowerCase().replace(/\s+/g, "-")}`
            }`}
            className="hover:text-amber-400 transition-colors duration-200"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            {item}
          </a>
        </li>
      ))}
    </>
  );

  return (
    <>
      <div
        className={`w-full top-0 left-0 z-50 fixed h-16 flex justify-between items-center shadow-xl px-4 md:px-6 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? "text-black bg-white" : "text-white"
        }`}
      >
        <div>
          <h1 className="text-xl font-bold">
            Terra<span className="text-amber-400">Topia</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex gap-7 font-semibold">
            <NavLinks />
          </ul>
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center">
          <div className="ml-7 flex gap-4 items-center">
            <h1>
              <a
                href="/login"
                className="hover:text-amber-400 transition-colors duration-200"
              >
                Login
              </a>
            </h1>
            <h1>
              <a
                href="/register"
                className="cursor-pointer text-black bg-amber-400 px-6 py-2 rounded-xl shadow-md hover:bg-amber-800 hover:text-white transition-all duration-200"
              >
                Sign Up
              </a>
            </h1>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed right-0 top-16 w-64 bg-white shadow-xl z-40 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="py-4 text-black">
          <ul className="ml-4 flex flex-col gap-4 font-semibold">
            <NavLinks />
          </ul>
          <div className="mt-4 px-4 flex flex-col gap-4">
            <a
              href="/login"
              className="text-center hover:text-amber-400 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login
            </a>
            <a
              href="/register"
              className="text-center text-black bg-amber-400 px-6 py-2 rounded-xl shadow-md hover:bg-amber-800 hover:text-white transition-all duration-200"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign Up
            </a>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
