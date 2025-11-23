import { Outlet } from "react-router";
import Navbar from "./components/shared/Navbar";
import Footer from "./components/shared/Footer";
import { useContext, useState } from "react";
import { Theme } from "./Context/ThemeProvider";
import Home from "./components/pages/Home/Home";

function App() {
  const { theme } = useContext(Theme);
  const background = theme === "dark" ? "#000000" : "#ffffff";

  const [categoryUrl, setCategoryUrl] = useState("general");

  return (
    <main
      className={`w-full h-auto opacity-90 transition-colors duration-200 ${
        theme === "dark" ? "text-gray-200" : "text-gray-900"
      }`}
      style={{ backgroundColor: background }}
    >
      <Navbar setCategoryUrl={setCategoryUrl} />
      <Home category={categoryUrl} />
      <Footer />
    </main>
  );
}

export default App;