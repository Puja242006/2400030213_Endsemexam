import React, { useState } from "react";
import "./Apps.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    // Clear all
    if (value === "C") {
      setInput("");
      setResult("");
      return;
    }

    // Evaluate the result
    if (value === "=") {
      try {
        // Safely evaluate using Function constructor
        // Replace '×' and '÷' for JS evaluation
        const expression = input.replace(/×/g, "*").replace(/÷/g, "/");
        const evalResult = Function(`"use strict"; return (${expression})`)();
        setResult(evalResult);
      } catch (error) {
        setResult("Error");
      }
      return;
    }

    // Append the value to the input
    setInput((prev) => prev + value);
  };

  return (
    <div className="calculator-container">
      <h1>React Calculator</h1>
      <div className="display">
        <div className="input">{input || "0"}</div>
        <div className="result">{result !== "" ? "=" + result : ""}</div>
      </div>

      <div className="buttons">
        {["7", "8", "9", "÷",
          "4", "5", "6", "×",
          "1", "2", "3", "-",
          "0", ".", "C", "+",
          "="].map((btn) => (
          <button
            key={btn}
            className="btn"
            onClick={() => handleClick(btn)}
          >
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Apps;
