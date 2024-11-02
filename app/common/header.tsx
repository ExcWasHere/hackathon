import { useLocation } from "@remix-run/react";
import { useEffect, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdLanguage } from "react-icons/md";
interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const currentPage = useLocation();

  useEffect(() => {
    if (currentPage.pathname === "/categories") {
      setIsScrolled(true);
    } else {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition >= window.innerHeight * 0.85);
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  return (
    <div
      className={`w-full top-0 left-0 z-50 fixed h-16 flex justify-between items-center shadow-xl px-6 transition-all duration-300 ${
        isScrolled ? "text-black bg-white" : "text-white"
      }`}
    >
      <div>
        <h1 className="text-xl font-bold">
          Terra<span className="text-emerald-400">Topia</span>
        </h1>
      </div>
      <nav>
        <ul className="flex gap-7 font-semibold">
          {["Home", "About Us", "Contact Us"].map((item) => (
            <li key={item}>
              <a
                href={`${
                  item === "Home"
                    ? "/"
                    : `/${item.toLowerCase().replace(/\s+/g, "-")}`
                }`}
                className="hover:text-emerald-400 transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    
      <div className="flex items-center">
        <div className="ml-7 flex gap-4 items-center">
          <h1>
            <a
              href="/"
              className="hover:text-emerald-400 transition-colors duration-200"
            >
              Login
            </a>
          </h1>
          <h1 className="cursor-pointer text-black bg-white px-6 py-2 rounded-xl shadow-md hover:bg-emerald-400 hover:text-white transition-all duration-200">
            <a href="/">Sign Up</a>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
