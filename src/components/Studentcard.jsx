import React, { useContext } from "react";
import ThemeContext from "./ThemeContext";

const StudentCard = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      style={{
        margin: "20px",
        padding: "20px",
        borderRadius: "8px",
        background: theme === "light" ? "#f3f3f3" : "#444",
        color: theme === "light" ? "#000" : "#fff"
      }}
    >
      <h3>Student Information</h3>
      <p>Name: Pujitha</p>
      <p>Roll No: 12345</p>
    </div>
  );
};

export default StudentCard;
