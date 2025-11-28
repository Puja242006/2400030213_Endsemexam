import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

const App = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const appStyle = {
    height: "100vh",
    textAlign: "center",
    paddingTop: "40px",
    backgroundColor: theme === "light" ? "#ffffff" : "#222222",
    color: theme === "light" ? "#000000" : "#ffffff"
  };

  return (
    <div style={appStyle}>
      <h1>KL Student Portal</h1>
      <p>Current Theme: {theme}</p>

      <button onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
      </button>
    </div>
  );
};

export default App;
