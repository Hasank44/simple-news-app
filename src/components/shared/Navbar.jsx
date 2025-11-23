import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Theme } from "../../Context/ThemeProvider";
import { Sun, Moon } from "lucide-react";
import axios from "axios";

const Navbar = ({ setCategoryUrl, setNews }) => {
  const { theme, setTheme } = useContext(Theme);
  const [isOpen, setIsOpen] = useState(false);
  const menuToggle = () => {
    setIsOpen(!isOpen);
  };

  const themeToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("Theme", newTheme);
  };

  const ref = useRef();
    useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { id: 1, title: "Business", to: "#business" },
    { id: 2, title: "Entertainment", to: "#entertainment" },
    { id: 3, title: "General", to: "#general" },
    { id: 4, title: "Health", to: "#health" },
    { id: 5, title: "Science", to: "#science" },
    { id: 6, title: "Sports", to: "#sports" },
    { id: 7, title: "Technology", to: "#technology" },
  ];

  const api_key = import.meta.env.VITE_NEWS_API;
  const handleSearch = async (e) => {
    const search = e.target.value;
    try {
      const res = await axios.get(`https://newsapi.org/v2/top-headlines?q=${search}&apiKey=${api_key}`);
      setNews(res.data.articles);
    } catch (error) {
      console.log(error)
    };
  };

  const url = (category) => {
    const categoryUrl = category.replace(/^#/, "");
    setCategoryUrl(categoryUrl);
  };

  return (
    <nav ref={ref} className="w-full bg-linear-to-r from-blue-800 to-blue-900 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto h-12 flex justify-between items-center px-5">
        <h1 className="text-white text-2xl font-bold cursor-pointer">
          News <span className="text-amber-400">App</span>
        </h1>
        <ul className="hidden lg:flex gap-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <Link
                onClick={() => url(item.to)}
                className="text-gray-200 hover:text-white duration-200"
                to={item.to}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <form className="hidden sm:block">
            <input
              type="text"
              onChange={handleSearch}
              placeholder="Search your news"
              className="px-3 py-2 bg-gray-200 text-black rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
            />
          </form>
          <button
            onClick={themeToggle}
          >
            {theme === "dark" ? <Sun size={22} /> : <Moon size={22} className="text-gray-200" />}
          </button>
          <button onClick={menuToggle} className="text-gray-200 lg:hidden">
            {isOpen ? <X size={30} /> : <Menu size={30} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="lg:hidden w-64 rounded-br-md bg-linear-to-br from-blue-800 to-blue-900 text-gray-200 px-2 py-4 animate-slide-down absolute">
          <ul className="flex flex-col space-y-2.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  to={item.to}
                  className="block py-2 hover:text-white hover:pl-2 duration-200 bg-black opacity-90 cursor-pointer rounded-md px-3"
                  onClick={() => setIsOpen(false)}
                >
                  {item.title}
                </Link>
              </li>
            ))}
            <form className="sm:hidden">
              <input
                onChange={handleSearch}
                type="text"
                placeholder="Search your news"
                className="px-2 py-2 w-full bg-gray-200 text-black rounded-md focus:ring-2 focus:ring-blue-600 outline-none"
              />
            </form>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
