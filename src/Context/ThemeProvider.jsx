import React, { useState, useEffect, createContext } from "react";

export const Theme = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("Theme") || "light";
  });
  useEffect(() => {
    localStorage.setItem("Theme", theme);
    if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
      <div className="+"></div>
    } else {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  const values = { theme, setTheme };

  return <Theme.Provider value={values}>{children}</Theme.Provider>;
};

export default ThemeProvider;
