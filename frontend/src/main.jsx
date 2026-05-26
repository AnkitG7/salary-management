import React from "react";

import ReactDOM from "react-dom/client";

import { ConfigProvider, theme } from "antd";

import { useEffect, useState } from "react";

import App from "./App";

const THEME_KEY = "salary-theme";

function Root() {
  /*
    LOAD SAVED THEME
  */

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme) {
      return savedTheme === "dark";
    }

    return false;
  });

  /*
    SAVE THEME
  */

  useEffect(() => {
    localStorage.setItem(THEME_KEY, isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,

        token: {
          colorPrimary: "#3b82f6",

          borderRadius: 18,

          fontFamily: "Inter, sans-serif",
        },
        
      }}
    >
      <App isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
    </ConfigProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);
